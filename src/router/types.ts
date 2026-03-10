export type RouteNames =
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'users'
  | 'profile'
  | 'not-found'
  | 'forbidden'
  | 'account'
  | 'membership'
  | 'courses'
  | 'education'
  | 'subscriptions'
  | 'certificates'
  | 'register'
  | 'pe-activities'
  | 'cycles'
  | 'employees'
  | 'employees-subscriptions'
  | 'employees-certificates'
  | 'reports'
  | 'portal'
  | 'notifications'

export const RouteName = {
  dashboard: 'dashboard',
  login: 'login',
  signup: 'signup',
  users: 'users',
  profile: 'profile',
  'not-found': 'not-found',
  forbidden: 'forbidden',
  account: 'account',
  membership: 'membership',
  courses: 'courses',
  education: 'education',
  subscriptions: 'subscriptions',
  certificates: 'certificates',
  register: 'register',
  'pe-activities': 'pe-activities',
  cycles: 'cycles',
  employees: 'employees',
  'employees-subscriptions': 'employees-subscriptions',
  'employees-certificates': 'employees-certificates',
  reports: 'reports',
  portal: 'portal',
  notifications: 'notifications',
} as const
