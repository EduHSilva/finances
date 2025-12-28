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
    balance: 1000,
    totalInstallments: 3,
    totalValueInstallments: 3000
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
  ],
  recents: [
    {
      title: 'Investmentos',
      value: 1000,
      date: new Date('01/01/2026'),
      category: 'saude',
      income: false
    },
    {
      title: 'Investmentos',
      value: 1000,
      date: new Date('01/01/2026'),
      category: 'saude',
      income: true
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
        <div class="flex justify-between">
          <UPageCard
            variant="subtle"
            class="w-full"
            :title="$t('installmentsResume')"
          >
            <USeparator />
            <div class="flex justify-between">
              <span>
                {{ $t('installmentsQuantity') }}
              </span>
              {{ response.resumeData.totalInstallments }}
            </div>
            <USeparator />

            <div class="flex justify-between">
              <span>
                {{ $t('installmentsValue') }}
              </span>
              {{ formatCurrency(response.resumeData.totalValueInstallments) }}
            </div>
          </UPageCard>
          <UPageCard
            variant="subtle"
            class="w-full ml-2"
            :title="$t('recentTransactions')"
          >
            <USeparator />
            <div
              v-for="recent in response.recents"
              :key="recent.title"
              class="flex justify-between"
            >
              <div class="flex-col">
                <div>
                  {{ recent.title }}
                </div>
                <div>
                  {{ recent.category }} • {{ formatDate(recent.date) }}
                </div>
              </div>
              <div>
                <span :class="recent.income ? 'text-success' : 'text-error' ">
                  {{ recent.income ? formatCurrency(recent.value) : '-' + formatCurrency(recent.value) }}
                </span>
              </div>
            </div>
          </UPageCard>
        </div>
      </template>
    </UDashboardPanel>
  </DashLayout>
</template>
