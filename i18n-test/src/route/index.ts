import { t } from "../languages/useLanguage";
import { createRouter, createWebHashHistory } from 'vue-router';

const name =t('中文');
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
