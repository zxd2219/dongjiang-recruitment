<template>
  <div>
    <SystemHeader />
    <div class="upside">
      <div class="upside-lia">
        <div>
          <span v-if="route.params.PublishJobId" class="title"
            >修改职位，请注意信息的真实性噢~</span
          >
          <span v-else class="title">发布职位，开启招聘之旅~</span>
          <router-link to="/Manage"> 跳过发布 </router-link>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="beneath">
      <div class="inside">
        <el-divider direction="vertical" class="divider" />
        <span class="title">基本信息</span>
        <span class="explain"
          >职位名称、类别与招聘类型发布后不可修改，请准确填写</span
        >
        <div>
          <el-form
            ref="formRef"
            :model="jobTypeList"
            label-width="120px"
            :rules="rules"
            size="large"
            style="max-width: 700px"
          >
            <el-form-item label="招聘类型" prop="workType">
              <el-select
                v-model="jobTypeList.workType"
                placeholder="请选择招聘类型"
              >
                <el-option
                  v-for="(item, index) in jobTypeMap"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位名称" prop="positionName">
              <el-input
                v-model="jobTypeList.positionName"
                placeholder="职位名称建议包括工作内容和职位等级"
              />
            </el-form-item>
            <el-form-item label="职位类型" prop="positionType">
              <el-input
                v-model="jobTypeList.positionType"
                :input-style="{ display: 'none' }"
              />
              <div class="select" @click="dialogFormVisible1 = true">
                <div class="font">
                  {{ jobTypeList.positionType || "请选择" }}
                </div>
                <img src="@/assets/down.png" alt="" />
              </div>
              <el-dialog v-model="dialogFormVisible1" title="请选择职位类型">
                <PositionTagSelector @position-select="submitData" />
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="dialogFormVisible1 = false"
                      >确定</el-button
                    >
                  </span>
                </template>
              </el-dialog>
            </el-form-item>
            <el-form-item label="细分标签" prop="positionType">
              <el-input
                v-model="jobTypeList.directionTags"
                :input-style="{ display: 'none' }"
              />
              <div class="select" @click="dialogFormVisible2 = true">
                <el-scrollbar>
                  <div class="font">
                    <div
                      v-if="jobTypeList.directionTags"
                      style="display: inline-block"
                    >
                      <el-tag
                        v-for="(directName, index) in jobTypeList.directionTags"
                        :key="index"
                        class="ml-2"
                        type="info"
                        style="margin-right: 5px"
                        >{{ directName }}</el-tag
                      >
                    </div>
                    <div v-else class="rechar">
                      <span> {{ "请选择" }}</span>
                      <img src="@/assets/down.png" alt="" />
                    </div>
                  </div>
                </el-scrollbar>
              </div>
              <el-dialog v-model="dialogFormVisible2" title="请选择细分标签">
                <direction-tag-selector @direction-selected="submitDirection" />
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="comfirmDirection"
                      >确定</el-button
                    >
                  </span>
                </template>
              </el-dialog>
            </el-form-item>

            <el-form-item label="经验和学历" prop="name">
              <el-col :span="11">
                <el-select
                  v-model="jobTypeList.workingYears"
                  placeholder="请选择经验要求"
                >
                  <el-option
                    v-for="(item, index) in workingYears"
                    :key="item"
                    :label="item"
                    :value="index + 1"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500"></span>
              </el-col>
              <el-col :span="11">
                <el-select
                  v-model="jobTypeList.education"
                  placeholder="请选择学历要求"
                >
                  <el-option
                    v-for="(item, index) in educationMap"
                    :key="item"
                    :label="item"
                    :value="index + 1"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="薪资范围">
              <el-col :span="11">
                <el-form-item prop="startingSalary">
                  <el-input
                    v-model.number="jobTypeList.startingSalary"
                    placeholder="请输入起始薪资"
                  >
                    <template #append>K</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="ceilingSalary">
                  <el-input
                    v-model.number="jobTypeList.ceilingSalary"
                    placeholder="请输入上限薪资"
                  >
                    <template #append>K</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-divider direction="vertical" class="divider" />
            <span class="title">职位详情</span>
            <span class="explain"
              >详细的职位介绍信息能帮助你更快找到合适的候选人</span
            >
            <el-form-item label="职位描述" prop="description">
              <el-input
                v-model="jobTypeList.description"
                minlength="20"
                autosize
                maxlength="2000"
                placeholder="请输入岗位职责、任职要求等，至少20字，建议使用短句并分条
列出，如下
岗位职责：
1、……
2、……
任职要求：
1、……
2、……
请勿输入公司邮箱、联系电话、薪资面议、性别歧视字样及其他
外链，否则将自动删除，不可恢复"
                show-word-limit
                type="textarea"
              />
            </el-form-item>
            <el-form-item label="职位亮点" prop="highlights">
              <el-select
                v-model="jobTypeList.highlights"
                multiple
                filterable
                allow-create
                default-first-option
                class="light-select"
                :reserve-keyword="false"
                placeholder="请输入或选择亮点"
              >
                <el-option
                  v-for="item in heightLightMap"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-cascader
                v-model="cityInfo"
                :options="cityMap"
                placeholder="请选择"
                @change="cityChange"
              />
            </el-form-item>
            <el-form-item label="工作地点" prop="workAreaName">
              <div class="search">
                <el-input
                  v-model="jobTypeList.workAreaName"
                  disabled
                  placeholder="请在右方搜索点击选择"
                />
                <input id="input" type="text" />
              </div>
            </el-form-item>
            <el-form-item prop="workPlace">
              <div class="map">
                <div id="container"></div>
                <el-scrollbar>
                  <ul>
                    <li
                      v-for="address in aboutAddress"
                      :key="address.id"
                      @click="handleArea(address)"
                    >
                      {{ address.name }}
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-input
                v-model="jobTypeList.departmentName"
                placeholder="选填，例如：基础研发平台"
                maxlength="20"
                show-word-limit
              />
            </el-form-item>
            <el-divider direction="vertical" class="divider" />
            <span class="title">附加信息</span>
            <span class="explain">完善附加信息可以让候选人更加了解职位</span>
            <el-form-item label="工作时间">
              <el-col :span="11">
                <el-form-item prop="weekendReleaseTime">
                  <el-select
                    v-model="jobTypeList.weekendReleaseTime"
                    placeholder="请选择周末休息时间"
                  >
                    <el-option
                      v-for="(item, index) in weekendReleaseTimeMap"
                      :key="item"
                      :label="item"
                      :value="index + 1"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500"></span>
              </el-col>
              <el-col :span="11">
                <div class="demo-range">
                  <el-form-item>
                    <el-time-picker
                      v-model="workTimeing"
                      :clearable="false"
                      is-range
                      range-separator="到"
                      start-placeholder="上班时间"
                      end-placeholder="下班时间"
                      format="HH:mm:ss"
                      :disabled-seconds="disabledSeconds"
                      @change="handleWorkTimeChange(workTimeing)"
                    />
                  </el-form-item>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="面试信息" prop="interviewInfo">
              <el-input
                v-model="jobTypeList.interviewInfo"
                :input-style="{ display: 'none' }"
              />
              <div class="select" @click="dialogFormVisible = true">
                <div class="font">{{ interviewList || "请选择" }}</div>
                <img src="@/assets/down.png" alt="" />
              </div>
              <el-dialog v-model="dialogFormVisible" title="请选择职位类型">
                <InterviewTagSelector @submit-interview="submitInterview" />
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="dialogFormVisible = false"
                      >确定</el-button
                    >
                  </span>
                </template>
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="!route.params.PublishJobId"
                type="primary"
                @click="publishPost(formRef)"
                >发布职位</el-button
              >
              <el-button
                v-if="route.params.PublishJobId"
                type="primary"
                @click="updatePost(formRef)"
                >修改职位</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemHeader from "@/components/System/SystemHeader.vue";
import useTime from "@/hooks/useTime";
import router from "@/router";
import { useMainStore } from "@/stores/main";
import type {
  Company,
  Personnel,
  Position,
} from "@dongjiang-recruitment/service-common";
import { ElMessage, type FormInstance } from "element-plus";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import DirectionTagSelector from "./DirectionTagSelector.vue";
import InterviewTagSelector from "./InterviewTagSelector.vue";
import PositionTagSelector from "./PositionTagSelector.vue";
const store = useMainStore();
const route = useRoute();
const map = shallowRef<AMap.Map>();
const placeSearch = shallowRef();
const formRef = ref<FormInstance>();
const marker = shallowRef();
const jobTypeList = ref<Position>({} as Position);
const weekendReleaseTimeMap = reactive(["周末双休", "周末单休", "大小周"]);
const jobTypeMap = reactive(["全职", "兼职", "实习"]);
const educationMap = reactive(["不要求", "大专", "本科", "硕士", "博士"]);
const workingYears = reactive([
  "经验不限",
  "在校/应届",
  "3年及以下",
  "3-5年",
  "5-10年",
  "10年以上",
]);
const rules = reactive({
  positionName: [{ required: true, message: "此项不能为空", trigger: "blur" }],
  workAreaName: [
    { required: true, message: "请选择工作地址", trigger: "blur" },
  ],
  positionType: [{ required: true, message: "此项不能为空", trigger: "blur" }],
  highlights: [
    {
      required: true,
      message: "请输入职位吸引候选人的亮点，如：福利待遇、发展前景等",
      trigger: "blur",
    },
  ],
  startingSalary: [
    {
      required: true,
      message: "请输入薪资范围，如：10-20",
      trigger: "blur",
    },
  ],
  ceilingSalary: [
    {
      required: true,
      message: "请输入薪资范围，如：10-20",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "请输入职位描述",
      trigger: "blur",
    },
  ],
  weekendReleseTime: [
    {
      required: true,
      message: "请选择周末休息时间",
      trigger: "blur",
    },
  ],
  workTime: [
    {
      required: true,
      message: "请选择工作时间",
      trigger: "blur",
    },
  ],
});
const dialogFormVisible = ref(false);
const dialogFormVisible1 = ref(false);
const dialogFormVisible2 = ref(false);
interface InterviewInfo {
  illustrate: 1 | 2 | 3 | 4;

  situation: 1 | 2 | 3;

  time: 1 | 2;

  wheel: 1 | 2 | 3 | 4;
}
const interviewInfo = ref<Array<string>>([]);
const submitData = (data: Ref<{ tagName: string; checked: boolean }>) => {
  jobTypeList.value.positionType = data.value.tagName;
};
const directions = ref<Array<Array<string>>>([]);

const submitDirection = (
  data: Ref<
    Ref<{
      tagName: string;
      checked: boolean;
    }>[][]
  >
) => {
  directions.value = data.value.flat().map((item) => {
    const tags = [];
    if (item.value.checked) {
      tags.push(item.value.tagName);
    }
    return tags;
  });
};
const comfirmDirection = () => {
  jobTypeList.value.directionTags = directions.value.flat();
  dialogFormVisible2.value = false;
};
const submitInterview = (data: {
  data: InterviewInfo;
  list: Array<{ name: string; checked: boolean }>;
}) => {
  jobTypeList.value.interviewInfo = data.data;
  data.list.forEach((e) => {
    interviewInfo.value.push(e.name);
  });
  interviewInfo.value = interviewInfo.value.slice(-4);
};
const interviewList = computed(() => {
  return interviewInfo.value.toString();
});
const cityChange = (val: Array<string>) => {
  jobTypeList.value.workProvinceName = val[0];
  jobTypeList.value.workCityName = `${val[0]},${val[1]}`;
};
const aboutAddress = ref<any>([]);

// 上面的代码是页面加载时调用的函数。它用于加载地图并在地图上设置标记。
const loadMap = () => {
  map.value = new AMap.Map("container", {
    zoom: 13,
  });
  if (jobTypeList.value?.workingPlace?.longitude) {
    marker.value = new AMap.Marker({
      map: map.value,
      position: [
        jobTypeList.value.workingPlace.longitude,
        jobTypeList.value.workingPlace.latitude,
      ],
    });
    map.value?.add(marker.value);
    map.value?.setCenter([
      jobTypeList.value.workingPlace.longitude,
      jobTypeList.value.workingPlace.latitude,
    ]);
  }
  AMap.plugin(
    [
      "AMap.Geolocation",
      "AMap.CitySearch",
      "AMap.AutoComplete",
      "AMap.PlaceSearch",
      "AMap.Geocoder",
    ],
    function () {
      let citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (typeof result != "string") {
          if (status === "complete") {
            // @ts-ignore
            let autocomplete = new AMap.AutoComplete({
              city: result.city,
              input: "input",
            });
            placeSearch.value = new AMap.PlaceSearch({
              city: result.city,
            });
            autocomplete.on("select", (e: { poi: { name: any } }) => {
              placeSearch.value.search(
                e.poi.name,
                (status: any, result: any) => {
                  if (status === "complete") {
                    aboutAddress.value = result.poiList.pois;
                  }
                }
              );
            });
          }
        }
      });
      map.value?.on("click", (e: any) => {
        if (!marker.value) {
          marker.value = new AMap.Marker({
            map: map.value,
            position: e.lnglat,
          });
          map.value?.add(marker.value);
        }
        map.value?.setCenter(e.lnglat);
        jobTypeList.value.workingPlace = {
          longitude: e.lnglat.lng,
          latitude: e.lnglat.lat,
        };
        regeoCode(e.lnglat);
      });
      let geocoder = new AMap.Geocoder();
      const regeoCode = (lnglat: any) => {
        if (!marker.value) {
          marker.value = new AMap.Marker({
            map: map.value,
            position: lnglat,
          });
          map.value?.add(marker.value);
        }
        marker.value.setPosition(lnglat); //设置标记的位置
        geocoder.getAddress(lnglat, function (status, result: any) {
          if (status === "complete" && result.regeocode) {
            var address = result.regeocode.formattedAddress;
            jobTypeList.value.workAreaName = address;
          }
        });
        // marker.value.setMap(map.value!); //在地图上显示一个标记
      };
    }
  );
};

onMounted(() => {
  if (route.params.PublishJobId) {
    companyPositionService
      .getPosition({
        companyId: store.companyInformation.id,
        id: route.params.PublishJobId.toString(),
      })
      .then((res) => {
        jobTypeList.value = res;
        cityInfo.value = [
          jobTypeList.value.workProvinceName,
          jobTypeList.value.workCityName,
        ];
        loadMap();
      });
  } else {
    loadMap();
  }
});

const { directionTags } = storeToRefs(store);
if (directionTags.value === null) {
  commonService.getDirectionTags({ positionName: "软件工程师" }).then((res) => {
    store.directionTags = res;
  });
}

interface CityInfo {
  children: { value: string; label: string }[];
  value: string;
  label: string;
}
const cityMap = ref<CityInfo[]>([]);
const cityInfo = ref<string[]>([]);

commonService.getCities().then((res) => {
  cityMap.value = res.map((item) => {
    return {
      value: item.provinceName,
      label: item.provinceName,
      children: item.cities.map((city) => {
        return {
          value: city,
          label: city,
        };
      }),
    };
  });
});

const workTimeing = ref([]);
// 当用户更改工作时间时调用的函数。
const handleWorkTimeChange = (val: Array<string>) => {
  let startTime = useTime(val[0]);
  let endTime = useTime(val[1]);
  jobTypeList.value.workTime = startTime;
  jobTypeList.value.overTime = endTime;
};
// 当用户在地图上选择一个位置时调用的函数。
const handleArea = (address: any) => {
  jobTypeList.value.workAreaName = address.address;
  let lnglat = {
    longitude: address.location.lng,
    latitude: address.location.lat,
  };
  jobTypeList.value.workingPlace = lnglat;

  let markerLnglat = [address.location.lng, address.location.lat] as [
    number,
    number
  ];
  marker.value.setPosition(markerLnglat);
  map.value?.add(marker.value);
  map.value?.setCenter(markerLnglat);
};
const heightLightMap = ["团队和谐"];
const publishPost = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      jobTypeList.value.personnel = {
        id: store.accountInformation.detailId.personnel!,
      } as Personnel;
      jobTypeList.value.company = {
        id: store.companyInformation.id,
      } as Company;
      handleWorkTimeChange(workTimeing.value);
      companyPositionService
        .addPosition({
          companyId: store.companyInformation.id,
          requestBody: jobTypeList.value,
        })
        .then(() => {
          ElMessage.success("恭喜您，职位发布成功");
          router.push({ name: "Manage" });
        });
    }
  });
};
const updatePost = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      jobTypeList.value.personnel = {
        id: store.accountInformation.detailId.personnel!,
      } as Personnel;
      jobTypeList.value.company = {
        id: store.hrInformation.id,
      } as Company;
      companyPositionService
        .updatePosition({
          companyId: store.companyInformation.id,
          id: route.params.PublishJobId.toString(),
          requestBody: jobTypeList.value,
        })
        .then(() => {
          ElMessage.success("恭喜您，职位修改成功");
          router.go(-1);
        });
    }
  });
};
const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const disabledSeconds = () => {
  return makeRange(1, 59);
};
</script>

<style lang="scss" scoped>
a {
  color: rgb(0 179 139);
  text-decoration: none;
}

.upside {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;

  .upside-lia {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 100%;
    font-size: 14px;

    .line {
      width: 100%;
      height: 1px;
      background-color: rgb(50 55 62 / 50%);
    }
  }
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.explain {
  margin-left: 40px;
  font-size: 12px;
  color: rgb(50 55 62 / 50%);
}

.beneath {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .inside {
    width: 80%;
    height: 730px;
    margin-top: 40px;

    .divider {
      height: 30px;
      background-color: rgb(50 55 62 / 50%);
    }

    .el-form {
      margin-top: 20px;

      .el-form-item {
        .light-select {
          width: 600px;
        }

        ::v-deep .el-cascader {
          width: 600px;
        }

        .search {
          display: flex;
          justify-content: flex-end;
          width: 100%;

          input {
            margin-left: 20px;
          }
        }

        .select {
          position: relative;
          width: 600px;
          height: 40px;
          line-height: 30px;
          border: solid 1px #dcdfe6;
          border-radius: 4px;

          .font {
            position: absolute;
            top: 4px;
            left: 12px;
            width: 100%;
            overflow-x: auto;
            font-size: 14px;
            color: #ababb2;
            white-space: nowrap;

            .rechar {
              img {
                position: absolute;
                top: 10px;
                right: 25px;
                width: 16px;
                height: 16px;
              }
            }
          }

          img {
            position: absolute;
            top: 10px;
            right: 12px;
            width: 16px;
            height: 16px;
          }
        }

        .map {
          display: flex;
          width: 100%;
          height: 180px;

          #container {
            width: 390px;
            height: 180px;
            border-radius: 5px;
          }

          .el-scrollbar {
            width: 35%;

            ul {
              margin-top: -8px;
              margin-left: -10px;
              list-style-type: none;

              li {
                word-break: keep-all;
                white-space: nowrap;
                cursor: pointer;
              }
            }
          }
        }
      }

      .text-gray-500 {
        margin: 0 20px;
      }
    }
  }
}
</style>
