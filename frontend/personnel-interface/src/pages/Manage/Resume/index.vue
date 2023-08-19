<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <div class="left">
            <div class="avatar">
              <img
                :src="
                  userInfo?.avatarUrl
                    ? VITE_CDN_URL + userInfo.avatarUrl
                    : imgUrl
                "
                alt="avatar"
              />
            </div>
            <div class="info">
              <span class="name">{{ userInfo ? userName : "" }}</span>
              <span class="state">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item>{{ userInfo?.sex }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{
                    userInfo?.age + "岁"
                  }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{
                    educationMap[(userInfo.education + 1) as 1 | 2 | 3 | 4]
                  }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{
                    userInfo?.workingYears
                      ? userInfo.workingYears + "年"
                      : "无经验"
                  }}</el-breadcrumb-item>
                </el-breadcrumb></span
              >
              <span class="state"
                >求职状态：{{
                  jobStatusMap[(userInfo!.jobStatus + 1) as 1 | 2 | 3]
                }}</span
              >
              <span class="state"
                >期望职位：{{ positionInfo?.positionName }}</span
              >
              <span class="state">期望地点：{{ userInfo?.cityName }}</span>
              <span class="state"
                >期望薪资：{{
                  positionInfo?.startingSalary +
                  "k" +
                  "-" +
                  positionInfo?.ceilingSalary +
                  "k"
                }}</span
              >
              <el-button type="primary" @click="toMessage(userInfo!.id)"
                >在线沟通</el-button
              >
              <div v-if="works.length > 0" class="project-docu">
                <h3>工作经历:</h3>
                <div v-for="work in works" :key="work.id">
                  <span>公司名称：{{ work.companyName }}</span>
                  <span>公司领域：{{ work.companyIndustry }}</span>
                  <span>部门名称{{ work.departmentName }}</span>
                  <span>职位名称{{ work.positionName }}</span>
                  <span>工作内容{{ work.jobContent }}</span>
                  <span>就职时间{{ work.startTime }}</span>
                  <span>离职时间{{ work.endTime }}</span>
                </div>
              </div>
              <div v-else>
                <h3>项目经历：</h3>
                <img
                  style="width: 250px; height: 200px"
                  src="@/assets/nocontent.jpg"
                  alt=""
                />
              </div>
            </div>
            <div class="info2">
              <div v-if="works.length > 0" class="img-docu">
                <h3>图片作品：</h3>
                <div v-for="(imageurl, i) in userInfo.pictureWorks" :key="i">
                  <img :src="imageurl" alt="图片作品" />
                </div>
              </div>
              <div v-else>
                <h3>图片作品：</h3>
                <img
                  style="width: 250px; height: 200px"
                  src="@/assets/nocontent.jpg"
                  alt=""
                />
              </div>
              <div v-if="projects.length > 0" class="project-docu">
                <h3>项目经历:</h3>
                <div v-for="project in projects" :key="project.id">
                  <span>项目名：{{ project.projectName }}</span>
                  <span>项目描述：{{ project.projectDescription }}</span>
                  <span>项目成就：{{ project.achievement }}</span>
                  <span>项目开始时间：{{ project.startTime }}</span>
                  <span>项目结束时间：{{ project.endTime }}</span>
                  <span>项目链接：{{ project.projectLink }}</span>
                  <span
                    >项目开始时间-项目截至时间{{
                      project.startTime + "-" + project.endTime
                    }}</span
                  >
                  <span>{{ project.achievement }}</span>
                  <span>{{ project.projectLink }}</span>
                </div>
              </div>
              <div v-else>
                <h3>项目经历：</h3>
                <img
                  style="width: 250px; height: 200px"
                  src="@/assets/nocontent.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="right">
            <el-divider
              direction="vertical"
              border-style="dashed"
              style="height: 80%"
            />
            <div class="comment">
              <h4>个人优势</h4>
              <div class="font">{{ userInfo?.personalAdvantage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useMainStore, useMessageStore } from "@/stores/main";
import type {
  Applicant,
  Personnel,
  Position,
  ProjectExperience,
  WorkExperience,
} from "@dongjiang-recruitment/service-common";
import { useRoute } from "vue-router";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const route = useRoute();
const store = useMainStore();
const userInfo = ref<Applicant>({} as Applicant);
const userName = computed(() => {
  return userInfo.value.firstName + userInfo.value.lastName;
});
const projects = ref<ProjectExperience[]>([]);
const works = ref<WorkExperience[]>([]);

void applicantProjectExperienceService
  .queryProjectExperience({
    applicantId: route.params.userId as string,
  })
  .then((res) => {
    projects.value = res.items;
  });

void personnelInspectionRecordService.addHrInspectionRecord({
  personnelId: store.hrInformation.id,
  requestBody: {
    applicant: {
      id: route.params.userId as string,
    } as Applicant,
    personnel: {
      id: store.hrInformation.id,
    } as Personnel,
  },
});

void applicantWorkExperienceService
  .queryWorkExperience({
    applicantId: route.params.userId as string,
  })
  .then((res) => {
    works.value = res.items;
  });

const positionInfo = ref<Position>();
const educationMap = { 1: "大专", 2: "本科", 3: "硕士", 4: "博士" };
const jobStatusMap = { 1: "随时入职", 2: "2周内入职", 3: "1月内入职" };
const imgUrl =
  "https://tse1-mm.cn.bing.net/th/id/R-C.7b9f3020f3c91e5f76b4df2e7ea25de1?rik=deUQMVk41dSjNQ&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202007%2f2020071213324342.jpg&ehk=2kp7%2fRJpUGhKSaZH2j2g8lKPBohMH9veb%2f4AuNFaemc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1";

if (typeof route.params.userId === "string") {
  applicantService
    .getApplicant({
      id: route.params.userId,
    })
    .then((res) => {
      userInfo.value = res;
    });
} else {
  applicantService
    .getApplicant({
      id: route.params.userId[0],
    })
    .then((res) => {
      userInfo.value = res;
    });
}
if (typeof route.params.postId === "string") {
  companyPositionService
    .getPosition({
      companyId: store.companyInformation.id,
      id: route.params.postId,
    })
    .then((res) => {
      positionInfo.value = res;
    });
} else {
  companyPositionService
    .getPosition({
      companyId: store.companyInformation.id,
      id: route.params.postId[1],
    })
    .then((res) => {
      positionInfo.value = res;
    });
}
const messageStore = useMessageStore();
// 用于将用户推送到消息页面的功能。
const toMessage = (userId: string) => {
  if (userId === undefined) {
    return;
  }
  if (!messageStore.messages[userId]) {
    messageStore.messages[userId] = [];
  }
  void router.push({
    name: "Message",
    params: {
      userId: userId,
    },
  });
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(245 245 250);

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .center {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      background: #fff;
      border: 1px solid #d5d6d7;
      border-radius: 5px;

      .total {
        display: flex;
        justify-content: space-between;
        width: 95%;
        height: 680px;

        .left {
          display: flex;
          width: 100%;

          .avatar {
            width: 15%;
            height: 100%;
            padding-left: 20px;
            margin-top: 40px;

            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }

          .info {
            display: flex;
            flex-direction: column;
            width: 40%;
            height: 100%;
            padding-top: 30px;

            .name {
              margin: 20px 0;
            }

            .state {
              margin: 15px 0;
              font-size: 10px;
              color: rgb(0 179 139);
            }

            .el-button {
              width: 40%;
              height: 50px;
              margin: 15px 0;
            }
          }

          .info2 {
            display: flex;
            flex-direction: column;
            width: 40%;
            height: 100%;
            padding-top: 30px;

            .img-docu {
              width: 100%;
              height: 50%;
            }

            .project-docu {
              width: 100%;
              height: 50%;
            }
          }
        }

        .right {
          display: flex;
          width: 20%;
          height: 100%;
          margin: 5% 0;

          .comment {
            width: 100%;
            text-align: center;

            .font {
              font-size: 14px;
              font-weight: 400;
              letter-spacing: 2px;
              word-wrap: break-word;
            }
          }
        }
      }
    }
  }
}
</style>
