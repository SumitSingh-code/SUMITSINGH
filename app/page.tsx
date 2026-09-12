import { createClient } from '@supabase/supabase-js'
import DesktopShell from '@/components/DesktopShell'

export const dynamic = 'force-dynamic'

// Fallback data (used when Supabase is not configured)
const FALLBACK = {
  folders: [
    { id: 'vetanx', name: 'Vetanx', tagline: 'A multi-tenant cloud payroll & HR SaaS, built solo, live at vetanx.site', content: { what_it_is: 'Vetanx is a cloud-based payroll and HR platform aimed at Indian small and growing businesses. It handles salary calculation, HR management, and subscription billing — built as a proper multi-tenant SaaS.', tech_stack: ['Express.js', 'Supabase Postgres + RLS', 'Razorpay', 'Vanilla JS PWA', 'Vercel'], origin_story: 'Evolved from an earlier desktop app called SalaryHub (Electron + SQLite). Migrated the entire product from a desktop tool into a cloud multi-tenant SaaS.', key_work: ['Owner-vs-manager RBAC permission model with RLS security', 'Recurring salary-calculation engine with 30-day method', 'SEO/AEO/GEO optimization', 'Mobile responsiveness pass'], why_it_matters: 'This is a real, live, paying-customer-facing product designed, built, and operated entirely solo — not a class project or a clone.' }, order_index: 1 },
    { id: 'unigram', name: 'Unigram', tagline: 'A campus social + utility app for CRSU students. Launching Vijayadashami, 20 Oct 2026.', content: { what_it_is: 'Mobile-first PWA built specifically for CRSU. Campus Feed (Twitter/Yik-Yak style) with utility tools: PYQs, notices, timetable, lost & found, notes sharing.', tech_stack: ['Express.js', 'Supabase Auth + Realtime + Storage', 'Vanilla JS PWA', 'Vercel'], feature_set: ['Campus Feed — posts, images, upvote/downvote, comments', 'Anonymous Feed — separate tab, admin still sees identity', 'DMs and real-time notifications', 'Full Admin Panel: signup approval, moderation, content management'], design_direction: 'College ID-card / noticeboard-inspired — department badges, warm off-white, navy text, marigold and leaf-green accents, Space Grotesk + Inter typography.', why_it_matters: 'No official mandate — it has to succeed on organic adoption, which is why it leans heavily on daily-engagement mechanics.' }, order_index: 2 },
    { id: 'medikiosk', name: 'MediKiosk', tagline: 'AI-powered patient case-taking for AYUSH OPDs — SIH winning project.', content: { what_it_is: 'Platform for SIH Problem Statement SIH26047 — streamlines patient case-taking in AYUSH OPDs using AI.', story: 'Built with team Code Catalysts at CRSU Internal SIH 2026 — an event Sumit organized himself and also competed in. Won 1st position.', status: 'Ongoing build — not yet publicly live.' }, order_index: 3 },
    { id: 'ashoka-hotel', name: 'Ashoka Hotel', tagline: 'Long-standing client — website, digital ordering, games, and billing.', content: { sub_items: [{ name: 'Website', description: 'Black-and-gold luxury theme, local SEO, mobile-responsive.' }, { name: 'Digital Menu', description: 'Cart functionality with WhatsApp ordering.' }, { name: 'Games Hub', description: 'Interactive React-based games including memory game.' }, { name: 'Billing Software', description: 'Standalone billing system for day-to-day operations.' }], related_client_work: ['Full website for Holy Heart Sr. Sec. School, Jind', 'Website for a truck body company'], why_it_matters: 'Real long-term client relationship — multiple distinct pieces of software built and maintained over time.' }, order_index: 4 },
    { id: 'hackathon-partition-tool', name: 'Hackathon Partition Tool', tagline: 'A web tool for organizing hackathon teams and problem statements.', content: { what_it_is: 'Built out of experience organizing CRSU Internal SIH 2026 — helps hackathon organizers allocate teams to problem statements efficiently.', status: 'Not yet publicly live.' }, order_index: 5 },
    { id: 'achievements', name: 'Achievements', tagline: 'A running record of wins and recognitions.', content: { note: 'Awards, hackathon wins, and notable recognitions.', sub_items: [{ name: 'SIH Hackathon 2026', description: 'Organized + Competed + Won 1st place with team Code Catalysts. Three roles at once: Organizer, Participant, Winner.' }, { name: 'Dear Romeo Prompt Challenge 2026', description: '1st Place in international AI prompt-engineering competition. Built a matchmaking algorithm.' }] }, order_index: 6 },
    { id: 'leadership-roles', name: 'Leadership & Roles', tagline: 'Organizing, mentoring, and running technical events at CRSU.', content: { sub_items: [{ name: 'Organizer, Internal SIH 2026', description: 'Full ownership of event planning and execution.' }, { name: 'National-Level Hackathon Organizer', description: 'October 2026.' }, { name: 'Mentor', description: 'Guiding students on organizing hackathons and technical events.' }, { name: 'Go-to Organizer, CS Dept', description: 'Repeatedly takes on workshops, sections, hackathons.' }] }, order_index: 7 },
    { id: 'internships', name: 'Internships', tagline: 'Early professional experience alongside solo founder work.', content: { entries: [{ title: 'Web Development Intern, MG Education', description: '46 days, June–July 2026.' }, { title: 'Intern, Skill India', description: '' }] }, order_index: 8 },
  ],
  apps: [
    { id: 'vetanx', name: 'Vetanx', sub_label: null, icon_glyph: '₹', icon_color: '#5B4FE0', link_url: 'https://vetanx.site/', link_status: 'live', order_index: 1 },
    { id: 'unigram', name: 'Unigram', sub_label: null, icon_glyph: '🎓', icon_color: '#111827', link_url: 'https://campusbuddy-ochre.vercel.app/', link_status: 'live', order_index: 2 },
    { id: 'medikiosk', name: 'MediKiosk', sub_label: null, icon_glyph: '🩺', icon_color: '#0EA5A6', link_url: null, link_status: 'coming_soon', order_index: 3 },
    { id: 'ashoka-website', name: 'Ashoka Hotel', sub_label: 'Website / Menu / Games', icon_glyph: '🏨', icon_color: '#C0392B', link_url: 'https://ashokahoteljind.com/', link_status: 'live', order_index: 4 },
    { id: 'ashoka-billing', name: 'Ashoka Hotel', sub_label: 'Billing Software', icon_glyph: '🧾', icon_color: '#0EA5E9', link_url: null, link_status: 'private', order_index: 5 },
    { id: 'hackathon-tool', name: 'Hackathon Partition Tool', sub_label: null, icon_glyph: '🧩', icon_color: '#8E44AD', link_url: null, link_status: 'coming_soon', order_index: 6 },
    { id: 'control-panel', name: 'Control Panel', sub_label: 'Skills', icon_glyph: '⚙️', icon_color: '#9CA3AF', link_url: null, link_status: 'internal', order_index: 7 },
    { id: 'resume', name: 'Resume.pdf', sub_label: null, icon_glyph: '📄', icon_color: '#DC2626', link_url: '/resume.pdf', link_status: 'live', order_index: 8 },
  ],
  skills: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express.js', 'Python', 'SQL / PostgreSQL', 'Supabase', 'Razorpay', 'Git & GitHub', 'Vercel', 'AI-assisted development workflows'],
  aboutMe: "I'm Sumit Singh, a solo developer and founder from Jind, Haryana, currently in my 3rd year of BCA at Chaudhary Ranbir Singh University (CRSU). I build full products end-to-end — from backend architecture to frontend polish — and run Vetanx, a live multi-tenant payroll & HR SaaS for Indian small businesses, as my main venture.\n\nAlongside that, I build Unigram, a social + utility app for my own university campus, take on client projects, and organize technical events at CRSU — most notably running the university's Internal Smart India Hackathon 2026 as organizer, participant, and 1st-place winner.\n\nContact: sumirajput870@gmail.com",
  portraitUrl: '/portrait.jpg',
  faq: [
    { question: 'Who is Sumit?', answer: 'Solo developer and founder from Jind, Haryana; 3rd year BCA at CRSU.' },
    { question: 'What is his flagship project?', answer: 'Vetanx — a live, multi-tenant payroll & HR SaaS for Indian small businesses.' },
    { question: 'What is his stack?', answer: 'Express.js, Supabase (Postgres + RLS + Auth + Realtime + Storage), Razorpay, Vercel, vanilla JS/HTML/CSS, React/Next.js for client projects.' },
    { question: 'How does he work?', answer: 'He uses an AI coding assistant (Antigravity) for implementation and Claude for architecture, debugging, and strategy.' },
    { question: 'What is his other big win?', answer: '1st Place, Dear Romeo Prompt Challenge 2026 — an international AI prompt-engineering competition.' },
  ],
}

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return FALLBACK

  try {
    const supabase = createClient(url, key)

    const [foldersRes, appsRes, skillsRes, settingsRes, faqRes] = await Promise.all([
      supabase.from('folders').select('*').order('order_index'),
      supabase.from('apps').select('*').order('order_index'),
      supabase.from('skills').select('*').order('order_index'),
      supabase.from('site_settings').select('*'),
      supabase.from('faq').select('*'),
    ])

    const settings: Record<string, string> = {}
    settingsRes.data?.forEach((s: { key: string; value: string }) => { settings[s.key] = s.value })

    return {
      folders: foldersRes.data?.length ? foldersRes.data : FALLBACK.folders,
      apps: appsRes.data?.length ? appsRes.data : FALLBACK.apps,
      skills: skillsRes.data?.length ? skillsRes.data.map((s: { name: string }) => s.name) : FALLBACK.skills,
      aboutMe: settings['about_me'] || FALLBACK.aboutMe,
      portraitUrl: settings['portrait_url'] || '/portrait.jpg',
      faq: faqRes.data?.length ? faqRes.data : FALLBACK.faq,
    }
  } catch {
    return FALLBACK
  }
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <DesktopShell
        folders={data.folders}
        apps={data.apps}
        skills={data.skills}
        aboutMe={data.aboutMe}
        portraitUrl={data.portraitUrl}
        faq={data.faq}
      />
    </main>
  )
}
