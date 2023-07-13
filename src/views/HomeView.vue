<template>
  <div class="home-view">
    <div class="header"></div>

    <div class="left-top">
      <pie-chart :pieData="pieData"></pie-chart>
    </div>
    <div class="left-bottom">
      <line-chart :lineData="lineData"></line-chart>
    </div>

    <div class="right-top">
      <right-top-panel></right-top-panel>
    </div>
    <div class="right-center">
      <bar-chart :barData="barData"></bar-chart>
    </div>
    <div class="right-bottom">
      <right-bottom></right-bottom>
    </div>

    <div class="center">
      <center-bg></center-bg>
    </div>
    <div class="bottom">
      <bottom-panel :panelItems="panelItems"></bottom-panel>
    </div>
  </div>
</template>

<script setup>
import useScalePage from '@/hooks/useScalePage.js'

import pieChart from '../components/pie-chart.vue';
import lineChart from '@/components/line-chart.vue';
import barChart from '@/components/bar-chart.vue';
import rightBottom from '@/components/right-bottom.vue';
import centerBg from '@/components/center-bg.vue';
import bottomPanel from '@/components/bottom-panel.vue';
import rightTopPanel from '@/components/right-top-panel.vue';

import { ref, reactive, computed } from 'vue';
import { getPageData } from '@/service';

// 大屏数据响应式展示
useScalePage()

// 饼图
const pieData = ref([{value:0}])

// 线图数据
const lineData = ref([
  [200, 200, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
  [500, 300, 202, 258, 280, 660, 320, 202, 308, 280, 660, 420]
])


// 柱状图数据
const barData = ref([
  ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
  [100, 2000, 3600, 1000, 1000, 2000, 4000]
])

// 数字滚动数据
const panelItems = ref([
  {
    id: 1,
    title: "充电桩总数(个)",
    totalNum: 8579.9,
    unit: "万",
    percentage: 79.5,
    isUp: true,
  },
  {
    id: 2,
    title: "年增长总数(个)",
    totalNum: 2856.6,
    unit: "万",
    percentage: 88.9,
    isUp: true,
  },
  {
    id: 3,
    title: "月增长总数(个)",
    totalNum: 1189.3,
    unit: "万",
    percentage: 62,
    isUp: false,
  },
])

// 网络数据获取
getPageData().then((res) => {
  console.log(res.data.data.chargingTop4.data)
  const result = res.data.data

  pieData.value = result.chargingPile.data
  lineData.value = result.processMonitoring.data
  barData.value = result.chargingStatistics.data
})
</script>

<style lang="less" scoped>
.home-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: #070a3c;
  background-image: url('@/assets/images/bg.png');
}

.header {
  position: absolute;
  top: 21px;
  left: 0;
  width: 100%;
  height: 56px;

  background-image: url(@/assets/images/bg_header.svg);
}

.left-top {
  /* 定位 */
  position: absolute;
  left: 16px;
  top: 116px;
  width: 536px;
  height: 443px;

  /* 背景 */
  background-image: url(@/assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.left-bottom {
  /* 定位 */
  position: absolute;
  left: 16px;
  bottom: 49px;
  height: 443px;
  width: 536px;
  /* 背景 */
  background-image: url(../assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;

  /* border: 2px solid pink; */
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>