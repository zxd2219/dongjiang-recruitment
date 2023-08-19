<template>
  <div
    v-for="deliveryRecord in deliveryRecords"
    :key="deliveryRecord.id"
    class="resume-item"
  >
    <div class="resume-item">
      <div class="item-header">
        <input type="checkbox" v-model="deliveryRecord.checked" />
        <img :src="useResFullPath(deliveryRecord.applicant.avatarUrl)" alt="" />
        <div class="header-person">
          <div>
            <span>{{
              deliveryRecord.applicant.firstName +
              "" +
              deliveryRecord.applicant.lastName
            }}</span>
            <span
              >·{{ deliveryRecord.applicant.sex }}·<span>{{
                deliveryRecord.applicant.age
              }}</span
              >岁·<span>{{
                educations[deliveryRecord.applicant.education as 1 | 2 | 3 | 4]
              }}</span
              >·{{
                solution[deliveryRecord.applicant.jobStatus as 1 | 2 | 3]
              }}</span
            >
          </div>
          <div>
            <span>想找：{{ deliveryRecord.applicant.cityName }}</span
            >|<span
              >{{ deliveryRecord.position.positionName }}|{{
                deliveryRecord.position.startingSalary +
                "K-" +
                deliveryRecord.position.ceilingSalary +
                "K"
              }}</span
            >
          </div>
        </div>
      </div>
      <div class="resume-label">
        {{ status[deliveryRecord.status] }}
      </div>
      <div class="right">
        <el-button type="primary" @click="inspectionResume(deliveryRecord)"
          >查看简历</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useResFullPath } from "@/hooks";
import type { DeliveryRecord } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}

let props = defineProps({
  deliveryRecords: {
    type: Array as PropType<DeliveryRecordChecked[]>,
    default: () => [],
  },
});

const router = useRouter();

const solution = { 1: "随时入职", 2: "2周内入职", 3: "1月内入职" };
const educations = { 1: "大专", 2: "本科", 3: "硕士", 4: "博士" };
const status = {
  1: "待查看",
  2: "已查看",
  3: "通过筛选",
  4: "约面试",
  5: "不合适",
};

const emits = defineEmits(["update:deliveryRecords"]);

const { deliveryRecords } = useVModels(props, emits);

const inspectionResume = (delivery: DeliveryRecordChecked) => {
  // 变更状态函数，将选中的简历信息的状态进行变更
  if (delivery.status === 1) {
    delivery.status = 2;
    applicantDeliveryRecordService
      .updateDeliveryRecord({
        applicantId: delivery.applicant.id,
        id: delivery.id,
        requestBody: delivery,
      })
      .then(() => {
        router.push({
          name: "Resume",
          params: {
            userId: delivery.applicant.id,
            postId: delivery.position.id,
          },
        });
      });
  } else {
    router.push({
      name: "Resume",
      params: {
        userId: delivery.applicant.id,
        postId: delivery.position.id,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.resume-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  border-bottom: solid 1px rgb(221 221 221);

  .item-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 40%;
    margin-left: 15px;

    img {
      position: absolute;
      left: 30px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .header-person {
      position: absolute;
      left: 100px;
      display: flex;
      flex-direction: column;
      width: 100%;
      font-size: 7px;

      div {
        display: flex;
        width: 100%;
        height: 100%;
      }
    }
  }

  .resume-label {
    position: absolute;
    left: 45%;
  }

  .right {
    margin-right: 10px;
  }
}
</style>
