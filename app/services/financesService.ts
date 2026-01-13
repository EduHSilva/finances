import type { DefaultResponse } from '~/utils/types'
import { getTokenCookie } from '~/utils/util'
import type { Category, Recurrence, Transaction } from '~/types'

export interface FinancesServiceOptions {
  apiUrl: string | unknown
}

export interface FinancesService {
  getCategories(): Promise<DefaultResponse<Page<Category>>>

  createCategory(category: Category): Promise<DefaultResponse<Category>>

  deleteCategory(id: string): Promise<DefaultResponse<void>>

  editCategory(id: string, category: Category): Promise<DefaultResponse<Category>>

  getRecurrences(): Promise<DefaultResponse<Page<Recurrence>>>

  createRecurrence(recurrence: Recurrence): Promise<DefaultResponse<Recurrence>>

  deleteRecurrence(id: string): Promise<DefaultResponse<void>>

  editRecurrence(id: string, category: Recurrence): Promise<DefaultResponse<Recurrence>>

  getTransactions(): Promise<DefaultResponse<Page<Transaction>>>

  deleteTransaction(id: string): Promise<DefaultResponse<void>>

  editTransaction(id: string, transaction: Transaction): Promise<DefaultResponse<Transaction>>

  createTransaction(transaction: Transaction): Promise<DefaultResponse<Transaction>>
}

export default function financesService({ apiUrl }: FinancesServiceOptions): FinancesService {
  return {
    async createTransaction(transaction: Transaction): Promise<DefaultResponse<Transaction>> {
      return await $fetch(`${apiUrl}transactions`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'POST',
        body: transaction
      })
    },
    async createCategory(category: Category): Promise<DefaultResponse<Category>> {
      return await $fetch(`${apiUrl}categories`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'POST',
        body: category
      })
    },

    async createRecurrence(recurrence: Recurrence): Promise<DefaultResponse<Recurrence>> {
      return await $fetch(`${apiUrl}recurrences`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'POST',
        body: recurrence
      })
    },

    async editCategory(id: string, category: Category): Promise<DefaultResponse<Category>> {
      return await $fetch(`${apiUrl}categories/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'PUT',
        body: category
      })
    },

    async editRecurrence(id: string, recurrence: Recurrence): Promise<DefaultResponse<Recurrence>> {
      return await $fetch(`${apiUrl}recurrences/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'PUT',
        body: recurrence
      })
    },

    async editTransaction(id: string, transaction: Transaction): Promise<DefaultResponse<Transaction>> {
      return await $fetch(`${apiUrl}transactions/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'PUT',
        body: transaction
      })
    },

    async getCategories() {
      return await $fetch(`${apiUrl}categories`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async getRecurrences() {
      return await $fetch(`${apiUrl}recurrences`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async getTransactions() {
      return await $fetch(`${apiUrl}transactions`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async deleteCategory(id: string): Promise<DefaultResponse<void>> {
      return await $fetch(`${apiUrl}categories/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'DELETE'
      })
    },

    async deleteRecurrence(id: string): Promise<DefaultResponse<void>> {
      return await $fetch(`${apiUrl}recurrences/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'DELETE'
      })
    },
    async deleteTransaction(id: string): Promise<DefaultResponse<void>> {
      return await $fetch(`${apiUrl}transactions/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'DELETE'
      })
    }
  }
}
