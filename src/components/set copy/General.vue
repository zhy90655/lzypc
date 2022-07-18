<template>
  <div class="vdc" v-if="cameraInfo[labelkey]">
    <p class="sct mds fxi">
      Name <i class="fxi">{{data.deviceName}} <img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      Wi-Fi Connection <i class="fxi">{{data.deviceModelName}} <img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      Status LED
      <el-switch v-model="data.motionDetectionEnable" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      Power Manager <i class="fxi"><img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      Time Settings <i class="fxi">(GMT+8) Beijing <img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      Storage <i class="fxi"><img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      Mounting Guide <i class="fxi"><img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
    <p class="sct mds fxi">
      About Device <i class="fxi"><img src="../../assets/img/setting/icon_arrow_blue.png"/></i>
    </p>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin]
}
</script>
<style lang="scss" scoped>
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
  background-color: #fff;
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
