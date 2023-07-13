<template>
  <div ref="barChartRef" :style="{ width, height }">
  </div>
</template>

<script setup>
import useEcharts from '@/hooks/useEcharts';
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  barData: {
    type: Object,
    default: () => ([])
  }
})

watch(() => props.barData, (newValue, oldValue) => {
  barDataChange(newValue)
})

const barChartRef = ref(null)

let myChart = null
onMounted(() => {
  barDataChange(props.barData)
})

function barDataChange(barData) {
  if (!myChart) {
    myChart = useEcharts(barChartRef.value)
  }

  let option = {
    // backgroundColor: "rbg(40,46,72)",
    grid: {
      left: "5%",
      right: "9%",
      top: "30%",
      bottom: "5%",
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      name: "月份",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },

      data: barData.map(item => item.name),
    },
    yAxis: {
      name: "个",
      nameTextStyle: {
        color: "white",
        fontSize: 13,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisLabel: {
        color: "white",
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 17,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#01B1FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#033BFF", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: barData.map(item => item.value),
      },
    ],
  };

  myChart.setOption(option)
}
</script>

<style lang="less" scoped>

</style>