import { hasPermission } from "@/hooks";
import ForgetPage from "@/pages/authentication/forget-page.vue";
import LoginPage from "@/pages/authentication/login-page.vue";
import RegisterPage from "@/pages/authentication/register-page.vue";
import HomePage from "@/pages/home-page.vue";
import { useMainStore } from "@/stores";
import { render } from "@/utils";
import * as ICONS from "@vicons/ionicons5";
import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  type RouteRecordRaw,
} from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      showHeader: false,
      showMenu: false,
      showNav: false,
      onMenu: false,
      title: "登录",
    },
  },
  {
    path: "/forget",
    name: "Forget",
    component: ForgetPage,
    meta: {
      showHeader: false,
      showMenu: false,
      showNav: false,
      onMenu: false,
      title: "忘记密码",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: {
      showHeader: false,
      showMenu: false,
      showNav: false,
      onMenu: false,
      title: "注册账号",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: {
      icon: render(ICONS.StorefrontOutline),
      title: "后台首页",
    },
  },
  {
    path: "/",
    redirect: "/home",
    meta: {
      showHeader: false,
      showMenu: false,
      showNav: false,
      onMenu: false,
    },
  },
  {
    path: "/advertiser",
    name: "Advertiser",
    component: () => import("@/pages/advertiser-manage.vue"),
    meta: {
      icon: render(ICONS.FlameOutline),
      title: "广告商信息",
      pms: "/advertisers/:id,GET",
    },
  },
  {
    path: "/advertise",
    name: "Advertise",
    component: () => import("@/pages/advertise-manage.vue"),
    meta: {
      icon: render(ICONS.BowlingBallOutline),
      title: "广告管理",
      pms: "/advertisers/:advertiserId/advertise,GET",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const whiteList = ["Login", "Forget", "Register"];
router.beforeEach(async (to, from, next) => {
  const mainStore = useMainStore();
  if (mainStore.token) {
    await until(() => mainStore.loadingAccount).toMatch((value) => !value);
  }
  if (!mainStore.token && !whiteList.includes(to.name as string)) {
    next({ name: "Login" });
  } else if (!hasPermission(to.meta.pms)) {
    $message.error("您没有权限访问该页面，正在前往首页");
    next({ name: "Home" });
  } else {
    next();
  }
});

router.afterEach((to, from, failure) => {
  const mainStore = useMainStore();
  if (isNavigationFailure(failure)) return;
  if (
    mainStore.history.every((route) => route.path !== to.path) &&
    !whiteList.includes(to.name as string)
  ) {
    mainStore.history.push(to);
  }
});

export default router;
