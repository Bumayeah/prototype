import { personHandlers } from './personHandlers'
import { authHandlers } from './authHandlers'
import { courseHandlers } from './courseHandlers'
import { educationHandlers } from './educationHandlers'
import { subscriptionHandlers } from './subscriptionHandlers'
import { certificateHandlers } from './certificateHandlers'
import { registerHandlers } from './registerHandlers'
import { peActivityHandlers } from './peActivityHandlers'
import { cycleHandlers } from './cycleHandlers'
import { employeeHandlers } from './employeeHandlers'
import { employeeSubscriptionHandlers } from './employeeSubscriptionHandlers'
import { employeeCertificateHandlers } from './employeeCertificateHandlers'
import { trainerCourseHandlers } from './trainerCourseHandlers'

export const handlers = [
  ...personHandlers,
  ...authHandlers,
  ...courseHandlers,
  ...educationHandlers,
  ...subscriptionHandlers,
  ...certificateHandlers,
  ...registerHandlers,
  ...peActivityHandlers,
  ...cycleHandlers,
  ...employeeHandlers,
  ...employeeSubscriptionHandlers,
  ...employeeCertificateHandlers,
  ...trainerCourseHandlers,
]
