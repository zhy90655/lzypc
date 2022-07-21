<template>
  <el-dialog v-model="dv" width="240px" title="Motor Direction" draggable :modal="false" @closed="$emit('cls')" custom-class="mddlg">
    <DirectionController @change="$emit('change', $event)" />
  </el-dialog>
</template>

<script>
export default {
  emits: ['cls', 'change'],
  data() {
    return {
      dv: false
    }
  },
  mounted() {
    this.dv = true
  }
}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.mddlg {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
  position: absolute;
  right: 10px;
  bottom: 150px;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__headerbtn {
    height: 40px;
    width: 40px;
    top: 3px;
    .el-dialog__close {
      font-size: 20px;
      color: #ddd;
    }
  }
}
</style>
