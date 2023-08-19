<template>
  <div>
    <SystemHeader />
  </div>
  <div class="beneath">
    <div class="main">
      <div class="content">
        <div class="solution">
          <span
            >{{
              hour < 9
                ? "早上好"
                : hour < 12
                ? "上午好"
                : hour < 15
                ? "中午好"
                : hour < 19
                ? "下午好"
                : "晚上好"
            }}，{{ store.hrInformation.hrName }}</span
          >
          <span>时间和注意力是你最宝贵的财富！~</span>
        </div>
        <div class="label">
          <div>
            <span>{{ num.count }}</span>
            <span>新简历</span>
          </div>
          <div>
            <span>{{ num.countCommunication }}</span>
            <span>待沟通</span>
          </div>
          <div>
            <span>{{ num.countInterviewed }}</span>
            <span> 今日待面试</span>
          </div>
          <div @click="goPosition">
            <span>{{ recruitmentPosition!.total }}</span>
            <span>在招职位数</span>
          </div>
        </div>
        <div class="bottom">
          <div class="notice">
            <div class="whole">
              <span>全部({{ num.total }})</span>
              <el-divider direction="vertical" />
              <span>面试({{ num.countInterviewed }})</span>
            </div>
            <div class="add"></div>
          </div>
          <div class="time-line">
            <el-timeline>
              <el-timeline-item
                v-for="interview in deliveryRecords!.items"
                :key="interview.updatedAt"
                :timestamp="interview.createdAt"
                placement="top"
              >
                <el-card class="el-card-define">
                  <div class="card">
                    <div class="left">
                      <img src="@/assets/message.png" alt="" />
                      <div>
                        <h4>面试提醒</h4>
                        <div class="hint">
                          <p>
                            候选人:{{
                              interview.applicant.firstName +
                              "" +
                              interview.applicant.lastName
                            }}
                          </p>
                          <el-divider direction="vertical" />
                          <p>应聘职位：{{ interview.position.positionName }}</p>
                        </div>
                        <p>
                          面试时间：{{ interview.interviewTime || "未邀请" }}
                        </p>
                      </div>
                    </div>
                    <div class="right">
                      <el-button
                        type="primary"
                        @click="inspectionResume(interview)"
                        >查看简历</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemHeader from "@/components/System/SystemHeader.vue";
import router from "@/router";
import { useMainStore } from "@/stores/main";
import type { DeliveryRecord } from "@dongjiang-recruitment/service-common";
import { useTimestamp } from "@vueuse/core";

const store = useMainStore();
const timestamp = useTimestamp();
const hour = computed(() => {
  return new Date(timestamp.value).getHours();
});

const { data: recruitmentPosition } = companyPositionService.useQueryPosition(
  () => ({
    companyId: store.companyInformation.id,
    size: 0,
  }),
  {
    pollingInterval: 1000 * 60 * 5,
    initialData: {
      total: 0,
      items: [],
    },
  }
);

const { data: deliveryRecords } = applicantService.useQueryAllDeliveryRecord(
  () => ({
    query: {
      "company.id": ["$eq", store.companyInformation.id],
      status: ["$in", 1, 2, 3, 4],
    },
    size: 9999999,
  }),
  {
    pollingInterval: 1000 * 60 * 5,
    initialData: {
      total: 0,
      items: [],
    },
  }
);
const num = computed(() => {
  let count = 0;
  let countCommunication = 0;
  let countInterviewed = 0;
  let total = 0;
  deliveryRecords.value!.items.forEach((item) => {
    if (item.status === 1) {
      count++;
    }
    if (item.status === 2) {
      countCommunication++;
    }
    if (item.status === 3) {
      countInterviewed++;
    }
    total++;
  });
  return {
    count,
    countCommunication,
    countInterviewed,
    total,
  };
});

const goPosition = () => {
  router.push("/System/Position");
};

const inspectionResume = (delivery: DeliveryRecord) => {
  // 变更状态函数，将选中的简历信息的状态进行变更
  if (delivery.status === 1) {
    delivery.status = 2;
    applicantDeliveryRecordService
      .updateDeliveryRecord({
        applicantId: delivery.applicant.id,
        id: delivery.id,
        requestBody: delivery,
      })
      .then(() => {
        router.push({
          name: "Resume",
          params: {
            userId: delivery.applicant.id,
            postId: delivery.position.id,
          },
        });
      });
  } else {
    router.push({
      name: "Resume",
      params: {
        userId: delivery.applicant.id,
        postId: delivery.position.id,
      },
    });
  }
};
</script>

<style scoped lang="scss">
.beneath {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;

  .main {
    display: flex;
    justify-content: center;
    width: 95%;
    height: auto;
    margin-top: 25px;
    border: solid 1px #ccc;
    border-radius: 10px;

    .content {
      width: 90%;
      margin-top: 45px;

      .solution {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 45px;

        :nth-child(2) {
          font-size: 16px;
          color: #ccc;
          letter-spacing: 2px;
        }
      }

      .label {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        margin-top: 30px;
        background-color: rgb(250 250 250);
        border: solid 2px #f5f6f7;

        div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 2px;

          span {
            text-align: center;
          }
        }
      }

      .bottom {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;
        margin-top: 30px;

        .notice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 50px;
          background-color: rgb(250 250 250);
          border: solid 1px #f3f4f5;

          .whole {
            height: 21px;
            margin-left: 30px;

            :first-child {
              color: rgb(0 179 139);
            }
          }

          .add {
            display: flex;
            align-items: center;
            height: 21px;
            margin-right: 30px;
          }
        }

        .time-line {
          height: auto;
          margin-top: 40px;

          .card {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              align-items: center;

              img {
                width: 40px;
                height: 40px;
              }

              .hint {
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
