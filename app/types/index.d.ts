import type { AvatarProps } from '@nuxt/ui'

export type TransactionStatus = 'PENDING' | 'unsubscribed'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface Transaction {
  id: number
  title: string
  value: number
  date: Date
  income: boolean
  status: TransactionStatus
}

export interface Category {
  id: string
  title: string
  classification: string
  goal: number
  color: string
}

export interface Recurrence {
  id?: string
  title: string
  categoryID?: string
  category?: string
  value: number
  status?: string
  income: boolean
  type: string
  day: number
  installments?: number
  payed?: number
}

export interface InstallmentItem {
  id: string
  title: string
  category: string
  value: number
  installments: number
  payed: number
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
