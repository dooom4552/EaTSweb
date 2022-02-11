import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main.vue";
//import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta: {
      authRequired: true,
    },
    component: Main,
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((routeTo, routeFrom, next) => {
  // console.log(Test);
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
  if (!authRequired) {
    if (!window.localStorage.getItem("token")) {
      return next();
    } else {
      return next({ name: "Home" });
    }
  } else {
    if (window.localStorage.getItem("token")) {
      return next();
    } else {
      next({ name: "Register" });
    }
  }
});
export default router;
