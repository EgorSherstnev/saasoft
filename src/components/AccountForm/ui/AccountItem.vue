<script setup lang="ts">
import type { IAccount } from '@/types'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useAccountItem } from '../composable'
import { ACCOUNT_TYPES } from '../constants'

const props = defineProps<{ account: IAccount }>()
const {
  login,
  password,
  loginError,
  passwordError,
  type,
  onLoginBlur,
  onPasswordBlur,
  onLabelChange,
  onTypeChange,
  remove,
} = useAccountItem(props.account)
</script>

<template>
  <a-card size="small" :bordered="false" style="box-shadow: none; margin-bottom: 12px">
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 120px 1fr 1fr 40px;
        gap: 12px;
        align-items: center;
      "
    >
      <a-input
        :value="account.labels.map((l) => l.text).join('; ')"
        @blur="onLabelChange(($event.target as HTMLInputElement).value)"
        placeholder="Метки"
        :maxlength="50"
      />

      <a-select :value="type" @update:value="onTypeChange">
        <a-select-option
          v-for="accType in Object.values(ACCOUNT_TYPES)"
          :key="accType"
          :value="accType"
        >
          {{ accType }}
        </a-select-option>
      </a-select>

      <a-input
        v-model:value="login"
        @blur="onLoginBlur"
        placeholder="Логин"
        :maxlength="100"
        :status="loginError ? 'error' : ''"
      />

      <a-input-password
        v-if="type === ACCOUNT_TYPES.LOCAL"
        v-model:value="password"
        @blur="onPasswordBlur"
        placeholder="Пароль"
        :maxlength="100"
        :status="passwordError ? 'error' : ''"
      />

      <a-popconfirm title="Удалить аккаунт?" ok-text="Да" cancel-text="Нет" @confirm="remove">
        <a-button type="text"><DeleteOutlined /></a-button>
      </a-popconfirm>
    </div>
  </a-card>
</template>
