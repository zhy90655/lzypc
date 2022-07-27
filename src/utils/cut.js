import { download, formatDateAndTime, webrtcpolify, bFileReader } from '../utils/tool'
export function recording(_this, ffmpeg) {
  if (_this.idx === 0) { // 结束录制
    _this.idx = ''
    _this._recorder.stop()
    setTimeout(async () => {
      ffmpeg.FS('writeFile', 'lzy.webm', await bFileReader(_this.currentWebmData))
      await ffmpeg.run('-i', 'lzy.webm', '-vcodec', 'copy', 'lzy.mp4')
      const data = ffmpeg.FS('readFile', 'lzy.mp4')
      download(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })), _this.data.info.deviceName + '_' + formatDateAndTime(new Date()) + '.mp4')
    }, 50)
  } else { // 开始录制
    const { captureStream, mimeType } = webrtcpolify
    _this._recorder = new MediaRecorder(_this.$refs.prv[captureStream](), { mimeType })
    _this._recorder.ondataavailable = (e) => {
      _this.currentWebmData = e.data
    }
    _this._recorder.start()
    _this.idx = 0
  }
}
export function shot(_this) {
  const canvas = document.createElement('canvas')
  canvas.width = _this.$refs.prv.videoWidth
  canvas.height = _this.$refs.prv.videoHeight
  canvas.getContext('2d').drawImage(_this.$refs.prv, 0, 0)
  download(canvas.toDataURL('image/jpg'), _this.data.info.deviceName + '_' + formatDateAndTime(new Date()) + '.png')
}
