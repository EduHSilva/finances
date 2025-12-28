<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, CalendarDate, today } from '@internationalized/date'
import type { Range } from '~/types'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const selected = defineModel<Range>({ required: true })

const ranges = [
  { label: $t('thisMonth'), preset: 'currentMonth' },
  { label: $t('lastMonth'), preset: 'lastMonth' },
  { label: $t('nextMonth'), preset: 'nextMonth' },
  { label: $t('thisYear'), preset: 'thisYear' }
]

const toCalendarDate = (date: Date) => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

const calendarRange = computed({
  get: () => ({
    start: selected.value.start ? toCalendarDate(selected.value.start) : undefined,
    end: selected.value.end ? toCalendarDate(selected.value.end) : undefined
  }),
  set: (newValue: { start: CalendarDate | null, end: CalendarDate | null }) => {
    selected.value = {
      start: newValue.start ? newValue.start.toDate(getLocalTimeZone()) : new Date(),
      end: newValue.end ? newValue.end.toDate(getLocalTimeZone()) : new Date()
    }
  }
})
const isRangeSelected = (range: { preset: string }) => {
  if (!selected.value.start || !selected.value.end) return false

  const tz = getLocalTimeZone()
  const todayDate = today(tz)

  let startDate: CalendarDate
  let endDate: CalendarDate

  switch (range.preset) {
    case 'currentMonth':
      startDate = todayDate.set({ day: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'lastMonth':
      startDate = todayDate.set({ day: 1 }).subtract({ months: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'nextMonth':
      startDate = todayDate.set({ day: 1 }).add({ months: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'thisYear':
      startDate = todayDate.set({ month: 1, day: 1 })
      endDate = todayDate.set({ month: 12, day: 31 })
      break
    default:
      return false
  }

  const selectedStart = toCalendarDate(selected.value.start)
  const selectedEnd = toCalendarDate(selected.value.end)

  return (
    selectedStart.compare(startDate) === 0
    && selectedEnd.compare(endDate) === 0
  )
}

const selectRange = (range: { preset: string }) => {
  const tz = getLocalTimeZone()
  const todayDate = today(tz)

  let startDate: CalendarDate
  let endDate: CalendarDate

  switch (range.preset) {
    case 'currentMonth':
      startDate = todayDate.set({ day: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'lastMonth':
      startDate = todayDate.set({ day: 1 }).subtract({ months: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'nextMonth':
      startDate = todayDate.set({ day: 1 }).add({ months: 1 })
      endDate = startDate.add({ months: 1 }).subtract({ days: 1 })
      break
    case 'thisYear':
      startDate = todayDate.set({ month: 1, day: 1 })
      endDate = todayDate.set({ month: 12, day: 31 })
      break
    default:
      return
  }

  selected.value = {
    start: startDate.toDate(tz),
    end: endDate.toDate(tz)
  }
}
</script>

<template>
  <UPopover
    :content="{ align: 'start' }"
    :modal="true"
  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-calendar"
      class="data-[state=open]:bg-elevated group"
    >
      <span class="truncate">
        <template v-if="selected.start">
          <template v-if="selected.end">
            {{ df.format(selected.start) }} - {{ df.format(selected.end) }}
          </template>
          <template v-else>
            {{ df.format(selected.start) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </span>

      <template #trailing>
        <UIcon
          name="i-lucide-chevron-down"
          class="shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
        />
      </template>
    </UButton>

    <template #content>
      <div class="flex items-stretch sm:divide-x divide-default">
        <div class="hidden sm:flex flex-col justify-center">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="neutral"
            variant="ghost"
            class="rounded-none px-4"
            :class="[isRangeSelected(range) ? 'bg-elevated' : 'hover:bg-elevated/50']"
            truncate
            @click="selectRange(range)"
          />
        </div>

        <UCalendar
          v-model="calendarRange"
          class="p-2"
          :number-of-months="2"
          range
        />
      </div>
    </template>
  </UPopover>
</template>
