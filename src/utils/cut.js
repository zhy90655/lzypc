import { download, formatDateAndTime, webrtcpolify } from '../utils/tool'
export function recording(_this) {
  if (_this.idx === 0) { // 结束录制
    _this.idx = ''
    _this._recorder.stop()
    setTimeout(() => {
      // download(URL.createObjectURL(_this.currentWebmData), '123.webm')
      download(URL.createObjectURL(_this.currentWebmData), _this.data.info.deviceName + '_' + formatDateAndTime(new Date()) + '.webm')
    }, 100)
  } else { // 开始录制
    const { captureStream, mimeType } = webrtcpolify
    _this._recorder = new MediaRecorder(_this.$refs.preview[captureStream](), { mimeType })
    _this._recorder.ondataavailable = (e) => {
      _this.currentWebmData = e.data
    }
    _this._recorder.start()
    _this.idx = 0
  }
}
export function shot(_this) {
  const canvas = document.createElement('canvas')
  canvas.width = _this.$refs.preview.videoWidth
  canvas.height = _this.$refs.preview.videoHeight
  canvas.getContext('2d').drawImage(_this.$refs.preview, 0, 0)
  download(canvas.toDataURL('image/jpg'), _this.data.info.deviceName + '_' + formatDateAndTime(new Date()) + '.png')
}
