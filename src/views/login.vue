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
    <video id="player" width="400" height="280" controls></video>
    <input type="file" multiple @change="hdcg1">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import JMuxer from '../assets/jmuxer/src/jmuxer'
import { bFileReader } from '../utils/tool'
import { PCMPlayer, Std, G711, importObj } from './g711'
// import { createFFmpeg } from '@ffmpeg/ffmpeg'
// const ffmpeg = createFFmpeg({ log: true })

const fec = url => fetch(url).then((res) => res.arrayBuffer())
const fc = fec('/audio.wasm').then((bytes) => WebAssembly.instantiate(bytes, importObj))
export default {
  data() {
    return {
      form: { username: 'zhougong', password: 'JFat0Zdc' }
    }
  },
  beforeCreate() {
    this.pcmPlayer = null
    const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 })
    this.importObj = {
      env: {
        abortStackOverflow: () => { throw new Error('overflow') },
        table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        tableBase: 0,
        memory: memory,
        memoryBase: 102400,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength
      }
    }
    // console.log(ffmpeg)
  },
  methods: {
    ...mapActions(['login']),
    hdcg1({ target: { files } }) {
      console.log(files[0])
      Promise.all([bFileReader(files[0]), fc]).then(res => {
        console.log(res[1], 888)
        const pcmPlayer = new PCMPlayer(1, 8000)
        const decoder = new G711(res[1], importObj)
        const audioData = new Uint8Array(res[0].target.result)
        const step = 160
        for (let i = 0; i < audioData.byteLength; i += step) {
          const pcm16BitData = decoder.decodeA.bind(decoder)(audioData.slice(i, i + step))
          const pcmFloat32Data = Std.shortToFloatData(pcm16BitData)
          pcmPlayer.feed(pcmFloat32Data)
        }
      })
    },
    hdcg({ target: { files } }) {
      // const jmuxer = new JMuxer({
      //   node: 'player',
      //   mode: 'video', // both, audio, video
      //   flushingTime: 1000,
      //   clearBuffer: false,
      //   fps: 15,
      //   debug: true
      // })
      const file = [...files]
      let [acc, h264] = file
      if (acc.name.includes('h264')) [h264, acc] = file
      let pcmPlayer = null
      Promise.all([bFileReader(h264), bFileReader(acc), this.wasm]).then(res => {
        // jmuxer.feed({ video: new Uint8Array(res[0].target.result) })
        console.log(res)
        if (pcmPlayer != null) pcmPlayer.close()
        pcmPlayer = new PCMPlayer(1, 8000)
        const decoder = new G711(res[2], importObj)

        const audioData = new Uint8Array(res[1].target.result)
        const step = 160
        for (let i = 0; i < audioData.byteLength; i += step) {
          const pcm16BitData = decoder.decodeA.bind(decoder)(audioData.slice(i, i + step))
          const pcmFloat32Data = Std.shortToFloatData(pcm16BitData)
          pcmPlayer.feed(pcmFloat32Data)
        }

        // g711(res[1].target.result, res[2], this.importObj)
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
