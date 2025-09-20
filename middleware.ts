import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = request.cookies.get('token')?.value

  console.log('🔍 Middleware check:', { pathname, hasToken: !!token })

  // Protected routes that require authentication
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/discover')) {
    if (!token) {
      console.log('🔄 Redirecting to login from:', pathname)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from login/signup pages
  if (token && (pathname === '/login' || pathname === '/signup')) {
    console.log('🔄 Redirecting authenticated user to dashboard from:', pathname)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/discover/:path*',
    '/login',
    '/signup'
  ]
}