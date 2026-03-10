<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Education } from '@/types'

interface Props {
  education: Education
}

const { education } = defineProps<Props>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ education.title }}</CardTitle>
      <CardAction>
        <Badge variant="outline">
          {{ education.category }}
        </Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <CardDescription>{{ education.description }}</CardDescription>
    </CardContent>
    <CardFooter class="mt-auto">
      <Button type="submit" class="w-full">More about this</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
