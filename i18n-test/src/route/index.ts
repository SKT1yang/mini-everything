import { createRouter, createWebHashHistory } from 'vue-router';

// eslint-disable-next-line i18n/wrap-i18n-function
const name = "中文";
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
