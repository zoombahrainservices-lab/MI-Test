import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminMiddleware } from './middleware.admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle admin routes with dedicated admin middleware
  if (pathname.startsWith('/admin')) {
    return await adminMiddleware(request)
  }

  // Handle user routes (dashboard, discover, login, signup)
  const token = request.cookies.get('token')?.value

  // Protected routes that require authentication
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/discover')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
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