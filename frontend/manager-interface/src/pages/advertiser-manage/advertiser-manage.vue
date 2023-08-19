<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/advertisers,POST')"
        type="primary"
        @click="add"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/advertisers,GET')"
        v-model:value="name"
        placeholder="搜索广告商名称"
        clearable
      />
      <n-button
        v-if="hasPermission('/advertisers,GET')"
        :loading="loading"
        @click="refresh"
      >
        刷新
      </n-button>
    </n-form>
    <n-data-table
      remote
      ref="table"
      class="flex-1"
      :columns="columns"
      :data="authorities"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row) => row.id"
      :max-height="maxHeight"
      @update:page="changePage"
      @update:sorter="changeSorter"
      @update:filters="changeFilters"
      @update-page-size="changePageSize"
    />
    <n-modal v-model:show="showModal" :width="600" :closable="true">
      <n-card
        style="width: 600px"
        :title="modalTitle"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          ref="form"
          :rules="rules"
          :model="current"
          :label-width="80"
          :loading="addLoading"
        >
          <n-form-item label="广告商名称" path="name">
            <n-input
              v-model:value="current.name"
              :readonly="modalType === 'view'"
              placeholder="请输入广告商名称"
            />
          </n-form-item>
          <n-form-item label="首页地址" path="pageUrl">
            <n-input
              v-model:value="current.pageUrl"
              :readonly="modalType === 'view'"
              placeholder="请输入首页地址"
            />
          </n-form-item>
          <n-form-item label="logo" path="logoUrl">
            <n-upload
              :custom-request="customRequest"
              :default-file-list="avatarList"
              :disabled="modalType === 'view'"
              list-type="image-card"
              :max="1"
            >
              点击上传
            </n-upload>
          </n-form-item>
        </n-form>
        <n-button
          v-if="modalType !== 'view'"
          :loading="addLoading || updateLoading"
          type="primary"
          class="mt-2"
          @click="submit"
        >
          提交
        </n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="tsx">
import { hasPermission, useResFullPath } from "@/hooks";
import router from "@/router";
import type { Advertiser } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";
import * as _ from "lodash";
import {
  NButton,
  NImage,
  NSpace,
  type DataTableColumns,
  type FormRules,
  type NDataTable,
  type NForm,
  type PaginationProps,
  type UploadCustomRequestOptions,
} from "naive-ui";
import type {
  FilterState,
  SortState,
  TableBaseColumn,
} from "naive-ui/es/data-table/src/interface";
import type { FileInfo } from "naive-ui/es/upload/src/interface";

const div = ref<HTMLDivElement>();
const { height } = useElementSize(div);
const maxHeight = computed(() => height.value - 90);

const showModal = ref(false);
const modalType = ref<"add" | "edit" | "view">("add");
const modalTitle = computed(() => {
  return modalType.value !== "add"
    ? `${modalTypeMap[modalType.value]}：${current.value.name}`
    : modalTypeMap[modalType.value];
});
const modalTypeMap = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};

const rules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入广告商名称",
    },
  ],
};

const form = ref<InstanceType<typeof NForm>>();
const validate = async () => {
  return await new Promise<boolean>((resolve, reject) => {
    form.value?.validate((errors) => {
      if (!errors) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};
const submit = async () => {
  if (!(await validate())) return;
  if (modalType.value === "add") {
    _add();
  } else if (modalType.value === "edit") {
    _update();
  }
};

const avatarList = computed<FileInfo[]>(() =>
  current.value?.logoUrl
    ? [
        {
          id: current.value?.id,
          status: "finished",
          name: current.value?.name,
          url: useResFullPath(current.value?.logoUrl),
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
      current.value!.logoUrl = res;
      options.onFinish();
    })
    .catch((err) => {
      options.onError();
    });
};

// 增
const current = ref<Advertiser>({} as Advertiser);
const { refreshAsync: _add, loading: addLoading } =
  advertiserService.useAddAdvertiser(
    () => ({
      requestBody: current.value,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("新增成功");
        showModal.value = false;
        refresh();
      },
    }
  );
const add = () => {
  modalType.value = "add";
  current.value = {} as Advertiser;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  advertiserService.useRemoveAdvertiser(
    () => ({
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("删除成功");
        refresh();
      },
    }
  );
const remove = (advertiser: Advertiser) => {
  current.value = _.cloneDeep(advertiser);
  const dialog = $dialog.confirm({
    title: "删除",
    content: "确定删除吗？",
    confirm() {
      _remove();
    },
    cancel() {
      dialog.destroy();
    },
  });
};

// 改
const { refreshAsync: _update, loading: updateLoading } =
  advertiserService.useUpdateAdvertiser(
    () => ({
      id: current.value.id,
      requestBody: current.value,
    }),
    {
      manual: true,
      onSuccess: () => {
        $message.success("修改成功");
        showModal.value = false;
        refresh();
      },
    }
  );
const update = (advertiser: Advertiser) => {
  modalType.value = "edit";
  current.value = _.cloneDeep(advertiser);
  showModal.value = true;
};

// 查所有
const name = ref("");
const sortStates = ref<Array<SortState>>([]);
const pagination = ref<PaginationProps>({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix({ itemCount }) {
    return `总计：${itemCount}`;
  },
});
const columns = computed<DataTableColumns<Advertiser>>(() => [
  {
    title: "创建时间",
    key: "createdAt",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "createdAt")?.order ||
      false,
    render: (row) => {
      return <span>{dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>;
    },
  },
  {
    title: "更新时间",
    key: "updatedAt",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "updatedAt")?.order ||
      false,
    render: (row) => {
      return <span>{dayjs(row.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>;
    },
  },
  {
    title: "广告商名称",
    key: "name",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "name")?.order ||
      false,
  },
  {
    title: "广告商LOGO",
    key: "logoUrl",
    render(row) {
      return (
        <NImage
          src={useResFullPath(row.logoUrl)}
          width={100}
          fit="contain"
          alt="广告商LOGO"
        />
      );
    },
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/advertisers/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/advertisers/:advertiserId/advertise,GET") && (
            <NButton type="primary" onClick={() => getAdvertise(row)}>
              查看广告
            </NButton>
          )}
          {hasPermission("/advertisers/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/advertisers/:id,DELETE") && (
            <NButton type="error" onClick={() => remove(row)}>
              删除
            </NButton>
          )}
        </NSpace>
      );
    },
  },
]);
const {
  data: _authorities,
  loading,
  refreshAsync: refresh,
} = advertiserService.useQueryAdvertiser(
  () => ({
    query: {
      name: ["$like", `%${name.value}%`],
    },
    page: pagination.value.page,
    size: pagination.value.pageSize,
    sort: sortStates.value.map(
      (item) => `${item.columnKey},${item.order}`
    ) as any,
  }),
  {
    throttleInterval: 2000,
    refreshDeps: [
      computed(() => pagination.value.page),
      computed(() => pagination.value.pageSize),
      computed(() => sortStates.value),
      name,
    ],
    onSuccess: (data) => {
      pagination.value.itemCount = data.total;
      if (
        Math.ceil(data.total / pagination.value.pageSize!) <
        pagination.value.page!
      ) {
        pagination.value.page = 1;
      }
    },
  }
);
const authorities = computed(() => _authorities.value?.items ?? []);

const changeSorter = (sortState: SortState & SortState[]) => {
  const _sortStates = Array.isArray(sortState) ? sortState : [sortState];
  _sortStates.forEach((sortState) => {
    const index = sortStates.value.findIndex(
      (item) => item.columnKey === sortState.columnKey
    );
    if (index === -1) {
      sortStates.value.push(sortState);
    } else {
      sortStates.value[index] = sortState;
    }
  });
};

const changeFilters = (
  filterState: FilterState,
  sourceColumn: TableBaseColumn
) => {
  console.log(filterState, sourceColumn);
};

const changePage = (page: number) => {
  pagination.value.page = page;
};

const changePageSize = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
};

// 查单个
const { refreshAsync: _get, loading: getLoading } =
  advertiserService.useGetAdvertiser(
    () => ({
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        current.value = data;
      },
    }
  );
const get = (advertiser: Advertiser) => {
  modalType.value = "view";
  current.value = _.cloneDeep(advertiser);
  showModal.value = true;
};
const showAdvertiser = useEventBus<string>("showAdvertiser");
showAdvertiser.on(async (advertiserId: string) => {
  current.value.id = advertiserId;
  get(await _get());
});

const getAdvertise = (advertiser: Advertiser) => {
  router.push({
    name: "Advertise",
    query: {
      advertiserId: advertiser.id,
    },
  });
};
</script>
