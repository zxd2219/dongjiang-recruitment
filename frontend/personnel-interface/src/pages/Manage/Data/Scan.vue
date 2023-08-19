<template>
  <div class="content">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import type { PropType } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";

let props = defineProps({
  inspectionRecordCounts: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  dataInfo: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
});

// 使用 echarts 库创建图表。
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
provide(THEME_KEY, "dark");
const option = ref({
  title: {
    text: props.title,
    left: "center",
  },

  xAxis: {
    data: props.dataInfo,
  },
  yAxis: {},
  series: [
    {
      data: props.inspectionRecordCounts,
      type: "line",
      areaStyle: {
        color: "#ff0",
        opacity: 0.5,
      },
    },
  ],
});

watchEffect(() => {
  let p = props.inspectionRecordCounts;
  option.value.xAxis.data = props.dataInfo;
  option.value.series[0].data = p;
});
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .chart {
    width: 1000px;
    height: 350px;
  }
}
</style>
