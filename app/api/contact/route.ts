import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const sb = getSupabaseAdmin()
    if (!sb) {
      // Supabase not configured — log to console and return success anyway
      console.log('Contact form (no DB):', { name, email, message })
      return NextResponse.json({ success: true, note: 'DB not configured' })
    }

    const { error } = await sb.from('contact_messages').insert([{ name, email, message }])
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
