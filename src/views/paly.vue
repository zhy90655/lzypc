<template>
  <div class="play">
    <div class="vid fxi">
      <p class="btns fxi">
        <i class="fxi" :class="[disIndex.includes(i)&&'dis',idx===i&&'act']" v-for="(_ ,i) in btns" @click="hdclick(i)" :key="i"><img :src="_.img"></i>
      </p>
      <video ref="preview" v-if="!data.connected" id="player" x5-playsinline="true" playsinline="true" webkit-playsinline="true" autoplay controls>
        <!-- <source src="/static/video/media.mkv"> -->
        <source src="/static/video/xg.mp4">
      </video>
      <div class="nodata fxi" v-else>
        <el-icon v-if="loading" class="is-loading"><Loading /></el-icon>
        <img v-else src="../assets/img/play/cmr.png">
      </div>
      <div :class="['cover',showSet&&'showset']" @click="showSet=0">
        <transition name="page-move">
          <Newset v-if="showSet" @close='showSet=0' />
        </transition>
      </div>
    </div>
    <div :class="['ctrl fxi',spread&&'spread']">
      <el-icon @click="$emit('update:spread',!spread)"><ArrowRightBold v-if="spread" /><ArrowLeftBold v-else /></el-icon>
      <input type="file" multiple @change="hdcg">
    </div>
  </div>
</template>

<script>
import { ArrowRightBold, ArrowLeftBold, Loading } from '@element-plus/icons-vue'
import { recording, shot } from '../utils/cut'
import { bFileReader } from '../utils/tool'
import { ElMessage } from 'element-plus'
import Newset from '../components/newset'
import JMuxer from 'jmuxer'
const rq = (v) => require('../assets/img/icons/' + v + '.png')
export default {
  components: { ArrowRightBold, ArrowLeftBold, Loading, Newset },
  emits: ['change', 'update:spread', 'setting'],
  props: ['data', 'spread', 'loading'],
  data() {
    return {
      btns: [{ v: 'video', l: '录制' }, { v: 'capture', l: '截图' }, { v: 'dj', l: '对讲' }, { v: 'record', l: '回放' },
        { v: 'light', l: '灯光' }, { v: 'alarm', l: '警告' }, { v: 'setting', l: '设置' }].map(_ => ({ img: rq(_.v), ..._ })),
      idx: '',
      showSet: 1
    }
  },
  computed: {
    disIndex() {
      return ({ 0: [1, 2, 3, 4, 5, 6], 3: [2, 4, 5, 6] })[this.idx] || []
    }
  },
  methods: {
    hdcg({ target: { files } }) {
      if (!files[1]) return ElMessage.error('请选择文件')
      const jmuxer = new JMuxer({
        node: 'player',
        flushingTime: 1000,
        clearBuffer: false,
        debug: true
      })
      const file = [...files]
      let [acc, h264] = file
      if (acc.name.includes('h264')) [h264, acc] = file
      Promise.all([bFileReader(h264), bFileReader(acc)]).then(res => {
        jmuxer.feed({
          video: new Uint8Array(res[0].target.result),
          audio: new Uint8Array(res[1].target.result),
          duration: 0
        })
      })
    },
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
        case 6: this.showSet = true; break // 设置
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
    overflow: hidden;
    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    }
    .showset {
      pointer-events: auto;
    }
    &:hover .btns {
      pointer-events: auto;
      opacity: 1;
    }
    .vid {
      min-width: 500px;
      width: 100%;
    }
    video {
      display: block;
      margin: auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-height: 789px;
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
