<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/companies/:companyId/positions,POST')"
        type="primary"
        @click="add"
        class="mb-2"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/recommend/recompute_parameters,GET')"
        v-model:value="positionName"
        placeholder="搜索职位名称"
      />
      <n-button
        v-if="hasPermission('/recommend/recompute_parameters,GET')"
        type="primary"
        :loading="rebuildIndexLoading"
        @click="rebuildIndex"
        >创建索引</n-button
      >
      <n-button
        v-if="hasPermission('/recommend/send_recommend_message,GET')"
        type="primary"
        :loading="sendRecommendLoading"
        @click="sendRecommend"
        >发送推荐</n-button
      >
      <n-button
        v-if="hasPermission('/companies/:companyId/positions,GET')"
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
          <n-form-item
            label="公司"
            path="company.id"
            v-if="modalType === 'add'"
          >
            <n-select
              v-model:value="current.company.id"
              multiple
              filterable
              placeholder="请选择公司"
              :options="companiesOptions"
              :loading="companiesLoading"
              clearable
              remote
              :clear-filter-after-select="false"
              @search="handleSearchAuthorityGroups"
            />
          </n-form-item>
          <n-form-item label="职位名称" path="positionName">
            <n-input
              v-model:value="current.positionName"
              :readonly="modalType === 'view'"
              placeholder="请输入职位名称"
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
import { hasPermission, useApiFullPath } from "@/hooks";
import {
axios,
useRequest,
type Position,
} from "@dongjiang-recruitment/service-common";
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
import type { SelectMixedOption } from "naive-ui/es/select/src/interface";

const div = ref<HTMLDivElement>();
const { height } = useElementSize(div);
const maxHeight = computed(() => height.value - 90);

const route = useRoute();
const companyId = computed(() => route.query.companyId);

const showModal = ref(false);
const modalType = ref<"add" | "edit" | "view">("add");
const modalTitle = computed(() => {
  return modalType.value !== "add"
    ? `${modalTypeMap[modalType.value]}：${current.value.positionName}`
    : modalTypeMap[modalType.value];
});
const modalTypeMap = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};

const rules: FormRules = {
  "company.id": [
    {
      required: true,
      message: "请选择公司",
    },
  ],
  positionName: [
    {
      required: true,
      message: "请输入职位名称",
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

const { loading: rebuildIndexLoading, refreshAsync: rebuildIndex } = useRequest(
  () => axios.get(useApiFullPath("/recommend/recompute_parameters")),
  {
    manual: true,
    onSuccess() {
      $message.success("创建索引成功");
    },
  }
);

const { loading: sendRecommendLoading, refreshAsync: sendRecommend } =
  useRequest(
    () => axios.get(useApiFullPath("/recommend/send_recommend_message")),
    {
      manual: true,
      onSuccess() {
        $message.success("发送推荐邮件成功");
      },
    }
  );

// 增
const current = ref<Position>({} as Position);
const { refreshAsync: _add, loading: addLoading } =
  companyPositionService.useAddPosition(
    () => ({
      companyId: current.value.company.id,
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
const add = async () => {
  modalType.value = "add";
  current.value = {
    company: {
      id: companyId.value as string,
    },
  } as Position;
  showModal.value = true;
};

// 公司
const companiesSearch = ref("");
const {
  data: companies,
  loading: companiesLoading,
  refreshAsync: refreshAuthorityGroups,
} = companyService.useQueryCompany(() => ({
  size: 99999999999,
  query: [
    {
      fullName: ["$like", `%${companiesSearch.value}%`],
    },
    {
      companyName: ["$like", `%${companiesSearch.value}%`],
    },
  ],
}));
const companiesOptions = computed<SelectMixedOption[]>(() => {
  return (
    companies.value?.items.map((item) => ({
      label: item.fullName,
      value: item.id,
    })) ?? []
  );
});
const handleSearchAuthorityGroups = useDebounceFn((value: string) => {
  companiesSearch.value = value;
  refreshAuthorityGroups();
});

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  companyPositionService.useRemovePosition(
    () => ({
      companyId: current.value.company.id,
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
const remove = (position: Position) => {
  current.value = _.cloneDeep(position);
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
  companyPositionService.useUpdatePosition(
    () => ({
      companyId: current.value.company.id,
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
const update = (position: Position) => {
  modalType.value = "edit";
  current.value = _.cloneDeep(position);
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
const columns = computed<DataTableColumns<Position>>(() => [
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
    title: "职位名称",
    key: "positionName",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "positionName")
        ?.order || false,
  },
  {
    title: "所属公司",
    key: "company.fullName",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "company.fullName")
        ?.order || false,
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/companies/:companyId/positions/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/companies/:companyId/positions/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/companies/:companyId/positions/:id,DELETE") && (
            <NButton type="error" onClick={() => remove(row)}>
              删除
            </NButton>
          )}
        </NSpace>
      );
    },
  },
]);
const positionName = ref("");
const {
  data: _authorities,
  loading,
  refreshAsync: refresh,
} = companyService.useQueryAllPosition(
  () => ({
    query: {
      "company.id": companyId.value ? ["$eq", companyId.value] : undefined,
      positionName: ["$like", `%${positionName.value}%`],
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
      computed(() => companyId.value),
      positionName,
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
  companyPositionService.useGetPosition(
    () => ({
      companyId: current.value.company.id,
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        current.value = data;
      },
    }
  );
const get = (position: Position) => {
  modalType.value = "view";
  current.value = _.cloneDeep(position);
  showModal.value = true;
};
</script>
