<template>
  <el-dialog v-model="dialogVisible" width="760px" :close-on-click-modal="false" @closed="$emit('cls')" custom-class="setdlg">
    <div class="ctt">
      <div class="left">
        <h3>设置</h3>
        <ul><li v-for="(_,i) in list" :class="['fxi',label==_.l&&'act']" @click="showSubSet(_.l)" :key="i">{{_.l}}</li></ul>
      </div>
      <div class="right">
        <ll-scrollbar>
          <h4>{{label}}</h4>
          <component :is="component" @change='hddatachange' :labelkey='key' :title="label" />
        </ll-scrollbar>
      </div>
      <el-icon @click="dialogVisible=false"><CloseBold /></el-icon>
    </div>
  </el-dialog>
</template>

<script>
import { CloseBold } from '@element-plus/icons-vue'
import { mapState } from 'vuex'
import { dicget, dicset, settoinfo } from '../../api/mqtt/requst'
import { findKeyByValue } from '../../utils/tool'
import { defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'
const cpms = Object.keys(settoinfo).map(_ => [_, defineAsyncComponent(() => import('./' + _ + '.vue'))])
// const rq = v => require('../../assets/img/icons/' + v + '.png')
export default {
  components: { CloseBold },
  emits: ['cls'],
  props: ['prdata'],
  computed: {
    ...mapState(['cameraInfo']),
    key() {
      return settoinfo[this.label.replace(' ', '')]
    },
    component() {
      return cpms.find(_ => _[0] === this.label.replace(' ', ''))[1]
    }
  },
  data() {
    return {
      model: false,
      label: 'Motion Detection',
      dialogVisible: false,
      list: [{ l: 'Motion Detection' }, { l: 'Spotlight Settings' }, { l: 'Video Settings' }, { l: 'Audio Settings' }, { l: 'Motor Settings' },
        { l: 'Alarm Information' }, { l: 'Notification' }, { l: 'General' }],
      idx: 0
    }
  },
  mounted() {
    this.dialogVisible = true
  },
  methods: {
    hddatachange() {
      const key = this.key
      const method = dicset[key]
      if (method) this.$mqtt.publish(method, { [key]: this.cameraInfo[key] })
      else console.log('方法不存在:' + key)
    },
    showSubSet(i, idx) {
      if (idx) return ElMessage('敬请期待！')
      this.label = i
      console.log(this.cameraInfo, this.key, findKeyByValue(dicget, this.key), i)
      if (this.cameraInfo[this.key]) return ''
      const method = findKeyByValue(dicget, this.key)
      method && this.$mqtt.publish(method)
    }
  },
  created() {
    this.showSubSet('Motion Detection')
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
    .el-loading-parent--relative {
      height: 440px;
      :deep .el-loading-mask {
        background-color: transparent;
      }
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
