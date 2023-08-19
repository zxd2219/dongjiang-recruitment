<template>
  <div class="p-2 w-full h-full" ref="div">
    <n-form inline class="mb-2 space-x-2">
      <n-button
        v-if="hasPermission('/authentication/accounts,POST')"
        type="primary"
        @click="add"
      >
        新增
      </n-button>
      <n-input
        v-if="hasPermission('/authentication/accounts,GET')"
        v-model:value="userName"
        placeholder="搜索用户名"
        clearable
      />
      <n-button
        v-if="hasPermission('/authentication/accounts,GET')"
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
      :data="accounts"
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
          <n-form-item label="用户名" path="userName">
            <n-input
              v-model:value="current.userName"
              :readonly="modalType === 'view'"
              placeholder="请输入用户名"
            />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="current.password"
              :readonly="modalType === 'view'"
              placeholder="请输入密码"
            />
          </n-form-item>
          <n-form-item label="权限组" path="authorityGroups">
            <n-select
              v-model:value="current.authorityGroups as any"
              multiple
              filterable
              placeholder="请选择权限组"
              :options="authorityGroupsOptions"
              :loading="authorityGroupsLoading"
              clearable
              remote
              :clear-filter-after-select="false"
              @search="handleSearchAuthorityGroups"
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
import type { Account as _Account } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";
import * as _ from "lodash";
import {
  NButton,
  NSpace,
  NTag,
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

interface Account extends _Account {
  password: string;
}

const div = ref<HTMLDivElement>();
const { height } = useElementSize(div);
const maxHeight = computed(() => height.value - 90);

const showModal = ref(false);
const modalType = ref<"add" | "edit" | "view">("add");
const modalTitle = computed(() => {
  return modalType.value !== "add"
    ? `${modalTypeMap[modalType.value]}：${current.value.userName}`
    : modalTypeMap[modalType.value];
});
const modalTypeMap = {
  add: "新增",
  edit: "编辑",
  view: "查看",
};

const rules = computed<FormRules>(() => ({
  userName: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: modalType.value === "add",
      message: "请输入密码",
    },
  ],
  authorityGroups: [
    {
      required: true,
      message: "请选择权限组",
      validator: (rule, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
    },
  ],
}));

const form = ref<InstanceType<typeof NForm>>();
const validate = () => {
  return new Promise<boolean>((resolve, reject) => {
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

// 权限组
const authorityGroupsSearch = ref("");
const {
  data: authorityGroups,
  loading: authorityGroupsLoading,
  refreshAsync: refreshAuthorityGroups,
} = authenticationAuthorityGroupService.useQueryAuthorityGroup(() => ({
  size: 99999999999,
  query: {
    name: ["$like", `%${authorityGroupsSearch.value}%`],
  },
}));
const authorityGroupsOptions = computed<SelectMixedOption[]>(() => {
  return (
    authorityGroups.value?.items.map((item) => ({
      label: item.name,
      value: item.id,
    })) ?? []
  );
});
const handleSearchAuthorityGroups = useDebounceFn((value: string) => {
  authorityGroupsSearch.value = value;
  refreshAuthorityGroups();
});

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

watch(
  () => showModal.value,
  (value) => {
    if (value) {
      authoritiesSearch.value = "";
      refreshAuthorityGroups();
      refreshAuthorities();
    }
  }
);

// 增
const current = ref<Account>({} as Account);
const { refreshAsync: _add, loading: addLoading } =
  authenticationAccountService.useAddAccount(
    () => ({
      requestBody: {
        accountType: -1 as 0 | 1 | 2 | 3,
        userName: current.value.userName,
        password: current.value.password,
        authorities: current.value.authorities?.map((item) => ({
          id: item,
        })) as any,
        authorityGroups: current.value.authorityGroups?.map((item) => ({
          id: item,
        })) as any,
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
  current.value = {} as Account;
  showModal.value = true;
};

// 删
const { refreshAsync: _remove, loading: removeLoading } =
  authenticationAccountService.useRemoveAccount(
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
const remove = (authority: Account) => {
  current.value = _.cloneDeep(authority);
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
  authenticationAccountService.useUpdateAccount(
    () => ({
      id: current.value.id,
      requestBody: {
        ...current.value,
        authorityGroups: current.value.authorityGroups.map((item) => ({
          id: item,
        })),
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
const update = (authority: Account) => {
  modalType.value = "edit";
  const clone = _.cloneDeep(authority);
  current.value = {
    ...clone,
    authorityGroups: clone.authorityGroups.map((item) => item.id) as any,
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
const columns = computed<DataTableColumns<Account>>(() => [
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
    title: "用户名",
    key: "userName",
    sorter: true,
    sortOrder:
      sortStates.value.find((item) => item.columnKey === "userName")?.order ||
      false,
  },
  {
    title: "权限组",
    key: "authorityGroups",
    render: (row) => {
      return (
        <NSpace>
          {row.authorityGroups.map((item) => (
            <NTag type="primary" key={item.id}>
              {item.name}
            </NTag>
          ))}
        </NSpace>
      );
    },
  },
  {
    title: "操作",
    key: "action",
    render: (row) => {
      return (
        <NSpace>
          {hasPermission("/authentication/accounts/:id,GET") && (
            <NButton type="primary" onClick={() => get(row)}>
              查看
            </NButton>
          )}
          {hasPermission("/authentication/accounts/:id,PUT") && (
            <NButton type="primary" onClick={() => update(row)}>
              编辑
            </NButton>
          )}
          {hasPermission("/authentication/accounts/:id,DELETE") && (
            <NButton type="error" onClick={() => remove(row)}>
              删除
            </NButton>
          )}
        </NSpace>
      );
    },
  },
]);
const userName = ref("");
const {
  data: _accounts,
  loading,
  refreshAsync: refresh,
} = authenticationAccountService.useQueryAccounts(
  () => ({
    query: { userName: ["$like", `%${userName.value}%`] },
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
      userName,
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
const accounts = computed(() => _accounts.value?.items ?? []);

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
  authenticationAccountService.useGetAccount(
    () => ({
      id: current.value.id,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        current.value = { ...data, password: "" };
      },
    }
  );
const get = (authority: Account) => {
  modalType.value = "view";
  const clone = _.cloneDeep(authority);
  current.value = {
    ...clone,
    authorityGroups: clone.authorityGroups.map((item) => item.id) as any,
    authorities: clone.authorities.map((item) => item.id) as any,
  };
  showModal.value = true;
};
</script>
