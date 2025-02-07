<template>
  <div>
    <div>{{ t('中文') }}</div>
    <div>{{ t('中文').length ? true : false }}</div>
    <div>{{ t('文本1') }}{{ t('中文') }}{{ t('文本2') }}</div>
    <div :title="t('中文')">
      text
    </div>
    <div :title="t('中文')">
      text
    </div>
    <div :title="t('中文')">
      text
    </div>
    <MessageBox :title="name1.length > 0 ? true : false" />
    <div :title="() => t('中文')" />
    <div v-if="(Math.random() > 0.6) ? t('新增') : ''">
      text
    </div>
    <div v-if="t('新增').length">
      text
    </div>
    <div v-show="name2 ? t('新增') : t('修改')" />
  </div>
</template>

<script lang="ts" setup>
import { t } from "../languages/useLanguage";
import { MessageBox } from './MessageBox.tsx'
import * as string from './home'
t('中文');
const name1 = t('中文');
const name2 = t('中文');
const name3 = t('中{}文', t('文本').length > 0 ? true : false);
const name4 = { name: t('中文') };
const name5 = [t('中文')];
</script>