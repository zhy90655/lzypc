<template>
  <el-dialog v-model="visible" width="680px" :close-on-click-modal="false" @closed="$emit('cls')" custom-class="sysdlg">
    <div class="ctt">
      <h4>添加设备</h4>
      <div class="input fxi">
        <div class="form">
          <p>UID</p>
          <input type="text" placeholder="请输入">
        </div>
      </div>
      <p class="btnc"><el-button type="primary" round>添加</el-button></p>
      <el-icon @click="visible=false"><CloseBold /></el-icon>
    </div>
  </el-dialog>
</template>

<script>
import { CloseBold } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
export default {
  components: { CloseBold },
  emits: ['cls'],
  data() {
    return {
      visible: false,
      idx: 0
    }
  },
  mounted() {
    this.visible = true
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.ctt {
  height: 450px;
  position: relative;
  color: var(--ft-color);
  .input {
    justify-content: center;
    height: 300px;
    margin: 0 30px;
    border-bottom: 1px solid var(--fb-color);
    input {
      width: 460px;
      height: 32px;
      background-color: transparent;
      border: 1px solid var(--fb-color);
      box-sizing: border-box;
      padding-left: 46px;
      color: var(--ft-color);
      font-size: 16px;
      font-weight: bold;
      &:focus {
        border-color: var(--bt-color);
      }
    }
    .form {
      position: relative;
      p {
        position: absolute;
        font-size: 16px;
        font-weight: bold;
        top: 8px;
        left: 10px;
      }
    }
  }
  .btnc {
    text-align: right;
    margin: 20px 30px 0 0;
    .el-button {
      padding: 8px 20px;
    }
  }
  h4 {
    line-height: 56px;
    padding-left: 20px;
    font-size: 18px;
    background-color: var(--ln-color);
    box-shadow: 0px 1px 5px 0px #000;
  }
  .el-icon {
    position: absolute;
    font-size: 22px;
    padding: 10px;
    top: 7px;
    right: 6px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.sysdlg {
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-color);
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
}
</style>
