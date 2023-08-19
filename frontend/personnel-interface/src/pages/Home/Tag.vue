<template>
  <div class="tag">
    <el-scrollbar height="400px">
      <div class="scroll">
        <div class="tag-field">
          <el-check-tag
            v-for="(jobType, jobTypeIndex) in checkableJobTypes"
            :key="jobTypeIndex"
            :checked="jobType.value.checked"
            @change="changeDirection(jobType)"
            >{{ jobType.value.fieldName }}</el-check-tag
          >
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { Ref } from "vue";

const emit = defineEmits(["submit-data"]);
interface PositionType {
  fieldName: string;
  checked: boolean;
}
const checkedPosition = ref<Ref<{ checked: boolean; fieldName: string }>>();
// 当用户点击标签时调用的函数。它用于更改标签的状态。
const changeDirection = (
  direction: Ref<{
    fieldName: string;
    checked: boolean;
  }>
) => {
  if (checkedPosition.value) {
    checkedPosition.value.value.checked = false;
  }
  direction.value.checked = true;
  checkedPosition.value = direction;
  emit("submit-data", {
    type: "direction",
    data: direction,
  });
};
const checkableJobTypes = ref<Ref<PositionType>[]>([]);

commonService.getPositionTypes().then((res) => {
  checkableJobTypes.value = res.map((jobType) => {
    let fieldName = jobType.fieldName;
    return ref({
      fieldName,
      checked: false,
    });
  });
});
</script>
<style scoped lang="scss">
.tag {
  position: relative;
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  background-color: rgb(255 255 255);
  border-radius: 5px;

  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    color: var(--el-color-primary);
    text-align: center;
    background: var(--el-color-primary-light-9);
  }

  .scroll {
    height: 400px;
    border: solid 1px rgb(236 198 198);
    border-radius: 5px;
  }

  .tag-field {
    display: flex;

    .el-check-tag {
      width: 100%;
      margin-right: 10px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
