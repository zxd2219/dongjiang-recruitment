<template>
  <div>
    <div class="state">
      <div class="left">
        <span>01</span>
        <span class="info">完善个人信息</span>
      </div>
      <div class="line"></div>
      <div class="right">
        <span>02</span>
        <span class="info">完善公司信息</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$font-colors: #00b38a;

.state {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 55px;

  .left {
    display: flex;
    flex-direction: column;
    margin-right: 70px;
    font-size: 20px;
    color: $font-colors;

    span {
      text-align: center;
    }

    .info {
      margin-top: 10px;
      font-size: 10px;
    }
  }

  .line {
    width: 10vw;
    height: 1px;
    margin-right: 70px;
    background-color: rgb(0 0 0 / 20%);
  }

  .right {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    color: $font-colors;

    span {
      text-align: center;
    }

    .info {
      margin-top: 10px;
      font-size: 10px;
    }
  }
}
</style>
