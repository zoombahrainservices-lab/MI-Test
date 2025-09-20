import { NextRequest } from 'next/server'
import { verifyAdminToken } from './admin-auth'

export function getAdminFromRequest(request: NextRequest) {
  // Get admin token from cookie
  const adminToken = request.cookies.get('admin-token')?.value

  if (!adminToken) {
    return null
  }

  return verifyAdminToken(adminToken)
}

export function requireAdmin(request: NextRequest) {
  const admin = getAdminFromRequest(request)
  
  if (!admin) {
    throw new Error('Admin authentication required')
  }

  return admin
}
