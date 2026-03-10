<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel v-if="showCancel">{{ cancelText }}</AlertDialogCancel>
        <AlertDialogAction>{{ confirmText }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Are you sure?',
  },
  description: {
    type: String,
    default: 'This action cannot be undone.',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
  },
})

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'update:open', val: boolean): void
}>()

const isOpen = ref(props.open)

const showCancel = computed(() => !!props.cancelText)

watch(
  () => props.open,
  (val) => {
    isOpen.value = val
  },
)
</script>

<style scoped></style>
