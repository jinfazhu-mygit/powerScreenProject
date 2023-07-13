<template>
  <div class="right-top-panel">
    <!-- 水球 -->
    <water-ball :size="230"></water-ball>
    <!-- 右侧图例 -->
    <div class="legend">
      <template v-for="item in panelItems" :key="item">
        <div class="leg-name">
          <span :class="['dot', `area${item.id}`]"></span>
          <span class="name">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import waterBall from './water-ball.vue';

const panelItems = reactive([
  {id: 1, name: '深圳', percentage: '30%'},
  {id: 2, name: '广州', percentage: '20%'},
  {id: 3, name: '东莞', percentage: '10%'},
  {id: 4, name: '佛山', percentage: '10%'},
  {id: 5, name: '其它', percentage: '30%'}
])
</script>

<style lang="less" scoped>
.right-top-panel {
  width: 100%;
  height: 100%;
  position: relative;
}

.right-top-panel .legend {
  flex: 1;
  position: absolute;
  top: 60px;
  right: 60px;
}
.right-top-panel .leg-name {
  margin-top: 23px;
  margin-left: 40px;
}
.right-top-panel .leg-name span {
  display: inline-block;
  font-size: 20px;
  margin-right: 11px;
}
.right-top-panel .legend .dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
}
.right-top-panel .legend .area1 {
  background-color: #209393;
}
.right-top-panel .legend .area2 {
  background-color: #1a54a5;
}
.right-top-panel .legend .area3 {
  background-color: #85caf0;
}
.right-top-panel .legend .area4 {
  background-color: #f5b64a;
}
.right-top-panel .legend .area5 {
  background-color: #ee792e;
}
.right-top-panel .legend .name {
  color: white;
}
.right-top-panel .legend .percentage {
  color: #0cd2ea;
}
</style>