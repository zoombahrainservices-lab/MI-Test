import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  // Check for JWT token in cookies
  const token = req.cookies.get('token')?.value

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
  }

  try {
    // Verify the JWT token
    const user = verifyToken(token)
    
    if (!user) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
    }

    // Check if user is admin
    const adminEmails = [
      'admin@example.com',
      'fayas@example.com',
      'zoombahrainservices@gmail.com'
    ]

    if (!adminEmails.includes(user.email)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Admin middleware error:', error)
    return NextResponse.redirect(new URL('/login?redirect=/admin', req.url))
  }
}

export const config = {
  matcher: '/admin/:path*'
}
