<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountItem from './AccountItem.vue'

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

    <a-typography-text type="secondary" style="font-size: 12px">
      Для указания нескольких меток используйте разделитель ;
    </a-typography-text>

    <div style="margin-top: 16px">
      <AccountItem v-for="acc in store.accounts" :key="acc.id" :account="acc" />
    </div>
  </div>
</template>
