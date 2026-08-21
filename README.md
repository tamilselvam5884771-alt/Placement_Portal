# Placement Cell Portal (Training & Placement Club)

A modern, role-appropriate web application replacing traditional Excel spreadsheets and WhatsApp messages with a single organized digital hub.

## 🚀 Features

- **Role-Based Login & Dashboard Access**:
  - **HOD**: Read-only oversight across all departments, tasks, notices, and resources.
  - **Placement Cell Coordinator (Admin)**: Full management controls (create/update department tasks, post broadcast notices, upload study resources, mark placements).
  - **Club Student**: Department-level task manager, post notices, upload study resources.
  - **Student (View-Only)**: View department task board (read-only), browse and download study notes & PPTs, notice bookmarks, live notifications.

- **Task Updation Board**:
  - Department-wise organization (CSE, ECE, Mechanical, Civil, IT, EEE).
  - Simple status transitions: `To-Do` → `In Progress` → `Done` (no percentage bars).

- **Notice & Notification Board**:
  - Categorized tags: `General`, `HR Session`, `Placement Update`, `Event`, `Urgent`.
  - Searchable circulars with file attachment downloads.
  - In-app notification drawer and reading list bookmarks.

- **Placement Resource Library**:
  - Notes, PPTs, and reference materials retained for the full academic year.
  - Categorized by topic (`Technical`, `Aptitude`, `HR Interview`, `Resume`, `Company-Specific`) and month.

- **Placements Wall**:
  - Student placement achievements with company name, role, salary package, testimonial quotes, and celebratory confetti effects.

- **Interactive Enhancements**:
  - Quick Command Palette (`⌘K` or `Ctrl+K`).
  - Audio Feedback Synthesizer.
  - Daily Tech Interview Flashcards Widget.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 (Vite), Tailwind CSS v4, Lucide React Icons.
- **Backend / Database**: Supabase (PostgreSQL, Auth, Storage, Realtime).

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🗄️ Supabase Backend Setup

1. Create a project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Copy and execute the contents of [`supabase_schema.sql`](./supabase_schema.sql).
4. Add your Supabase credentials to `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   *(Or connect dynamically via the Database icon button in the portal header)*.
