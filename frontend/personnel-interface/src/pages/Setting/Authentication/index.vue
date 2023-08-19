<template>
  <div class="this">
    <div class="person">
      招聘者企业认定
      <div class="line"></div>
      <div class="information">
        <img :src="VITE_CDN_URL + companyInfo.logoUrl" alt="加载失败" />
        <div v-if="companyInfo.establishmentTime" class="comfirm">
          <div class="comfirm-item">
            <span>{{ companyInfo.fullName }}</span>
            <div class="infos-bottom">
              <span>{{ companyInfo.comprehensionName }}</span>
              <i>/</i>
              <span>{{ scaleMap[Number(companyInfo.scale)] }}</span>
              <i>/</i>
              <span>{{
                financingStageMap[Number(companyInfo.financingStage)]
              }}</span>
            </div>
            <el-button type="primary" :icon="Check" circle />
          </div>
        </div>
        <div v-else class="comfirm">
          <div class="comfirm-item">
            <span>企业认证：完成实名认证，享受更多服务</span>
            <el-button
              type="primary"
              round
              class="bottom-button"
              @click="toExecution"
              >{{ "完成认证" }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useMainStore } from "@/stores/main";
import { Check } from "@element-plus/icons-vue";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useMainStore();

const companyInfo = computed(() => store.companyInformation);
const financingStageMap = [
  "",
  "未融资",
  "天使轮",
  "A轮",
  "B轮",
  "C轮",
  "D轮及以上",
  "上市公司",
  "不需要融资",
];
const scaleMap = [
  "",
  "少于15人",
  "15-50人",
  "50-150人",
  "150-500人",
  "500-2000人",
  "2000人以上",
];
const toExecution = () => {
  router.push("/setting/Execution");
};
</script>

<style scoped lang="scss">
.this {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.person {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  height: 200px;
  margin-top: 100px;
  border: solid 1px #ccc;

  .line {
    width: 90%;
    height: 1px;
    background-color: rgb(0 0 0 / 20%);
  }

  .information {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin-top: 20px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .comfirm {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 80%;
      height: 100px;

      span {
        font-size: 12px;
        color: rgb(0 0 0);
      }

      .comfirm-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        margin-top: 10px;

        .bottom-button {
          width: 80px;
          height: 25px;
          font-size: 10px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
