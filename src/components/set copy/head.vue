<template>
  <header class="fxi">
    <el-icon @click="$emit('back')"><ArrowLeftBold /></el-icon>
    {{title}}
  </header>
</template>

<script>

import { ArrowLeftBold } from '@element-plus/icons-vue'
export default {
  components: { ArrowLeftBold },
  props: ['title'],
  emits: ['back']
}
</script>
<style lang="scss" scoped>
header {
  user-select: none;
  justify-content: center;
  position: relative;
  font-size: 18px;
  font-weight: bold;
  height: 56px;
  .el-icon {
    cursor: pointer;
    position: absolute;
    font-size: 24px;
    left: 10px;
    padding: 10px;
  }
}
</style>
