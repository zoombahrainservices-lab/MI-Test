import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/admin-middleware'

export async function middleware(req: NextRequest) {
  // Check if admin is authenticated using admin token
  const admin = getAdminFromRequest(req)

  // If no admin token, redirect to admin login
  if (!admin) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Admin is authenticated, allow access
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
