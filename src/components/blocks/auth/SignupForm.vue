<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'
import { useRateLimiter } from '@/composables/auth/useRateLimiter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-vue-next'
import { RouteName } from '@/router/types'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const router = useRouter()

const { signup, loading, error } = useAuth()
const { isLocked, remainingSeconds, recordAttempt, reset } = useRateLimiter()

const onSubmit = async () => {
  if (isLocked.value) return

  const result = await signup({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    firstName: firstName.value,
    lastName: lastName.value,
  })
  if (result) {
    reset()
    router.push({ name: RouteName.portal })
  } else {
    recordAttempt()
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription> Enter your information below to create your account </CardDescription>
      <Alert v-if="isLocked" variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Too many attempts</AlertTitle>
        <AlertDescription>
          <p>Please wait {{ remainingSeconds }} seconds before trying again.</p>
        </AlertDescription>
      </Alert>
      <Alert v-else-if="error" variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Not able to sign up</AlertTitle>
        <AlertDescription>
          <p>{{ error.userMessage }}</p>
        </AlertDescription>
      </Alert>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit">
        <FieldGroup>
          <div class="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel for="name">First name</FieldLabel>
              <Input id="name" type="text" placeholder="John" required v-model="firstName" />
            </Field>
            <Field class="col-span-2">
              <FieldLabel for="name">Last name</FieldLabel>
              <Input id="name" type="text" placeholder="Doe" required v-model="lastName" />
            </Field>
          </div>
          <Field>
            <FieldLabel for="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
            <FieldDescription>
              We'll use this to contact you. We will not share your email with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="password">Password</FieldLabel>
            <Input id="password" type="password" required v-model="password" />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="confirm-password">Confirm Password</FieldLabel>
            <Input id="confirm-password" type="password" required v-model="confirmPassword" />
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit" :disabled="loading || isLocked">Create Account</Button>
              <FieldDescription class="px-6 text-center">
                Already have an account?
                <RouterLink :to="{ name: RouteName.login }">Sign in</RouterLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
