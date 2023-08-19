<template>
  <div class="footer">
    <div class="left">
      <el-checkbox
        v-model="allSelected"
        @change="handleChangeSelectAll"
        label="全选"
        size="large"
      />
      <el-popover
        placement="top-start"
        title="面试时间"
        :width="240"
        trigger="click"
      >
        <el-date-picker
          v-model="interviewTime"
          @change="emit('changeInterviewTime', interviewTime)"
          type="date"
          placeholder="选择面试时间"
          :disabled-date="disabledDate"
        />
        <template #reference>
          <el-button type="primary"> 面试邀请 </el-button>
        </template>
      </el-popover>
      <el-popconfirm title="确定删除该简历?" @confirm="changeState(5)">
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
      :total="total"
    />
  </div>
</template>
<script setup lang="ts">
import type { DeliveryRecord } from "@dongjiang-recruitment/service-common";
import { ElMessage } from "element-plus";
import type { PropType } from "vue";

interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}

const interviewTime = ref("");
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  deliveryRecords: {
    type: Array as PropType<DeliveryRecordChecked[]>,
    default: () => [],
  },
});

//禁止选择今天之前的日期
const disabledDate = (current: Date) => {
  return current && current.valueOf() < Date.now();
};

const emit = defineEmits([
  "update:page",
  "update:pageSize",
  "update:deliveryRecords",
  "changeDeliveryRecords",
  "changeInterviewTime",
]);

const { page, pageSize, deliveryRecords } = useVModels(props, emit);

const allSelected = computed(() => {
  return (
    deliveryRecords.value.every((item) => item.checked) &&
    deliveryRecords.value.length > 0
  );
});

const handleChangeSelectAll = (selectAll: boolean) => {
  deliveryRecords.value.forEach((item) => {
    item.checked = selectAll;
  });
};

// 更改所选简历信息状态的功能。
const changeState = (val: 1 | 2 | 3 | 4 | 5) => {
  deliveryRecords.value
    .filter((deliveryRecord) => deliveryRecord.checked)
    .forEach((deliveryRecord) => {
      deliveryRecord = { ...deliveryRecord, status: val };
      // @ts-ignore
      delete deliveryRecord.checked;
      applicantDeliveryRecordService
        .updateDeliveryRecord({
          applicantId: deliveryRecord.applicant.id,
          id: deliveryRecord.id,
          requestBody: deliveryRecord,
        })
        .then(() => {
          const newDeliveryRecords = deliveryRecords.value.filter(
            (d) => d.id !== deliveryRecord.id
          );
          emit("changeDeliveryRecords", {
            total: newDeliveryRecords.length,
            items: newDeliveryRecords,
          });
          ElMessage.success("操作成功");
        });
    });
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  .el-checkbox {
    margin-right: 10px;
  }
}
</style>
