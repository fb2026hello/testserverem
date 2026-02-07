-- Global Config Table
CREATE TABLE IF NOT EXISTS campaign_config (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT
);

-- Seed with a placeholder date (User must update this via SQL, not code, or use a setup script)
INSERT INTO campaign_config (key, value) VALUES ('campaign_start_date', '2026-02-01') ON CONFLICT DO NOTHING;

-- 1. The Users Table (Flat structure for easy analytics)
-- Note: extended to include email_2, etc., although currently unused as per plan
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    user_type VARCHAR(50), -- 'Superbacker' or 'Instagram'
    technology_niche VARCHAR(255), -- Optional context
    user_testing_version VARCHAR(1), -- 'A', 'B', or 'C'
    
    -- Engagement Stats for Email 1
    email_1_sent_at TIMESTAMP,
    email_1_clicked_at TIMESTAMP,
    email_1_opened_at TIMESTAMP,
    
    -- Placeholder for future emails
    email_2_sent_at TIMESTAMP,
    email_2_clicked_at TIMESTAMP,
    email_2_opened_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. The Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email_address VARCHAR(255) NOT NULL,
    email_type VARCHAR(50), -- e.g., 'Superbacker_Email_1'
    email_version VARCHAR(1), -- 'A', 'B', or 'C'
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    has_opened BOOLEAN DEFAULT FALSE,
    opened_at TIMESTAMP,
    
    has_clicked BOOLEAN DEFAULT FALSE,
    clicked_at TIMESTAMP,
    
    resend_id VARCHAR(255)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
