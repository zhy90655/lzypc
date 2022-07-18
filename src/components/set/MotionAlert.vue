<template>
  <div class="malist">
    <Head title="Motion Alerts" @back='$emit("close")' />
    <ul class="fst">
      <li v-for="(_,i) in motionAlerts" :key="i" @click="setma(i)" class="fxi">
        {{_}}<img src="../../assets/img/setting/icon_click.png" v-if="val==i">
      </li>
    </ul>
  </div>
</template>

<script>
import Head from './head.vue'
export default {
  emits: ['close', 'change'],
  props: ['motionAlerts', 'value'],
  components: { Head },
  data() {
    return { val: '' }
  },
  methods: {
    setma(i) {
      if (this.val === i) return ''
      console.log(i)
      this.val = i
      this.$emit('change', i)
    }
  },
  created() {
    this.val = this.value
  }
}
</script>
<style lang="scss" scoped>
.fst {
  background-color: #fff;
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
      border-top: 1px solid var(--act-color);
    }
    img {
      width: 22px;
      position: absolute;
      right: 20px;
    }
  }
}
.malist {
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  background-color: #f6fafd;
  left: 0;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
