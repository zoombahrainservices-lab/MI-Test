import jwt from 'jsonwebtoken'
import { verifyAdminCredentials } from './admin-operations'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AdminTokenPayload {
  id: string
  email: string
  name: string
  role: string
  type: 'admin' // Distinguish from user tokens
}

export function generateAdminToken(admin: AdminTokenPayload): string {
  return jwt.sign(admin, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload
    // Ensure this is an admin token, not a user token
    if (decoded.type !== 'admin') {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await verifyAdminCredentials(email, password)
  if (!admin) {
    return null
  }

  const tokenPayload: AdminTokenPayload = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    type: 'admin'
  }

  const token = generateAdminToken(tokenPayload)
  
  return {
    admin,
    token
  }
}
