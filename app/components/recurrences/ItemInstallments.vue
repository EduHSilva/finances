<script setup lang="ts">
import type { InstallmentItem } from '~/types'

const props = defineProps({
  recurrence: {
    type: Object as PropType<InstallmentItem>,
    required: true
  }
})

const payedValue = computed(() =>
  props.recurrence.value / props.recurrence.installments * props.recurrence.pay
)

const progressLabel = computed(() =>
  `${props.recurrence.pay}/${props.recurrence.installments}`
)
</script>

<template>
  <div class="flex items-center justify-between gap-4 w-full">
    <!-- ESQUERDA -->
    <div class="flex-1 flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-repeat"
          class="text-muted"
        />
        <span class="font-medium">
          {{ props.recurrence.title }}
        </span>
      </div>

      <div class="text-sm text-muted">
        {{ props.recurrence.category }}
      </div>

      <div class="relative w-full">
        <UProgress
          :model-value="payedValue"
          :max="props.recurrence.value"
          size="md"
          class="w-full"
        />

        <span
          class="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground "
        >
          {{ progressLabel }}
        </span>
      </div>
    </div>

    <!-- DIREITA -->
    <div class="flex items-center gap-3">
      <span class="font-semibold">
        {{ formatCurrency(props.recurrence.value) }}
      </span>

      <UDropdownMenu
        :items="[
          { label: $t('payInstallment'), icon: 'i-lucide-check-square' },
          { label: $t('delete'), icon: 'i-lucide-trash', color: 'error' }
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
</template>
