import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
  }

  // Check if user is admin (you can implement your own admin check logic here)
  // For now, we'll check if the user email is in a list of admin emails
  const adminEmails = [
    'admin@example.com', // Replace with your admin email
    'fayas@example.com'  // Add more admin emails as needed
  ]

  if (!adminEmails.includes(session.user.email || '')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return res
}

export const config = {
  matcher: '/admin/:path*'
}
