import { ref, watch } from 'vue'
import type { IAccount } from '@/types'
import { useAccountsStore } from '@/stores'
import { ACCOUNT_TYPES } from '../constants'

export const useAccountItem = (account: IAccount) => {
  const store = useAccountsStore()

  const loginError = ref(false)
  const passwordError = ref(false)

  const login = ref(account.login)
  const password = ref(account.password ?? '')
  const localType = ref(account.type)

  watch(
    () => account.login,
    (val) => (login.value = val),
  )
  watch(
    () => account.password,
    (val) => (password.value = val ?? ''),
  )
  watch(
    () => account.type,
    (val) => (localType.value = val),
  )

  function validateLogin(val: string) {
    const err = !val || val.length > 100
    loginError.value = err
    return !err
  }

  function validatePassword(val: string, type: IAccount['type']) {
    const err = type === ACCOUNT_TYPES.LOCAL && (!val || val.length > 100)
    passwordError.value = err
    return !err
  }

  function update(partial: Partial<IAccount>) {
    const updated: IAccount = { ...account, ...partial }
    store.updateAccount(updated)
  }

  function onLoginBlur() {
    if (validateLogin(login.value)) update({ login: login.value })
  }

  function onPasswordBlur() {
    if (validatePassword(password.value, localType.value)) {
      update({ password: password.value })
    }
  }

  function onLabelChange(value: string) {
    const labels = value
      .split(';')
      .map((v) => v.trim())
      .filter(Boolean)
      .map((text) => ({ text }))
    update({ labels })
  }

  function onTypeChange(val: IAccount['type']) {
    localType.value = val
    update({ type: val })
    validatePassword(password.value, val)
  }

  return {
    login,
    password,
    loginError,
    passwordError,
    type: localType,
    onLoginBlur,
    onPasswordBlur,
    onLabelChange,
    onTypeChange,
    remove: () => store.removeAccount(account.id),
  }
}
