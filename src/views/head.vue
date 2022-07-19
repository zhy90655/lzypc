<template>
  <div class="head fxi">
    <ul class="tabs fxi">
      <li v-for="(_, i) in ['预览','回放']" @click="$emit('update:modelValue',i)" :class="[modelValue==i&&'act']" :key="i">{{_}}</li>
    </ul>
    <ul class="icons fxi">
      <img src="../assets/img/icons/list.png">
      <li v-for="_ in 4" :key="_" @click="hdclik(_)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  methods: {
    hdclik(i) {
      console.log(i)
    }
  }
}
</script>
<style scoped lang="scss">
.head {
  width: 100%;
  height: 88px;
  box-shadow: 0px 1px 5px 0px #000;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 20px;
  position: relative;
  .icons {
    position: absolute;
    right: 30px;
    li {
      width: 29px;
      height: 29px;
      margin-left: 4px;
      z-index: 1;
      cursor: pointer;
    }
    img {
      position: absolute;
      right: 2px;
      top: 1px;
    }
  }
  .tabs {
    li {
      cursor: pointer;
      height: 34px;
      font-size: 20px;
      letter-spacing: 2px;
      padding-left: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      position: relative;
      &+li {
        margin-left: 50px;
      }
      &:hover::after,&.act::after {
        width: 100%;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        width: 0%;
        height: 5px;
        border-radius: 2.5px;
        bottom: 0px;
        transition: width 0.2s linear;
        background-color: var(--bt-color);
      }
    }
  }
}
</style>
