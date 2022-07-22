<template>
  <el-dialog v-model="visible" width="760px" :close-on-click-modal="false" @closed="$emit('cls')" custom-class="setdlg">
    <div class="ctt">
      <div class="left">
        <h3>设置</h3>
        <ul><li v-for="(_,i) in ['基本设置','录像设置']" :class="['fxi',idx==i&&'act']" @click="idx=i" :key="i">{{_}}</li></ul>
      </div>
      <div class="right">
        <ll-scrollbar>
          <h4>{{['基本设置','录像设置'][idx]}}</h4>
          <Basic v-if="idx==0" />
          <Recordset v-else/>
        </ll-scrollbar>
      </div>
      <el-icon @click="visible=false"><CloseBold /></el-icon>
    </div>
  </el-dialog>
</template>

<script>
import { CloseBold } from '@element-plus/icons-vue'
import Basic from './basic.vue'
import Recordset from './recordset.vue'
export default {
  components: { CloseBold, Recordset, Basic },
  emits: ['cls'],
  props: ['prdata'],
  computed: {
  },
  data() {
    return {
      idx: 0,
      visible: false
    }
  },
  mounted() {
    this.visible = true
  }
}
</script>

<style lang="scss" scoped>
.ctt {
  .right {
    flex-grow: 1;
    padding: 50px 0 0 30px;
    .ll-scrollbar {
      height: 100%;
    }
    h4 {
      font-size: 18px;
    }
  }
  .left {
    flex-shrink: 0;
    width: 220px;
    height: 100%;
    background: linear-gradient(90deg, #212121, #333);
    text-align: center;
    box-sizing: border-box;
    padding: 0 15px;
    li {
      font-size: 14px;
      padding: 8px 0;
      border-radius: 4px;
      margin-bottom: 10px;
      cursor: pointer;
      padding-left: 20px;
      &:hover {
        background-color: #535e6b;
      }
      &.act {
        background-color: #046dec;
      }
      img {
        width: 18px;
      }
    }
    h3 {
      font-size: 28px;
      font-weight: normal;
      margin: 20px 0;
    }
  }
  height: 560px;
  display: flex;
  position: relative;
  color: var(--ft-color);
  .el-icon {
    position: absolute;
    font-size: 22px;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.setdlg {
  border-radius: 10px;
  overflow: hidden;
  background-color: #191919;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
}
</style>
