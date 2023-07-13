import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts'
import _ from 'lodash'

export default function useEcharts(refEl) {
  let echartInstance = echarts.init(refEl, null, { renderer: 'svg' });

  onUnmounted(() => { // 自动销毁
    echartInstance.dispose()
  })

  return echartInstance
}