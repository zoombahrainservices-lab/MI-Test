import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export interface AuthenticatedAdmin {
  id: string
  email: string
  name?: string
}

// List of admin emails
const ADMIN_EMAILS = [
  'admin@example.com',
  'fayas@example.com',
  'zoombahrainservices@gmail.com'
]

export function withAdminAuth(handler: (request: NextRequest, admin: AuthenticatedAdmin) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    try {
      // Check for authorization header
      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization token required' },
          { status: 401 }
        )
      }

      // Extract and verify token
      const token = authHeader.substring(7)
      const user = verifyToken(token)
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }

      // Check if user is admin
      if (!ADMIN_EMAILS.includes(user.email)) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }

      // Call the handler with authenticated admin
      return await handler(request, user as AuthenticatedAdmin)
    } catch (error) {
      console.error('Admin auth middleware error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
}

export function requireAdminAuth(request: NextRequest): { admin: AuthenticatedAdmin } | NextResponse {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (!ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    return { admin: user as AuthenticatedAdmin }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email)
}
