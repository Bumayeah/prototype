import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './types'
import MasterPage from '@/pages/MasterPage.vue'
import NestedPage from '@/pages/NestedPage.vue'
import {
  Users,
  Library,
  GraduationCap,
  SquareActivity,
  ChartNoAxesColumnIncreasing,
  CalendarCheck2,
  ShieldCheck,
  ClipboardCheckIcon,
} from 'lucide-vue-next'

export const routes = [
  {
    path: '/login',
    name: RouteName.login,
    component: () => import('@/pages/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/sign-up',
    name: RouteName.signup,
    component: () => import('@/pages/SignupPage.vue'),
    meta: { guestOnly: true },
  },

  {
    path: '/account',
    name: RouteName.account,
    component: () => import('@/pages/AccountPage.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/',
    name: RouteName.portal,
    component: MasterPage,
    redirect: '/courses',
    meta: { sidebar: { routeName: RouteName.portal } },
    children: [
      {
        path: '/profile',
        name: RouteName.profile,
        component: () => import('@/pages/ProfilePage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            routeName: RouteName.profile,
          },
        },
      },
      {
        path: '/membership',
        name: RouteName.membership,
        component: () => import('@/pages/MembershipPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            routeName: RouteName.membership,
          },
        },
      },
      {
        path: '/notifications',
        name: RouteName.notifications,
        component: () => import('@/pages/NotificationsPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            routeName: RouteName.notifications,
          },
        },
      },
      {
        path: RouteName.courses,
        name: RouteName.courses,
        component: () => import('@/pages/courses/CoursesPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Courses',
            routeName: RouteName.courses,
            icon: Library,
            section: 'General',
          },
        },
      },
      {
        path: RouteName.education,
        name: RouteName.education,
        component: () => import('@/pages/EducationPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Education',
            routeName: RouteName.education,
            icon: GraduationCap,
            section: 'General',
          },
        },
      },
      {
        path: RouteName.subscriptions,
        name: RouteName.subscriptions,
        component: () => import('@/pages/courses/SubscriptionsPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Subscriptions',
            routeName: RouteName.subscriptions,
            section: 'Personal',
            icon: CalendarCheck2,
          },
        },
      },
      {
        path: RouteName.certificates,
        name: RouteName.certificates,
        component: () => import('@/pages/courses/CertificatesPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Certificates',
            routeName: RouteName.certificates,
            section: 'Personal',
            icon: ShieldCheck,
          },
        },
      },
      {
        path: RouteName.register,
        component: NestedPage,
        redirect: RouteName.register,
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Register',
            routeName: RouteName.register,
            icon: SquareActivity,
            section: 'Personal',
          },
        },
        children: [
          {
            path: '',
            name: RouteName.register,
            component: () => import('@/pages/register/RegisterPage.vue'),
            meta: { requiresAuth: true, sidebar: { routeName: RouteName.register } },
          },
          {
            path: RouteName['pe-activities'],
            name: RouteName['pe-activities'],
            component: () => import('@/pages/register/PeActivitiesPage.vue'),
            meta: {
              requiresAuth: true,
              sidebar: {
                title: 'Pe activities',
                parentRouteName: RouteName.register,
                routeName: RouteName['pe-activities'],
              },
            },
          },
          {
            path: RouteName.cycles,
            name: RouteName.cycles,
            component: () => import('@/pages/register/CyclesPage.vue'),
            meta: {
              requiresAuth: true,
              sidebar: {
                title: 'Cycles',
                parentRouteName: RouteName.register,
                routeName: RouteName.cycles,
              },
            },
          },
        ],
      },
      {
        path: RouteName.employees,
        component: NestedPage,
        redirect: RouteName.employees,
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Employees',
            routeName: RouteName.employees,
            icon: Users,
            section: 'Contactperson',
          },
        },
        children: [
          {
            path: '',
            name: RouteName.employees,
            component: () => import('@/pages/employees/EmployeesPage.vue'),
            meta: { requiresAuth: true, sidebar: { routeName: RouteName.employees } },
          },
          {
            path: RouteName['employees-subscriptions'],
            name: RouteName['employees-subscriptions'],
            component: () => import('@/pages/employees/EmployeesSubscriptionsPage.vue'),
            meta: {
              requiresAuth: true,
              sidebar: {
                title: 'Subscriptions',
                parentRouteName: RouteName.employees,
                routeName: RouteName['employees-subscriptions'],
              },
            },
          },
          {
            path: RouteName['employees-certificates'],
            name: RouteName['employees-certificates'],
            component: () => import('@/pages/employees/EmployeesCertificatesPage.vue'),
            meta: {
              requiresAuth: true,
              sidebar: {
                title: 'Certificates',
                parentRouteName: RouteName.employees,
                routeName: RouteName['employees-certificates'],
              },
            },
          },
        ],
      },
      {
        path: RouteName.reports,
        name: RouteName.reports,
        component: () => import('@/pages/ReportsPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Reports',
            routeName: RouteName.reports,
            section: 'Contactperson',
            icon: ChartNoAxesColumnIncreasing,
          },
        },
      },
      {
        path: RouteName.dashboard,
        name: RouteName.dashboard,
        component: () => import('@/pages/DashboardPage.vue'),
        meta: {
          requiresAuth: true,
          sidebar: {
            title: 'Dashboard',
            routeName: RouteName.dashboard,
            section: 'Trainer',
            icon: ClipboardCheckIcon,
          },
        },
      },
    ],
  },
  {
    path: '/forbidden',
    name: RouteName.forbidden,
    component: () => import('@/pages/ForbiddenPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName['not-found'],
    component: () => import('@/pages/NotFound.vue'),
  },
] satisfies RouteRecordRaw[]
