import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import WrapperMain from "../views/WrapperMain.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta: {
      authRequired: true,
    },
    component: WrapperMain,
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    meta: { authRequired: true },
    beforeEnter: (to: any, from: any, next: any) => {
      store.dispatch("logOut").then(() => {
        next({ name: "Login" });
      });
    },
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
      next({ name: "Login" });
    }
  }
});
export default router;
