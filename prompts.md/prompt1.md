Master Specification: Clura Cold Email Marketing Engine

Role: You are a Senior Backend Engineer and DevOps Specialist.
Objective: Architect and implement a standalone, open-source-ready repository for a high-performance cold email marketing engine.
Repository Name: email-server (Target: https://github.com/fb2026hello/testserverem.git)

1. Core Design Principles

Security First (Open Source Ready):

ABSOLUTELY NO hardcoded credentials, email addresses, names, or API keys in the source code.

All sensitive data must be loaded via process.env.

The repo must be safe to make public immediately.

Infrastructure Strategy:

Scheduler & Sender: Powered by GitHub Actions (running on a cron). This allows for unlimited execution time on public repos without server costs.

Tracking API: Hosted on Vercel (Serverless) to handle pixel loads and link redirects.

Database: Neon (PostgreSQL) via @neondatabase/serverless for connection pooling compatibility.

Tech Stack:

Runtime: Node.js (TypeScript)

Email: Resend SDK

Templating: React Email (@react-email/components)

Utilities: cheerio (HTML parsing), luxon (Timezone math), dotenv

2. Database Schema (Neon PostgreSQL)

Provide the exact SQL to initialize the database. The schema uses a "flat, user-centric" design for instant analytics without complex joins.

-- 1. Campaign Configuration
-- Stores the reference date for the ramp-up schedule.
CREATE TABLE IF NOT EXISTS campaign_config (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT
);
-- INITIALIZATION: User must run this manually in Neon console
INSERT INTO campaign_config (key, value) VALUES ('campaign_start_date', '2025-01-01') ON CONFLICT DO NOTHING;

-- 2. The Users Table (Master Record)
-- Tracks individual user progress and aggregated stats.
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    technology_niche VARCHAR(255),
    
    -- A/B/C Testing Variant (Assigned lazily upon first send)
    user_testing_version VARCHAR(1), -- 'A', 'B', or 'C'
    
    -- Engagement Stats (Timestamps for easy querying)
    -- Email 1
    email_1_sent_at TIMESTAMP,
    email_1_opened_at TIMESTAMP,
    email_1_clicked_at TIMESTAMP,
    
    -- Email 2
    email_2_sent_at TIMESTAMP,
    email_2_opened_at TIMESTAMP,
    email_2_clicked_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed BOOLEAN DEFAULT FALSE
);

-- 3. Email Logs (Audit Trail)
-- Immutable record of every email attempted.
CREATE TABLE IF NOT EXISTS email_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email_address VARCHAR(255) NOT NULL,
    email_type VARCHAR(50),    -- e.g., 'email_1', 'email_2'
    email_version VARCHAR(1),  -- 'A', 'B', or 'C'
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resend_id VARCHAR(255),    -- ID returned by Resend API
    
    -- Tracking Flags (Mirrors the user table for redundancy)
    has_opened BOOLEAN DEFAULT FALSE,
    has_clicked BOOLEAN DEFAULT FALSE
);


3. Application Architecture & File Structure

Generate the following file structure. Ensure all code is strictly typed using TypeScript interfaces.

/
├── .github/workflows/   # GitHub Action definitions
├── api/                 # Vercel Serverless Functions (Tracking)
├── src/
│   ├── config/          # Env var validation
│   ├── db/              # Database connection & typed queries
│   ├── emails/          # React Email templates (Variants A/B/C)
│   ├── lib/             # Utilities (HTML processing, Timezone checks)
│   └── scripts/         # Core logic (Sending, Metrics, Import)
├── .env.example         # Template for environment variables
├── .gitignore           # Security rules
└── package.json


4. Detailed Logic Requirements

A. The Core Engine: src/scripts/send-batch.ts

This script runs via GitHub Actions. It must be robust and error-tolerant.

Timezone Guard (The "Business Hours" Rule):

Use luxon to get the current time in 'America/Chicago' (US Central).

Logic: If time is outside 07:00 to 23:00, log "Outside hours" and exit immediately (code 0).

Note: The script runs 7 days a week (Weekends included).

Smart Ramp-Up System:

Fetch campaign_start_date from DB.

Calculate days_elapsed.

Formula: Daily Limit = Math.min(1000, 250 + (days_elapsed * 150)).

Starts at 250.

Adds 150/day.

Caps at 1000.

Check: Query email_logs for count of emails sent today (in US Central time).

Action: If sent_today >= daily_limit, exit.

Batch Selection & "Lazy" Assignment:

Select users who need emails (Limit: 50 users per run to prevent timeouts).

Priority 1: New users (email_1_sent_at IS NULL).

Priority 2: Follow-ups (email_1_sent_at > 3 days ago AND email_2_sent_at IS NULL).

Assignment: If a selected user has user_testing_version IS NULL, randomly assign 'A', 'B', or 'C' and update DB before sending.

Tracking Injection:

Open Pixel: Append <img src="${TRACKING_DOMAIN}/api/track/open?log_id=${log.id}" width="1" height="1" /> to the HTML body.

Click Wrapping: Use cheerio to find all <a> tags. Replace href with:
${TRACKING_DOMAIN}/api/track/click?log_id=${log.id}&dest=${encodeURIComponent(original_href)}

Sending & Safety:

Send via Resend. From: ${process.env.SENDER_EMAIL}.

Rate Limiting: await new Promise(r => setTimeout(r, Math.random() * 5000 + 2000)) (2-7s delay) between emails in the batch.

B. The Tracking API: api/index.ts

A Vercel-ready Express handler.

Route: GET /api/track/open

Query Param: log_id

DB Action:

Update email_logs: has_opened = TRUE.

Determine email_type from log.

Update users: Set {email_type}_opened_at = NOW().

Response: Return a 1x1 transparent GIF image with header Content-Type: image/gif.

Route: GET /api/track/click

Query Params: log_id, dest

DB Action:

Update email_logs: has_clicked = TRUE.

Update users: Set {email_type}_clicked_at = NOW().

Response: HTTP 302 Redirect to dest.

5. Infrastructure Configuration

A. GitHub Actions Workflow (.github/workflows/trigger-emails.yml)

Trigger: Schedule Cron */30 0-5,13-23 * * *.

Explanation: Runs every 30 mins during US Central awake hours (approx 7 AM - 11 PM), 7 days a week.

Environment Secrets:

RESEND_API_KEY

DATABASE_URL (Neon Connection String)

VERCEL_URL (The domain where the tracking API lives)

SENDER_EMAIL (e.g., "Fabri fabri@clura.dev")

B. package.json

Include these scripts:

"start": "node dist/api/index.js"

"send": "tsx src/scripts/send-batch.ts"

"import": "tsx src/scripts/import-users.ts"

"metrics": "tsx src/scripts/metrics.ts"

6. Deliverables

Please generate the complete code for:

package.json

tsconfig.json

src/lib/db.ts (Database Setup)

src/scripts/send-batch.ts (The Main Engine)

api/index.ts (The Tracking API)

.github/workflows/trigger-emails.yml

README.md (Detailed setup guide including how to set Secrets)