<template>
  <div>
    <div>中文</div>
    <div>{{ "中文".length ? true : false }}</div>
    <div>文本1{{ `中文` }}文本2</div>
    <div title="中文">text</div>
    <div v-bind:title="'中文'">text</div>
    <div :title="'中文'">text</div>
    <MessageBox :title="name1.length > 0 ? true : false"></MessageBox>
    <div :title="() => '中文'"></div>
    <div v-if="(Math.random() > 0.6) ? '新增' : ''">text</div>
    <div v-if="'新增'.length">text</div>
    <div v-show="name2 ? '新增' : '修改'"></div>
  </div>
</template>

<script lang="ts" setup>
import { MessageBox } from './MessageBox.tsx'
import * as string from './home'
"中文";
const name1 = '中文';
const name2 = `中文`;
const name3 = `中${'文本'.length > 0 ? true : false}文`;
const name4 = { name: '中文' };
const name5 = ['中文'];
</script>

<!-- <template>
  <div>
    <div>中文</div>
    <div>{{ "中文".length ? true : false }}</div>
    <div>文本1{{ `中文` }}文本2</div>
    <div title="中文">text</div>
    <div v-bind:title="'中文'">text</div>
    <div :title="'中文'">text</div>
    <MessageBox :title="name1.length > 0 ? true : false"></MessageBox>
    <div :title="() => '中文'"></div>
    <div v-if="(Math.random() > 0.6) ? '新增' : ''">text</div>
    <div v-if="'新增'.length">text</div>
    <div v-show="name2 ? '新增' : '修改'"></div>
  </div>
</template>

<script lang="ts" setup>
import { MessageBox } from './MessageBox.tsx'
import * as string from './home'
"中文";
const name1 = '中文';
const name2 = `中文`;
const name3 = `中${'文本'.length > 0 ? true : false}文`;
const name4 = { name: '中文' };
const name5 = ['中文'];
</script> -->
