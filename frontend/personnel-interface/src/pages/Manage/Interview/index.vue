<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <div class="top">
            <div class="first-line">
              <h1>面试时间：</h1>
              <el-date-picker
                v-model="workTimeBetween"
                type="daterange"
                range-separator="到"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </div>
          </div>
          <div class="resume">
            <el-scrollbar height="400px">
              <ResumeInfo v-model:delivery-records="deliveryRecordsCheckable" />
            </el-scrollbar>
          </div>
          <div class="footer">
            <div>
              <el-checkbox
                v-model="allSelected"
                @change="handleSelectAllChange"
                label="全选"
                size="large"
              />
              <!-- <el-button
                type="primary"
                @click="changeState(3 as 1 | 2 | 3 | 4 | 5 )"
                >发出offer</el-button
              > -->
              <el-popconfirm
                title="确定删除该简历?"
                @confirm="changeState(5 as 1 | 2 | 3 | 4 | 5)"
              >
                <template #reference>
                  <el-button type="primary" plain>删除简历</el-button>
                </template>
              </el-popconfirm>
            </div>
            <el-pagination
              v-model:current-page="page"
              v-model:page-size="pageSize"
              background
              :page-sizes="[3, 5, 10, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="deliveryRecords!.total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { DeliveryRecord } from "@dongjiang-recruitment/service-common";
import { ElMessage, dayjs } from "element-plus";
import ResumeInfo from "./resumeInfo.vue";

interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}

const page = ref(1);
const pageSize = ref(5);
const store = useMainStore();
const workTimeBetween = ref([]);
const { data: deliveryRecords, mutate } =
  applicantService.useQueryAllDeliveryRecord(
    () => ({
      query: {
        "company.id": ["$eq", store.companyInformation.id],
        status: ["$eq", 4],
        interviewTime: workTimeBetween.value?.length
          ? [
              "$between",
              ...workTimeBetween.value.map((time) =>
                dayjs(time).format("YYYY-MM-DD HH:mm:ss")
              ),
            ]
          : undefined,
      },
      size: pageSize.value,
      page: page.value,
    }),
    {
      initialData: {
        total: 0,
        items: [],
      },
      refreshDeps: [workTimeBetween, page, pageSize],
      ready: computed(() => !!store.companyInformation.id),
    }
  );
const deliveryRecordsCheckable = ref<DeliveryRecordChecked[]>([]);
syncRef(deliveryRecords, deliveryRecordsCheckable, {
  direction: "ltr",
  transform: {
    ltr: (deliveryRecords) =>
      deliveryRecords!.items.map((deliveryRecord) => ({
        ...deliveryRecord,
        checked: false,
      })),
  },
});
const allSelected = computed(() => {
  return (
    deliveryRecordsCheckable.value.every((item) => item.checked) &&
    deliveryRecordsCheckable.value.length > 0
  );
});
const handleSelectAllChange = (selectAll: boolean) => {
  deliveryRecordsCheckable.value.forEach((item) => {
    item.checked = selectAll;
  });
};

// 更改所选简历信息状态的功能。
const changeState = (val: 1 | 2 | 3 | 4 | 5) => {
  deliveryRecordsCheckable.value
    .filter((deliveryRecordsChecked) => deliveryRecordsChecked.checked)
    .forEach((delivery: DeliveryRecordChecked) => {
      delivery = { ...delivery, status: val };
      // @ts-ignore
      delete delivery.checked;
      applicantDeliveryRecordService
        .updateDeliveryRecord({
          applicantId: delivery.applicant.id,
          id: delivery.id,
          requestBody: delivery,
        })
        .then(() => {
          const newDeliveryRecords = deliveryRecordsCheckable.value.filter(
            (deliveryRecord) => deliveryRecord.id !== delivery.id
          );
          mutate({
            total: newDeliveryRecords.length,
            items: newDeliveryRecords,
          });
          ElMessage.success("操作成功");
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
            height: 50px;

            .el-data-picker {
              width: 100%;
            }
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

        .footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 10px;

          .el-checkbox {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
