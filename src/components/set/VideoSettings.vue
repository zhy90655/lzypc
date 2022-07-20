<template>
  <div class="vdc" v-if="data">
    <p class="sct mds fxi">
      Anti Flicker
      <el-switch v-model="data.videAntiFlicker" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="1" :inactive-value="0" @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      Mirror Flip
      <el-switch v-model="data.videoMirrorFlip" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="1" :inactive-value="0" @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      IRcut Mode
      <el-switch v-model="data.videIRcutMode" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="1" :inactive-value="0" @change="hdchange"/>
    </p>
    <h6 class="dtt">Stream Mode</h6>
    <ul class="tst">
      <li v-for="(_,i) in StreamModes" :key="i" @click="data.videoStreamMode=i;hdchange()">
        <p>{{_.l}}</p>
        <i>{{_.t}}</i>
        <img src="../../assets/img/setting/icon_click.png" v-if="data.videoStreamMode==i">
      </li>
    </ul>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      StreamModes: [{ v: 0, l: 'Auto', t: 'Automatically adjust the image quality according to network speed.' },
        { v: 1, l: 'Height', t: 'High image quality will consume more data and may cause intermittent playback when the network is weak.' },
        { v: 2, l: 'Medium', t: 'Medium image quality will consume less data.' },
        { v: 3, l: 'Low', t: 'Low image quality will keep streaming smooth in poor network conditions.' }]
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
    height: 90px;
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
  img {
    width: 26px;
    position: absolute;
    right: 14px;
  }
}
.sct {
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
  h6 {
    margin: 6px 0 10px;
  }
}
.vdc {
  padding: 0 16px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
  .scd {
    color: #aaa;
    font-size: 14px;
  }
}
</style>
