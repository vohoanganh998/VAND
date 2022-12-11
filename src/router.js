import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Countries",
      component: () => import("./modules/country/views/Countries.vue"),
    },
  ],
});
export default router;
