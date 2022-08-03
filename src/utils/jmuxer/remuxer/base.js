let trackId = 1
export class BaseRemuxer {
  static getTrackID () {
    return trackId++
  }

  flush () {
    this.mp4track.len = 0
    this.mp4track.samples = []
  }

  isReady () {
    if (!this.readyToDecode || !this.samples.length) return null
    return true
  }
}
