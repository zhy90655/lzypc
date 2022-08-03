import audioBufferToWav from './towav'
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
class G711 {
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

function shortToFloatData(input) {
  const inputSamples = input.length
  const output = new Float32Array(inputSamples)
  for (let i = 0; i !== inputSamples; ++i) {
    output[i] = input[i] / 32768
  }
  return output
}
const fc = fetch('/static/wasm/g711/audio.wasm').then((e) => e.arrayBuffer()).then((bt) => WebAssembly.instantiate(bt, importObj))
export const ParseG711 = (audioData) => {
  return fc.then(wasm => {
    const pcmPlayer = new PCMPlayer(1, 8000)
    const decoder = new G711(wasm, importObj)
    const step = 160
    for (let i = 0; i < audioData.byteLength; i += step) {
      const pcm16BitData = decoder.decodeA.bind(decoder)(audioData.slice(i, i + step))
      const pcmFloat32Data = shortToFloatData(pcm16BitData)
      pcmPlayer.feed(pcmFloat32Data)
    }
    return pcmPlayer._flush()
  })
}

class PCMPlayer {
  constructor(channels, sampleRate) {
    this._samples = new Float32Array()
    this._channels = channels
    this._sampleRate = sampleRate
    this._flush = this._flush.bind(this)
    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this._startTime = this._audioCtx.currentTime
  }

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
    const length = this._samples.length / this._channels
    const audioBuffer = this._audioCtx.createBuffer(this._channels, length, this._sampleRate)
    for (let channel = 0; channel !== this._channels; ++channel) {
      const audioData = audioBuffer.getChannelData(channel)
      let offset = channel
      let decrement = 50
      for (let i = 0; i !== length; ++i) {
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
    const wav = audioBufferToWav(audioBuffer)
    this._audioCtx.close()
    return new Uint8Array(wav)
  }
}
