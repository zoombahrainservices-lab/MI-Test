import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = request.cookies.get('token')?.value

  // Protected routes that require authentication
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/discover')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Admin routes - require authentication AND admin privileges
  if (pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }

    // Verify the token
    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }

    // Check if user is admin - only specific emails can access admin panel
    if (!isAdmin(user.email)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Redirect authenticated users away from login/signup pages
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/discover/:path*',
    '/admin/:path*',
    '/login',
    '/signup'
  ]
}