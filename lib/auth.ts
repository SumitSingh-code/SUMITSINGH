import { cookies } from 'next/headers'
import crypto from 'crypto'

const SECRET = process.env.SESSION_SECRET || 'fallback-dev-secret-change-me'

export function signSession(): string {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + 12 * 60 * 60 * 1000 })
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(payload).toString('base64') + '.' + sig
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return false
    const [payloadB64, sig] = parts
    const payload = Buffer.from(payloadB64, 'base64').toString()
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
    if (sig !== expected) return false
    const data = JSON.parse(payload)
    if (data.exp < Date.now()) return false
    return data.admin === true
  } catch {
    return false
  }
}

export function isAdmin(): boolean {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  return verifySession(session?.value)
}
