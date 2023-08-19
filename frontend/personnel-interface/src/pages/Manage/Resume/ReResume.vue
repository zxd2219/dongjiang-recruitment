<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <div class="top">
            <div class="first-line">
              <el-select
                v-model="status"
                class="m-2"
                placeholder="按反馈"
                clearable
              >
                <el-option
                  v-for="(item, index) in statusOptions"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                />
              </el-select>
              <el-select
                v-model="workingYear"
                class="m-2"
                placeholder="工作经验"
                clearable
              >
                <el-option
                  v-for="(item, index) in workingYears"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                />
              </el-select>
              <div style="width: 350px">
                <el-date-picker
                  v-model="updateTime"
                  style="width: 330px"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </div>
            </div>
            <div class="second-line">
              <el-select v-model="sex" class="m-2" placeholder="性别" clearable>
                <el-option
                  v-for="item in sexs"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select v-model="age" class="m-2" placeholder="年龄" clearable>
                <el-option
                  v-for="(item, index) in ages"
                  :key="index"
                  :label="index"
                  :value="item"
                />
              </el-select>
              <el-input
                v-model="userName"
                input-style="max-width: 350px;"
                placeholder="输入姓名查找"
                clearable
              />
            </div>
          </div>
          <div class="resume">
            <el-scrollbar height="490px">
              <ResumeInfo v-model:delivery-records="deliveryRecordsCheckable" />
            </el-scrollbar>
          </div>
          <ResumeFooter
            :total="deliveryRecords!.total"
            @change-delivery-records="mutate"
            @change-interview-time="changeInterviewTime"
            v-model:page="page"
            v-model:pageSize="pageSize"
            v-model:delivery-records="deliveryRecordsCheckable"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import {
  DeliveryRecord,
  type Query,
} from "@dongjiang-recruitment/service-common";
import { ElMessage, dayjs } from "element-plus";
import ResumeInfo from "../Interview/resumeInfo.vue";
import ResumeFooter from "./ResumeFooter.vue";

export interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}

const page = ref(1);
const pageSize = ref(5);
const status = ref<DeliveryRecord.status>();
const statusOptions = ref(["待查看", "已查看", "通过筛选", "约面试", "不合适"]);
const workingYear = ref<DeliveryRecord["applicant"]["workingYears"]>();
const workingYears = ref([
  "没有工作经验",
  "在校/应届",
  "3年以下",
  "3-5年",
  "5-10年",
  "10年以上",
]);
const updateTime = ref<string[]>([]);
const sex = ref<string>();
const sexs = ref(["男", "女"]);
const age = ref<string>();
const ages = ref({
  "18岁以下": "0-18",
  "18-25岁": "18-25",
  "25-35岁": "25-35",
  "35-45岁": "35-45",
  "45岁以上": "45-100",
});
const userName = ref<string>();

const mainStore = useMainStore();
const { data: deliveryRecords, mutate } =
  applicantService.useQueryAllDeliveryRecord(
    () => {
      const basic: Query<DeliveryRecord> = {
        "company.id": ["$eq", mainStore.companyInformation!.id],
        status: status.value
          ? ["$eq", status.value]
          : ["$not", "$eq", DeliveryRecord.status.Inappropriate],
        updatedAt: updateTime.value?.length
          ? [
              "$between",
              ...updateTime.value.map((item) =>
                dayjs(item).format("YYYY-MM-DD HH:mm:ss")
              ),
            ]
          : undefined,
        "applicant.sex": sex.value ? ["$eq", sex.value] : undefined,
        "applicant.workingYears": workingYear.value
          ? ["$eq", workingYear.value]
          : undefined,
        "applicant.age": age.value
          ? ["$between", ...age.value.split("-").map((item) => Number(item))]
          : undefined,
      };
      let query: Query<DeliveryRecord> = [];
      if (userName.value) {
        // 将中文名拆分为姓和名
        const [firstName, ...rest] = userName.value.split("");
        query.push({
          "applicant.firstName": ["$like", `%${firstName}%`],
          "applicant.lastName": ["$like", `%${rest.join("")}%`],
          ...basic,
        });
      }
      if (query.length === 0) {
        query = [basic];
      }
      return {
        query,
        page: page.value,
        size: pageSize.value,
      };
    },
    {
      ready: computed(() => !!mainStore.companyInformation?.id),
      refreshDeps: [
        page,
        pageSize,
        status,
        updateTime,
        workingYear,
        sex,
        age,
        userName,
      ],
      initialData: {
        total: 0,
        items: [],
      },
    }
  );
const deliveryRecordsCheckable = ref<DeliveryRecordChecked[]>([]);
syncRef(deliveryRecords, deliveryRecordsCheckable, {
  direction: "ltr",
  transform: {
    ltr: (deliveryRecords) =>
      deliveryRecords!.items.map((item) => ({
        ...item,
        checked: false,
      })),
  },
});

const changeInterviewTime = (time: string) => {
  deliveryRecordsCheckable.value
    .filter((deliveryRecord) => deliveryRecord.checked)
    .forEach((deliveryRecord) => {
      deliveryRecord = { ...deliveryRecord, interviewTime: time };
      // @ts-ignore
      delete deliveryRecord.checked;
      applicantDeliveryRecordService
        .updateDeliveryRecord({
          applicantId: deliveryRecord.applicant.id,
          id: deliveryRecord.id,
          requestBody: {
            ...deliveryRecord,
            status: DeliveryRecord.status.Interview,
            interviewTime: time,
          },
        })
        .then(() => {
          const newDeliveryRecords = deliveryRecords.value!.items.filter(
            (d) => d.id !== deliveryRecord.id
          );
          mutate({
            total: newDeliveryRecords.length,
            items: newDeliveryRecords,
          });
          ElMessage.success("邀请成功");
        });
    });
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(245 245 250);

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .center {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      background: #fff;
      border: 1px solid #d5d6d7;

      .total {
        width: 95%;
        height: 680px;

        .top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 20px;

          .first-line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;

            ::v-deep .el-data-picker {
              max-width: 200px;
              margin: 0 2px;
            }
          }

          .second-line {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .resume {
          height: 490px;
          margin-top: 30px;
          overflow-y: hidden;
          border: solid 1px #d5d6d7;

          .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 50px;
            margin: 10px;
            color: var(--el-color-primary);
            text-align: center;
            background: var(--el-color-primary-light-9);
            border-radius: 4px;
          }
        }
      }
    }
  }
}

.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}
</style>
