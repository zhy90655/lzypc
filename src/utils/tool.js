export function download(url, fileName) {
  const eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.href = url
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
export function fmtdata(data) { // 将json格式数据转成json对象
  for (const key in data) {
    if (typeof data[key] === 'string' && data[key].startsWith('{')) data[key] = JSON.parse(data[key])
  }
}

export const webrtcpolify = (function(e) { // 浏览器兼容性处理
  return { captureStream: e ? 'mozCaptureStream' : 'captureStream', mimeType: e ? 'video/webm' : 'video/webm;codecs=h264' }
})(navigator.userAgent.includes('Firefox'))

export function hdt(t) { // 1 -> 01
  return ('0' + t).slice(-2)
}
// 格式化时间 只支持 'YYYY-MM-DDD'
export function formatDate(time, n = 0, split = '-') {
  const t = new Date(time - n * 24 * 3600000)
  return t.getFullYear() + split + hdt(t.getMonth() + 1) + split + hdt(t.getDate())
}
export const formatDateAndTime = (time) => {
  const t = new Date(time)
  return `${formatDate(t)} ${hdt(t.getHours())}:${hdt(t.getMinutes())}:${hdt(t.getSeconds())}`
}
export function hdtime(v) {
  return hdt(Math.floor(v / 3600)) + ':' + hdt(Math.floor(v % 3600 / 60)) + ':' + hdt(parseInt(v % 60))
}

export const throttle = (func, wait) => { // 节流函数
  let previous = 0
  let timeout = null
  return function(e) {
    const now = +new Date()
    if (timeout) clearTimeout(timeout)
    if (now - previous >= wait) {
      previous = now
      func(e)
    } else {
      timeout = setTimeout(() => {
        func(e)
        timeout = null
        previous = +new Date()
      }, wait - now + previous)
    }
  }
}
export function formatTime(time) {
  const [hour, minute, second] = time.slice(11).split(':')
  return +hour * 3600 + (+minute * 60) + (+second)
}
export function getTheme() {
  return localStorage.getItem('__theme_key_')
}
export function bFileReader(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = resolve // CHANGE to whatever function you want which would eventually call resolve
    fr.onerror = reject
    fr.readAsArrayBuffer(file)
  })
}
