<script setup lang="ts">
import { AccountsForm } from './components'
</script>

<template>
  <a-layout class="app">
    <a-layout-content style="padding: 24px; max-width: 900px; margin: 0 auto">
      <a-card :bordered="true" size="large">
        <template #title>
          <h1>Управление аккаунтами</h1>
        </template>
        <AccountsForm />
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
