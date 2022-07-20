<template>
  <div class="mdc" v-if="data">
    <p class="sct mds fxi mtf">
      {{title}}
      <el-switch v-model="data.motionDetectionEnable" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <div class="az sct">
      <h6>Activity Zone</h6>
      <p class="scd">Define a specific area you want to detect.</p>
      <img src="../../assets/img/setting/icon_arrow_blue.png" alt="">
    </div>
    <div class="ds sct">
      <h6>Detection Sensitivity</h6>
      <Check :disabled='!data.motionDetectionEnable' @change="hdchange"
        :range="[1,2,3,4,5,6,7]" v-model="data.motionDetectionSensitivity" :tip='["Low","High"]' />
    </div>
    <h6 class="dtt">Detection Type</h6>
    <ul class="tst">
      <li v-for="(_,i) in ['Human only','All motion']" :key="i" @click="data.motionDetectionMode=i;hdchange()" class="fxi">
        {{_}}<img src="../../assets/img/setting/icon_click.png" v-if="data.motionDetectionMode==i">
      </li>
      <li class="tips">
        {{['Only human events will be recored and pushed in the daytime.','All motion will be recorded and pushed both at day and night time'][data.motionDetectionMode]}}
      </li>
    </ul>
    <p class="sct mds fxi">Motion Text Mode<img src="../../assets/img/setting/icon_arrow_blue.png"></p>
    <p class="sct mds fxi">Tips for Installation<img src="../../assets/img/setting/icon_arrow_blue.png"></p>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import Check from '../common/check.vue'
import mixin from './mixin'
export default {
  mixins: [mixin],
  components: { Check }
}
</script>
<style lang="scss" scoped>
.dtt {
  margin: 20px 0 9px 16px;
}
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
    height: 59px;
    margin: 0 16px;
    &+li {
      border-top: 1px solid #F1F1F1;
    }
    &.tips {
      padding-top: 21px;
      height: 68px;
      box-sizing: border-box;
      font-size: 13px;
      color: #aaa;
      cursor: auto;
    }
    img {
      width: 20px;
      position: absolute;
      right: 20px;
    }
  }
}
.ds {
  height: 127px;
}
.az {
  height: 91px;
  img {
    width: 24px;
    position: absolute;
    top: 28px;
    right: 18px;
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
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
  &.mtf {
    cursor: auto;
  }
  h6 {
    margin: 6px 0 10px;
  }
}
.mdc {
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
