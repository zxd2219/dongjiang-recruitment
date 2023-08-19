<template>
  <div class="cards">
    <div class="center">
      <el-form
        ref="formRef"
        :model="formCompany"
        label-width="120px"
        :rules="rule"
        style="max-width: 500px"
      >
        <el-form-item label="公司名称" prop="fullName">
          <el-input v-model="formCompany.fullName" type="text" />
        </el-form-item>
        <el-form-item label="公司Logo">
          <div class="avatar">
            <div @click="uploadgogo">
              <input
                ref="uploadInput"
                type="file"
                style="display: none"
                name="icon"
                @change="dealfilechange"
              />
              <img
                v-if="formCompany?.logoUrl"
                :src="VITE_CDN_URL + formCompany?.logoUrl"
                class="avatar"
                style="width: 80px; height: 80px"
                alt=""
              />
              <el-icon v-else class="avatar-uploader-icon" :size="30">
                <Plus />
              </el-icon>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="公司行业" prop="comprehensionName">
          <el-input
            v-model="formCompany.comprehensionName"
            :input-style="{ display: 'none' }"
          />
          <div class="select" @click="dialogFormVisible = true">
            <span>{{ formCompany.comprehensionName || "请选择" }}</span>
            <img src="@/assets/down.png" alt="" />
          </div>
          <el-dialog v-model="dialogFormVisible" title="请选择公司行业">
            <Tag @submit-data="submitData" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </el-form-item>
        <el-form-item label="所在城市" style="width: auto">
          <el-cascader
            v-model="cityInfo"
            :options="cityMap"
            placeholder="请选择"
            style="width: 411px"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="workAreaName">
          <div class="search">
            <el-input
              v-model="formCompany.address"
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
        <el-form-item label="公司规模" prop="scale">
          <el-select v-model="formCompany.scale" placeholder="请选择">
            <el-option label="少于15人" value="1" />
            <el-option label="15-50人" value="2" />
            <el-option label="50-150人" value="3" />
            <el-option label="150-500人" value="4" />
            <el-option label="500-2000人" value="5" />
            <el-option label="2000人以上" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="关于我们" prop="about">
          <el-input
            v-model="formCompany.about"
            type="textarea"
            show-word-limit
            maxlength="200"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCompany(formRef)"
            >修改信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAvatarUpload from "@/hooks/useAvatarUpload";
import Tag from "@/pages/Home/Tag.vue";
import { useMainStore } from "@/stores/main";
import type { Company } from "@dongjiang-recruitment/service-common";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance } from "element-plus";
import type { Ref } from "vue";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const formRef = ref<FormInstance>();
const store = useMainStore();
const dialogFormVisible = ref(false);
const map = shallowRef<AMap.Map>();
const marker = shallowRef<AMap.Marker>();
const placeSearch = shallowRef();
const aboutAddress = ref<any>([]);
//表格数据
const formCompany = reactive<Company>(store.companyInformation);
const cityInfo = ref<string[]>([]);
const handleArea = (address: any) => {
  formCompany.address = address.address;
  let lnglat = {
    longitude: address.location.lng,
    latitude: address.location.lat,
  };
  let markerLnglat = [address.location.lng, address.location.lat] as [
    number,
    number
  ];
  formCompany.location = lnglat;
  if (!map.value) {
    return;
  }
  if (!marker.value) {
    marker.value = new AMap.Marker({
      map: map.value,
      position: markerLnglat,
    });
    map.value?.add(marker.value);
  }
  marker.value.setPosition(markerLnglat);
  map.value.setCenter(markerLnglat);
};
// 上面的代码是一个 Vue 生命周期钩子。它在组件更新时调用。
onUpdated(() => {
  if (formCompany) {
    formCompany.cityName = cityInfo.value[1];
  }
});
// 安装组件时调用的 Vue 钩子。它使用 AMap API 创建地图并为其添加标记。
onMounted(() => {
  map.value = new AMap.Map("container", {
    zoom: 13,
  });
  if (formCompany.location.latitude !== null) {
    marker.value = new AMap.Marker({
      map: map.value,
      position: [formCompany.location.longitude, formCompany.location.latitude],
    });
    map.value?.add(marker.value);
    map.value?.setCenter([
      formCompany.location.longitude,
      formCompany.location.latitude,
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
        formCompany.location = {
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
            formCompany.address = address;
          }
        });
        // marker.value.setMap(map.value!); //在地图上显示一个标记
      };
    }
  );
});
// 当用户单击提交按钮时调用的函数。
const submitData = (data: {
  data: Ref<{ checked: boolean; fieldName: string }>;
}) => {
  if (data.data.value.checked) {
    formCompany.comprehensionName = data.data.value.fieldName;
  }
};
const rule = reactive({
  comprehensionName: [
    { required: true, message: "此项不能为空", trigger: "blur" },
  ],
  fullName: [{ required: true, message: "此项不能为空", trigger: "blur" }],
  address: [{ required: true, message: "此项不能为空", trigger: "blur" }],
  scale: [{ required: true, message: "此项不能为空", trigger: "blur" }],
});

//上传头像
const uploadInput = ref<HTMLElement | null>(null);
const dealfilechange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  let files = input.files;
  if (files) {
    if (useAvatarUpload(files[files.length - 1])) {
      formCompany.logoUrl = await commonService.uploadAvatar({
        avatar: files[files.length - 1],
      });
    }
  }
};
const uploadgogo = () => {
  let oBtn = uploadInput.value as HTMLInputElement;
  oBtn.click();
};
interface CityInfo {
  children: { value: string; label: string }[];
  value: string;
  label: string;
}
const cityMap = ref<CityInfo[]>([]);
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

const updateCompany = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      companyService
        .updateCompany({
          id: store.companyInformation.id,
          requestBody: formCompany,
        })
        .then((res) => {
          ElMessage.success("修改成功");
          store.companyInformation = res;
        });
    }
  });
};
</script>

<style scoped lang="scss">
.cards {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255);
  border: solid 1px rgb(117 244 216);
  border-radius: 5px;

  .center {
    width: 90%;
    height: 80%;
    margin-top: 20px;

    .el-form {
      display: flex;
      flex-direction: column;

      span {
        margin-left: 15px;
        font-size: 8px;
        color: #999;
      }

      .el-form-item {
        .el-select {
          width: 411px;
        }

        .search {
          display: flex;
          justify-content: flex-end;
          width: 600px;

          .el-input {
            width: 380px;
          }

          input {
            margin-left: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            outline-style: none;
          }
        }

        .map {
          display: flex;
          justify-content: space-between;
          width: 1600px;
          height: 180px;

          #container {
            width: 380px;
            height: 180px;
            border-radius: 5px;
          }

          .el-scrollbar {
            width: 240px;

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

        .select {
          position: relative;
          width: 411px;
          height: 30px;
          line-height: 30px;
          border: solid 1px #dcdfe6;
          border-radius: 4px;

          span {
            position: absolute;
            left: -5px;
            font-size: 14px;
            color: #ababb2;
          }

          img {
            position: absolute;
            top: 6px;
            right: 10px;
            width: 16px;
            height: 16px;
          }
        }

        .bottom-btn {
          display: flex;
        }
      }

      .avatar {
        display: flex;
        flex-wrap: nowrap;

        .avatar-uploader-icon {
          padding: 20px;
          border: solid 1px #dcdfe6;
        }
      }

      .el-button {
        width: 150px;
        height: 42px;
        margin-left: 120px;
      }
    }
  }
}
</style>
