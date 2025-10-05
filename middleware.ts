import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = request.cookies.get('token')?.value

  // Check if token is valid format (JWT should be 200+ characters and start with 'eyJ')
  const isValidToken = token && token.length >= 100 && token.startsWith('eyJ')

  // Protected routes that require authentication
  if (pathname.startsWith('/discover')) {
    if (!isValidToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from login/signup pages
  if (isValidToken && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/discover', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/discover/:path*',
    '/login',
    '/signup'
  ]
}