import type { DefaultResponse } from '~/utils/types'
import { getTokenCookie } from '~/utils/util'
import type { Category, Recurrence } from '~/types'

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

}

export default function financesService({ apiUrl }: FinancesServiceOptions): FinancesService {
  return {
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
    }
  }
}
