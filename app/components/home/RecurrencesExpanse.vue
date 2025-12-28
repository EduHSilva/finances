<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  income: { type: Boolean, required: false },
  date: { type: Date, required: true },
  expect: { type: Number, required: true }
})

const valueNumberExpect = ref(0)
valueNumberExpect.value = props.expect ? props.expect : 0
</script>

<template>
  <div class="flex justify-between items-center p-4 rounded-lg bg-amber-900/20 border border-amber-500/30">
    <div class="w-full flex justify-between align-center">
      <div class="flex-col">
        <div>
          {{ props.title }}
        </div>
        <div>
          {{ props.income ? $t('income') : $t('expanse') }} • {{ formatDate(props.date) }}
        </div>
        <div>
          {{ $t('suggested') }}:  {{ formatCurrency(props.expect) }}
        </div>
      </div>
      <div class="flex align-center">
        <UButton
          :label="$t('confirm')"
          color="success"
          class="w-fit lg:ms-auto"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
