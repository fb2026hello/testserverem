import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { log_id } = req.query;

    if (!log_id) {
        return res.status(400).send('Missing log_id');
    }

    try {
        // Return the pixel immediately to avoid delay
        const pixel = Buffer.from(
            'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            'base64'
        );
        res.setHeader('Content-Type', 'image/gif');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.send(pixel);

        // Async Logging (Fire and Forget)
        await pool.query(
            `
      WITH updated_log AS (
        UPDATE email_logs 
        SET has_opened = TRUE, opened_at = NOW() 
        WHERE id = $1 
        RETURNING user_id
      )
      UPDATE users 
      SET email_1_opened_at = NOW() 
      WHERE id = (SELECT user_id FROM updated_log)
      `,
            [log_id]
        );

    } catch (error) {
        console.error('Track Open Error:', error);
        // Even if DB fails, valid request gets the pixel
        if (!res.headersSent) {
            res.status(200).send('OK');
        }
    }
}
