<template>
  <form @submit.prevent="onSubmit">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button :disabled="loading">Login</button>

    <p v-if="error">{{ error.userMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'
import { RouteName } from '@/router/types'

const email = ref('')
const password = ref('')
const router = useRouter()

const { login, loading, error } = useAuth()

const onSubmit = async () => {
  const result = await login({
    email: email.value,
    password: password.value,
  })
  if (result) {
    router.push({ name: RouteName.portal })
  }
}
</script>
