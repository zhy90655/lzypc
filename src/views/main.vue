<template>
  <div class="container">
    <Head v-model="type" />
    <div class="content">
      <ll-scrollbar :class="['list', spread&&'hide']">
        <Camera v-for="(_, i) in list" :key="i" v-model="cmrloading" :chosed='item.uuidId==_.uuidId' @click='chose(_)'
         :data='_' @change="hdchange($event, i)" @setting="showset=1"/>
      </ll-scrollbar>
      <History v-if="type" v-model:spread="spread" />
      <Paly :data='item' v-model:spread="spread" v-model:showset="showset" v-else :loading='cmrloading'/>
    </div>
  </div>
</template>
<script>
import { getDeviceList } from '../api/http/interface'
import { fmtdata } from '../utils/tool'
import mqtt from '../api/mqtt/requst'
import Camera from '../components/camera.vue'
import Paly from './paly.vue'
import Head from './head.vue'
import { defineAsyncComponent } from 'vue'
export default {
  components: { Camera, Head, Paly, History: defineAsyncComponent(() => import('./history.vue')) },
  data() {
    return {
      type: 0, // 预览 回放
      spread: false, // 展开
      list: [],
      item: {},
      showset: 0,
      total: 0,
      current: 1,
      size: 9,
      cmrloading: false
    }
  },
  created() {
    this.getDevice(1)
  },
  methods: {
    chose({ uuidId, cardInformation, electricInformation, deviceGeneralInformation: info, connected }, first) {
      if (uuidId === this.item.uuidId) return ''
      this.item = { uuidId, cardInformation, electricInformation, info, connected }
      this.$store.commit('set_cameraInfo', { ...this.item })
      if (!first) this.$mqtt.uidchange(uuidId)
    },
    getDevice(val) {
      if (this.loading) return ''
      this.current = val
      this.loading = true
      getDeviceList({ current: this.current - 1, size: this.size }).then(({ total, records }) => {
        this.total = total
        records.forEach(fmtdata)
        if (records[0]) {
          mqtt(records[0])
          this.chose(records[0], 1)
        }
        console.log(records[0])
        this.list = records
      }).finally(() => (this.loading = false))
    },
    hdchange(val, i) {
      if (val.uuidId === this.item.uuidId) this.item = { ...this.item, connected: val.connected }
      this.list[i] = val
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  min-width: 970px;
  box-sizing: border-box;
  .content {
    height: calc(100% - 88px);
    min-height: 600px;
    display: flex;
    .list {
      width: 280px;
      flex-shrink: 0;
      transition: width 0.3s ease-in-out;
      &.hide {
        width: 0;
      }
    }
    .play {
      flex-grow: 1;
    }
  }
  .main {
    flex-grow: 1;
    min-width: 800px;
  }
}
</style>
