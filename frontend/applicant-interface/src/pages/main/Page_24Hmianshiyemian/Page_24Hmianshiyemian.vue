<template>
  <view class="flex-col items-center justify-center page">
    <z-paging
      ref="paging"
      v-model="advertise"
      :inside-more="true"
      :default-page-size="5"
      @query="queryList"
    >
      <view
        v-for="_advertise in advertise"
        :key="_advertise.id"
        class="p-2 relative"
      >
        <image
          class="border-2 border-green-300 rounded-xl w-full"
          style="border-radius: 25rpx; border"
          :advertisement="_advertise"
          :src="useResFullPath(_advertise.banner)"
          @click="gotoAdvertise(_advertise)"
        />
        <text
          class="absolute bottom-[14px] px-2 left-2 bg-white border-2 border-green-300 rounded-tr-xl rounded-bl-xl"
        >
          {{ _advertise.advertiser.name }}：{{ _advertise.name }}
        </text>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";
import { Advertise } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";

const advertise = ref<Array<Advertise>>([]);
const paging = ref<{
  complete: (param: Array<any> | boolean) => void;
  reload: () => void;
}>();
const queryList = async (pageNo: number, pageSize: number) => {
  paging.value?.complete(
    (
      await advertiserService.queryAllAdvertise({
        query: {
          position: ["$eq", Advertise.position.Popularize],
          startTime: ["$lte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
          endTime: ["$gte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
          status: ["$eq", Advertise.status.Active],
        },
        page: pageNo,
        size: pageSize,
      })
    ).items
  );
};

setInterval(() => {
  paging.value?.reload();
}, 1000 * 60 * 5);

const gotoAdvertise = (advertise: Advertise) => {
  uni.navigateTo({
    url: `/pages/most/webview/webview?url=${advertise.pageUrl}&title=${advertise.name}`,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .header {
    position: relative;
  }
}
</style>
