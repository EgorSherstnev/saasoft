import type { IAccount } from '@/types/account'
import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as IAccount[],
  }),
  actions: {
    addAccount() {
      const newAccount: IAccount = {
        id: crypto.randomUUID(),
        labels: [],
        type: 'Локальная',
        login: '',
        password: null,
      }
      this.accounts.push(newAccount)
      console.log('Account added:', newAccount)
    },

    updateAccount(updated: IAccount) {
      const idx = this.accounts.findIndex((a) => a.id === updated.id)
      if (idx !== -1) {
        this.accounts[idx] = updated
        console.log('Account updated:', updated)
      }
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id)
      console.log('Account removed, ID:', id)
    },

    loadFromStorage() {
      const data = localStorage.getItem('accounts')
      if (data) {
        try {
          this.accounts = JSON.parse(data)
          console.log('Accounts loaded from storage:', this.accounts)
        } catch (error) {
          console.error('Error loading accounts from storage:', error)
          this.accounts = []
        }
      }
    },

    saveToStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
      console.log('Accounts saved to storage:', this.accounts)
    },
  },
})
