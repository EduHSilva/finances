<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = [[{
  label: 'New mail',
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: 'New customer',
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

const { locale, setLocale } = useI18n()

const localeOptions = [
  { value: 'pt', label: '🇧🇷 Português' },
  { value: 'en', label: '🇺🇸 English' }
]
</script>

<template>
  <UDashboardNavbar
    :title="$t('manageFinances')"
    :ui="{ right: 'gap-3' }"
  >
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <template #right>
      <UColorModeSwitch />
      <USelect
        v-model="locale"
        :items="localeOptions"
        option-attribute="label"
        value-attribute="value"
        size="sm"
        @update:model-value="setLocale($event)"
      />

      <UDropdownMenu :items="items">
        <UButton
          icon="i-lucide-plus"
          size="md"
          class="rounded-full"
        />
      </UDropdownMenu>
    </template>
  </UDashboardNavbar>
</template>

<style scoped>

</style>
