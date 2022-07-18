<template>
  <div class="mdc" v-if="cameraInfo[labelkey]">
    <p class="sct mds fxi">
      {{title}}
      <Switch v-model="data.motionDetectionEnable"  @change="hdchange"/>
    </p>
    <div class="ds sct">
      <h6>Detection Sensitivity</h6>
      <Check :disabled='!data.motionDetectionEnable' @change="hdchange"
        :range="[1,2,3,4,5,6,7]" v-model="data.motionDetectionSensitivity" :tip='["Low","High"]' />
    </div>
    <p class="sct mds fxi">
      Detection Record
      <Switch v-model="data.motionDetectionRecord"  @change="hdchange"/>
    </p>
    <div class="ds sct rdc">
      <h6>Recode Delay</h6>
      <el-slider :disabled='!data.motionDetectionRecord' @click="hdbarclick($event, 'motionDetectionRecord')"
        @change="hdchange('alarmInformation')" v-model="data.motionDetectionRecodeDelay" />
      <p class="btm fxi"><i>1</i>100</p>
    </div>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    hdbarclick(v, key1) { // change事件兼容处理
      if (v.target.classList.contains('el-slider__runway')) {
        if (this.data[key1]) this.hdchange(key1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ds {
  height: 127px;
  &.rdc h6 {
    margin-bottom: 18px;
  }
  .btm {
    justify-content: space-between;
    color: var(--fd-color);
    font-size: 14px;
  }
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
  cursor: pointer;
  background-color: var(--ib-color);
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
.mdc {
  padding: 0 30px 20px 10px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
