import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { log_id, dest } = req.query;

    if (!log_id || !dest) {
        return res.status(400).send('Missing parameters');
    }

    const destination = decodeURIComponent(dest as string);

    try {
        // Async Logging
        await pool.query(
            `
      WITH updated_log AS (
        UPDATE email_logs 
        SET has_clicked = TRUE, clicked_at = NOW() 
        WHERE id = $1 
        RETURNING user_id
      )
      UPDATE users 
      SET email_1_clicked_at = NOW() 
      WHERE id = (SELECT user_id FROM updated_log)
      `,
            [log_id]
        );

        // Redirect
        res.redirect(302, destination);

    } catch (error) {
        console.error('Track Click Error:', error);
        // Fallback redirect even if DB fails
        res.redirect(302, destination);
    }
}
