<template>
  <div class="tag">
    <el-scrollbar height="400px">
      <div class="scroll">
        <div
          v-for="(jobType, jobTypeIndex) in positionTypes"
          :key="jobTypeIndex"
        >
          <div v-if="jobType.directions.length > 0" class="tag-field">
            <span
              style="
                margin: 5px 0;
                font-weight: bolder;
                border-bottom: 1px solid black;
              "
              >{{ jobType.fieldName }}</span
            >
            <div
              v-for="(direction, directionIndex) in jobType.directions"
              :key="directionIndex"
            >
              <TagSelectBlock
                v-if="direction.positions.length > 0"
                :title="direction.directionName"
                :tags="direction.positions"
                @signal-select="handleTagSelect"
              />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import TagSelectBlock from "@/components/TagSelectBlock.vue";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";

const store = useMainStore();
const emits = defineEmits(["position-select"]);

const handleTagSelect = (
  position: Ref<{
    tagName: string;
    checked: boolean;
  }>
) => {
  emits("position-select", position);
};
const { positionTypes } = storeToRefs(store);
</script>
<style scoped lang="scss">
.tag {
  position: relative;
  width: 80%;
  height: auto;
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
    height: auto;
    min-height: 400px;
    padding: 10px;
    border: solid 1px rgb(236 198 198);
    border-radius: 5px;
  }

  .tag-field {
    display: flex;
    flex-direction: column;
  }

  .tag-list {
    display: flex;
    flex-flow: column wrap;

    span {
      display: block;
      height: 30px;
    }

    .list-item {
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        margin-top: 5px;
        margin-right: 5px;

        .el-check-tag {
          display: flex;
          align-items: center;
          justify-content: center;

          // width: 100%;
          // text-align: center;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
}
</style>
