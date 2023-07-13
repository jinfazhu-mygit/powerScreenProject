import { onMounted, onUnmounted } from 'vue';

import _ from 'lodash'

export default function useScalePage(options) {
  onMounted(() => {
    triggerScale()
    window.addEventListener('resize', sizeChange)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', sizeChange)
  })

  const sizeChange = _.throttle(() => {
    triggerScale()
  }, 100)

  function triggerScale(options = {}) {
    // 设计稿宽高
    const targetX = options.xLength || 1920;
    const targetY = options.yLength || 1080;

    // 获取html或body的宽度和高度（不包含滚动条）
    const currentX = document.documentElement.clientWidth || document.body.clientWidth;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
    const currentY = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(currentX, currentY, targetY)
    // 1.计算当前屏幕比例
    const currentRatio = currentX / currentY

    const bodyEl = document.querySelector("body");
    // 2.根据比例进行缩放
    // 如果当前屏幕宽高比大于设计稿宽高比->以高度为准进行缩放
    if (currentRatio > targetX / targetY) {
      const scaleRatio = currentY / targetY
      bodyEl.setAttribute('style', `transform: scale(${scaleRatio}) translateX(-50%);left: 50%;`)
    } else {
      // 如果当前屏幕宽高比小于设计稿宽高比->以宽度为准进行缩放
      const ratio = currentX / targetX;
      bodyEl.setAttribute("style", `transform: scale(${ratio}) translateY(-50%); top: ${currentY / 2}px;`);
    }
  }
}