# Sumit Singh — Retro Desktop Portfolio

A pixel-perfect **Windows 98/2000-style** portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Supabase**.

## 🚀 Live Demo
> Coming soon — deploy to Vercel after setup

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Custom CSS animations |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

## 📦 Setup

### 1. Clone & Install
```bash
git clone https://github.com/SumitSingh-code/SUMITSINGH.git
cd SUMITSINGH/portfolio
npm install
```

### 2. Configure Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and fill in your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Create Database Table
Run this SQL in your Supabase Dashboard → SQL Editor:
```sql
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for contact form)
CREATE POLICY "Allow inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

### 4. Add Your Assets
- Drop your portrait photo → `public/portrait.jpg` (recommended: 400x533px)
- Drop your resume → `public/resume.pdf`

### 5. Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

## 🎨 Customization

### Folders (Left Sidebar)
Edit `components/FoldersSidebar.tsx` → `FOLDERS` array

### Apps (Right Sidebar)
Edit `components/AppsSidebar.tsx` → `APPS` array

### Project Details (Modals)
Edit `components/ProjectModal.tsx` → `PROJECT_DATA` object

## 🌐 Deploy to Vercel
1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add environment variables (Supabase keys)
4. Deploy! 🎉

## 📄 License
MIT — feel free to use and customize
