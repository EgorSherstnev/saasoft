<script setup lang="ts">
import { onMounted } from 'vue'
import AccountItem from './AccountItem.vue'
import { useAccountsStore } from '@/stores'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { HEADERS } from '../constants'

const store = useAccountsStore()

onMounted(() => {
  store.loadFromStorage()
  store.$subscribe(() => {
    store.saveToStorage()
  })
})
</script>

<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      "
    >
      <h2 style="margin: 0">Учётные записи</h2>
      <a-button type="primary" @click="store.addAccount">+</a-button>
    </div>

    <div
      style="
        display: grid;
        grid-template-columns: 1fr 120px 1fr 1fr 40px;
        gap: 12px;
        margin-top: 16px;
        font-weight: 500;
      "
    >
      <div
        v-for="header in HEADERS"
        :key="header.key"
        style="display: flex; align-items: center; justify-content: center; gap: 4px"
      >
        <span>{{ header.text }}</span>
        <a-tooltip v-if="header.tooltip" :title="header.tooltip">
          <QuestionCircleOutlined style="font-size: 12px; color: #8c8c8c; cursor: help" />
        </a-tooltip>
      </div>
    </div>

    <div style="margin-top: 8px">
      <AccountItem v-for="acc in store.accounts" :key="acc.id" :account="acc" />
    </div>
  </div>
</template>
