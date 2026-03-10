<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'

// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { computed, ref } from 'vue'

const chartData = [
  { date: new Date('2026-04-01'), employee: 222, personal: 150 },
  { date: new Date('2026-04-02'), employee: 97, personal: 180 },
  { date: new Date('2026-04-03'), employee: 167, personal: 120 },
  { date: new Date('2026-04-04'), employee: 242, personal: 260 },
  { date: new Date('2026-04-05'), employee: 373, personal: 290 },
  { date: new Date('2026-04-06'), employee: 301, personal: 340 },
  { date: new Date('2026-04-07'), employee: 245, personal: 180 },
  { date: new Date('2026-04-08'), employee: 409, personal: 320 },
  { date: new Date('2026-04-09'), employee: 59, personal: 110 },
  { date: new Date('2026-04-10'), employee: 261, personal: 190 },
  { date: new Date('2026-04-11'), employee: 327, personal: 350 },
  { date: new Date('2026-04-12'), employee: 292, personal: 210 },
  { date: new Date('2026-04-13'), employee: 342, personal: 380 },
  { date: new Date('2026-04-14'), employee: 137, personal: 220 },
  { date: new Date('2026-04-15'), employee: 120, personal: 170 },
  { date: new Date('2026-04-16'), employee: 138, personal: 190 },
  { date: new Date('2026-04-17'), employee: 446, personal: 360 },
  { date: new Date('2026-04-18'), employee: 364, personal: 410 },
  { date: new Date('2026-04-19'), employee: 243, personal: 180 },
  { date: new Date('2026-04-20'), employee: 89, personal: 150 },
  { date: new Date('2026-04-21'), employee: 137, personal: 200 },
  { date: new Date('2026-04-22'), employee: 224, personal: 170 },
  { date: new Date('2026-04-23'), employee: 138, personal: 230 },
  { date: new Date('2026-04-24'), employee: 387, personal: 290 },
  { date: new Date('2026-04-25'), employee: 215, personal: 250 },
  { date: new Date('2026-04-26'), employee: 75, personal: 130 },
  { date: new Date('2026-04-27'), employee: 383, personal: 420 },
  { date: new Date('2026-04-28'), employee: 122, personal: 180 },
  { date: new Date('2026-04-29'), employee: 315, personal: 240 },
  { date: new Date('2026-04-30'), employee: 454, personal: 380 },
  { date: new Date('2026-05-01'), employee: 165, personal: 220 },
  { date: new Date('2026-05-02'), employee: 293, personal: 310 },
  { date: new Date('2026-05-03'), employee: 247, personal: 190 },
  { date: new Date('2026-05-04'), employee: 385, personal: 420 },
  { date: new Date('2026-05-05'), employee: 481, personal: 390 },
  { date: new Date('2026-05-06'), employee: 498, personal: 520 },
  { date: new Date('2026-05-07'), employee: 388, personal: 300 },
  { date: new Date('2026-05-08'), employee: 149, personal: 210 },
  { date: new Date('2026-05-09'), employee: 227, personal: 180 },
  { date: new Date('2026-05-10'), employee: 293, personal: 330 },
  { date: new Date('2026-05-11'), employee: 335, personal: 270 },
  { date: new Date('2026-05-12'), employee: 197, personal: 240 },
  { date: new Date('2026-05-13'), employee: 197, personal: 160 },
  { date: new Date('2026-05-14'), employee: 448, personal: 490 },
  { date: new Date('2026-05-15'), employee: 473, personal: 380 },
  { date: new Date('2026-05-16'), employee: 338, personal: 400 },
  { date: new Date('2026-05-17'), employee: 499, personal: 420 },
  { date: new Date('2026-05-18'), employee: 315, personal: 350 },
  { date: new Date('2026-05-19'), employee: 235, personal: 180 },
  { date: new Date('2026-05-20'), employee: 177, personal: 230 },
  { date: new Date('2026-05-21'), employee: 82, personal: 140 },
  { date: new Date('2026-05-22'), employee: 81, personal: 120 },
  { date: new Date('2026-05-23'), employee: 252, personal: 290 },
  { date: new Date('2026-05-24'), employee: 294, personal: 220 },
  { date: new Date('2026-05-25'), employee: 201, personal: 250 },
  { date: new Date('2026-05-26'), employee: 213, personal: 170 },
  { date: new Date('2026-05-27'), employee: 420, personal: 460 },
  { date: new Date('2026-05-28'), employee: 233, personal: 190 },
  { date: new Date('2026-05-29'), employee: 78, personal: 130 },
  { date: new Date('2026-05-30'), employee: 340, personal: 280 },
  { date: new Date('2026-05-31'), employee: 178, personal: 230 },
  { date: new Date('2026-06-01'), employee: 178, personal: 200 },
  { date: new Date('2026-06-02'), employee: 470, personal: 410 },
  { date: new Date('2026-06-03'), employee: 103, personal: 160 },
  { date: new Date('2026-06-04'), employee: 439, personal: 380 },
  { date: new Date('2026-06-05'), employee: 88, personal: 140 },
  { date: new Date('2026-06-06'), employee: 294, personal: 250 },
  { date: new Date('2026-06-07'), employee: 323, personal: 370 },
  { date: new Date('2026-06-08'), employee: 385, personal: 320 },
  { date: new Date('2026-06-09'), employee: 438, personal: 480 },
  { date: new Date('2026-06-10'), employee: 155, personal: 200 },
  { date: new Date('2026-06-11'), employee: 92, personal: 150 },
  { date: new Date('2026-06-12'), employee: 492, personal: 420 },
  { date: new Date('2026-06-13'), employee: 81, personal: 130 },
  { date: new Date('2026-06-14'), employee: 426, personal: 380 },
  { date: new Date('2026-06-15'), employee: 307, personal: 350 },
  { date: new Date('2026-06-16'), employee: 371, personal: 310 },
  { date: new Date('2026-06-17'), employee: 475, personal: 520 },
  { date: new Date('2026-06-18'), employee: 107, personal: 170 },
  { date: new Date('2026-06-19'), employee: 341, personal: 290 },
  { date: new Date('2026-06-20'), employee: 408, personal: 450 },
  { date: new Date('2026-06-21'), employee: 169, personal: 210 },
  { date: new Date('2026-06-22'), employee: 317, personal: 270 },
  { date: new Date('2026-06-23'), employee: 480, personal: 530 },
  { date: new Date('2026-06-24'), employee: 132, personal: 180 },
  { date: new Date('2026-06-25'), employee: 141, personal: 190 },
  { date: new Date('2026-06-26'), employee: 434, personal: 380 },
  { date: new Date('2026-06-27'), employee: 448, personal: 490 },
  { date: new Date('2026-06-28'), employee: 149, personal: 200 },
  { date: new Date('2026-06-29'), employee: 103, personal: 160 },
  { date: new Date('2026-06-30'), employee: 446, personal: 400 },
]
type Data = (typeof chartData)[number]

const chartConfig = {
  // visitors: {
  //   label: 'Visitors',
  // },
  personal: {
    label: 'Personal',
    color: 'var(--primary)',
  },
  employee: {
    label: 'Employee',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

const svgDefs = `
  <linearGradient id="fillEmployee" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-employee)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-employee)"
      stop-opacity="0.1"
    />
  </linearGradient>
  <linearGradient id="fillPersonal" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-personal)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-personal)"
      stop-opacity="0.1"
    />
  </linearGradient>
`

const timeRange = ref('90d')
const filterRange = computed(() => {
  return chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2026-06-30')
    let daysToSubtract = 90
    if (timeRange.value === '30d') {
      daysToSubtract = 30
    } else if (timeRange.value === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
})
</script>

<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>Subscriptions </CardTitle>
        <CardDescription>
          Personal v.s. employee subscriptions for the last 3 months
        </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          class="hidden w-40 rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem value="90d" class="rounded-lg"> Last 3 months </SelectItem>
          <SelectItem value="30d" class="rounded-lg"> Last 30 days </SelectItem>
          <SelectItem value="7d" class="rounded-lg"> Last 7 days </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 pb-4 sm:px-6 sm:pt-6">
      <ChartContainer :config="chartConfig" class="aspect-auto h-62.5 w-full" :cursor="false">
        <VisXYContainer
          :data="filterRange"
          :svg-defs="svgDefs"
          :margin="{ left: -40 }"
          :y-domain="[0, 1200]"
        >
          <VisArea
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.personal, (d: Data) => d.employee]"
            :color="(d: Data, i: number) => ['url(#fillPersonal)', 'url(#fillEmployee)'][i]"
            :opacity="0.6"
          />
          <VisLine
            :x="(d: Data) => d.date"
            :y="[(d: Data) => d.personal, (d: Data) => d.personal + d.employee]"
            :color="
              (d: Data, i: number) => [chartConfig.personal.color, chartConfig.employee.color][i]
            "
            :line-width="1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="
              (d: number, index: number) => {
                const date = new Date(d)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            "
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter: (d) => {
                  return new Date(d).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                },
              })
            "
            :color="
              (d: Data, i: number) =>
                [chartConfig.personal.color, chartConfig.employee.color][i % 2]
            "
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
