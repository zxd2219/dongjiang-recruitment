<template>
  <div class="full">
    <div class="top">
      <el-tabs
        v-model="state.currentView"
        :tab-position="tabPosition"
        class="demo-tabs"
      >
        <el-tab-pane :key="Password" label="设置密码" name="Password">
          <Password />
        </el-tab-pane>
        <el-tab-pane :key="Privary" label="注销账号" name="Privary">
          <Privary />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Password from "./Password.vue";
import Privary from "./Privary.vue";
const tabPosition = ref("top");
const state = reactive({
  userID: "",
  // 默认组件，显示第一个组件
  currentView: "Password",
});
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs-content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}

.el-tabs-right .el-tabs-content,
.el-tabs-left .el-tabs-content {
  height: 100%;
}

.full {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 50px 0;

  .el-tabs {
    width: 80%;
  }
}
</style>
