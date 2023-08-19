import { hasPermission } from "@/hooks";
import ViewLayout from "@/layouts/view.vue";
import ForgetPage from "@/pages/authentication/forget-page.vue";
import LoginPage from "@/pages/authentication/login-page.vue";
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
    path: "/account",
    redirect: "/account/account",
    component: ViewLayout,
    children: [
      {
        path: "account",
        name: "Account",
        component: () =>
          import("@/pages/authentication-manage/account-manage.vue"),
        meta: {
          icon: render(ICONS.PersonOutline),
          pms: "/authentication/accounts,GET",
          title: "账户管理",
        },
      },
      {
        path: "authority-group",
        name: "AuthorityGroup",
        component: () =>
          import("@/pages/authentication-manage/authority-group-manage.vue"),
        meta: {
          icon: render(ICONS.ShieldCheckmarkOutline),
          pms: "/authentication/authorityGroups/:id,GET",
          title: "权限组管理",
        },
      },
      {
        path: "authority",
        name: "Authority",
        component: () =>
          import("@/pages/authentication-manage/authority-manage.vue"),
        meta: {
          icon: render(ICONS.ShieldOutline),
          pms: "/authentication/authorities,GET",
          title: "权限管理",
        },
      },
    ],
    meta: {
      icon: render(ICONS.ShieldHalfOutline),
      title: "授权管理",
      pms: [
        "/authentication/accounts,GET",
        "/authentication/authorityGroups/:id,GET",
        "/authentication/authorities,GET",
      ],
    },
  },
  {
    path: "/advertiser",
    redirect: "/advertiser/advertiser",
    component: ViewLayout,
    children: [
      {
        path: "advertiser",
        name: "Advertiser",
        component: () =>
          import("@/pages/advertiser-manage/advertiser-manage.vue"),
        meta: {
          icon: render(ICONS.BonfireOutline),
          title: "广告商管理",
          pms: "/advertisers,GET",
        },
      },
      {
        path: "advertise",
        name: "Advertise",
        component: () =>
          import("@/pages/advertiser-manage/advertise-manage.vue"),
        meta: {
          icon: render(ICONS.BowlingBallOutline),
          title: "广告管理",
          pms: "/advertisers/advertise,GET",
        },
      },
    ],
    meta: {
      icon: render(ICONS.BonfireOutline),
      title: "广告商管理",
      pms: ["/advertisers,GET", "/advertisers/advertise,GET"],
    },
  },
  {
    path: "/company",
    redirect: "/company/company",
    component: ViewLayout,
    children: [
      {
        path: "company",
        name: "Company",
        component: () => import("@/pages/company-manage/company-manage.vue"),
        meta: {
          icon: render(ICONS.BoatOutline),
          title: "公司管理",
          pms: "/companies,GET",
        },
      },
      {
        path: "position",
        name: "Position",
        component: () => import("@/pages/company-manage/position-manage.vue"),
        meta: {
          icon: render(ICONS.BarChartOutline),
          title: "职位管理",
          pms: "/companies/positions,GET",
        },
      },
    ],
    meta: {
      icon: render(ICONS.BoatOutline),
      title: "公司管理",
      pms: ["/companies,GET", "/companies/positions,GET"],
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
    await until(() => mainStore.account).toMatch(Boolean);
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
