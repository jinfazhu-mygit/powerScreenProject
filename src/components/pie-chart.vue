<template>
  <div ref="pieChartRef" class="pie-data" :style="{ width: width, height: height }">
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts'
import useEcharts from '@/hooks/useEcharts';

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  pieData: {
    type: Array,
    default: () => ([])
  }
})

const pieChartRef = ref(null)
onMounted(() => {
  // 初始化图表
  chartOperate(props.pieData)
})

// 图表数据监听与显示
watch(() => props.pieData, (newValue, oldValue) => {
  console.log('pieData发生变化')
  chartOperate(newValue)
}, {
  deep: true
})
let myChart = null
function chartOperate(pieData = []) {
  if(!myChart) {
    myChart = useEcharts(pieChartRef.value)
  }
  const options = getOptions(pieData)
  myChart.setOption(options);
}

function getOptions(pieDatas = []) {
  // =====准备数据=====
  // let pieDatas = ;

  // 将 pieDatas 格式的 数据映射为 系列图所需要的数据格式
  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
      itemStyle: {
        color: item.color,
      },
    };
  });

  // 求出总数
  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);
  // =====准备数据=====

  // 2.指定图表的配置项和数据
  let option = {
    // backgroundColor: "rgb(40,46,72)",
    grid: {
      show: true,
      // top: 0,
      // bottom: 0,
      // 靠左且不显示Y轴内容
      top: 20,
      left: 0,
      borderWidth: 0,
      // right: 0,
      containLabel: false,
    },
    // 标题组件
    title: {
      text: `充电桩总数`,
      top: "50%",
      left: "50%",
      padding: [-20, 0, 0, -45],
      textStyle: {
        fontSize: 19,
        color: "white",
      },

      // subtext: `2100`,
      // subtextStyle : {
      //   color: 'red'
      // },

      // 副标题使用-富文本语法：{style_name|value}， 注意不能有空格
      subtext: `{totalSty|${total}}`,
      subtextStyle: {
        rich: {
          totalSty: {
            fontSize: 19,
            color: "white",
            width: 90,
            align: "center",
          },
        },
      },
    },

    legend: {
      // 竖向排列
      orient: "vertical",
      right: "10%",
      top: "18%",

      // 图例间隔
      itemGap: 10,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",

      // 自定义图例的名称
      formatter: function (name) {
        // 图例文本格式化 + 富文本定制样式  
        var currentItem = pieDatas.find((item) => item.name === name);
        // 注意图例文本样式写法
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        );
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
        radius: ["30%", "75%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
        label: {
          show: false,
        },
        // data: [  { name: '',   value: '',   itemStyle }  ],
        data: data,
        roseType: "area", //  area 玫瑰图, 圆心角一样，通过半径展现数据大小( 默认为false )
      },
    ],
  };

  return option
}
</script>

<style lang="less" scoped>
.pie-data {
  position: relative;
  top: 5%;
  right: 5%;
}
</style>