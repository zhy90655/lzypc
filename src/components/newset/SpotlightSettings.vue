<template>
  <div class="mdc" v-if="data">
    <p class="sct mds fxi">
      Light
      <el-switch v-model="data.spotLight" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      Blue Light
      <el-switch v-model="data.blueIndicatorLight" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      Green Light
      <el-switch v-model="data.greenIndicatorLight" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <div class="ds sct rdc">
      <h6>Brightness</h6>
      <el-slider :disabled='!data.spotLight' @click="hdbarclick($event, 'alarmInformation')"
        @change="hdchange('alarmInformation')" v-model="data.spotLightBrightness" />
      <p class="btm fxi"><i>1</i>100</p>
    </div>
    <div class="ds sct ctc">
      <h6>Color temperature</h6>
      <el-slider :disabled='!data.spotLight' @click="hdbarclick($event, 'alarmInformation')"
        @change="hdchange('alarmInformation')" v-model="data.indicatorLightMode" />
      <p class="btm fxi"><i>Warm</i>Cool</p>
    </div>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    hdbarclick(v, key1, key2) { // change事件兼容处理
      if (v.target.classList.contains('el-slider__runway')) {
        if (this.data[key1][key2]) this.hdchange(key1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ds {
  height: 127px;
  &.ctc {
    :deep {
      .el-slider__runway {
        background: linear-gradient(90deg, #F2CF8D, #FFFFFF, #BAE8F5);
      }
      .el-slider__bar {
        opacity: 0;
      }
    }
  }
  .btm {
    justify-content: space-between;
    color: #aaa;
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
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
  h6 {
    margin: 6px 0 18px;
  }
}
.mdc {
  padding: 0 16px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
