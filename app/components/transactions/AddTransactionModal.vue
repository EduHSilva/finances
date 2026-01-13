<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Transaction } from '~/types'

const props = defineProps({
  refresh: { type: Function, required: true },
  transaction: { type: Object as () => Transaction | null, default: null },
  categories: { type: Array, required: true }
})

watch(
  () => props.transaction,
  (t) => {
    if (!t) return
    state.id = t.id
    state.title = t.title
    state.value = t.value
    state.categoryID = t.categoryID
    state.income = t.income
    open.value = true
  },
  { immediate: true }
)

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Too short'),
  value: z.coerce.number(),
  categoryID: z.string().min(2, 'Too short'),
  income: z.boolean().default(false),
  executionDate: z.any()
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  id: undefined,
  value: undefined,
  categoryID: undefined,
  income: undefined,
  executionDate: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { $financesService } = useNuxtApp()
  const payload = {
    ...event.data,
    executionDate: event.data.executionDate
      ? new Date(event.data.executionDate).toISOString()
      : null,
    status: 'OK'
  }
  if (event.data.id) {
    await $financesService.editTransaction(event.data.id, payload as Transaction)
    toast.add({
      title: 'Success',
      description: `Category ${event.data.title} updated`,
      color: 'success'
    })
  } else {
    await $financesService.createTransaction(payload as Transaction)
    toast.add({
      title: 'Success',
      description: `New category ${event.data.title} added`,
      color: 'success'
    })
  }

  open.value = false
  await props.refresh()
}

function openModal() {
  open.value = true
}

function closeModal() {
  open.value = false
  Object.assign(state, {
    id: undefined,
    title: undefined,
    goal: undefined,
    classification: undefined,
    color: undefined
  })
}

defineExpose({ openModal, closeModal })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="props.transaction ? $t('editTransaction') : $t('newTransaction')"
    :description="props.transaction ? $t('editTransactionDesc') : $t('editTransactionDesc')"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="$t('title')"
          :placeholder="$t('enterTitle')"
          name="title"
        >
          <UInput
            v-model="state.title"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('value')"
          :placeholder="$t('enterValue')"
          name="value"
        >
          <UInput
            v-model="state.value"
            class="w-full"
            type="number"
          />
        </UFormField>
        <UFormField
          :label="$t('income')"
          name="income"
        >
          <USwitch v-model="state.income" />
        </UFormField>
        <UFormField
          :label="$t('category')"
          name="category"
        >
          <UInputMenu
            v-model="state.categoryID"
            value-key="id"
            label-key="title"
            :items="props.categories"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('executionDate')"
          name="executionDate"
        >
          <UInputDate v-model="state.executionDate" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            :label="$t('cancel')"
            color="neutral"
            variant="subtle"
            @click="closeModal"
          />
          <UButton
            :label="$t('save')"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
