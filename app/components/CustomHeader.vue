<script setup lang="ts">
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
      <slot />

      <UColorModeSwitch />
      <USelect
        v-model="locale"
        :items="localeOptions"
        option-attribute="label"
        value-attribute="value"
        size="sm"
        @update:model-value="setLocale($event)"
      />
    </template>
  </UDashboardNavbar>
</template>

<style scoped>

</style>
