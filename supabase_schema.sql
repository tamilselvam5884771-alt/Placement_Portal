-- ========================================================
-- PLACEMENT CELL PORTAL - SUPABASE DATABASE SCHEMA & POLICIES
-- Execute this SQL in the Supabase SQL Editor
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. PROFILES TABLE (Stores user roles and departments)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('hod', 'coordinator', 'club_student', 'student')),
    department TEXT NOT NULL DEFAULT 'CSE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are readable by authenticated users" ON public.profiles
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Trigger function to automatically create profile on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, role, department)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        new.email,
        COALESCE(new.raw_user_meta_data->>'role', 'student'),
        COALESCE(new.raw_user_meta_data->>'department', 'CSE')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --------------------------------------------------------
-- 2. TASKS TABLE (Department Tasks - No % tracking)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    department TEXT NOT NULL,
    assigned_to TEXT,
    deadline DATE,
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Tasks Policies
CREATE POLICY "Tasks view policy" ON public.tasks
    FOR SELECT USING (true); -- Read-access across board for authenticated/anon

CREATE POLICY "Tasks create policy for coordinators and club students" ON public.tasks
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Tasks update policy for coordinators and club students" ON public.tasks
    FOR UPDATE USING (true);

-- --------------------------------------------------------
-- 3. NOTICES TABLE (Circulars & Announcements)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    attachment_url TEXT,
    posted_by TEXT DEFAULT 'Placement Cell',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notices viewable by everyone" ON public.notices
    FOR SELECT USING (true);

CREATE POLICY "Notices can be posted by coordinators and club students" ON public.notices
    FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------
-- 4. RESOURCES TABLE (Notes, PPTs & Prep Materials)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT,
    month TEXT NOT NULL,
    size TEXT DEFAULT '2.5 MB',
    uploaded_by TEXT DEFAULT 'Coordinator',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resources viewable by everyone" ON public.resources
    FOR SELECT USING (true);

CREATE POLICY "Resources uploadable by coordinators and club students" ON public.resources
    FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------
-- 5. PLACEMENTS TABLE (Placement Wall & Achievements)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.placements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    package TEXT NOT NULL,
    department TEXT NOT NULL,
    quote TEXT,
    poster_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Placements viewable by everyone" ON public.placements
    FOR SELECT USING (true);

CREATE POLICY "Placements insertable by coordinators" ON public.placements
    FOR INSERT WITH CHECK (true);

-- --------------------------------------------------------
-- 6. NOTIFICATIONS TABLE (Realtime in-app updates)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notice_id UUID REFERENCES public.notices(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notifications viewable by owner" ON public.notifications
    FOR SELECT USING (true);

-- --------------------------------------------------------
-- SEED INITIAL DEMO DATA
-- --------------------------------------------------------
INSERT INTO public.notices (id, title, content, category, attachment_url, posted_by) VALUES
('a1111111-1111-1111-1111-111111111111', 'TCS Digital Campus Recruitment Drive — Interview Schedule', 'Shortlisted candidates must report to Lab 3 by 9:00 AM in formal attire with 2 hard copies of their resume.', 'Urgent', '#', 'Coordinator'),
('a2222222-2222-2222-2222-222222222222', 'System Design & High-Performance Computing Prep Session', 'Live interactive technical session hosted by alumnus currently at Amazon. Meeting link will activate 10 mins before.', 'HR Session', '#', 'Placement Cell'),
('a3333333-3333-3333-3333-333333333333', 'Accenture Assessment Phase I: Evaluation & Results', 'Aptitude and coding round scores are compiled and archived. Review performance metrics before round 2.', 'Placement Update', NULL, 'Coordinator')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.resources (id, title, category, month, file_url, size) VALUES
('b1111111-1111-1111-1111-111111111111', 'Core Java & Concurrency Architecture Cheat Sheet', 'Technical', 'August 2026', '#', '2.4 MB'),
('b2222222-2222-2222-2222-222222222222', 'Quantitative Reasoning & Aptitude Master Deck', 'Aptitude', 'August 2026', '#', '5.8 MB'),
('b3333333-3333-3333-3333-333333333333', 'STAR Method Behavioral Interview Masterclass', 'HR Interview', 'July 2026', '#', '1.2 MB')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.tasks (id, title, description, department, deadline, status) VALUES
('c1111111-1111-1111-1111-111111111111', 'Resume validation & digital roster collation', 'Verify 2026 batch resume links against master spreadsheet.', 'CSE', '2026-08-25', 'in_progress'),
('c2222222-2222-2222-2222-222222222222', 'Round 1 mock technical interview slot allocation', 'Schedule alumni interview slots across 3 panel tracks.', 'CSE', '2026-08-27', 'todo'),
('c3333333-3333-3333-3333-333333333333', 'ECE Aptitude lab seating plan finalization', 'Confirm 120 systems for online assessment.', 'ECE', '2026-08-22', 'in_progress'),
('c4444444-4444-4444-4444-444444444444', 'Distribution of pre-assessment tokens', 'Send test credentials to registered candidates via portal.', 'CSE', '2026-08-18', 'done')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.placements (id, student_name, company, role, package, department, quote) VALUES
('d1111111-1111-1111-1111-111111111111', 'Priya Sharma', 'Zoho Corporation', 'Software Development Engineer', '8.5 LPA', 'CSE', 'Consistent LeetCode practice and mock interviews with alumni were key to cracking the technical rounds!'),
('d2222222-2222-2222-2222-222222222222', 'Karthik Raja', 'Virtusa', 'Associate Engineer', '6.0 LPA', 'CSE', 'Focusing on core CS fundamentals and DBMS concurrency models gave me a clear edge during HR and Tech rounds.'),
('d3333333-3333-3333-3333-333333333333', 'Ananya Nair', 'TCS Digital', 'Systems Engineer', '7.2 LPA', 'ECE', 'The portal preparation decks and time-bound mock aptitude tests helped me boost my speed and accuracy.')
ON CONFLICT (id) DO NOTHING;
