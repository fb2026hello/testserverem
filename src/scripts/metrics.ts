import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('Missing DATABASE_URL');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function main() {
    console.log('--- Email Campaign Metrics ---');
    console.log(`Generated at: ${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`);

    const query = `
    SELECT 
      user_type,
      user_testing_version as version,
      COUNT(id) as sent,
      COUNT(email_1_opened_at) as opens,
      COUNT(email_1_clicked_at) as clicks
    FROM users
    WHERE email_1_sent_at IS NOT NULL
    GROUP BY user_type, user_testing_version
    ORDER BY user_type, user_testing_version;
  `;

    try {
        const { rows } = await pool.query(query);

        console.table(rows.map(row => ({
            ...row,
            'open_rate (%)': row.sent > 0 ? ((row.opens / row.sent) * 100).toFixed(1) : '0.0',
            'click_rate (%)': row.sent > 0 ? ((row.clicks / row.sent) * 100).toFixed(1) : '0.0',
        })));

    } catch (error) {
        console.error('Error fetching metrics:', error);
    } finally {
        pool.end();
    }
}

main();
