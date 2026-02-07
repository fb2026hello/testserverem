import { Pool } from 'pg';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';
import { isWithinSendingWindow } from '../utils/timezone';
import { getDailyLimit } from '../utils/scheduler';
import SuperbackerEmailA from '../templates/SuperbackerA';
import SuperbackerEmailB from '../templates/SuperbackerB';
import SuperbackerEmailC from '../templates/SuperbackerC';
import InstagramEmailA from '../templates/InstagramA';
import InstagramEmailB from '../templates/InstagramB';
import InstagramEmailC from '../templates/InstagramC';
import * as cheerio from 'cheerio';

dotenv.config();

// Configuration Check
if (!process.env.DATABASE_URL || !process.env.RESEND_API_KEY || !process.env.TRACKING_DOMAIN) {
    console.error('Missing required environment variables.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TRACKING_DOMAIN = process.env.TRACKING_DOMAIN;
const SENDER = process.env.SENDER_EMAIL || 'Fabrizio <fabri@team.clura.dev>';

async function main() {
    console.log('Starting Email Batch Job...');

    // 1. Timezone Guard
    if (!isWithinSendingWindow()) {
        console.log('Outside of sending window (07:00 - 23:00 CST). Exiting.');
        process.exit(0);
    }

    // 2. Calculate Limits
    const dailyLimit = await getDailyLimit(pool);

    const today = DateTime.now().toISODate();
    const sentTodayRes = await pool.query(
        'SELECT COUNT(*) FROM email_logs WHERE sent_at::date = $1',
        [today]
    );
    const sentToday = parseInt(sentTodayRes.rows[0].count);

    if (sentToday >= dailyLimit) {
        console.log(`Daily limit reached (${sentToday}/${dailyLimit}). Exiting.`);
        process.exit(0);
    }

    const remainingQuota = dailyLimit - sentToday;
    console.log(`Daily Limit: ${dailyLimit}. Sent Today: ${sentToday}. Remaining Quota: ${remainingQuota}`);

    // 3. Fetch Candidates
    // Select users who have NOT received email 1 yet.
    const query = `
    SELECT id, email, user_type, user_testing_version 
    FROM users 
    WHERE email_1_sent_at IS NULL 
    LIMIT $1
  `;
    const { rows: users } = await pool.query(query, [remainingQuota]);

    if (users.length === 0) {
        console.log('No users pending for Email 1. Exiting.');
        process.exit(0);
    }

    console.log(`Found ${users.length} users to email.`);

    for (const user of users) {
        try {
            // 4. Assign Group if missing
            let version = user.user_testing_version;
            if (!version) {
                const versions = ['A', 'B', 'C'];
                version = versions[Math.floor(Math.random() * versions.length)];
                await pool.query('UPDATE users SET user_testing_version = $1 WHERE id = $2', [version, user.id]);
            }

            // 5. Select Template
            let emailComponent;
            let subject = '';

            if (user.user_type === 'Superbacker') {
                if (version === 'A') {
                    emailComponent = SuperbackerEmailA({});
                    subject = 'Open Source hardware + 3d printer enclosure = better and safer printing';
                } else if (version === 'B') {
                    emailComponent = SuperbackerEmailB({});
                    subject = 'Open source hardware + Aerospace eng. student = Awesome 3d printer enclosure';
                } else {
                    emailComponent = SuperbackerEmailC({});
                    subject = 'The 3d printer enclosure I wished someone built (Open Source & Affordable)';
                }
            } else { // Instagram
                if (version === 'A') {
                    emailComponent = InstagramEmailA({});
                    subject = 'Open Source hardware + 3d printer enclosure = better and safer printing';
                } else if (version === 'B') {
                    emailComponent = InstagramEmailB({});
                    subject = 'The Ultimate 3d printer enclosure for your Prusa MK3/4 & Prusa Mini';
                } else {
                    emailComponent = InstagramEmailC({});
                    subject = 'Do you 3d print? This could save your lungs. An open source 3d printer enclosure';
                }
            }

            // 6. Render & Inject Tracking
            let html = render(emailComponent);
            const $ = cheerio.load(html);

            // Log Entry to get ID
            const logRes = await pool.query(
                'INSERT INTO email_logs (user_id, email_address, email_type, email_version) VALUES ($1, $2, $3, $4) RETURNING id',
                [user.id, user.email, `Email_1_${user.user_type}`, version]
            );
            const logId = logRes.rows[0].id;

            // Inject Open Pixel
            $('body').append(`<img src="${TRACKING_DOMAIN}/api/track/open?log_id=${logId}" alt="" width="1" height="1" style="display:none;" />`);

            // Inject Click Tracking
            $('a').each((_, element) => {
                const href = $(element).attr('href');
                if (href) {
                    const trackedUrl = `${TRACKING_DOMAIN}/api/track/click?log_id=${logId}&dest=${encodeURIComponent(href)}`;
                    $(element).attr('href', trackedUrl);
                }
            });

            const finalHtml = $.html();

            // 7. Send Email
            const data = await resend.emails.send({
                from: SENDER,
                to: user.email,
                subject: subject,
                html: finalHtml,
            });

            if (data.error) {
                console.error(`Failed to send to ${user.email}:`, data.error);
                continue; // Skip update if failed
            }

            // 8. Update DB
            await pool.query(
                'UPDATE users SET email_1_sent_at = NOW() WHERE id = $1',
                [user.id]
            );
            await pool.query(
                'UPDATE email_logs SET resend_id = $1 WHERE id = $2',
                [data.data?.id, logId]
            );

            console.log(`Sent to ${user.email} (Version: ${version})`);

            // 9. Safety Delay (5-15s)
            const delay = Math.floor(Math.random() * 10000) + 5000;
            await new Promise(resolve => setTimeout(resolve, delay));

        } catch (err) {
            console.error(`Error processing user ${user.email}:`, err);
        }
    }

    console.log('Batch completed.');
    process.exit(0);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
