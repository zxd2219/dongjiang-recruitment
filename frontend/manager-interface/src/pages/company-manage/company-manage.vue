<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/companies,POST')"
        type="primary"
        @click="add"
        class="mb-2"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/companies,GET')"
        v-model:value="fullName"
        placeholder="搜索公司全称"
      />
      <n-button
        v-if="hasPermission('/companies,GET')"
        @click="refresh"
        class="mb-2"
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
          <n-form-item label="公司名称" path="companyName">
            <n-input
              v-model:value="current.companyName"
              :readonly="modalType === 'view'"
              placeholder="请输入公司名称"
            />
          </n-form-item>
          <n-form-item label="公司全称" path="fullName">
            <n-input
              v-model:value="current.fullName"
              :readonly="modalType === 'view'"
              placeholder="请输入公司全称"
            />
          </n-form-item>
          <n-form-item label="公司权益" path="benefits">
            <n-dynamic-tags
              v-model:value="current.benefits"
              :readonly="modalType === 'view'"
              placeholder="请输入公司权益"
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
import { hasPermission } from "@/hooks";
import router from "@/router";
import type { Company } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";
import * as _ from "lodash";
import {
NButton,
NSpace,
type DataTableColumns,
type FormRules,
type NDataTable,
type NForm,
type PaginationProps,
} from "naive-ui";
import type {
FilterState,
SortState,
TableBaseColumn,
} from "naive-ui/es/data-table/src/interface";

const div = ref<HTMLDivElement>();
const { height } = useElementSize(div);
const maxHeight = computed(() => height.value - 90);

const showModal = ref(false);
const modalType = ref<"add" | "edit" | "view">("add");
const modalTitle = computed(() => {
  return modalType.value !== "add"
    ? `${modalTypeMap[modalType.value]}：${current.value.fullName}`
    : modalTypeMap[modalType.value];
});
const modalTypeMap = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};

const rules: FormRules = {
  companyName: [
    {
      required: true,
      message: "请输入公司名称",
    },
  ],
  fullName: [
    {
      required: true,
      message: "请输入公司全称",
    },
  ],
  benefits: [
    {
      required: true,
      message: "请输入公司权益",
      validator: (rule, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
    },
  ],
  comprehensionName: [
    {
      required: true,
      message: "请选择领域名称",
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

// 增
const current = ref<Company>({} as Company);
const { refreshAsync: _add, loading: addLoading } =
  companyService.useAddCompany(
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
  current.value = {} as Company;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  companyService.useRemoveCompany(
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
const remove = (company: Company) => {
  current.value = _.cloneDeep(company);
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
  companyService.useUpdateCompany(
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
const update = (company: Company) => {
  modalType.value = "edit";
  current.value = _.cloneDeep(company);
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
const columns = computed<DataTableColumns<Company>>(() => [
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
    title: "公司名称",
    key: "fullName",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "fullName")?.order ||
      false,
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/companies/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/companies/:companyId/positions,GET") && (
            <NButton type="primary" onClick={() => getPosition(row)}>
              查看职位
            </NButton>
          )}
          {hasPermission("/companies/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/companies/:id,DELETE") && (
            <NButton type="error" onClick={() => remove(row)}>
              删除
            </NButton>
          )}
        </NSpace>
      );
    },
  },
]);
const fullName = ref("");
const {
  data: _authorities,
  loading,
  refreshAsync: refresh,
} = companyService.useQueryCompany(
  () => ({
    query: {
      fullName: ["$like", `%${fullName.value}%`],
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
      fullName,
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
  companyService.useGetCompany(
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
const get = (company: Company) => {
  modalType.value = "view";
  current.value = _.cloneDeep(company);
  showModal.value = true;
};

const getPosition = (company: Company) => {
  router.push({
    name: "Position",
    query: {
      companyId: company.id,
    },
  });
};
</script>
