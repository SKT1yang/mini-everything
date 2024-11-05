<template>
  <div>
    <div>{{ t('中文') }}</div>
    <div>{{ t('中文').length ? true : false }}</div>
    <div>{{ t('文本1') }}{{ t('中文') }}{{ t('文本2') }}</div>
    <div :title="t('中文')"></div>
    <div :title="t('中文')"></div>
    <div :title="t('中文')"></div>
    <MessageBox :title="name1.length > 0 ? true : false"></MessageBox>
    <div :title="() => t('中文')"></div>
    <div v-if="Math.random() > 0.6 ? t('新增') : ''"></div>
    <div v-if="t('新增').length"></div>
    <div v-show="name2 ? t('新增') : t('修改')"></div>
  </div>
</template>

<script lang="ts" setup>
import { t } from '@/entry/languages';
import { MessageBox } from './MessageBox';
import * as string from './home';
t('中文');
const name1 = t('中文');
const name2 = t('中文');
const name3 = t('中{}文', t('文本').length > 0 ? true : false);
const name4 = { name: t('中文') };
const name5 = [t('中文')];
</script>

<!-- <template>
  <div>
    <div>中文</div>
    <div>{{ "中文".length ? true : false }}</div>
    <div>文本1{{ `中文` }}文本2</div>
    <div title="中文"></div>
    <div v-bind:title="'中文'"></div>
    <div :title="'中文'"></div>
    <MessageBox :title="name1.length > 0 ? true : false"></MessageBox>
    <div :title="() => '中文'"></div>
    <div v-if="(Math.random() > 0.6) ? '新增' : ''"></div>
    <div v-if="'新增'.length"></div>
    <div v-show="name2 ? '新增' : '修改'"></div>
  </div>
</template>

<script lang="ts" setup>
import { MessageBox } from './MessageBox'
import * as string from './home'
"中文";
const name1 = '中文';
const name2 = `中文`;
const name3 = `中${'文本'.length > 0 ? true : false}文`;
const name4 = { name: '中文' };
const name5 = ['中文'];
</script> -->
