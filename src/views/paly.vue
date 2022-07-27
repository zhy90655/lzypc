<template>
  <div class="play">
    <div class="vid fxi">
      <p class="btns fxi">
        <i class="fxi" :class="[disIndex.includes(i)&&'dis',idx===i&&'act']" v-for="(_ ,i) in btns" @click="hdclick(i)" :key="i"><img :src="_.img"></i>
      </p>
      <video ref="preview" v-if="data.connected" id="player" x5-playsinline="true" playsinline="true" webkit-playsinline="true" autoplay controls>
        <source src="/static/video/xg.mp4">
      </video>
      <div class="nodata fxi" v-else>
        <el-icon v-if="loading" class="is-loading"><Loading /></el-icon>
        <img v-else src="../assets/img/play/cmr.png">
      </div>
      <div :class="['cover',showset&&'showset']" @click="$emit('update:showset',0)">
        <transition name="page-move">
          <Set v-if="showset" @close="$emit('update:showset',0)" />
        </transition>
      </div>
    </div>
    <div :class="['ctrl fxi',spread&&'spread']">
      <el-icon @click="$emit('update:spread',!spread)"><ArrowRightBold v-if="spread" /><ArrowLeftBold v-else /></el-icon>
      <input type="file" multiple @change="hdcg">
    </div>
    <MotorDirect v-if="idx==3" @cls="idx=''" @change="setData('motionDetectionInformation',{motroControlDirection:$event})" />
  </div>
</template>

<script>
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import { ArrowRightBold, ArrowLeftBold, Loading } from '@element-plus/icons-vue'
import { recording, shot } from '../utils/cut'
import { bFileReader } from '../utils/tool'
import { ElMessage } from 'element-plus'
import { setData, getData } from '../api/mqtt/requst'
import Set from '../components/set'
import MotorDirect from '../components/set/MotorDirect.vue'
import JMuxer from 'jmuxer'
const rq = (v) => require('../assets/img/icons/' + v + '.png')
const ffmpeg = createFFmpeg({ log: true })
export default {
  components: { ArrowRightBold, ArrowLeftBold, Loading, Set, MotorDirect },
  emits: ['change', 'update:spread', 'update:showset', 'setting'],
  props: ['data', 'spread', 'loading', 'showset'],
  data() {
    window.__this = this
    return {
      btns: [{ v: 'video', l: '录制' }, { v: 'capture', l: '截图' }, { v: 'dj', l: '对讲' }, { v: 'direction', l: '回放' },
        { v: 'light', l: '灯光' }, { v: 'alarm', l: '警告' }, { v: 'setting', l: '设置' }].map(_ => ({ img: rq(_.v), ..._ })),
      idx: ''
    }
  },
  computed: {
    disIndex() {
      return ({ 0: [1, 2, 3, 4, 5, 6], 3: [2, 4, 5, 6] })[this.idx] || []
    }
  },
  beforeCreate() {
    this.pcmPlayer = null
    const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 })
    this.importObj = {
      env: {
        abortStackOverflow: () => { throw new Error('overflow') },
        table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        tableBase: 0,
        memory: memory,
        memoryBase: 102400,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength
      }
    }
    console.log(ffmpeg)
    this.wasm = fetch('/static/wasm/g711.wasm').then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, this.importObj))
  },
  methods: {
    setData,
    hdcg({ target: { files } }) {
      if (!files[1]) return ElMessage.error('请选择文件')
      const jmuxer = new JMuxer({
        node: 'player',
        mode: 'video', // both, audio, video
        flushingTime: 1000,
        clearBuffer: false,
        fps: 15,
        debug: true
      })
      const file = [...files]
      let [acc, h264] = file
      if (acc.name.includes('h264')) [h264, acc] = file
      Promise.all([bFileReader(h264), bFileReader(acc), this.wasm]).then(res => {
        jmuxer.feed({ video: new Uint8Array(res[0].target.result) })
      })
    },
    hdclick(i) {
      if (this.disIndex.includes(i)) return ''
      switch (i) {
        case 0: recording(this); break // 视频录制
        case 1: shot(this); break // 截图
        case 2: ElMessage('敬请期待！'); break // 对讲
        case 3: this.idx = 3; getData('motorControlInformation'); break // 回放
        case 4: ElMessage('敬请期待！'); break // 开灯
        case 5: ElMessage('敬请期待！'); break // 警告设置
        case 6: this.$emit('update:showset', 1); break // 设置
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
      z-index: 1;
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
  bottom: 70px;
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
    &:nth-child(4) img {
      width: 28px;
    }
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
