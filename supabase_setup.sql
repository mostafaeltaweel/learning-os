-- =====================================================================================
-- SUPABASE POSTGRESQL INITIALIZATION SCRIPT FOR MOSTAFA LEARNING OS
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- =====================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TASKS TABLE (Optimized for Learning OS live sync)
CREATE TABLE IF NOT EXISTS public.tasks (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Planned',
    notes TEXT,
    planned_date TEXT,
    duration TEXT,
    impact TEXT,
    completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE ROADMAP MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.milestones (
    id SERIAL PRIMARY KEY,
    month_number INT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    phase TEXT NOT NULL,
    target_role TEXT NOT NULL,
    description TEXT,
    portfolio_deliverable TEXT,
    status TEXT DEFAULT 'Planned'
);

-- 4. CREATE ENGLISH DIAGNOSTIC ASSESSMENT TABLE
CREATE TABLE IF NOT EXISTS public.diagnostic_english_assessment (
    id SERIAL PRIMARY KEY,
    candidate_name TEXT DEFAULT 'Mostafa Mohamed',
    report_code TEXT DEFAULT 'TL-3876',
    cefr_level TEXT DEFAULT 'A1+',
    fluency_score NUMERIC(5,2) DEFAULT 35.0,
    grammar_score NUMERIC(5,2) DEFAULT 32.0,
    vocabulary_score NUMERIC(5,2) DEFAULT 32.0,
    pronunciation_score NUMERIC(5,2) DEFAULT 32.0,
    comprehension_score NUMERIC(5,2) DEFAULT 35.0,
    assessed_date DATE DEFAULT '2026-10-26'
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS) WITH OPEN ACCESS POLICY FOR ANON KEY
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_english_assessment ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for anon users to read and write tasks
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow anon all on tasks" ON public.tasks;
    CREATE POLICY "Allow anon all on tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon read milestones" ON public.milestones;
    CREATE POLICY "Allow anon read milestones" ON public.milestones FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow anon read diagnostic" ON public.diagnostic_english_assessment;
    CREATE POLICY "Allow anon read diagnostic" ON public.diagnostic_english_assessment FOR ALL USING (true) WITH CHECK (true);
END $$;

-- 6. INSERT INITIAL DIAGNOSTIC BASELINE
INSERT INTO public.diagnostic_english_assessment (candidate_name, report_code, cefr_level, fluency_score, grammar_score, vocabulary_score, pronunciation_score, comprehension_score)
VALUES ('Mostafa Mohamed', 'TL-3876', 'A1+', 35.0, 32.0, 32.0, 32.0, 35.0)
ON CONFLICT DO NOTHING;

-- 7. INSERT 6-MONTH MILESTONES
INSERT INTO public.milestones (month_number, title, phase, target_role, description, portfolio_deliverable, status)
VALUES
(1, 'Month 01: Core Foundations & Fluent Business English Routine', 'Short-Term (Hire Ready)', 'Junior Data / BI Analyst', 'Master SQL queries, Power BI DAX basics, and daily conversational English routine.', 'Executive Retail & Sales Performance Power BI Dashboard', 'In Progress'),
(2, 'Month 02: Advanced SQL, ETL Automation & English Presentations', 'Short-Term (Hire Ready)', 'Junior Data / BI Analyst', 'Window functions, CTEs, automated data transformation, and English technical presentation skills.', 'Automated Multi-Source Financial Reconciliation Engine', 'Planned'),
(3, 'Month 03: Python Analytics, Pandas & Technical Interview Prep', 'Short-Term (Hire Ready)', 'Data Analyst (Market Ready)', 'Exploratory data analysis with Pandas/Polars, machine learning baselines, and STAR interview drills.', 'End-to-End Customer Churn Prediction & Survival Analysis', 'Planned'),
(4, 'Month 04: Production ML, Statistics & Real-time Telemetry', 'Long-Term (AI Expert)', 'AI & Analytics Engineer', 'Inferential statistics, A/B testing design, scikit-learn models, and FastAPI inference microservice.', 'Real-time Fraud & Anomaly Detection Pipeline', 'Planned'),
(5, 'Month 05: Deep Learning, PyTorch & LLM RAG Architectures', 'Long-Term (AI Expert)', 'AI Systems Specialist', 'Neural networks with PyTorch, vector databases (Qdrant), embeddings, and enterprise RAG systems.', 'Hybrid Enterprise RAG Knowledge Assistant with Multi-Agent Workflows', 'Planned'),
(6, 'Month 06: n8n Workflow Automation, Agentic AI & Job Negotiation', 'Long-Term (AI Expert)', 'AI Systems Specialist', 'Autonomous multi-agent orchestration, n8n production workflows, and senior salary negotiations.', 'Autonomous AI Ops & Business Intelligence Reporting Agent', 'Planned')
ON CONFLICT (month_number) DO NOTHING;
