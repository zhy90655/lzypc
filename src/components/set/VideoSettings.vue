<template>
  <div class="vdc" v-if="cameraInfo[labelkey]">
    <p class="sct mds fxi">
      Anti Flicker
      <Switch v-model="data.videAntiFlicker" type  @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      Mirror Flip
      <Switch v-model="data.videoMirrorFlip" type  @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      IRcut Mode
      <Switch v-model="data.videIRcutMode" type  @change="hdchange"/>
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
  background-color: var(--ib-color);
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
      border-top: 1px solid var(--act-color);
    }
    p {
      margin: 16px 0 6px;
    }
    i {
      font-size: 14px;
      color: var(--fd-color);
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
  background-color: #333;
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
  padding: 0 30px 20px 10px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
  .scd {
    color: var(--fd-color);
    font-size: 14px;
  }
}
</style>
