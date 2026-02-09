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
    console.log('--- Email Campaign Analysis ---');
    console.log(`Generated at: ${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`);

    const query = `
    SELECT 
        lead_source,
        email_version,
        COUNT(id) as sent,
        COUNT(opened_at) as opened,
        COUNT(clicked_at) as clicked,
        ROUND((COUNT(clicked_at)::numeric / NULLIF(COUNT(id), 0)::numeric) * 100, 2) as ctr_percentage
    FROM email_logs
    GROUP BY lead_source, email_version
    ORDER BY lead_source, email_version;
  `;

    try {
        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            console.log('No email logs found.');
        } else {
            console.table(rows);
        }

        console.log('\nNote: "opened" count may be 0 if the tracking pixel is disabled.');
        console.log('Note: "clicked" count represents unique users who clicked at least one link.');
        console.log('      Detailed link tracking (which specific link was clicked) is not currently enabled in the database schema.');

    } catch (error) {
        console.error('Error fetching analysis:', error);
    } finally {
        await pool.end();
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
