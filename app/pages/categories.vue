<script setup lang="ts">
import DashLayout from '~/layouts/DashLayout.vue'
import CustomHeader from '~/components/CustomHeader.vue'
import ListCategories from '~/components/categories/ListCategories.vue'
import type { Category } from '~/types'

const response = ref({
  categories: [
    {
      id: '',
      title: 'teste',
      color: 'blue',
      classification: 'Essencial',
      goal: 20
    },
    {
      id: '',
      title: 'teste',
      color: 'blue',
      classification: 'Essencial',
      goal: 20
    },
    {
      id: '',
      title: 'teste custom',
      color: 'blue',
      classification: 'Essencial',
      goal: 20
    }
  ]
})
function openEditModal(category: Category) {
  // abre modal e preenche form
}

function confirmDelete(category: Category) {
  // confirma e remove
}
</script>

<template>
  <DashLayout>
    <UDashboardPanel id="home">
      <template #header>
        <CustomHeader />
      </template>

      <template #body>
        <ListCategories
          :data="response.categories"
          :title="$t('categories')"
          @edit="openEditModal"
          @delete="confirmDelete"
        />
      </template>
    </UDashboardPanel>
  </DashLayout>
</template>
