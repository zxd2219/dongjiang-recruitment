<template>
  <div class="w-full flex items-center space-x-1 border-b-[0.5px] h-7">
    <n-button text @click="collapsed = !collapsed">
      <n-icon class="ml-1" :size="20">
        <template v-if="collapsed">
          <GridOutline />
        </template>
        <template v-else>
          <MenuOutline />
        </template>
      </n-icon>
    </n-button>
    <div
      class="w-fit flex justify-center items-center h-full p-2 space-x-1 border-2 border-b-0 rounded-xl rounded-b-none border-[#36ad6a]"
      v-for="(route, index) in mainStore.history"
      :key="route.path"
      @click="router.push(route)"
    >
      <span>
        {{ route.meta?.title }}
      </span>
      <n-icon v-if="showClose" @click.stop="close(index)">
        <CloseCircleOutline />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores";
import {
  CloseCircleOutline,
  GridOutline,
  MenuOutline,
} from "@vicons/ionicons5";

const props = defineProps<{
  collapsed: boolean;
}>();

const emits = defineEmits<{
  (e: "update:collapsed", val: boolean): void;
}>();

const { collapsed } = useVModels(props, emits);

const mainStore = useMainStore();
const router = useRouter();

const showClose = computed(
  () =>
    (mainStore.history.length === 1 && mainStore.history[0].name !== "Home") ||
    mainStore.history.length > 1
);

const close = (index: number) => {
  mainStore.history.splice(index--, 1);
  if (index < 0) index = 0;
  if (mainStore.history.length === 0) {
    router.push({ name: "Home" });
    return;
  }
  router.replace(mainStore.history[index]);
};
</script>
