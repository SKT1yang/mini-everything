import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue"),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
