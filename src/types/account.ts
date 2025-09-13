export type TAccountType = 'Локальная' | 'LDAP'

export interface IAccount {
  id: string
  labels: { text: string }[]
  type: TAccountType
  login: string
  password: string | null
}

export type INewAccount = Omit<IAccount, 'id'>
