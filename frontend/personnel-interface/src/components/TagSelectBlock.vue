<template>
  <div class="tag-list">
    <span
      style="
        margin: 10px 0;
        font-weight: bold;
        border-bottom: 0.5px solid darkgray;
      "
      >{{ title }}</span
    >
    <div class="list-item">
      <div v-for="(tag, Index) in checkableTags" :key="Index" class="tag-item">
        <el-check-tag
          ref="checkTagRef"
          :checked="tag.value.checked"
          @change="handleSelectTag(tag)"
        >
          {{ tag.value.tagName }}</el-check-tag
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType, Ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (e: "signal-select", checkedTag: CheckableTag): void;
  (e: "multiple-select", checkedTags: Array<CheckableTag>): void;
}>();

type CheckableTag = Ref<{
  tagName: string;
  checked: boolean;
}>;

const checkableTags = computed(() => {
  return props.tags.map((tag) => {
    return ref({
      tagName: tag,
      checked: false,
    });
  });
});
const checkedTags = computed(() =>
  checkableTags.value.filter((tag) => tag.value.checked)
);
let checkedTag = null as unknown as CheckableTag;
const handleSelectTag = (checkableTag: CheckableTag) => {
  checkableTag.value.checked = !checkableTag.value.checked;
  if (props.multiple) {
    emits("multiple-select", checkedTags.value);
  } else {
    if (checkedTag) {
      checkedTag.value.checked = false;
    }
    checkedTag = checkableTag;
    emits("signal-select", checkableTag);
  }
};
</script>

<style scoped lang="scss">
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
</style>
