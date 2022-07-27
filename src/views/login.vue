<template>
  <div class="login fxi">
    <!-- <el-form :model="form" class="demo-form-inline">
      <el-form-item label="用户名:" label-width="60px">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码:" label-width="60px">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form> -->
    <video id="player" width="400" height="280" autoplay controls></video>
    <input type="file" multiple @change="hdcg1">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import JMuxer from '../assets/jmuxer/src/jmuxer'
import { bFileReader } from '../utils/tool'
import { ParseG711 } from '../utils/g711'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: false, corePath: '/static/wasm/ffmpeg/ffmpeg-core.js' })

export default {
  data() {
    return {
      form: { username: 'zhougong', password: 'JFat0Zdc' }
    }
  },
  beforeCreate() {
    this.ffload = ffmpeg.load()
  },
  methods: {
    ...mapActions(['login']),
    hdcg1({ target: { files } }) {
      const jmuxer = new JMuxer({ node: 'player', flushingTime: 1000, clearBuffer: false, fps: 15, debug: true })
      const file = [...files]
      let [acc, h264] = file
      if (acc.name.includes('h264')) [h264, acc] = file
      Promise.all([bFileReader(h264), bFileReader(acc)]).then(res => {
        ParseG711(res[1].target.result).then(wav => {
          this.ffload.then(async () => {
            ffmpeg.FS('writeFile', 'lzy.wav', wav)
            await ffmpeg.run('-i', 'lzy.wav', 'lzy.aac')
            const data = ffmpeg.FS('readFile', 'lzy.aac')
            jmuxer.feed({
              video: new Uint8Array(res[0].target.result),
              audio: data
            })
          })
        })
      })
    },
    parse(data) {
      const input = new Uint8Array(data)
      const dv = new DataView(input.buffer)
      const duration = dv.getUint16(0, true)
      const audioLength = dv.getUint16(2, true)
      const audio = input.subarray(4, (audioLength + 4))
      const video = input.subarray(audioLength + 4)
      return { audio, video, duration }
    },
    onSubmit() {
      if (this.pending) return ''
      this.pending = 1
      this.login(this.form).then(res => {
        this.$router.push('/main')
      }).finally(() => (this.pending = 0))
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  justify-content: center;
  .el-form {
    width: 350px;
    margin-top: -100px;
  }
  .btn :deep {
    .el-form-item__content {
      display: flex;
      justify-content: center;
    }
    .el-button {
      width: 80px;
    }
  }
}
</style>
