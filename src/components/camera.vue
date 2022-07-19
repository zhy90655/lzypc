<template>
  <div :class='["camera", chosed&&"act", data.connected&&"linked"]'>
    <div class="top fxi">
      <p>{{data.deviceGeneralInformation.deviceName}}</p>
      <el-icon :class="['set',loading&&'is-loading']">
        <Setting v-if="data.connected" @click="$emit('setting')" />
        <Loading v-else-if="loading" />
        <Refresh v-else @click="getstatus" />
      </el-icon>
    </div>
    <div class="btm fxi">
      <p class="fxi"><i></i>{{data.connected?'已':'未'}}连接</p>
    </div>
  </div>
</template>

<script>
import { getDeviceConnection } from '../api/http/interface'
import { Refresh, Setting, Loading } from '@element-plus/icons-vue'
export default {
  emits: ['change', 'update:modelValue', 'setting'],
  props: ['data', 'chosed', 'modelValue'],
  components: { Setting, Refresh, Loading },
  data() {
    return { loading: false }
  },
  methods: {
    getstatus() {
      if (this.loading) return ''
      this.loading = true
      this.$emit('update:modelValue', true)
      getDeviceConnection(this.data.uuidId).then(res => {
        this.$emit('change', { ...this.data, connected: res[0]?.connected })
      }).finally(() => { this.loading = false; this.$emit('update:modelValue', false) })
    }
  },
  created() {
    this.getstatus()
  }
}
</script>
<style scoped lang="scss">
.camera {
  width: 250px;
  height: 58px;
  background-color: var(--ln-color);
  margin: 10px 15px 0;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 2px rgba($color: #000, $alpha: 0.4);
  cursor: pointer;
  box-sizing: border-box;
  padding: 8px 18px 8px 9px;
  position: relative;
  &.linked {
    .btm p i {
      background-color: var(--bt-color);
    }
  }
  .btm {
    margin-top: 3px;
    justify-content: space-between;
    p {
      font-size: 14px;
      i {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: var(--fd-color);
        margin-right: 3px;
      }
    }
  }
  &.act {
    .top p{
      color: var(--ft-color);
    }
    &::after {
      height: 25px;
    }
  }
  .top {
    justify-content: space-between;
    p {
      font-size: 16px;
      font-weight: bold;
      color: var(--fd-color);
    }
  }
  &::after {
    content: '';
    position: absolute;
    right: 4px;
    width: 5px;
    height: 0px;
    border-radius: 2.5px;
    transition: height 0.2s linear;
    background-color: var(--bt-color);
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover::after {
    height: 25px;
  }
}
</style>
