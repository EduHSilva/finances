<script setup lang="ts">
import type { Category } from '~/types'

const props = defineProps({
  data: {
    type: Array as PropType<Category[]>,
    required: true
  },
  title: String
})

const emit = defineEmits<{
  (e: 'edit', section: Category): void
  (e: 'delete', section: Category): void
}>()
</script>

<template>
  <div class="w-full h-full ml-2">
    {{ props.title }}
    <div
      v-for="(section, index) in props.data"
      :key="index"
    >
      <UPageCard
        variant="subtle"
        class="mb-2 h-20"
      >
        <div class="flex items-center justify-between gap-3">
          <!-- ESQUERDA -->
          <div>
            <p class="text-sm font-medium">
              {{ section.title }}
            </p>

            <div class="flex items-center gap-1.5 text-xs text-muted">
              <span
                class="inline-block w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: section.color }"
              />
              <span>{{ section.classification }}</span>
            </div>
          </div>

          <!-- DIREITA -->
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-xs text-muted">
                Goal
              </p>
              <p class="text-base font-semibold leading-tight">
                {{ section.goal }}
              </p>
            </div>

            <!-- MENU DE AÇÕES -->
            <UDropdownMenu
              :items="[
                { label: $t('edit'), icon: 'i-lucide-pencil', onSelect: () => emit('edit', section) },
                { label: $t('delete'), icon: 'i-lucide-trash', color: 'error', onSelect: () => emit('delete', section) }
              ]"
              :content="{ align: 'end' }"
            >
              <UButton
                icon="i-lucide-more-vertical"
                variant="ghost"
                color="neutral"
                size="sm"
              />
            </UDropdownMenu>
          </div>
        </div>
      </UPageCard>
    </div>
  </div>
</template>

<style scoped>

</style>
