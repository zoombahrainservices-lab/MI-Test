import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'

// Dedicated admin middleware
export async function adminMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  console.log(`🔐 Admin middleware checking: ${pathname}`)

  // If no token, redirect to login
  if (!token) {
    console.log('❌ No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
  }

  // Verify the token
  const user = await verifyToken(token)
  if (!user) {
    console.log('❌ Invalid token, redirecting to login')
    return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
  }

  console.log(`👤 User: ${user.email}`)

  // Check if user is admin - only specific emails can access admin panel
  if (!isAdmin(user.email)) {
    console.log(`❌ User ${user.email} is not admin, redirecting to unauthorized`)
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  console.log(`✅ Admin access granted for ${user.email}`)
  return NextResponse.next()
}

export const adminConfig = {
  matcher: '/admin/:path*'
}
