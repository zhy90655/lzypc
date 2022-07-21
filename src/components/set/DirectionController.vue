<template>
  <div class="drctl fxi">
    <div class="bgd fxi"><img src="../../assets/img/setting/move.png"></div>
    <p class="cover" ref="cover" @mousedown="hdmousedown"></p>
    <p class="dot"></p>
    <i class="cnt" :style="{transform: `translate(${position.x}px,${position.y}px)`}"></i>
  </div>
</template>

<script>
import { throttle } from '../../utils/tool'
export default {
  data() {
    return {
      position: { x: 0, y: 0 }
    }
  },
  methods: {
    hdmousemove(e) {
    },
    hdmousedown(e) {
      const { left, top } = this.$refs.cover.getBoundingClientRect()
      this.left = left
      this.top = top
      this.position = this.hdposition(e.offsetX - 96, e.offsetY - 96)
      this.getdirection(this.position)
      this.start = 1
    },
    hdmouseup(e) {
      if (!this.start) return ''
      this.position = { x: 0, y: 0 }
      this.start = 0
      if (this.direct !== 0) {
        this.direct = 0 // STOP
        this.$emit('change', 0)
      }
    },
    getdirection({ x, y }) {
      // const arr = ['STOP', 'UP', 'DOWN', 'LEFT', 'RIGHT', 'RIGHTUP', 'LEFTUP', 'RIGHTDOWN', 'LEFTDOWN']
      const edg = Math.atan(Math.abs(y / x)) / 3.14159
      let direct = ''
      switch (true) {
        case x >= 0 && y < 0:switch (true) {
          case edg <= 0.125: direct = 3; break // LEFT
          case edg <= 0.375: direct = 6; break // LEFTUP
          default: direct = 1; break // UP
        };break
        case x >= 0 && y >= 0:switch (true) {
          case edg <= 0.125: direct = 3; break // LEFT
          case edg <= 0.375: direct = 8; break // LEFTDOWN
          default: direct = 2; break // DOWN
        };break
        case x < 0 && y < 0:switch (true) {
          case edg <= 0.125: direct = 4; break // RIGHT
          case edg <= 0.375: direct = 5; break // RIGHTUP
          default: direct = 1; break // UP
        };break
        case x < 0 && y >= 0:switch (true) {
          case edg <= 0.125: direct = 4; break // RIGHT
          case edg <= 0.375: direct = 7; break // RIGHTDOWN
          default: direct = 2; break // DOWN
        };break
      }
      if (this.direct !== direct) {
        this.direct = direct
        this.$emit('change', direct, x, y)
      }
    },
    hdposition(x, y) {
      const rate = 71 / Math.sqrt(x * x + y * y)
      return rate < 1 ? { x: x * rate, y: y * rate } : { x, y }
    }
  },
  created() {
    this.direct = 0 // STOP
    this.hdmousemove = throttle((e) => {
      if (!this.start) return ''
      this.position = this.hdposition(e.pageX - this.left - 96, e.pageY - this.top - 96)
      this.getdirection(this.position)
    }, 50)
    window.addEventListener('mousemove', this.hdmousemove)
    window.addEventListener('mouseup', this.hdmouseup)
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.hdmousemove)
    window.removeEventListener('mouseup', this.hdmouseup)
  }
}
</script>
<style lang="scss" scoped>
.drctl {
  height: 210px;
  border-radius: 16px;
  margin-bottom: 8px;
  position: relative;
  user-select: none;
  text-align: center;
  justify-content: center;
  .cover {
    position: absolute;
    width: 192px;
    height: 192px;
    border-radius: 50%;
    cursor: pointer;
  }
  .cnt {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0px 1px 4px 2px #ddd;
    transition: transform .1s;
    pointer-events: none;
  }
  .dot {
    position: absolute;
    width: 56px;
    height: 56px;
    background-color: #fff;
    pointer-events: none;
  }
  .bgd {
    width: 198px;
    height: 198px;
    pointer-events: none;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    img {
      width: 210px;
    }
  }
}
</style>
