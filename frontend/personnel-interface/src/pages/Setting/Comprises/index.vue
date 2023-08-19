<template>
  <div class="put-prise">
    <div class="prise">
      <div class="add">
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button type="primary" :icon="Plus" circle @click="addPrise" />
      </div>
      <div class="line"></div>
      <div class="prise-content">
        <el-scrollbar height="559px">
          <div
            v-for="(item, index) in store.comprise"
            :key="item"
            class="prise-item"
          >
            <div class="prise-info">
              <span>{{ item }}</span>
              <el-divider border-style="dashed" />
            </div>
            <el-button type="danger" @click="deletePrise(index)"
              >删除</el-button
            >
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCompriseStore } from "@/stores/main";
import { Plus } from "@element-plus/icons-vue";
import { ElInput, ElMessage } from "element-plus";
const store = useCompriseStore();
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const inputValue = ref("");
// 一种专注于输入元素的方法。
const addPrise = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

// 用于添加和删除输入值的函数。
const handleInputConfirm = () => {
  if (inputValue.value && store.comprise.length < 16) {
    store.comprise.unshift(inputValue.value);
  } else if (store.comprise.length >= 16) {
    ElMessage.error("超出可设置常用语的最大值");
  }
  inputVisible.value = false;
  inputValue.value = "";
};
const deletePrise = (index: number) => {
  store.comprise.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.put-prise {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .prise {
    width: 80%;
    height: 600px;
    border: solid 1px #ccc;

    .add {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 40px;
      background-color: rgb(252 252 252);

      .el-button {
        margin-right: 20px;
      }

      // transform: rotate(9deg);
      // -webkit-transform: rotate(180deg);
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: #ccc;
    }

    .prise-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 559px;
      margin-top: 15px;
      overflow: hidden;

      .el-scrollbar {
        width: 100%;

        .prise-item {
          display: flex;
          justify-content: space-between;
          width: 95%;
          text-align: center;

          .prise-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
