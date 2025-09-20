import { createClient } from '@supabase/supabase-js'
import { hashPassword, verifyPassword } from './auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface CreateAdminData {
  email: string
  name: string
  password: string
  role?: string
}

// Admin operations
export async function createAdmin(data: CreateAdminData) {
  const hashedPassword = await hashPassword(data.password)
  
  const { data: newAdmin, error } = await supabase
    .from('admins')
    .insert({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role || 'admin',
      is_active: true
    })
    .select('id, email, name, role, created_at')
    .single()

  if (error) {
    throw new Error(`Failed to create admin: ${error.message}`)
  }

  return newAdmin
}

export async function findAdminByEmail(email: string) {
  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to find admin: ${error.message}`)
  }

  return admin
}

export async function findAdminById(id: string) {
  const { data: admin, error } = await supabase
    .from('admins')
    .select('id, email, name, role, created_at')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to find admin: ${error.message}`)
  }

  return admin
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await findAdminByEmail(email)
  if (!admin) return null

  const isValid = await verifyPassword(password, admin.password)
  if (!isValid) return null

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role
  }
}

export async function getAllAdmins() {
  const { data: admins, error } = await supabase
    .from('admins')
    .select('id, email, name, role, is_active, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get admins: ${error.message}`)
  }

  return admins
}

export async function updateAdminStatus(adminId: string, isActive: boolean) {
  const { data: updatedAdmin, error } = await supabase
    .from('admins')
    .update({ is_active: isActive })
    .eq('id', adminId)
    .select('id, email, name, role, is_active')
    .single()

  if (error) {
    throw new Error(`Failed to update admin status: ${error.message}`)
  }

  return updatedAdmin
}

export async function deleteAdmin(adminId: string) {
  const { error } = await supabase
    .from('admins')
    .delete()
    .eq('id', adminId)

  if (error) {
    throw new Error(`Failed to delete admin: ${error.message}`)
  }

  return true
}
