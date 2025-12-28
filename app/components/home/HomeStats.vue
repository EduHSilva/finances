<script setup lang="ts">
import type { Stat } from '~/types'

const props = defineProps<{
  data: {
    incomes: number
    expanses: number
    investments: number
    balance: number
  }
}>()

function formatCurrency(value: number): string {
  if (navigator.language === 'en') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    })
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  })
}

const baseStats = [{
  title: $t('income'),
  icon: 'i-lucide-banknote-arrow-up',
  value: props.data.incomes,
  variation: 1,
  formatter: formatCurrency
}, {
  title: $t('expanses'),
  icon: 'i-lucide-banknote-arrow-down',
  value: props.data.expanses,
  variation: 0,
  formatter: formatCurrency
}, {
  title: $t('investments'),
  icon: 'i-lucide-hand-coins',
  value: props.data.investments,
  variation: 1,
  formatter: formatCurrency
}, {
  title: $t('balance'),
  icon: 'i-lucide-wallet',
  value: props.data.balance,
  formatter: formatCurrency,
  variation: 2
}]

const { data: stats } = await useAsyncData<Stat[]>('stats', async () => {
  return baseStats.map((stat) => {
    return {
      title: stat.title,
      icon: stat.icon,
      value: stat.formatter ? stat.formatter(stat.value) : stat.value,
      variation: stat.variation
    }
  })
}, {
  default: () => []
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      to="/customers"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
