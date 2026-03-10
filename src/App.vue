<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useErrorStore } from '@/stores/errorStore'
import AppModal from './components/AppModal.vue'
import { computed } from 'vue'

const errorStore = useErrorStore()

const isOpen = computed({
  get: () => !!errorStore.error,
  set: (val: boolean) => {
    if (!val) errorStore.error = null
  },
})

function handleConfirm() {
  errorStore.error = null
}
</script>

<template>
  <AppModal
    v-if="errorStore.error"
    title="Unexpected error"
    :open="isOpen"
    :description="errorStore.error.userMessage"
    @confirm="handleConfirm"
  />

  <RouterView />
</template>
