<template>
  <NavigationBar title="用户反馈" />
  <view class="flex-col page">
    <view class="user-feedback">
      <view class="retroaction-type">
        <text style="font-size: 28rpx">请选择反馈类型</text>
        <view class="flex-row retroact-type">
          <view
            v-for="(retroactionType, i) in retroactionTypes"
            :key="i"
            class="justify-center items-center retroact"
            :class="choseNum.includes(i) ? 'active' : ''"
            @click="choseType(i)"
          >
            <text>{{ retroactionType }}</text>
          </view>
        </view>
      </view>
      <view class="flex-col elaborate">
        <text style="font-size: 28rpx">详细描述</text>
        <view class="describe">
          <scroll-view class="input-set" :scroll-y="true">
            <textarea
              v-model="opinion"
              class="input"
              placeholder="请写下您的宝贵意见（不得少与5个字符）"
              :maxlength="-1"
              :auto-height="true"
            />
          </scroll-view>
          <view
            class="flex-col items-center justify-center upload"
            @click="chooseImage"
          >
            <image class="image" src="@/static/icons/camera.svg" />
            <text>上传图片</text>
          </view>
        </view>
      </view>
      <text class="annotation">最多3张支持JPG、JPEG、PNG格式（选填）</text>
    </view>
  </view>
  <view class="justify-center items-center sub">
    <button class="btn" @click="submit">提交</button>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
const opinion = ref("");
const retroactionTypes = ref([
  "账号相关",
  "推荐相关",
  "邀约相关",
  "简历相关",
  "教育相关",
  "其他",
]);

const choseNum = ref<number[]>([]);
const choseType = (index: number) => {
  if (choseNum.value.includes(index)) {
    choseNum.value.splice(choseNum.value.indexOf(index), 1);
  } else {
    choseNum.value.push(index);
  }
};

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      console.log(res);
    },
  });
};
// 提交反馈
const submit = () => {
  if (!opinion.value) {
    uni.showToast({
      title: "反馈内容不能为空",
      icon: "none",
      duration: 1500,
    });
  } else {
    uni.showToast({
      title: "提交成功,感谢您的反馈",
      icon: "none",
      duration: 1500,
    });
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  margin-left: 20rpx;

  .active {
    background-color: rgb(35 193 158);
  }

  .user-feedback {
    width: 690rpx;
    padding-left: 20rpx;

    .retroaction-type {
      width: 690rpx;

      .retroact-type {
        flex-wrap: wrap;

        .retroact {
          width: 140rpx;
          height: 40rpx;
          margin-top: 15rpx;
          margin-right: 30rpx;
          font-size: 25rpx;
          white-space: normal;
          border: 2rpx solid rgb(230 230 230);
          border-radius: 5rpx;
        }
      }
    }

    .elaborate {
      width: 690rpx;
      margin-top: 30rpx;
      font-size: 25rpx;

      .describe {
        width: 670rpx;
        height: 500rpx;
        margin-top: 25rpx;
        background-color: rgb(215 215 215);

        .input-set {
          width: 660rpx;
          height: 320rpx;
          padding-left: 10rpx;
          margin-top: 10rpx;
          overflow: hidden;

          .input {
            line-height: 35rpx;
          }
        }

        .upload {
          width: 120rpx;
          height: 120rpx;
          margin-top: 40rpx;
          margin-left: 20rpx;
          border: 3rpx solid rgb(245 124 0);
          border-radius: 10rpx;

          .image {
            width: 35rpx;
            height: 35rpx;
          }
        }
      }
    }

    .annotation {
      margin-top: 15rpx;
      font-size: 15rpx;
      color: gray;
    }
  }
}

.sub {
  position: relative;
  top: 500rpx;
  width: 100%;

  .btn {
    width: 600rpx;
    height: 80rpx;
    font-size: 30rpx;
    color: #fff;
    background-color: rgb(35 193 158);
    border-radius: 10rpx;
  }
}
</style>
