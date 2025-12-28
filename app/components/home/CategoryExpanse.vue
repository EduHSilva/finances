<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  color: { type: String, required: false },
  value: { type: Number, required: true },
  max: { type: Number, required: true },
  expect: { type: Number, required: false }
})

const valueNumber = ref(0)
valueNumber.value = props.value

const valueNumberExpect = ref(0)
valueNumberExpect.value = props.expect ? props.expect : 0
</script>

<template>
  <div class="pt-2">
    <div class="w-full flex justify-between mb-1">
      <span>{{ props.title }}</span>
      <span>
        {{ formatCurrency(props.value) }}
        <span
          v-if="props.expect"
          class="text-xs ml-2 text-gray-600"
        >
          {{ formatCurrency(valueNumberExpect) }}
        </span>
      </span>
    </div>
    <UProgress
      v-model="valueNumber"
      status
      size="sm"
      :max="props.max"
      :class="props.color"
    />
    <UProgress
      v-if="props.expect"
      v-model="valueNumberExpect"
      status
      size="2xs"
      color="neutral"
      :max="props.max"
      :class="props.color"
    />
  </div>
</template>

<style scoped>

</style>
