import { http, HttpResponse } from 'msw'
import { SignJWT, jwtVerify } from 'jose'
import type {
  LoginPayload,
  AuthResponse,
  RefreshResponse,
  SignupPayload,
  UserInfo,
} from '@/types/auth'
import type { ApiPerson } from '@/types/person/api'
import { SECRET, mockPersons, credentials } from './mockData'

async function generateAccessToken(person: ApiPerson): Promise<string> {
  return new SignJWT({
    email: person.email,
    role: person.role,
    organizationId: person.organizationId,
    firstName: person.firstName,
    lastName: person.lastName,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(person.id)
    .setIssuedAt()
    .setExpirationTime('1m')
    .sign(SECRET)
}

async function generateRefreshToken(person: ApiPerson): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(person.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)
}

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginPayload

    const cred = credentials[body.email]
    if (!cred || cred.password !== body.password) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const person = mockPersons.find((p) => p.id === cred.userId)!

    const response: AuthResponse = {
      accessToken: await generateAccessToken(person),
      refreshToken: await generateRefreshToken(person),
    }

    return HttpResponse.json(response)
  }),

  http.post('/auth/refresh', async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string }

    try {
      const { payload } = await jwtVerify(refreshToken, SECRET)
      const person = mockPersons.find((p) => p.id === payload.sub)

      if (!person) {
        return HttpResponse.json({ message: 'User not found' }, { status: 401 })
      }

      const response: RefreshResponse = {
        accessToken: await generateAccessToken(person),
        refreshToken: await generateRefreshToken(person),
      }

      return HttpResponse.json(response)
    } catch {
      return HttpResponse.json({ message: 'Invalid refresh token' }, { status: 401 })
    }
  }),

  http.put('/auth/signup', async ({ request }) => {
    const body = (await request.json()) as SignupPayload

    if (mockPersons.some((p) => p.email === body.email)) {
      return HttpResponse.json({ message: 'Email is already exists' }, { status: 409 })
    }

    if (body.password !== body.confirmPassword) {
      return HttpResponse.json({ message: 'Password do not match' }, { status: 400 })
    }

    const newPerson: ApiPerson = {
      id: (mockPersons.length + 1).toString(),
      role: 'User',
      organizationId: 'org-1',
      ...body,
    }

    mockPersons.push(newPerson)

    credentials[body.email] = {
      password: body.password,
      userId: newPerson.id,
    }

    const response: AuthResponse = {
      accessToken: await generateAccessToken(newPerson),
      refreshToken: await generateRefreshToken(newPerson),
    }

    return HttpResponse.json(response, { status: 201 })
  }),

  http.get('/auth/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      const token = authHeader.slice(7)
      const { payload } = await jwtVerify(token, SECRET)
      const person = mockPersons.find((p) => p.id === payload.sub)

      if (!person) {
        return HttpResponse.json({ message: 'User not found' }, { status: 401 })
      }

      const userInfo: UserInfo = {
        id: person.id,
        email: person.email,
        role: person.role,
        organizationId: person.organizationId,
        firstName: person.firstName,
        lastName: person.lastName,
      }

      return HttpResponse.json(userInfo)
    } catch {
      return HttpResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
  }),
]
