import type { Subscription } from '@/types'
import { mockCourses } from './mockDataCourse'
import { mockEducations } from './mockDataEducation'

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '1')!, mockCourses.find((c) => c.id === '2')!],
    educations: [mockEducations.find((e) => e.id === 'edu-3')!],
  },
  {
    id: 'sub-2',
    status: 'cancelled',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-1')!],
  },
  {
    id: 'sub-3',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '1')!, mockCourses.find((c) => c.id === '2')!],
    educations: [mockEducations.find((e) => e.id === 'edu-3')!],
  },
  {
    id: 'sub-4',
    status: 'cancelled',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-1')!],
  },
  {
    id: 'sub-5',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '4')!, mockCourses.find((c) => c.id === '8')!],
    educations: [mockEducations.find((e) => e.id === 'edu-8')!],
  },
  {
    id: 'sub-6',
    status: 'cancelled',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-1')!],
  },
  {
    id: 'sub-7',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '1')!, mockCourses.find((c) => c.id === '2')!],
    educations: [mockEducations.find((e) => e.id === 'edu-3')!],
  },
  {
    id: 'sub-8',
    status: 'cancelled',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-1')!],
  },
  {
    id: 'sub-9',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '5')!, mockCourses.find((c) => c.id === '7')!],
    educations: [mockEducations.find((e) => e.id === 'edu-10')!],
  },
  {
    id: 'sub-10',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-3')!],
  },
  {
    id: 'sub-11',
    status: 'subscribed',
    userId: '1',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-4')!],
  },
  {
    id: 'sub-12',
    status: 'subscribed',
    userId: '2',
    courses: [mockCourses.find((c) => c.id === '6')!],
    educations: [mockEducations.find((e) => e.id === 'edu-4')!],
  },
]
