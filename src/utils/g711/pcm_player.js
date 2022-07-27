/* eslint-disable eqeqeq */

export default class PCMPlayer {
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
