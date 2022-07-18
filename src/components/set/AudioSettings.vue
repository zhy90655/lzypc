<template>
  <div class="adc" v-if="cameraInfo[labelkey]">
    <p class="sct mds fxi">
      Microphone
      <Switch v-model="data.audioMicrophoneEnable"  @change="hdchange"/>
    </p>
    <div class="sct mds fxi arbox">
      <p>Audio Recording</p>
      <i>Enable audio recording when recording videos.</i>
      <Switch v-model="data.recordAudioEnable"  @change="hdchange"/>
    </div>
    <div class="ds sct">
      <p class="mds fxi">
        Speaker
      <Switch v-model="data.audioSpeakerEnable"  @change="hdchange"/>
      </p>
      <h6>Speaker Volume</h6>
      <Check :disabled='!data.audioSpeakerEnable' @change="hdchange" hidetoptip
      :range="[20,50,80]" v-model="data.audioSpeakerVolume" :tip='["Low","Medium","High"]' />
    </div>
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
div.ds {
  height: 183px;
  padding-top: 0;
  >p {
    border-bottom: 1px solid var(--act-color);
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
      color: #666;
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
.adc {
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
