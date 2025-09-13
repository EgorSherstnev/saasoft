import type { ValueOf } from '@/types'

export interface IHeader {
  text: string
  key: string
  tooltip?: string
}

export const HEADERS: IHeader[] = [
  {
    text: 'Метки',
    key: 'labels',
    tooltip: 'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;',
  },
  {
    text: 'Тип',
    key: 'type',
  },
  {
    text: 'Логин',
    key: 'login',
  },
  {
    text: 'Пароль',
    key: 'password',
  },
  {
    text: 'Удалить',
    key: 'actions',
  },
] as const

export const ACCOUNT_TYPES = {
  LOCAL: 'Локальная',
  LDAP: 'LDAP',
} as const

export type AccountType = ValueOf<typeof ACCOUNT_TYPES>
