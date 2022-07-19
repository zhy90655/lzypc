<template>
  <div class="history">
    <div class="top" ref="top">
      <el-date-picker v-model="date" type="date" placeholder="日期选择" :disabled-date="disabledDate" :clearable='false'/>
      <ul class="list" v-loading="loading" element-loading-text="加载中…">
        <li v-for="(_, i) in renderData" :key="i" @click="hdchange($event, i)" :style="{width:320*scale+'px'}">
          <img :src="_.eventRecordInfromation.videoThumbnail">
          <i>{{_.eventTime}}</i>
        </li>
      </ul>
      <el-pagination background v-model='current' @current-change="getEventList" layout="prev, pager, next" :page-size='size' :total="total" />
    </div>
    <div :class="['ctrl fxi',spread&&'spread']">
      <el-icon @click="$emit('update:spread',!spread)"><ArrowRightBold v-if="spread" /><ArrowLeftBold v-else /></el-icon>
    </div>
  </div>
</template>

<script>
import { fmtdata, formatTime, throttle } from '../utils/tool'
import { data } from '../utils/data'
import { getEvent } from '../api/http/interface'
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
export default {
  components: { ArrowRightBold, ArrowLeftBold },
  emits: ['update:spread'],
  props: ['spread'],
  data() {
    return {
      list: [],
      date: new Date(),
      total: 0,
      current: 1,
      size: 9,
      loading: false,
      scale: 1
    }
  },
  created() {
    this.getEventList()
    data.map(_ => {
      const s = formatTime(_.eventTime)
      return { ..._, s, e: s + (+_.eventRecordInfromation.videoDuration) }
    })
    this.total = data.length
    // this.list = [1, 2, 3]
    console.log(this.list)
    this.hdresize = throttle(([{ contentRect }]) => {
      const awidth = contentRect.width - 25
      const nm = awidth / 330
      const max = (awidth - Math.floor(nm) * 10) / Math.floor(nm) / 320
      const min = (awidth - Math.ceil(nm) * 10) / Math.ceil(nm) / 320
      this.size = Math[(max - 1 > 1 - min) ? 'ceil' : 'floor'](nm) * 3
      this.scale = (max - 1 > 1 - min) ? min : max
    }, 40)
  },
  computed: {
    renderData() {
      return data.slice(0, this.size)
    }
  },
  mounted() {
    this.ro = new ResizeObserver(this.hdresize)
    this.ro.observe(this.$refs.top)
  },
  methods: {
    hdresize() {},
    hdchange(e) {
      console.log(e)
    },
    getEventList(val) {
      if (this.pending) return ''
      this.pending = 1
      getEvent({ current: 0, size: this.size }).then(({ total, records }) => {
        records.forEach(fmtdata)
        console.log(total, records)
      }).finally(() => (this.pending = 0))
    },
    disabledDate(time) {
      return time.getTime() > Date.now()
    }
  },
  beforeUnmount() {
    this.ro.unobserve(this.$refs.top)
  }
}
</script>
<style lang="scss" scoped>
.history {
  background-color: var(--vidb-color);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  .top {
    padding: 10px 5px 0 20px;
    overflow: hidden;
    max-width: 1632px;
    flex-grow: 1;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    li {
      text-align: center;
      cursor: pointer;
      margin: 0 15px 15px 0;
      position: relative;
      height: 188px;
      i {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: var(--vidb-color);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  :deep .el-date-editor {
    margin: 3px 0;
  }
  .el-pagination  {
    justify-content: center;
  }
  .ctrl {
    height: 60px;
    background-color: var(--bg-color);
    flex-shrink: 0;
    width: 100%;
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
</style>
