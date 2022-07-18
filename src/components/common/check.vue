<template>
  <ul :class="['check fxi', disabled&&'disabled', tip&&'hastip', hidetoptip&&'hidetop']">
    <span class="line"></span>
    <li v-for="(_, i) in range" @click="hdclick(_)" :class="_==modelValue&&'act'" :key="i"><i>{{_}}</i></li>
    <div class="tip fxi" v-if="tip"><i v-for="(_, i) in tip" :key="i">{{_}}</i></div>
  </ul>
</template>

<script>

export default {
  props: { modelValue: Number, range: Array, disabled: Boolean, tip: Array, hidetoptip: Boolean },
  emits: ['update:modelValue', 'change'],
  methods: {
    hdclick(i) {
      if (this.modelValue !== i && !this.disabled) {
        this.$emit('update:modelValue', i)
        this.$emit('change', i)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.check {
  width: 100%;
  justify-content: space-between;
  position: relative;
  padding-top: 22px;
  &.hastip {
    padding: 22px 0 20px;
  }
  &.hidetop {
    padding-top: 2px;
    li i {
      display: none;
    }
  }
  .tip {
    position: absolute;
    width: 100%;
    justify-content: space-between;
    left: 0;
    bottom: 0;
    color: var(--fd-color);
    line-height: 18px;
  }
  li {
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    i {
      line-height: 18px;
      position: absolute;
      top: -20px;
      color: #999;
      font-size: 14px;
    }
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      background-color: #ddd;
      border-radius: 50%;
    }
    &.act {
      border-color: #409eff;
      &::after {
        background-color: #409eff;
      }
      i {
        color: #409eff;
      }
    }
  }
  .line {
    position: absolute;
    width: 99%;
    height: 3px;
    background-color: #b5b5b5;
  }
}
.disabled {
  li {
    cursor: not-allowed;
    border-color: rgba($color: #aaa, $alpha: 0.8);
    &::after {
      background-color: rgba($color: #ddd, $alpha: 0.8);
    }
    i {
      color: rgba($color: #999, $alpha: 0.8);
    }
    &.act {
      border-color: rgba($color: #409eff, $alpha: 0.8);
      &::after {
        background-color: rgba($color: #409eff, $alpha: 0.8);
      }
      i {
        color: rgba($color: #409eff, $alpha: 0.8);
      }
    }
  }
}
</style>
