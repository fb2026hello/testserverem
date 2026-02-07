import { DateTime } from 'luxon';
import { Pool } from 'pg';

/**
 * Calculates the daily email limit based on the campaign start date.
 * Logic:
 * - Day 1-3: 250 emails
 * - Day 4-7: 500 emails
 * - Day 8+: 1000 emails
 */
export async function getDailyLimit(pool: Pool): Promise<number> {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT value FROM campaign_config WHERE key = $1', ['campaign_start_date']);

        if (res.rows.length === 0) {
            console.warn('Campaign start date not found, defaulting to safe limit (50).');
            return 50;
        }

        const startDateStr = res.rows[0].value;
        const startDate = DateTime.fromISO(startDateStr);
        const now = DateTime.now();

        const diffInDays = now.diff(startDate, 'days').days;

        if (diffInDays < 0) {
            return 0; // Campaign hasn't started
        }

        if (diffInDays <= 3) {
            return 250;
        } else if (diffInDays <= 7) {
            return 500;
        } else {
            return 1000;
        }
    } catch (error) {
        console.error('Error calculating daily limit:', error);
        return 50; // Fail safe
    } finally {
        client.release();
    }
}
