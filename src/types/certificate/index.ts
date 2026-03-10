import type { Course } from '../course'
import type { Education } from '../education'
import type { CertificateStatus } from '../status'

export interface Certificate {
  id: string
  course?: Course
  education?: Education
  status: CertificateStatus
  userId: string
  employeeId: string
  employeeName: string
  organizationId: string
  expireDate?: Date
  achievedOn: Date
}

export type ApiCertificate = Certificate
