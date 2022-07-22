<template>
  <div class="head fxi">
    <ul class="tabs fxi">
      <li v-for="(_, i) in ['预览','回放']" @click="$emit('update:modelValue',i)" :class="[modelValue==i&&'act']" :key="i">{{_}}</li>
    </ul>
    <ul class="icons fxi">
      <img src="../assets/img/icons/list.png">
       <el-tooltip placement="bottom" :offset='23' popper-class='t_user'>
        <template #content>
          <p class="account">账号：{{userDetail.sysUser.username}}</p>
          <el-button type='primary' link>退出登录</el-button>
        </template>
        <li></li>
      </el-tooltip>
      <li v-for="_ in 3" :key="_" @click="hdclik(_)"></li>
    </ul>
    <AddDevice v-if="idx==1" @cls="idx=''" />
    <Sysset v-if="idx==3" @cls="idx=''" />
  </div>
</template>

<script>
import AddDevice from '../components/system/addDevice.vue'
import Sysset from '../components/system/sysset.vue'
import { mapState } from 'vuex'
export default {
  components: { AddDevice, Sysset },
  computed: mapState(['userDetail']),
  emits: ['update:modelValue'],
  props: ['modelValue'],
  data() {
    return { idx: '' }
  },
  methods: {
    hdclik(i) {
      this.idx = i
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
        transition: width 0.2s linear;
        background-color: var(--bt-color);
      }
    }
  }
}
</style>
<style lang="scss">
.t_user {
  .account {
    line-height: 24px;
    padding-left: 2px;
  }
  .el-button {
    padding: 7px 2px 5px 0;
  }
}
</style>
