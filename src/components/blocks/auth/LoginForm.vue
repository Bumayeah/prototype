<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'
import { useRateLimiter } from '@/composables/auth/useRateLimiter'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-vue-next'
import { RouteName } from '@/router/types'

const email = ref('')
const password = ref('')
const router = useRouter()

const { login, loading, error } = useAuth()
const { isLocked, remainingSeconds, recordAttempt, reset } = useRateLimiter()

const onSubmit = async () => {
  if (isLocked.value) return

  const result = await login({
    email: email.value,
    password: password.value,
  })
  if (result) {
    reset()
    router.push({ name: RouteName.portal })
  } else {
    recordAttempt()
  }
}

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
        <Alert v-if="isLocked" variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Too many attempts</AlertTitle>
          <AlertDescription>
            <p>Please wait {{ remainingSeconds }} seconds before trying again.</p>
          </AlertDescription>
        </Alert>
        <Alert v-else-if="error" variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Not able to login</AlertTitle>
          <AlertDescription>
            <p>{{ error.userMessage }}</p>
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required v-model="email" />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">Password</FieldLabel>
                <!-- <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a> -->
              </div>
              <Input id="password" type="password" required v-model="password" />
            </Field>
            <Field>
              <Button type="submit" :disabled="loading || isLocked">
                <Spinner v-if="loading" />Login</Button
              >
              <FieldDescription class="text-center text-xs"
                >Demo: jane@test.nl / 1234</FieldDescription
              >
              <FieldDescription class="text-center">
                Don't have an account? a
                <RouterLink :to="{ name: RouteName.signup }">Sign up</RouterLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
