import type { ApiEmployeeSubscription } from '@/types/employee'

export const mockEmployeeSubscriptions: ApiEmployeeSubscription[] = [
  { id: 'esub-1', employeeId: 'emp-1', employeeName: 'Anna de Vries', organizationId: 'org-1', courseName: 'Vue 3 Bootcamp', status: 'subscribed', startDate: new Date('2026-03-10') },
  { id: 'esub-2', employeeId: 'emp-1', employeeName: 'Anna de Vries', organizationId: 'org-1', courseName: 'TypeScript Fundamentals', status: 'subscribed', startDate: new Date('2026-04-15') },
  { id: 'esub-3', employeeId: 'emp-2', employeeName: 'Bas Jansen', organizationId: 'org-1', courseName: 'UX Design Masterclass', status: 'subscribed', startDate: new Date('2026-03-20') },
  { id: 'esub-4', employeeId: 'emp-3', employeeName: 'Carmen Bakker', organizationId: 'org-1', courseName: 'Agile Project Management', status: 'cancelled', startDate: new Date('2026-02-01') },
  { id: 'esub-5', employeeId: 'emp-4', employeeName: 'Daan Visser', organizationId: 'org-1', courseName: 'HR Analytics', status: 'subscribed', startDate: new Date('2026-05-12') },
  { id: 'esub-6', employeeId: 'emp-5', employeeName: 'Eva Smit', organizationId: 'org-1', courseName: 'React Advanced Patterns', status: 'subscribed', startDate: new Date('2026-03-25') },
  { id: 'esub-7', employeeId: 'emp-5', employeeName: 'Eva Smit', organizationId: 'org-1', courseName: 'Node.js Backend Development', status: 'cancelled', startDate: new Date('2026-01-15') },
  { id: 'esub-8', employeeId: 'emp-6', employeeName: 'Finn Mulder', organizationId: 'org-1', courseName: 'Automated Testing with Playwright', status: 'subscribed', startDate: new Date('2026-04-01') },
  { id: 'esub-9', employeeId: 'emp-7', employeeName: 'Greta de Boer', organizationId: 'org-1', courseName: 'Data Analysis with Python', status: 'subscribed', startDate: new Date('2026-06-10') },
  { id: 'esub-10', employeeId: 'emp-8', employeeName: 'Hugo Peters', organizationId: 'org-1', courseName: 'Vue 3 Bootcamp', status: 'subscribed', startDate: new Date('2026-03-10') },
  { id: 'esub-11', employeeId: 'emp-9', employeeName: 'Iris Hendriks', organizationId: 'org-1', courseName: 'Figma for Teams', status: 'subscribed', startDate: new Date('2026-04-22') },
  { id: 'esub-12', employeeId: 'emp-10', employeeName: 'Jan Dekker', organizationId: 'org-1', courseName: 'Scrum Master Certification', status: 'cancelled', startDate: new Date('2026-02-20') },
  { id: 'esub-13', employeeId: 'emp-11', employeeName: 'Karin van Dijk', organizationId: 'org-2', courseName: 'Vue 3 Bootcamp', status: 'subscribed', startDate: new Date('2026-03-10') },
  { id: 'esub-14', employeeId: 'emp-12', employeeName: 'Lars van den Berg', organizationId: 'org-2', courseName: 'UX Design Masterclass', status: 'subscribed', startDate: new Date('2026-03-20') },
  { id: 'esub-15', employeeId: 'emp-13', employeeName: 'Mila Bos', organizationId: 'org-2', courseName: 'HR Analytics', status: 'cancelled', startDate: new Date('2026-05-12') },
  { id: 'esub-16', employeeId: 'emp-14', employeeName: 'Niek Brouwer', organizationId: 'org-2', courseName: 'Automated Testing with Playwright', status: 'subscribed', startDate: new Date('2026-04-01') },
  { id: 'esub-17', employeeId: 'emp-16', employeeName: 'Piet Vermeer', organizationId: 'org-3', courseName: 'React Advanced Patterns', status: 'subscribed', startDate: new Date('2026-03-25') },
  { id: 'esub-18', employeeId: 'emp-17', employeeName: 'Rosa van Leeuwen', organizationId: 'org-3', courseName: 'Agile Project Management', status: 'subscribed', startDate: new Date('2026-04-10') },
  { id: 'esub-19', employeeId: 'emp-19', employeeName: 'Tessa Meijer', organizationId: 'org-3', courseName: 'TypeScript Fundamentals', status: 'cancelled', startDate: new Date('2026-02-28') },
  { id: 'esub-20', employeeId: 'emp-20', employeeName: 'Victor Scholten', organizationId: 'org-3', courseName: 'HR Analytics', status: 'subscribed', startDate: new Date('2026-05-12') },
]
