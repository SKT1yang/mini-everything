<!--
 * @name: 根组件
 * @description: Do not edit
-->

<template>
  <config-provider :locale="locale">
    <router-view />
    <FloatButtonGroup shape="circle">
      <FloatButton @click="handleSwitchTranlate()">
        <template #icon>
          <i class="i-base-translate" />
        </template>
      </FloatButton>
    </FloatButtonGroup>
  </config-provider>
</template>

<script lang="ts" setup>
import { ConfigProvider, FloatButtonGroup, FloatButton } from 'ant-design-vue';
import { locale, handleSwitchTranlate } from '@/languages/useLanguage';
</script>
