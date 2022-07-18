<template>
  <div class="play">
    <div class="vid fxi">
      <!-- <div class="btns" v-if="data.connected"></div> -->
      <p class="btns fxi">
        <i class="fxi" :class="[disIndex.includes(i)&&'dis',idx===i&&'act']" v-for="(_ ,i) in btns" @click="hdclick(i)" :key="i"><img :src="_.img"></i>
      </p>
      <video ref="preview" v-if="data.connected" muted x5-playsinline="true" playsinline="true" webkit-playsinline="true" autoplay controls>
        <source src="/static/video/media.mkv">
      </video>
      <div class="nodata fxi" v-else>
        <el-icon v-if="loading" class="is-loading"><Loading /></el-icon>
        <img v-else src="../assets/img/play/cmr.png">
      </div>
    </div>
    <div :class="['ctrl fxi',spread&&'spread']">
      <el-icon @click="$emit('update:spread',!spread)"><ArrowRightBold v-if="spread" /><ArrowLeftBold v-else /></el-icon>
    </div>
  </div>
</template>

<script>
import { ArrowRightBold, ArrowLeftBold, Loading } from '@element-plus/icons-vue'
import { recording, shot } from '../utils/cut'
import { ElMessage } from 'element-plus'
const rq = (v) => require('../assets/img/icons/' + v + '.png')
export default {
  components: { ArrowRightBold, ArrowLeftBold, Loading },
  emits: ['change', 'update:spread'],
  props: ['data', 'spread', 'loading'],
  data() {
    return {
      btns: [{ v: 'video', l: '录制' }, { v: 'capture', l: '截图' }, { v: 'dj', l: '对讲' }, { v: 'record', l: '回放' },
        { v: 'light', l: '灯光' }, { v: 'alarm', l: '警告' }, { v: 'setting', l: '设置' }].map(_ => ({ img: rq(_.v), ..._ })),
      idx: ''
    }
  },
  computed: {
    disIndex() {
      return ({ 0: [1, 2, 3, 4, 5, 6], 3: [2, 4, 5, 6] })[this.idx] || []
    }
  },
  methods: {
    hdclick(i) {
      if (this.disIndex.includes(i)) return ''
      console.log(i)
      switch (i) {
        case 0: recording(this); break // 视频录制
        case 1: shot(this); break // 截图
        case 2: ElMessage('敬请期待！'); break // 对讲
        case 3: this.showSet = this.idx !== 3; this.idx = this.idx === 3 ? '' : 3; break // 回放
        case 4: ElMessage('敬请期待！'); break // 开灯
        case 5: this.showSet = true; this.setTabValue = 'alarmInformation'; break // 警告设置
        case 6: this.showSet = true; this.setTabValue = 'notificationInformation'; break // 设置
      }
    }
  },
  watch: {
    data(v) {
      console.log(v)
    }
  }
}
</script>
<style scoped lang="scss">
.play {
  background-color: var(--vidb-color);
  display: flex;
  flex-direction: column;
  .vid {
    flex-grow: 1;
    position: relative;
    &:hover .btns {
      pointer-events: auto;
      opacity: 1;
    }
    .vid {
      min-width: 500px;
      width: 100%;
    }
    video {
      width: 100%;
    }
    .nodata {
      width: 100%;
      justify-content: center;
      .el-icon {
        font-size: 36px;
      }
      img {
        width: 63px;
      }
    }
  }
  .ctrl {
    height: 60px;
    background-color: var(--bg-color);
    flex-shrink: 0;
    .el-icon {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background-color: var(--bt-color);
      border-radius: 0 16px 16px 0;
      cursor: pointer;
    }
  }
}
.btns {
  justify-content: center;
  left: 0px;
  bottom: 0;
  width: 100%;
  z-index: 1;
  position: absolute;
  background-color: rgba($color: #000000, $alpha: 0.5);
  height: 50px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  i {
    cursor: pointer;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    &.act {
      background-color: rgba($color: #bbb, $alpha: 0.5);
    }
    &:hover {
      background-color: rgba($color: #bbb, $alpha: 0.7);
    }
    &:active {
      background-color: rgba($color: #bbb, $alpha: 0.9);
    }
    &.dis {
      cursor: not-allowed;
      opacity: 0.7;
      background-color: transparent;
    }
    &+i {
      margin-left: 22px;
    }
    &:nth-child(6) img {
      width: 28px;
    }
    &:nth-child(7) img {
      margin-top: 2px;
      width: 28px;
    }
  }
}

</style>
