// Admin configuration and utilities

// List of admin emails that can access the admin panel
export const ADMIN_EMAILS = [
  'admin@example.com',
  'fayas@example.com',
  'zoombahrainservices@gmail.com'
]

// Check if a user is an admin based on their email
export function isAdmin(email: string | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email)
}

// Get admin emails for display purposes
export function getAdminEmails(): string[] {
  return [...ADMIN_EMAILS]
}
