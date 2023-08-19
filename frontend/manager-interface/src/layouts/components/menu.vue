<template>
  <n-menu
    :collapsed="collapsed"
    :value="route.path"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :options="menuOptions"
    @update:value="router.push($event)"
  />
</template>

<script setup lang="ts">
import { hasPermission } from "@/hooks";
import { routes } from "@/router/index.jsx";
import { useMainStore } from "@/stores";
import type { MenuOption } from "naive-ui";
import type { RouteRecordRaw } from "vue-router";

const props = defineProps<{
  collapsed: boolean;
}>();

const emits = defineEmits<{
  (e: "update:collapsed", val: boolean): void;
}>();

const { collapsed } = useVModels(props, emits);

const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();

const completeRoutePath = (
  route: RouteRecordRaw,
  prefix: string
): RouteRecordRaw => {
  if (route.children && route.children.length > 0) {
    return {
      ...route,
      children: route.children.map((child) =>
        completeRoutePath(child, route.path)
      ),
    };
  } else {
    return {
      ...route,
      path: route.path.startsWith("/") ? route.path : `${prefix}/${route.path}`,
    };
  }
};

const convertRouteToMenuOption = (route: RouteRecordRaw): MenuOption => {
  return {
    key: route.path,
    icon: route.meta?.icon,
    label: route.meta?.title || route.name,
    show: route.meta?.onMenu !== false && hasPermission(route.meta?.pms),
    children: route.children?.map(convertRouteToMenuOption).filter(Boolean),
  };
};

const menuOptions = ref<MenuOption[]>([]);
watch(
  () => mainStore.account?.authorities,
  () => {
    const newRoutes = routes.map((route) => completeRoutePath(route, ""));
    menuOptions.value = newRoutes.map(convertRouteToMenuOption).filter(Boolean);
  },
  {
    immediate: true,
  }
);
</script>
