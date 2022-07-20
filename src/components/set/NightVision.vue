<template>
  <div class="vdc" v-if="data">
    <ul>
      <li v-for="(_,i) in nightVisonOptions" :key="i" class="fxi sct" @click="data.alarmNoticationMode=i;hdchange()">
        <img src="../../assets/img/setting/icon_circle_seleted.png" v-if="data.alarmNoticationMode==i">
        <img src="../../assets/img/setting/icon_circle_nor.png" v-else>
        <div>
          <h6>{{_.l}}</h6>
          <p class="scd">{{_.t}}</p>
        </div>
      </li>
    </ul>
  </div>
  <div v-loading="!cameraInfo[labelkey]" element-loading-text="加载中…" v-else></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      nightVisonOptions: [{ v: 0, l: 'B&W Night Vision', t: 'The IR LED will turn on when motion is detected at night.' },
        { v: 1, l: 'Color Night Vision', t: 'Automatically turn on spotlight when motion is detected at night. It records with color videos while it may be battery consuming.' },
        { v: 2, l: 'Turn Off', t: 'Turn off the IR LED and spotlight when at night.' }]
    }
  }
}
</script>
<style lang="scss" scoped>
.sct {
  cursor: pointer;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px 1px rgb(255 255 255 / 55%);
  border-radius: 16px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  user-select: none;
  img {
    width: 20px;
    margin-right: 15px;
  }
  h6 {
    margin: 6px 0 8px;
  }
}
.vdc {
  padding: 0 16px;
  box-sizing: border-box;
  h6 {
    font-size: 16px;
    font-weight: 400;
  }
  .scd {
    color: #aaa;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
