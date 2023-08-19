<template>
  <n-form
    ref="form"
    class="p-2"
    v-if="advertiser"
    :rules="rules"
    :model="advertiser"
    :label-width="80"
  >
    <n-form-item label="名称" path="name">
      <n-input v-model:value="advertiser.name" placeholder="请输入名称" />
    </n-form-item>
    <n-form-item label="首页地址" path="pageUrl">
      <n-input
        v-model:value="advertiser.pageUrl"
        placeholder="请输入首页地址"
      />
    </n-form-item>
    <n-form-item label="logo" path="logoUrl">
      <n-upload
        :custom-request="customRequest"
        :default-file-list="avatarList"
        list-type="image-card"
        :max="1"
      >
        点击上传
      </n-upload>
    </n-form-item>
    <n-form-item v-if="hasPermission('/advertisers/:id,PUT')">
      <n-button :loading="editLoading" type="primary" @click="handleSubmit"
        >更新</n-button
      >
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { hasPermission, useResFullPath } from "@/hooks";
import { useMainStore } from "@/stores";
import _ from "lodash";
import type { FormRules, NForm, UploadCustomRequestOptions } from "naive-ui";
import type { FileInfo } from "naive-ui/es/upload/src/interface";

const mainStore = useMainStore();
const advertiser = ref(_.cloneDeep(mainStore.advertiser));

const avatarList = ref<FileInfo[]>(
  advertiser.value?.logoUrl
    ? [
        {
          id: advertiser.value?.id,
          status: "finished",
          name: advertiser.value?.name,
          url: useResFullPath(advertiser.value?.logoUrl),
        },
      ]
    : []
);

const customRequest = (options: UploadCustomRequestOptions) => {
  if (!options.file.file) {
    return;
  }
  options.onProgress({
    percent: 80,
  });
  commonService
    .uploadAvatar({
      avatar: options.file.file,
    })
    .then((res) => {
      advertiser.value!.logoUrl = res;
      options.onFinish();
    })
    .catch((err) => {
      options.onError();
    });
};
const { refreshAsync: updateAdvertiser, loading: editLoading } =
  advertiserService.useUpdateAdvertiser(
    () => ({
      id: advertiser.value!.id,
      requestBody: advertiser.value,
    }),
    {
      manual: true,
      ready: computed(() => advertiser.value !== undefined),
    }
  );

const rules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
  pageUrl: [
    {
      required: true,
      validator: (rule, value) => {
        if (!value) {
          return new Error("请输入首页地址");
        }
        if (!/^https?:\/\//.test(value)) {
          return new Error("请输入正确的首页地址");
        }
        return true;
      },
    },
  ],
  logoUrl: [
    {
      required: true,
      message: "请输入logo地址",
    },
  ],
};
const form = ref<InstanceType<typeof NForm>>();
const handleSubmit = () => {
  try {
    form.value?.validate(async (errors) => {
      if (!errors) {
        mainStore.setAdvertiser(await updateAdvertiser());
        $message.success("更新成功");
      } else {
        $message.error("请填写完整信息");
      }
    });
  } catch (error) {
    $message.error("请填写完整信息");
    return;
  }
};
</script>

<style scoped></style>
