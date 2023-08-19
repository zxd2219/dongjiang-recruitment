<template>
  <NavigationBar title="收藏职位" right="清空" @right-click="emptyFavorites" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobPanel
        v-for="(collectionPosition, i) in favoritesPosition"
        :key="i"
        class="list-item1"
        :collection-position="collectionPosition"
        :send-type="cancelCollection"
        @state-click="stateClick(collectionPosition.id)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import JobPanel from "@/components/JobPanel/JobPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();
const cancelCollection = ref("取消收藏");

const {
  data: favorites,
  loading,
  mutate,
} = applicantGarnerRecordService.useQueryGarnerRecord(
  {
    applicantId: mainStore.applicant!.id,
    size: 999999999,
  },
  {
    initialData: {
      total: 0,
      items: [],
    },
    ready: computed(() => !!mainStore.applicant?.id),
  }
);
const favoritesPosition = computed(() =>
  favorites.value!.items.map((item) => item.position)
);
const emptyShow = computed(
  () => favoritesPosition.value.length === 0 && !loading.value
);

const stateClick = (id: string) => {
  const favoriteId = favorites.value?.items.find((item) => {
    return item.position.id === id;
  });
  applicantGarnerRecordService
    .removeGarnerRecord({
      applicantId: favoriteId!.applicant.id,
      id: favoriteId!.id,
    })
    .then((res) => {
      const newFavorites = favorites.value!.items.filter((item) => {
        return item.position.id !== id;
      });
      mutate({
        total: newFavorites!.length,
        items: newFavorites,
      });
    });
};

/* 清空收藏记录 */
const emptyFavorites = () => {
  for (const favorite of favorites.value!.items) {
    applicantGarnerRecordService
      .removeGarnerRecord({
        applicantId: favorite.applicant.id,
        id: favorite.id,
      })
      .then(() => {
        mutate({
          total: 0,
          items: [],
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .list {
    width: 690rpx;
    margin-left: 30rpx;

    .list-item1 {
      &:last-of-type {
        margin-top: 18rpx;
      }
    }
  }
}

.image {
  width: 100%;
  height: auto;
  margin: 10rpx 0 7rpx 7rpx;
}
</style>
