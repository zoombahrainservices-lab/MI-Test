import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'

export async function middleware(req: NextRequest) {
  // Get the token from cookies
  const token = req.cookies.get('token')?.value

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
  }

  // Verify the token
  const user = verifyToken(token)
  if (!user) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
  }

  // Check if user is admin - only specific emails can access admin panel
  if (!isAdmin(user.email)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
