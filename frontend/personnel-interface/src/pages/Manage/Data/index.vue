<template>
  <div class="data">
    <div class="summary">
      <div class="catalogue"><span class="title">昨日概述</span></div>
      <div class="record">
        <div class="record-item">
          <span>获得浏览量</span>
          <span class="num">{{
            yesterdayData.inspectionRecordCount || "0"
          }}</span>
        </div>
        <div class="record-item">
          <span>获得简历量</span>
          <span class="num">{{
            yesterdayData.deliveryRecordCount || "0"
          }}</span>
        </div>
        <div class="record-item">
          <span>在线沟通量</span>
          <span class="num">{{
            yesterdayData.onlineCommunicateCount || "0"
          }}</span>
        </div>
      </div>
    </div>
    <div class="map">
      <el-tabs
        v-model="state.currentView"
        :tab-position="tabPosition"
        class="demo-tabs"
      >
        <div class="map-info">
          <el-date-picker
            v-model="workTimeing"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleWorkTimeChange(workTimeing)"
          />
        </div>

        <el-tab-pane label="获得浏览量" name="Scan">
          <Scan
            :inspection-record-counts="inspectionRecordCounts"
            :data-info="dataList"
            :title="title[0]"
          />
        </el-tab-pane>
        <el-tab-pane label="获得简历量" name="Communicate">
          <Scan
            :inspection-record-counts="deliveryRecordCounts"
            :data-info="dataList"
            :title="title[1]"
          />
        </el-tab-pane>
        <el-tab-pane label="在线沟通量" name="Vita">
          <Scan
            :inspection-record-counts="onlineCommunicateCounts"
            :data-info="dataList"
            :title="title[2]"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDate from "@/hooks/useDate";
import useGetDayAll from "@/hooks/useGetdata";
import { useMainStore, useMessageStore } from "@/stores/main";
import Scan from "./Scan.vue";
const store = useMainStore();
const workTimeing = ref<Array<string>>([]);
const startTime = ref<string>("");
const endTime = ref<string>("");
const tabPosition = ref("top");
const deliveryRecordCounts = ref<Array<number>>();
const inspectionRecordCounts = ref<Array<number>>();
const onlineCommunicateCounts = ref<Array<number>>();
const state = reactive({
  userID: "",
  // 默认组件，显示第一个组件
  currentView: "Scan",
});
const title = ["获得浏览量", "获得简历量", "在线沟通量"];
const Datainfo = ref<Array<string>>([""]);
const messageStore = useMessageStore();

const dataList = ref(["2022-05-01", "2022-05-01"]);
watchEffect(() => {
  dataList.value = useGetDayAll(Datainfo.value[0], Datainfo.value[1]);
});
// 拿到给定日期范围的数据。
const handleWorkTimeChange = (val: Array<string>) => {
  startTime.value = useDate(val[0]);
  endTime.value = useDate(val[1]);
  Datainfo.value = [startTime.value, endTime.value];
  companyService
    .getBigData({
      companyId: store.companyInformation.id,
      // query: {
      //   startDate: ["$eq", startTime.value]
      //   endDate: ["$eq", endTime.value]
      //   personnelId: ["$eq", store.accountInformation.fullInformationId]
      // },
    })
    .then((res) => {
      deliveryRecordCounts.value = res.map((item) => {
        return item.deliveryRecordCount;
      });
      inspectionRecordCounts.value = res.map((item) => {
        return item.inspectionRecordCount;
      });
    });
};
// const onlineCommunicateCountsInfo =
//   ref<Array<{ date: string; onlineCommunicateCount: number }>>();
interface Data {
  date: string;
  deliveryRecordCount: number;
  inspectionRecordCount: number;
  onlineCommunicateCount: number;
}
const yesterday = ref();
const yesterdayData = ref<Data>({} as Data);
const day = new Date();
day.setDate(day.getDate() - 1);
yesterday.value = useDate(day);
yesterdayData.value.onlineCommunicateCount = Object.keys(
  messageStore.messages[store.accountInformation.detailId.personnel!]
).length;

companyService
  .getBigData({
    companyId: store.companyInformation.id,
    // query: {
    //   startDate: ["$eq", startTime.value]
    //   endDate: ["$eq", endTime.value]
    //   personnelId: ["$eq", store.accountInformation.fullInformationId]
    // },
  })
  .then((res) => {
    if (res.length > 0) {
      yesterdayData.value.deliveryRecordCount = res[0].deliveryRecordCount;
      yesterdayData.value.inspectionRecordCount = res[0].inspectionRecordCount;
    }
  });
</script>

<style scoped lang="scss">
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: rgb(240 255 250);

  .summary {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 25%;
    margin-top: 36px;
    margin-right: 49px;
    margin-left: 49px;
    background-color: rgb(255 255 255);
  }

  .catalogue {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: rgb(255 255 255);
    border-bottom: 1px solid #eee;

    .title {
      margin-left: 30px;
      font-weight: bold;
    }
  }

  .record {
    display: flex;
    justify-content: space-around;
    height: 90%;
    background-color: rgb(255 255 255);

    .record-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .num {
        margin-bottom: 10px;
        font-size: 30px;
        font-weight: 400;
      }
    }
  }

  .map {
    width: 90%;
    height: 480px;
    margin-top: 45px;
    background-color: rgb(255 255 255);
    border: solid 1px rgb(224 224 224);
    border-radius: 5px;

    .el-tabs {
      height: 100%;
      margin-left: 20px;
    }

    .map-info {
      width: 40%;
      margin-bottom: 20px;
      margin-left: 40px;
    }
  }
}
</style>
