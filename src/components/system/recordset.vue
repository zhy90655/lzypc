<template>
  <div class="basic">
    <p class="sct mds fxi">
      码流类型
      <el-select v-model="data.stream" @change="hdchange($event, 'stream')" popper-class='lzyslct'>
        <el-option v-for="item in streams" :key="item.v" :label="item.l" :value="item.v"/>
      </el-select>
    </p>
    <p class="sct mds fxi">
      延时录像
      <el-select v-model="data.delay" @change="hdchange($event, 'delay')" popper-class='lzyslct'>
        <el-option v-for="item in delays" :key="item.v" :label="item.l" :value="item.v"/>
      </el-select>
    </p>
    <p class="sct mds fxi">
      录像文件时长
      <span><input class="time" v-model="data.length" type="number"><i>Mins</i></span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { length: 5 },
      streams: [{ l: '流畅', v: 0 }, { l: '标准', v: 1 }, { l: '清晰', v: 2 }],
      delays: [5, 15, 30, 60].map(_ => ({ l: _ + '秒', v: _ }))
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
  .el-select {
    width: 180px;
    :deep {
      .el-input__wrapper {
        background-color: transparent;
      }
    }
  }
  >span {
    position: relative;
    i {
      position: absolute;
      right: 12px;
      top: 6px;
    }
  }
  .time {
    width: 180px;
    height: 32px;
    border: 1px solid var(--fb-color);
    background-color: transparent;
    border-radius: 4px;
    box-sizing: border-box;
    padding-left: 6px;
    color: var(--ft-color);
    &:focus {
      border-color: var(--bt-color);
    }
  }
}
.basic {
  padding: 0 30px 20px 0px;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.lzyslct {
  background-color: #222;
  border-color: var(--bt-color);
  .el-select-dropdown__item.selected {
    background-color: #333;
  }
  .el-select-dropdown__item:hover,.el-select-dropdown__item.hover {
    background-color: #333;
  }
}
</style>
