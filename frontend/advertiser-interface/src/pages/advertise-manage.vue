<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/advertisers/:advertiserId/advertise,POST')"
        type="primary"
        @click="add"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/advertisers/:advertiserId/advertise,GET')"
        v-model:value="name"
        placeholder="搜索广告名称"
        class="w-12"
        clearable
      />
      <n-select
        v-if="hasPermission('/advertisers/:advertiserId/advertise,GET')"
        v-model:value="position"
        :options="positionOptions"
        placeholder="筛选广告位置"
        clearable
      />
      <n-select
        v-if="hasPermission('/advertisers/:advertiserId/advertise,GET')"
        v-model:value="status"
        :options="statusOptions"
        placeholder="筛选广告状态"
        clearable
      />
      <n-button
        v-if="hasPermission('/advertisers/:advertiserId/advertise,GET')"
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
          <n-form-item label="广告名称" path="name">
            <n-input
              v-model:value="current.name"
              :readonly="modalType === 'view'"
              placeholder="请输入广告名称"
            />
          </n-form-item>
          <n-form-item label="广告图片" path="banner">
            <n-upload
              :custom-request="customRequest"
              :default-file-list="imageList"
              :disabled="modalType === 'view'"
              list-type="image-card"
              :max="1"
            >
              点击上传
            </n-upload>
          </n-form-item>
          <n-form-item label="广告链接" path="pageUrl">
            <n-input
              v-model:value="current.pageUrl"
              :readonly="modalType === 'view'"
              placeholder="请输入广告链接"
            />
          </n-form-item>
          <n-form-item label="广告位置" path="position">
            <n-select
              v-model:value="current.position"
              :options="positionOptions"
              :disabled="modalType === 'view'"
              placeholder="请选择广告位置"
            />
          </n-form-item>
          <n-form-item label="广告状态" path="status">
            <n-select
              v-model:value="current.status"
              :options="statusOptions"
              :disabled="
                modalType === 'view' ||
                (modalType === 'edit' && current.status === 1)
              "
              placeholder="请选择广告状态"
            />
          </n-form-item>
          <n-form-item label="开始时间" path="startTime">
            <n-date-picker
              v-model:value="current.startTime as any"
              :disabled="modalType === 'view' || modalType === 'edit'"
              type="date"
              format="yyyy-MM-dd"
              placeholder="请选择开始时间"
            />
          </n-form-item>
          <n-form-item label="结束时间" path="endTime">
            <n-date-picker
              v-model:value="current.endTime as any"
              :disabled="modalType === 'view'"
              type="date"
              format="yyyy-MM-dd"
              placeholder="请选择结束时间"
            />
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
import { useMainStore } from "@/stores";
import { Advertise } from "@dongjiang-recruitment/service-common";
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

const mainStore = useMainStore();
const advertiserId = computed(() => mainStore.advertiser?.id);

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
      message: "请输入广告名称",
    },
  ],
  banner: [
    {
      required: true,
      message: "请上传广告图片",
    },
  ],
  pageUrl: [
    {
      required: true,
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject("请输入广告链接");
        }
        if (!/^https?:\/\//.test(value)) {
          return Promise.reject("请输入正确的广告链接");
        }
        return Promise.resolve();
      },
    },
  ],
  position: [
    {
      required: true,
      message: "请选择广告位置",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择广告状态",
    },
  ],
  startTime: [
    {
      required: true,
      message: "请选择开始时间",
    },
  ],
  endTime: [
    {
      required: true,
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject("请选择结束时间");
        }
        if (!dayjs(value).isAfter(current.value.startTime)) {
          return Promise.reject("结束时间不能早于或等于开始时间");
        }
        return Promise.resolve();
      },
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
    const payed = await payment();
    if (!payed) return;
    current.value.payed = needPay.value;
    _add();
  } else if (modalType.value === "edit") {
    const payed = await payment();
    if (!payed) return;
    current.value.payed += needPay.value;
    _update();
  }
};

const needPay = computed(() => {
  const total =
    current.value.position *
    10 *
    dayjs(current.value.endTime).diff(dayjs(current.value.startTime), "day");
  console.log(total, current.value.payed);
  const payed = current.value.payed || 0;
  if (total - payed > 0) {
    return total - payed;
  } else if (total - payed < 0) {
    $message.error("您的广告费用付多了，请联系客服");
  }
  return 0;
});
const payment = () => {
  return new Promise((resolve) => {
    if (needPay.value === 0) {
      return resolve(true);
    }
    $dialog.confirm({
      title: "提示",
      content: `本次操作需要支付${needPay.value}元，是否继续？`,
      confirm: async () => {
        const { outTradeNo, payUrl } = await commonService.addPayment({
          requestBody: {
            name: "广告费用",
            total: needPay.value,
          },
        });
        $message.info("正在跳转到支付页面");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.open(payUrl, "_blank", "width=1024,height=500,top=100,left=100");
        $dialog.confirm({
          title: "提示",
          content: `您支付成功了吗？`,
          confirm() {
            commonService
              .getPaymentStatus({
                outTradeNo,
              })
              .then((res) => {
                if (
                  res.code === "10000" &&
                  res.tradeStatus === "TRADE_SUCCESS"
                ) {
                  $message.success("支付成功");
                  resolve(true);
                } else {
                  $message.error("你没有付款哦!");
                  resolve(false);
                }
              });
          },
          cancel() {
            resolve(false);
          },
        });
      },
      cancel() {
        resolve(false);
      },
    });
  });
};

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
      current.value.banner = res;
      options.onFinish();
    })
    .catch((err) => {
      options.onError();
    });
};
const imageList = computed<FileInfo[]>(() => {
  if (!current.value.banner) {
    return [];
  }
  return [
    {
      id: current.value.id,
      name: current.value.name,
      status: "finished",
      url: useResFullPath(current.value.banner),
    },
  ];
});
const positionOptions = [
  {
    label: "首页",
    value: Advertise.position.Master,
  },
  {
    label: "推广页",
    value: Advertise.position.Popularize,
  },
];
const statusOptions = [
  {
    label: "启用",
    value: Advertise.status.Active,
  },
  {
    label: "禁用",
    value: Advertise.status.Inactive,
  },
];

// 增
const current = ref<Advertise>({} as Advertise);
const { refreshAsync: _add, loading: addLoading } =
  advertiserAdvertiseService.useAddAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      requestBody: {
        ...current.value,
        startTime: dayjs(current.value.startTime).format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs(current.value.endTime).format("YYYY-MM-DD HH:mm:ss"),
      },
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
  current.value = {
    advertiser: {
      id: advertiserId.value,
    },
  } as Advertise;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  advertiserAdvertiseService.useRemoveAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
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
const remove = (advertise: Advertise) => {
  current.value = _.cloneDeep(advertise);
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
  advertiserAdvertiseService.useUpdateAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      id: current.value.id,
      requestBody: {
        ...current.value,
        startTime: dayjs(current.value.startTime).format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs(current.value.endTime).format("YYYY-MM-DD HH:mm:ss"),
      },
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
const update = (advertise: Advertise) => {
  modalType.value = "edit";
  const clone = _.cloneDeep(advertise);
  current.value = {
    ...clone,
    startTime: dayjs(clone.startTime).valueOf() as any,
    endTime: dayjs(clone.endTime).valueOf() as any,
  };
  showModal.value = true;
};

// 查所有
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
const columns = computed<DataTableColumns<Advertise>>(() => [
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
    title: "广告名称",
    key: "name",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "name")?.order ||
      false,
  },
  {
    title: "广告图片",
    key: "banner",
    render: (row) => {
      return (
        <NImage
          src={useResFullPath(row.banner)}
          width={100}
          fit="contain"
          alt="广告图片"
        />
      );
    },
  },
  {
    title: "广告链接",
    key: "pageUrl",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "pageUrl")?.order ||
      false,
  },
  {
    title: "投放位置",
    key: "position",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "type")?.order ||
      false,
    render: (row) => {
      return <span>{Advertise.position[row.position]}</span>;
    },
  },
  {
    title: "广告状态",
    key: "status",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "status")?.order ||
      false,
    render: (row) => {
      return <span>{Advertise.status[row.status]}</span>;
    },
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/advertisers/:advertiserId/advertise/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/advertisers/:advertiserId/advertise/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/advertisers/:advertiserId/advertise/:id,DELETE") && (
            <NButton type="error" onClick={() => remove(row)}>
              删除
            </NButton>
          )}
        </NSpace>
      );
    },
  },
]);
const name = ref("");
const position = ref<Advertise.position>();
const status = ref<Advertise.status>();
const {
  data: _authorities,
  loading,
  refreshAsync: refresh,
} = advertiserService.useQueryAllAdvertise(
  () => ({
    query: {
      "advertiser.id": advertiserId.value
        ? ["$eq", advertiserId.value]
        : undefined,
      name: ["$like", `%${name.value}%`],
      position: position.value ? ["$eq", position.value] : undefined,
      status: status.value ? ["$eq", status.value] : undefined,
    },
    page: pagination.value.page,
    size: pagination.value.pageSize,
    sort: sortStates.value.map(
      (item) => `${item.columnKey},${item.order}`
    ) as any,
  }),
  {
    debounceInterval: 1000,
    refreshDeps: [
      computed(() => pagination.value.page),
      computed(() => pagination.value.pageSize),
      computed(() => sortStates.value),
      computed(() => advertiserId.value),
      name,
      position,
      status,
    ],
    ready: computed(() => !!advertiserId.value),
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
  advertiserAdvertiseService.useGetAdvertise(
    () => ({
      advertiserId: current.value.advertiser.id,
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        current.value = data;
      },
    }
  );
const get = (advertise: Advertise) => {
  modalType.value = "view";
  const clone = _.cloneDeep(advertise);
  current.value = {
    ...clone,
    startTime: dayjs(clone.startTime).valueOf() as any,
    endTime: dayjs(clone.endTime).valueOf() as any,
  };
  showModal.value = true;
};
</script>
