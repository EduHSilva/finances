import type { DefaultResponse } from '~/utils/types'
import { getTokenCookie } from '~/utils/util'
import type { Category } from '~/types'

export interface FinancesServiceOptions {
  apiUrl: string | unknown
}

export interface FinancesService {
  getCategories(): Promise<DefaultResponse<Page<Category>>>

  create(category: Category): Promise<DefaultResponse<Category>>

  delete(id: string): Promise<DefaultResponse<void>>

  edit(id: string, category: Category): Promise<DefaultResponse<Category>>
}

export default function financesService({ apiUrl }: FinancesServiceOptions): FinancesService {
  return {
    async create(category: Category): Promise<DefaultResponse<Category>> {
      return await $fetch(`${apiUrl}categories`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'POST',
        body: category
      })
    },

    async edit(id: string, category: Category): Promise<DefaultResponse<Category>> {
      return await $fetch(`${apiUrl}categories/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'PUT',
        body: category
      })
    },

    async getCategories() {
      return await $fetch(`${apiUrl}categories`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    },

    async delete(id: string): Promise<DefaultResponse<void>> {
      return await $fetch(`${apiUrl}categories/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        },
        method: 'DELETE'
      })
    }
  }
}
