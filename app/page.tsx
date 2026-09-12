import { createClient } from '@supabase/supabase-js'
import DesktopShell from '@/components/DesktopShell'

export const dynamic = 'force-dynamic'

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase not configured, return fallback data
  if (!url || !key) {
    return {
      folders: [
        { id: 'vetanx', name: 'Vetanx', tagline: 'Multi-tenant Payroll & HR SaaS', content: { what_it_is: 'Live multi-tenant payroll & HR SaaS built from scratch.', tech_stack: ['Express.js', 'Supabase Postgres + RLS', 'Razorpay', 'Vanilla JS PWA', 'Vercel'], key_work: ['RBAC system', 'Salary calculation engine', 'SEO/AEO/GEO optimization', 'Mobile-first PWA'], why_it_matters: 'Started as SalaryHub, evolved into full cloud SaaS. Real users, real money, real payroll runs.', sub_items: [] }, order_index: 0 },
        { id: 'unigram', name: 'Unigram', tagline: 'Campus Social Platform', content: { what_it_is: 'Campus app for CRSU students — social feed, anonymous confessions, DMs, and admin tools. Live at unigramjind.site.', tech_stack: ['Express.js', 'Supabase Auth + Realtime + Storage', 'PWA', 'Vercel'], key_work: ['Campus Feed with real-time updates', 'Anonymous Feed', 'Direct Messaging', 'Admin Panel'], why_it_matters: 'Built for the college community with college ID-card aesthetic.', sub_items: [] }, order_index: 1 },
        { id: 'medikiosk', name: 'MediKiosk', tagline: 'AYUSH OPD AI Case-Taking', content: { what_it_is: 'AI-powered case-taking system for AYUSH OPD. SIH problem statement SIH26047.', tech_stack: ['React', 'Node.js', 'AI/ML', 'Supabase'], key_work: ['Built with team Code Catalysts', 'Won 1st at CRSU Internal SIH 2026'], why_it_matters: 'Won the Internal Smart India Hackathon at CRSU.', sub_items: [] }, order_index: 2 },
        { id: 'ashoka', name: 'Ashoka Hotel', tagline: 'Complete Digital Presence', content: { what_it_is: 'Full digital transformation for a local hotel.', tech_stack: ['HTML/CSS/JS', 'React', 'Node.js', 'Local SEO'], key_work: ['Website', 'Digital menu with WhatsApp cart', 'React memory game', 'Billing software'], why_it_matters: 'End-to-end client work.', sub_items: [{ name: 'Website', desc: 'Black-gold theme, local SEO' }, { name: 'Digital Menu', desc: 'WhatsApp cart' }, { name: 'Games Hub', desc: 'React memory game' }, { name: 'Billing Software', desc: 'Internal system' }] }, order_index: 3 },
        { id: 'hackathon-tool', name: 'Hackathon Partition Tool', tagline: 'Team Allocation & Organization', content: { what_it_is: 'Web tool for organizing hackathon teams and problem statements.', tech_stack: ['React', 'Node.js', 'Supabase'], key_work: ['Automated team allocation', 'Problem statement distribution'], why_it_matters: 'Born from organizing 100+ teams at CRSU.', sub_items: [] }, order_index: 4 },
        { id: 'achievements', name: 'Achievements', tagline: 'Wins & Recognitions', content: { what_it_is: 'Awards, hackathon wins, and notable recognitions.', tech_stack: [], key_work: [], why_it_matters: '', sub_items: [{ name: 'SIH Hackathon 2026', desc: 'Organized + Won 1st place with Code Catalysts' }, { name: 'Dear Romeo Prompt Challenge 2026', desc: '1st place international AI prompt competition' }] }, order_index: 5 },
        { id: 'leadership', name: 'Leadership & Roles', tagline: 'Organizing & Mentoring', content: { what_it_is: 'Leadership positions and community contributions.', tech_stack: [], key_work: [], why_it_matters: '', sub_items: [{ name: 'Internal SIH 2026 Organizer', desc: 'Organized entire internal SIH at CRSU' }, { name: 'National Hackathon Organizer', desc: 'Organizing national-level hackathon Oct 2026' }, { name: 'CS Dept Go-to Organizer', desc: 'The person CS dept calls for any tech event' }, { name: 'Mentor', desc: 'Mentoring juniors in web dev and hackathon prep' }] }, order_index: 6 },
        { id: 'internships', name: 'Internships', tagline: 'Professional Experience', content: { what_it_is: 'Professional internship experience.', tech_stack: [], key_work: [], why_it_matters: '', sub_items: [{ name: 'Web Dev Intern - MG Education', desc: '46 days (Jun-Jul 2026)' }, { name: 'Skill India Intern', desc: 'Skill India programme' }] }, order_index: 7 },
      ],
      apps: [
        { id: 'vetanx', name: 'Vetanx', sub_label: 'Payroll SaaS', icon_glyph: '💼', icon_color: '#3b82f6', link_url: 'https://vetanx.site', link_status: 'live', order_index: 0 },
        { id: 'unigram', name: 'Unigram', sub_label: 'Campus App', icon_glyph: '💬', icon_color: '#8b5cf6', link_url: 'https://unigramjind.site', link_status: 'live', order_index: 1 },
        { id: 'medikiosk', name: 'MediKiosk', sub_label: 'AI Healthcare', icon_glyph: '🏥', icon_color: '#10b981', link_url: null, link_status: 'coming_soon', order_index: 2 },
        { id: 'ashoka-website', name: 'Ashoka Hotel', sub_label: 'Website / Menu / Games', icon_glyph: '🏨', icon_color: '#f59e0b', link_url: 'https://www.ashokahoteljind.com/', link_status: 'live', order_index: 3 },
        { id: 'ashoka-billing', name: 'Ashoka Hotel', sub_label: 'Billing Software', icon_glyph: '🧾', icon_color: '#f97316', link_url: null, link_status: 'private', order_index: 4 },
        { id: 'hackathon-tool', name: 'Hackathon Tool', sub_label: 'Team Allocation', icon_glyph: '🎯', icon_color: '#ef4444', link_url: null, link_status: 'coming_soon', order_index: 5 },
        { id: 'skills', name: 'Control Panel', sub_label: 'Skills', icon_glyph: '⚙️', icon_color: '#6b7280', link_url: null, link_status: 'live', order_index: 6 },
        { id: 'resume', name: 'Resume.pdf', sub_label: 'Download CV', icon_glyph: '📄', icon_color: '#dc2626', link_url: '/resume.pdf', link_status: 'live', order_index: 7 },
      ],
      skills: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express.js', 'Python', 'SQL/PostgreSQL', 'Supabase', 'Razorpay', 'Git & GitHub', 'Vercel', 'AI-assisted Development'],
      aboutMe: 'Sumit Singh — solo developer & founder, Jind, Haryana. 3rd year BCA, CRSU. Builds full products end-to-end; runs Vetanx (live multi-tenant payroll & HR SaaS) as main venture, alongside Unigram (campus app), client work, and organizing technical events at CRSU — including winning CRSU\'s Internal Smart India Hackathon 2026. Contact: sumirajput870@gmail.com',
      portraitUrl: '/portrait.jpg',
      faq: [
        { question: 'Who is Sumit?', answer: 'Sumit Singh is a solo developer and founder from Jind, Haryana. 3rd year BCA student at CRSU.' },
        { question: 'What is your flagship project?', answer: 'Vetanx — a live multi-tenant payroll & HR SaaS.' },
        { question: 'What is your tech stack?', answer: 'Next.js, Express.js, Supabase, Tailwind CSS, Vercel, and AI-assisted development.' },
      ],
    }
  }

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
    folders: foldersRes.data || [],
    apps: appsRes.data || [],
    skills: (skillsRes.data || []).map((s: { name: string }) => s.name),
    aboutMe: settings['about_me'] || '',
    portraitUrl: settings['portrait_url'] || '/portrait.jpg',
    faq: faqRes.data || [],
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
