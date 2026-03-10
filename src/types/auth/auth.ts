export type Role = 'User' | 'Manager' | 'Teacher'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

// Server-verified user info returned by /auth/me
export interface UserInfo {
  id: string
  email: string
  role: Role
  organizationId: string
  firstName: string
  lastName: string
}

// Only used client-side for expiry checks (UX only, not a security boundary)
export interface TokenPayload {
  sub: string
  exp: number
  iat: number
}
