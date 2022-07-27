/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 })
export const importObj = {
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
export class G711 {
  constructor(wasm, importObj) {
    if (importObj.memoryBase < 102400) {
      throw new Error('too small')
    }
    this._importObj = importObj
    this._wasm = wasm
    this._memory = new Uint8Array(this._importObj.env.memory.buffer)
  }

  _copyToMemory(data) {
    if (data.byteLength > (this._importObj.env.memoryBase >>> 6)) {
      throw new Error('overflow')
    }
    this._memory.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength))
  }

  decodeA(data) {
    this._copyToMemory(data)
    this._wasm.instance.exports._decodeG711a(data.byteLength, 0, data.byteLength)
    return new Int16Array(this._memory.buffer, data.byteLength, data.byteLength)
  }
}
export class Std {
  static memmem(data1, data1Offset, data2) {
    for (let i = 0; i <= data1.byteLength - data2.byteLength - data1Offset; ++i) {
      let j = 0
      for (; j != data2.byteLength; ++j) {
        if (data1[i + j + data1Offset] != data2[j]) {
          break
        }
      }
      if (j >= data2.byteLength) {
        return i + data1Offset
      }
    }
    return -1
  }

  static memcmp(data1, data1Offset, data2) {
    for (let i = 0; i != data2.byteLength; ++i) {
      if (data1[i + data1Offset] != data2[i]) {
        return -1
      }
    }
    return 0
  }

  static memcpy(data1, data1Offset, data2, data2Begin, data2End) {
    data1.set(data2.subarray(data2Begin, data2End), data1Offset)
  }

  static milliSecondTime() {
    return new Date().getTime()
  }

  static shortToFloatData(input) {
    const inputSamples = input.length
    const output = new Float32Array(inputSamples)
    for (let i = 0; i != inputSamples; ++i) {
      output[i] = input[i] / 32768
    }
    return output
  }

  static floatToShortData(input) {
    const inputSamples = input.length
    const output = new Int16Array(inputSamples)
    for (let i = 0; i != inputSamples; ++i) {
      output[i] = input[i] * 32768
    }
    return output
  }

  static downsampleBuffer(buffer, rate, sampleRate) {
    if (rate == sampleRate) {
      return buffer
    } else if (rate > sampleRate) {
      throw 'rate > sampleRate error !!'
    }
    const sampleRateRatio = sampleRate / rate
    const newLength = Math.ceil(buffer.length / sampleRateRatio) & 0xFFFC
    const result = new Float32Array(newLength)
    let offsetResult = 0
    let offsetBuffer = 0
    while (offsetResult != result.length) {
      const nextOffsetBuffer = offsetBuffer + sampleRateRatio
      let accum = 0
      let count = 0
      const currentOffset = Math.ceil(offsetBuffer)
      const currentNextOffset = Math.ceil(nextOffsetBuffer)
      for (let i = currentOffset; i != currentNextOffset && i != buffer.length; ++i) {
        accum += buffer[i]
        ++count
      }
      result[offsetResult] = accum / count
      ++offsetResult
      offsetBuffer = nextOffsetBuffer
    }
    return result
  }
}

class Result {
  constructor(data, type, time, errorCode, duration = 20) {
    this.data = data
    this.type = type
    this.time = time
    this.duration = duration
    this.errorCode = errorCode
  }

  static makeErrorResult(errorCode) {
    return new Result(null, -1, -1, errorCode)
  }
}

Result.ErrorCode = class {
}

Result.ErrorCode.SUCCESS = 0
Result.ErrorCode.PARAM_ERROR = 1000
Result.ErrorCode.PARAM_CHANGE = 2000
Result.ErrorCode.FAIL = 3000
Result.ErrorCode.NO_INIT_ERROR = Result.ErrorCode.FAIL + 1
Result.ErrorCode.CACHE_MAX_ERROR = Result.ErrorCode.FAIL + 2

Result.Type = class {
}

Result.Type.H264_I_FRAME = 0
Result.Type.H264_P_FRAME = 1
Result.Type.H264_B_FRAME = 2
Result.Type.AUDIO = 3
Result.Type.TRANS_DATA = 4
Result.Type.FMP4_HEAD = 5
Result.Type.FMP4_BODY = 6

export class PCMPlayer {
  constructor(channels, sampleRate) {
    this._samples = new Float32Array()
    this._flushingTime = 200
    this._channels = channels
    this._sampleRate = sampleRate
    this._flush = this._flush.bind(this)
    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this._gainNode = this._audioCtx.createGain()
    this._gainNode.gain.value = 1
    this._gainNode.connect(this._audioCtx.destination)
    this._startTime = this._audioCtx.currentTime
    this._interval = setInterval(this._flush, this._flushingTime)
  }

  setVolume(volume) {
    this._gainNode.gain.value = volume
  }

  close() {
    if (this._interval) {
      clearInterval(this._interval)
    }
    this._audioCtx.close()
  };

  feed(data) {
    const tmp = new Float32Array(this._samples.length + data.length)
    tmp.set(this._samples, 0)
    tmp.set(data, this._samples.length)
    this._samples = tmp
  };

  _flush() {
    if (!this._channels || !this._sampleRate || !this._samples.length) {
      return
    }
    const bufferSource = this._audioCtx.createBufferSource()
    const length = this._samples.length / this._channels
    const audioBuffer = this._audioCtx.createBuffer(this._channels, length, this._sampleRate)
    for (let channel = 0; channel != this._channels; ++channel) {
      const audioData = audioBuffer.getChannelData(channel)
      let offset = channel
      let decrement = 50
      for (let i = 0; i != length; ++i) {
        audioData[i] = this._samples[offset]
        if (i < 50) {
          audioData[i] = (audioData[i] * i) / 50
        }
        if (i >= (length - 51)) {
          audioData[i] = (audioData[i] * decrement--) / 50
        }
        offset += this._channels
      }
    }

    if (this._startTime < this._audioCtx.currentTime) {
      this._startTime = this._audioCtx.currentTime
    }
    console.log(audioBuffer, length)

    // var anchor = document.createElement('a')
    // document.body.appendChild(anchor)
    // anchor.style = 'display: none'
    // var wav = audioBufferToWav(audioBuffer)
    // var blob = new window.Blob([ new DataView(wav) ], { type: 'audio/wav' })
    // var url = window.URL.createObjectURL(blob)
    // const vid = document.querySelector('audio')
    // vid.src = url
    // vid.play()
    // anchor.href = url
    // anchor.download = 'audio.wav'
    // anchor.click()
    // window.URL.revokeObjectURL(url)

    bufferSource.buffer = audioBuffer
    bufferSource.connect(this._gainNode)
    bufferSource.start(this._startTime)
    this._startTime += audioBuffer.duration
    this._samples = new Float32Array()
  }
}
