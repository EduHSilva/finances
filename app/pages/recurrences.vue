<script setup lang="ts">
import DashLayout from '~/layouts/DashLayout.vue'
import CustomHeader from '~/components/CustomHeader.vue'
import ItemRecurrence from '~/components/recurrences/ItemRecurrence.vue'
import ItemInstallments from '~/components/recurrences/ItemInstallments.vue'

const response = ref({
  recurrences: [
    {
      id: '',
      title: 'Salario',
      category: '',
      frequency: 'Mensal',
      income: true,
      day: 10,
      status: 'active',
      value: 4500
    },
    {
      id: '',
      title: 'Aluguel',
      category: 'Moradia',
      frequency: 'Mensal',
      income: false,
      day: 10,
      status: 'active',
      value: 450
    }
  ],
  installmentsPurchases: [
    {
      id: '',
      title: 'iPhone',
      category: 'Lazer',
      value: 6000,
      installments: 12,
      pay: 3,
      initDate: new Date('01/01/2026')
    }, {
      id: '',
      title: 'Notebook',
      category: 'Educação',
      value: 4500,
      installments: 10,
      pay: 7,
      initDate: new Date('01/01/2026')
    }
  ]
})
</script>

<template>
  <DashLayout>
    <UDashboardPanel id="home">
      <template #header>
        <CustomHeader />
      </template>

      <template #body>
        <div>
          <UPageCard
            variant="subtle"
            class="mb-4"
            :title="$t('recurrences')"
          >
            <div class="divide-y divide-default">
              <div
                v-for="count in response.recurrences"
                :key="count.id"
                class="flex items-center justify-between py-3"
              >
                <ItemRecurrence :recurrence="count" />
              </div>
            </div>
          </UPageCard>
          <UPageCard
            variant="subtle"
            class="mb-4"
            :title="$t('installments')"
          >
            <div class="divide-y divide-default">
              <div
                v-for="count in response.installmentsPurchases"
                :key="count.id"
                class="flex items-center justify-between py-3"
              >
                <ItemInstallments :recurrence="count" />
              </div>
            </div>
          </UPageCard>
        </div>
      </template>
    </UDashboardPanel>
  </DashLayout>
</template>
