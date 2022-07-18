<template>
  <div class="vdc" v-if="cameraInfo[labelkey]">
    <p class="sct mds fxi">
      Motor Status
      <Switch v-model="data.motorStatus"  @change="hdchange"/>
    </p>
    <h6 class="dtt">Stream Mode</h6>
    <DirectionController @change="hddrchange" />
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    hddrchange(v) {
      this.data.motroControlDirection = v
      this.hdchange()
    }
  }
}
</script>
<style lang="scss" scoped>
.dtt {
  margin: 25px 0 12px 15px;
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
.vdc {
  padding: 0 30px 20px 10px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
  .scd {
    color: #666;
    font-size: 14px;
  }
}
</style>
