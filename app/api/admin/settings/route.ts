import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase-server'

function guard() {
  const c = cookies()
  return verifySession(c.get('admin_session')?.value)
}

export async function GET() {
  if (!guard()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sb = getSupabaseAdmin()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
  const { data, error } = await sb.from('site_settings').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!guard()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sb = getSupabaseAdmin()
  if (!sb) return NextResponse.json({ error: 'DB not configured' }, { status: 503 })
  const { key, value } = await req.json()
  const { error } = await sb.from('site_settings').upsert({ key, value })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
