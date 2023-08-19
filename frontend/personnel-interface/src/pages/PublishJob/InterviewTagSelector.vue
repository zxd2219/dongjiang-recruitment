<template>
  <div class="tag">
    <el-scrollbar height="400px">
      <div class="scroll">
        <div
          v-for="(interviewTag, interviewTagIndex) in interviewTagList"
          :key="interviewTagIndex"
          class="tag-field"
        >
          <span style="margin: 5px 0">{{ interviewTag.interviewTagname }}</span>
          <div class="tag-list">
            <div
              v-for="(interviewInfo, interviewInfoIndex) in interviewTag.tag"
              :key="interviewInfoIndex"
              class="tag-item"
            >
              <el-check-tag
                ref="checkTagRef"
                :checked="interviewInfo.checked"
                @change="
                  handleillustrate(
                    interviewInfo,
                    interviewInfoIndex,
                    interviewTagIndex
                  )
                "
              >
                {{ interviewInfo.name }}</el-check-tag
              >
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["submit-interview"]);

const interviewTagList = reactive([
  {
    interviewTagname: "面试轮数",
    tag: [
      { name: "1-2轮次", checked: false },
      { name: "3-4轮次", checked: false },
      { name: "5-6轮次", checked: false },
      { name: "暂不确定", checked: false },
    ],
  },
  {
    interviewTagname: "面试形式",
    tag: [
      { name: "现场面试", checked: false },
      { name: "视频面试", checked: false },
      { name: "电话面试", checked: false },
    ],
  },
  {
    interviewTagname: "面试时长",
    tag: [
      { name: "一天内完成", checked: false },
      { name: "分多次完成", checked: false },
    ],
  },
  {
    interviewTagname: "面试说明",
    tag: [
      { name: "可周末面试", checked: false },
      { name: "包含笔试", checked: false },
      { name: "可下班面试", checked: false },
      { name: "包含面试作业", checked: false },
    ],
  },
]);
interface InterviewInfo {
  illustrate: 1 | 2 | 3 | 4;

  situation: 1 | 2 | 3;

  time: 1 | 2;

  wheel: 1 | 2 | 3 | 4;
}
const interviewInformation = ref<InterviewInfo>({
  illustrate: 1,
  situation: 1,
  time: 1,
  wheel: 1,
});
const checkedInterviewTag = ref<{ checked: boolean; name: string }[]>([
  { checked: false, name: "" },
  { checked: false, name: "" },
  { checked: false, name: "" },
  { checked: false, name: "" },
]);
// 用于处理复选框的函数。
const handleillustrate = (
  data: { checked: boolean; name: string },
  listIndex: number,
  tagIndex: number
) => {
  if (checkedInterviewTag.value[tagIndex].checked) {
    checkedInterviewTag.value[tagIndex].checked = false;
  }
  data.checked = true;
  checkedInterviewTag.value[tagIndex] = data;
  if (tagIndex === 0) {
    if (data.checked) {
      interviewInformation.value.illustrate = (listIndex + 1) as 1 | 2 | 3 | 4;
    }
  } else if (tagIndex === 1) {
    if (data.checked) {
      interviewInformation.value.situation = (listIndex + 1) as 1 | 2 | 3;
    }
  } else if (tagIndex === 2) {
    if (data.checked) {
      interviewInformation.value.time = (listIndex + 1) as 1 | 2;
    }
  } else {
    if (data.checked) {
      interviewInformation.value.wheel = (listIndex + 1) as 1 | 2 | 3 | 4;
    }
  }
  emit("submit-interview", {
    data: interviewInformation.value,
    list: [
      interviewTagList[0].tag[interviewInformation.value.illustrate - 1],
      interviewTagList[1].tag[interviewInformation.value.situation - 1],
      interviewTagList[2].tag[interviewInformation.value.time - 1],
      interviewTagList[3].tag[interviewInformation.value.wheel - 1],
    ],
  });
};
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
    height: auto;
    min-height: 400px;
    border: solid 1px rgb(236 198 198);
    border-radius: 5px;
  }

  .tag-field {
    display: flex;
    flex-direction: column;
  }

  .tag-list {
    display: flex;
    flex-flow: row wrap;

    .tag-item {
      margin: 0 7px;

      .el-check-tag {
        width: 80px;
        overflow: hidden;
        text-align: center;

        // text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
