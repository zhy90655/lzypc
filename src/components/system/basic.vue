<template>
  <div class="basic">
    <p class="sct mds fxi">
      拉伸显示
      <Switch v-model="data.stretch"  @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      报警声音
      <Switch v-model="data.alarm"  @change="hdchange"/>
    </p>
    <p class="sct mds fxi">
      锁屏密码
      <Switch v-model="data.screenpaw"  @change="hdchange"/>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { }
    }
  },
  methods: {
    hdchange(v) {
    }
  }
}
</script>
<style lang="scss" scoped>
.mds {
  justify-content: space-between;
  height: 63px;
}
.sct {
  background-color: var(--ib-color);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
}
.basic {
  padding: 0 30px 20px 0px;
  box-sizing: border-box;
}
</style>
