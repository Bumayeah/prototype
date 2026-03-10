import axiosInstance from './axiosInstance'
import type {
  LoginPayload,
  AuthResponse,
  RefreshResponse,
  SignupPayload,
  UserInfo,
} from '@/types/auth'

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload)
  return data
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.put<AuthResponse>('/auth/signup', payload)
  return data
}

export const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
  const { data } = await axiosInstance.post<RefreshResponse>('/auth/refresh', { refreshToken })
  return data
}

// Server-verified user info — use this instead of decoding the JWT client-side
export const fetchMe = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get<UserInfo>('/auth/me')
  return data
}
