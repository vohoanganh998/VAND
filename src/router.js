import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  base: '/vand-test',
  routes: [
    {
      path: "/:catchAll(.*)",
      redirect: "countries",
    },
    {
      path: "/",
      name: "Countries",
      component: () => import("./modules/country/views/Countries.vue"),
    },
  ],
});
export default router;
