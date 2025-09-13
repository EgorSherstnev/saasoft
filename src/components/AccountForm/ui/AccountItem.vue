<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { IAccount } from '@/types'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useAccountsStore } from '@/stores'

const props = defineProps<{ account: IAccount }>()
const store = useAccountsStore()

const loginError = ref(false)
const passwordError = ref(false)

const login = ref(props.account.login)
const password = ref(props.account.password ?? '')

watch(
  () => props.account.login,
  (val) => (login.value = val),
)
watch(
  () => props.account.password,
  (val) => (password.value = val ?? ''),
)

function validateLogin(val: string) {
  const err = !val || val.length > 100
  loginError.value = err
  return !err
}

function validatePassword(val: string, type: IAccount['type']) {
  const err = type === 'Локальная' && (!val || val.length > 100)
  passwordError.value = err
  return !err
}

function onLoginBlur() {
  if (validateLogin(login.value)) {
    const updated: IAccount = { ...props.account, login: login.value }
    store.updateAccount(updated)
  }
}

function onPasswordBlur() {
  if (validatePassword(password.value, props.account.type)) {
    const updated: IAccount = { ...props.account, password: password.value }
    store.updateAccount(updated)
  }
}

function onLabelChange(value: string) {
  const labels = value
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

  const updated: IAccount = { ...props.account, labels }
  store.updateAccount(updated)
}

const type = computed({
  get: () => props.account.type,
  set: (val: IAccount['type']) => {
    const updated: IAccount = { ...props.account, type: val }
    store.updateAccount(updated)
    validatePassword(password.value, val)
  },
})
</script>

<template>
  <a-card
    size="small"
    :bordered="false"
    :body-style="{ marginBottom: '12px' }"
    style="box-shadow: none"
  >
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 1fr 1fr 40px',
        gap: '12px',
        alignItems: 'center',
      }"
    >
      <a-input
        :value="account.labels.map((l) => l.text).join('; ')"
        @blur="onLabelChange(($event.target as HTMLInputElement).value)"
        placeholder="Метки"
        maxlength="50"
      />

      <a-select v-model:value="type">
        <a-select-option value="Локальная">Локальная</a-select-option>
        <a-select-option value="LDAP">LDAP</a-select-option>
      </a-select>

      <a-input
        v-model:value="login"
        @blur="onLoginBlur"
        placeholder="Логин"
        maxlength="100"
        :status="loginError ? 'error' : ''"
      />

      <a-input-password
        v-if="account.type === 'Локальная'"
        v-model:value="password"
        @blur="onPasswordBlur"
        placeholder="Пароль"
        maxlength="100"
        :status="passwordError ? 'error' : ''"
      />

      <a-popconfirm
        title="Удалить аккаунт?"
        ok-text="Да"
        cancel-text="Нет"
        @confirm="store.removeAccount(account.id)"
      >
        <a-button type="text">
          <DeleteOutlined />
        </a-button>
      </a-popconfirm>
    </div>
  </a-card>
</template>
