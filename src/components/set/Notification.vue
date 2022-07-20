<template>
  <div class="vdc" v-if="data">
    <p class="sct mds fxi">
      Notification
      <el-switch v-model="data.motionDetectionEnable" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <h6 class="dtt">Content extension of notifications</h6>
    <ul class="tst">
      <li v-for="(_,i) in NotificationModes" :key="i" @click="data.alarmNoticationMode=i;hdchange()">
        <p>{{_.l}}</p>
        <i>{{_.t}}</i>
        <img src="../../assets/img/setting/icon_click.png" v-if="data.alarmNoticationMode==i">
      </li>
    </ul>
    <h6 class="dtt">APP Alert Tones</h6>
    <p class="sct mds fxi" @click="showma=1">
      Motion Alerts <i class="fxi">{{motionAlerts[data.alarmNoticationAudioType]}} <img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <h6 class="dtt">Security modes switching notification</h6>
    <p class="sct mds fxi">
      Switching Notification <i class="fxi"><img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <transition name="page-move">
      <motion-alerts v-if="showma" @close='showma=0' :value='data.alarmNoticationAudioType' :motionAlerts='motionAlerts' @change='hdmachange' />
    </transition>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import mixin from './mixin'
export default {
  mixins: [mixin],
  components: { MotionAlerts: defineAsyncComponent(() => import('./MotionAlert.vue')) },
  data() {
    return {
      NotificationModes: [{ v: 0, l: 'Most Efficient', t: 'Get notification without delay, only text included' },
        { v: 1, l: 'Full Effect', t: 'Get text notification first, then thumbnail included if available' },
        { v: 2, l: 'Include Thumbnail', t: 'Get full notification included text and thumbnail.(If available)' }],
      showma: 0,
      motionAlerts: ['Default', 'Silent', 'Bell', 'Change', 'Ding', 'Notify', 'Security', 'Success', 'Type']
    }
  },
  methods: {
    hdmachange(i) {
      console.log(i)
      this.data.alarmNoticationAudioType = i
      this.hdchange()
    }
  }
}
</script>
<style lang="scss" scoped>
.tst {
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
  position: relative;
  user-select: none;
  li {
    cursor: pointer;
    padding-bottom: 16px;
    margin: 0 16px;
    position: relative;
    overflow: hidden;
    &+li {
      border-top: 1px solid #F1F1F1;
    }
    p {
      margin: 16px 0 6px;
    }
    i {
      font-size: 14px;
      color: #aaa;
      width: 340px;
      display: block;
      line-height: 20px;
      text-align: justify;
    }
    img {
      width: 20px;
      position: absolute;
      right: 10px;
      top: 32px;
    }
  }
}
.dtt {
  margin: 20px 0 9px 16px;
}
.mds {
  justify-content: space-between;
  height: 63px;
  i {
    color: #3D86F7;
    font-size: 14px;
  }
  img {
    width: 22px;
    right: 14px;
    margin-left: 5px;
  }
}
.sct {
  cursor: pointer;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
}
.vdc {
  padding: 0 16px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
