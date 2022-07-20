<template>
  <div class="adc" v-if="data">
    <p class="sct mds fxi">
      Microphone
      <el-switch v-model="data.audioMicrophoneEnable" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </p>
    <div class="sct mds fxi arbox">
      <p>Audio Recording</p>
      <i>Enable audio recording when recording videos.</i>
      <el-switch v-model="data.recordAudioEnable" size="large" inline-prompt active-text="开" inactive-text="关"
      :active-value="true" :inactive-value="false" @change="hdchange"/>
    </div>
    <div class="ds sct">
      <p class="mds fxi">
        Speaker
        <el-switch v-model="data.audioSpeakerEnable" size="large" inline-prompt active-text="开" inactive-text="关"
        :active-value="true" :inactive-value="false" @change="hdchange"/>
      </p>
      <h6>Speaker Volume</h6>
      <Check :disabled='!data.audioSpeakerEnable' @change="hdchange" hidetoptip
      :range="[20,50,80]" v-model="data.audioSpeakerVolume" :tip='["Low","Medium","High"]' />
    </div>
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
div.ds {
  height: 183px;
  padding-top: 0;
  >p {
    border-bottom: 1px solid #F1F1F1;
  }
  h6 {
    margin: 20px 0;
  }
}
.mds {
  justify-content: space-between;
  height: 63px;
  &.arbox {
    height: 108px;
    p {
      transform: translateY(-15px);
    }
    i {
      position: absolute;
      top: 58px;
      font-size: 14px;
      color: #aaa;
    }
  }
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
    margin: 6px 0 10px;
  }
}
.adc {
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
