<template>
  <div class="list" @click.stop>
    <Header title="设置" @back='$emit("close")' />
    <ll-scrollbar class="scro">
      <div class="ctt">
        <div class="baseinfo">
          <p class="title">{{cameraInfo.info.deviceName}}</p>
          <p class="tip">Admin permission, Shared by Bobby</p>
          <p class="imgs fxi">
            <img src="../../assets/img/setting/icon_Battery_gray.png">
            <img src="../../assets/img/setting/icon_wifi_gray.png">
          </p>
          <img class="pre" src="../../assets/img/cover/cmr.png">
          <el-switch v-model="model" size="large" inline-prompt active-text="开" inactive-text="关" :active-value="true" :inactive-value="false" @change="hdchange('ad')" />
        </div>
        <div class="md sct" @click="showSubSet('Motion Detection')">
          <h6 class="tt">Motion Detection</h6>
          <p></p>
          <img class="ticon" src="../../assets/img/setting/icon_Detect_peo.png">
          <img class="bicon" src="../../assets/img/setting/icon_Detect.png">
        </div>
        <div class="ssnv fxi">
          <div class="sct" @click="showSubSet('Spotlight Settings')">
            <h6 class="tt">Spotlight Settings</h6>
            <p>On</p>
            <img class="bicon" src="../../assets/img/setting/icon_spotlight.png">
          </div>
          <div class="sct" @click="showSubSet('Night Vision')">
            <h6 class="tt">Night Vision</h6>
            <p>B＆W Night Vision</p>
            <img class="bicon" src="../../assets/img/setting/icon_moon.png">
          </div>
        </div>
        <ul class="fst">
          <li v-for="(_,i) in ['Video Settings','Audio Settings','Motor Settings','Alarm Information','Notification','General']"  @click="showSubSet(_)" :key="i" class="fxi">
            {{_}}<img src="../../assets/img/setting/icon_arrow_blue.png">
          </li>
        </ul>
        <p class="sbtn fxi" v-for="(_,i) in ['Restart','Remove']" :key="i" @click="showSubSet(_,1)">{{_}} Device</p>
      </div>
    </ll-scrollbar>
    <transition name="page-move">
      <div class="sub" v-if="label">
        <Header :title="label" @back='label=""' />
        <component :is="component" @change='hddatachange' :labelkey='key' :title="label" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dicget, dicset, settoinfo } from '../../api/mqtt/requst'
import { findKeyByValue } from '../../utils/tool'
import { defineAsyncComponent } from 'vue'
import Header from './header.vue'
import { ElMessage } from 'element-plus'
const cpms = Object.keys(settoinfo).map(_ => [_, defineAsyncComponent(() => import('./' + _ + '.vue'))])
export default {
  emits: ['close'],
  components: { Header },
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
    return { model: false, label: '' }
  },
  created() {
    console.log(this.cameraInfo, 99)
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
    },
    hdchange() {
      console.log(33333)
    }
  }
}
</script>
<style lang="scss" scoped>
.sub {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(3px);
  transform: translateX(0);
  .el-loading-parent--relative {
    height: calc(100% - 56px);
  }
  :deep .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.sbtn {
  height: 49px;
  border-radius: 24.5px;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
  &+.sbtn {
    color: #E95A60;
    margin-bottom: 20px;
  }
}
.fst {
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
  position: relative;
  user-select: none;
  li {
    cursor: pointer;
    height: 59px;
    margin: 0 16px;
    &+li {
      border-top: 1px solid #F1F1F1;
    }
    img {
      width: 26px;
      position: absolute;
      right: 14px;
    }
  }
}
.ssnv {
  justify-content: space-between;
  >div {
    width: calc(50% - 4px);
    height: 114px;
    > p {
      margin-top: 12px;
      font-size: 13px;
      color: #aaa;
    }
  }
}
.md {
  height: 116px;
  .ticon {
    width: 26px;
    margin-top: 8px;
  }
}
.sct {
  cursor: pointer;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
  .bicon {
    position: absolute;
    width: 28px;
    bottom: 16px;
    right: 16px;
  }
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
}
.baseinfo {
  color: #333;
  padding-top: 20px;
  position: relative;
  display: none;
  .imgs {
    margin-top: 5px;
    img {
      height: 32px;
      &+img {
        height: 26px;
        margin-left: 16px;
        margin-top: -3px;
      }
    }
  }
  .pre {
    display: block;
    margin: -2px auto 20px;
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
  }
  .tip {
    font-size: 13px;
    color: #aaa;
  }
  .el-switch {
    position: absolute;
    top: 22px;
    right: 0px;
  }
}
.list {
  width: 450px;
  height: 100%;
  z-index: 1;
  background-position: top center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  overflow: hidden;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 35%);
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
  .scro {
    height: calc(100% - 56px);
    .ctt {
      padding: 0 16px;
    }
  }
}
</style>
