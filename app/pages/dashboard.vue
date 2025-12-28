<script setup lang="ts">
import { sub } from 'date-fns'
import type { Range } from '~/types'
import DashLayout from '~/layouts/DashLayout.vue'
import CustomHeader from '~/components/CustomHeader.vue'
import CategoryExpanse from '~/components/home/CategoryExpanse.vue'
import RecurrencesExpanse from '~/components/home/RecurrencesExpanse.vue'

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 30 }),
  end: new Date()
})

const response = ref({
  resumeData: {
    incomes: 100,
    expanses: 300,
    investments: 100,
    balance: 1000
  },
  categories: [
    {
      title: 'Saúde',
      value: 100,
      color: 'blue'
    },
    {
      title: 'Casa',
      value: 200,
      color: 'green'
    }
  ],
  classifications: [
    {
      title: 'Essencial',
      value: 200,
      expect: 200
    },
    {
      title: 'Investimentos',
      value: 100,
      expect: 50
    }
  ],
  recurrences: [
    {
      title: 'Salario',
      value: 1000,
      date: new Date('01/01/2026')
    }
  ]
})
</script>

<template>
  <DashLayout>
    <UDashboardPanel id="home">
      <template #header>
        <CustomHeader />
        <UDashboardToolbar>
          <template #left>
            <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
            <HomeDateRangePicker
              v-model="range"
              class="-ms-1"
            />
          </template>
        </UDashboardToolbar>
      </template>

      <template #body>
        <HomeStats
          :data="response.resumeData"
        />
        <div class="flex justify-between">
          <UPageCard
            variant="subtle"
            class="w-full"
            :title="$t('expansesCategories')"
            :description="$t('expansesCategoriesDesc')"
          >
            <USeparator />
            <CategoryExpanse
              v-for="category in response.categories"
              :key="category.title"
              :title="category.title"
              :value="category.value"
              :color="category.color"
              :max="response.resumeData.expanses"
            />
          </UPageCard>
          <UPageCard
            variant="subtle"
            class="w-full ml-2"
            :title="$t('expansesClassification')"
            :description="$t('expansesClassificationDesc')"
          >
            <USeparator />
            <CategoryExpanse
              v-for="category in response.classifications"
              :key="category.title"
              :title="category.title"
              :value="category.value"
              :expect="category.expect"
              :max="response.resumeData.expanses"
            />
          </UPageCard>
        </div>
        <UPageCard
          variant="subtle"
          class="w-full ml-2"
          :title="$t('recurrences')"
          :description="$t('pendingRecurrences')"
        >
          <USeparator />
          <RecurrencesExpanse
            v-for="recurrence in response.recurrences"
            :key="recurrence.title"
            :title="recurrence.title"
            :expect="recurrence.value"
            :date="recurrence.date"
          />
        </UPageCard>
      </template>
    </UDashboardPanel>
  </DashLayout>
</template>
