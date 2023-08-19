<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/authentication/authorityGroups,POST')"
        type="primary"
        @click="add"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/authentication/authorityGroups,GET')"
        v-model:value="name"
        placeholder="搜索权限组名称"
        clearable
      />
      <n-button
        v-if="hasPermission('/authentication/authorityGroups,GET')"
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
      :data="authorityGroups"
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
          <n-form-item label="权限组名称" path="name">
            <n-input
              v-model:value="current.name"
              :readonly="modalType === 'view'"
              placeholder="请输入权限组名称"
            />
          </n-form-item>
          <n-form-item label="权限" path="authorities">
            <n-select
              v-model:value="current.authorities as any"
              multiple
              filterable
              placeholder="请选择权限"
              :options="authoritiesOptions"
              :loading="authoritiesLoading"
              clearable
              remote
              :clear-filter-after-select="false"
              @search="handleSearchAuthorities"
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
import type { AuthorityGroup } from "@dongjiang-recruitment/service-common";
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
      message: "请输入权限名称",
    },
  ],
  authorities: [
    {
      required: true,
      message: "请选择权限",
      validator: (rule, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(rule.message);
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
    _add();
  } else if (modalType.value === "edit") {
    _update();
  }
};

// 权限
const authoritiesSearch = ref("");
const {
  data: authorities,
  loading: authoritiesLoading,
  refreshAsync: refreshAuthorities,
} = authenticationAuthorityService.useQueryAuthority(() => ({
  size: 99999999999,
  query: {
    name: ["$like", `%${authoritiesSearch.value}%`],
  },
}));
const authoritiesOptions = computed<SelectMixedOption[]>(() => {
  return (
    authorities.value?.items.map((item) => ({
      label: item.name,
      value: item.id,
    })) ?? []
  );
});
const handleSearchAuthorities = useDebounceFn((value: string) => {
  authoritiesSearch.value = value;
  refreshAuthorities();
});

watch(showModal, (value) => {
  if (value) {
    authoritiesSearch.value = "";
    refreshAuthorities();
  }
});

// 增
const current = ref<AuthorityGroup>({} as AuthorityGroup);
const { refreshAsync: _add, loading: addLoading } =
  authenticationAuthorityGroupService.useAddAuthorityGroup(
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
  current.value = {} as AuthorityGroup;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  authenticationAuthorityGroupService.useRemoveAuthorityGroup(
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
const remove = (authority: AuthorityGroup) => {
  current.value = _.cloneDeep(authority);
  const dialog = $dialog.confirm({
    title: "删除",
    content: "确定删除吗？",
    loading: removeLoading.value,
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
  authenticationAuthorityGroupService.useUpdateAuthorityGroup(
    () => ({
      id: current.value.id,
      requestBody: {
        ...current.value,
        authorities: current.value.authorities.map((item) => ({
          id: item,
        })),
      } as any,
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
const update = (authority: AuthorityGroup) => {
  modalType.value = "edit";
  const clone = _.cloneDeep(authority);
  current.value = {
    ...clone,
    authorities: clone.authorities.map((item) => item.id) as any,
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
const columns = computed<DataTableColumns<AuthorityGroup>>(() => [
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
    title: "权限名称",
    key: "name",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "name")?.order ||
      false,
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/authentication/authorityGroups/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/authentication/authorityGroups/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/authentication/authorityGroups/:id,DELETE") && (
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
const {
  data: _authorityGroups,
  loading,
  refreshAsync: refresh,
} = authenticationAuthorityGroupService.useQueryAuthorityGroup(
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
    debounceInterval: 1000,
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
const authorityGroups = computed(() => _authorityGroups.value?.items ?? []);

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
  authenticationAuthorityGroupService.useGetAuthorityGroup(
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
const get = (authority: AuthorityGroup) => {
  modalType.value = "view";
  const clone = _.cloneDeep(authority);
  current.value = {
    ...clone,
    authorities: clone.authorities.map((item) => item.id) as any,
  };
  showModal.value = true;
};
</script>
