import * as debug from '../util/debug'
import { MP4 } from '../util/mp4-generator.js'
import { AACRemuxer } from '../remuxer/aac.js'
import { H264Remuxer } from '../remuxer/h264.js'
import { appendByteArray, secToTime } from '../util/utils.js'
import Event from '../util/event'

export default class RemuxController extends Event {
  constructor (env) {
    super('remuxer')
    this.initialized = false
    this.trackTypes = []
    this.tracks = {}
    this.seq = 1
    this.env = env
    this.timescale = 1000
    this.mediaDuration = 0
  }

  addTrack (type) {
    if (type === 'video' || type === 'both') {
      this.tracks.video = new H264Remuxer(this.timescale)
      this.trackTypes.push('video')
    }
    if (type === 'audio' || type === 'both') {
      this.tracks.audio = new AACRemuxer(this.timescale)
      this.trackTypes.push('audio')
    }
  }

  reset () {
    for (const type of this.trackTypes) {
      this.tracks[type].resetTrack()
    }
    this.initialized = false
  }

  destroy () {
    this.tracks = {}
    this.offAll()
  }

  flush () {
    if (!this.initialized) {
      if (this.isReady()) {
        this.dispatch('ready')
        this.initSegment()
        this.initialized = true
        this.flush()
      }
    } else {
      for (const type of this.trackTypes) {
        const track = this.tracks[type]
        const pay = track.getPayload()
        if (pay && pay.byteLength) {
          const moof = MP4.moof(this.seq, track.dts, track.mp4track)
          const mdat = MP4.mdat(pay)
          const payload = appendByteArray(moof, mdat)
          const data = {
            type: type,
            payload: payload,
            dts: track.dts
          }
          if (type === 'video') {
            data.fps = track.mp4track.fps
          }
          this.dispatch('buffer', data)
          const duration = secToTime(track.dts / this.timescale)
          debug.log(`put segment (${type}): dts: ${track.dts} frames: ${track.mp4track.samples.length} second: ${duration}`)
          track.flush()
          this.seq++
        }
      }
    }
  }

  initSegment () {
    const tracks = []
    for (const type of this.trackTypes) {
      const track = this.tracks[type]
      if (this.env === 'browser') {
        const data = {
          type: type,
          payload: MP4.initSegment([track.mp4track], this.mediaDuration, this.timescale)
        }
        this.dispatch('buffer', data)
      } else {
        tracks.push(track.mp4track)
      }
    }
    debug.log('Initial segment generated.')
  }

  isReady () {
    for (const type of this.trackTypes) {
      if (!this.tracks[type].readyToDecode || !this.tracks[type].samples.length) return false
    }
    return true
  }

  remux (data) {
    for (const type of this.trackTypes) {
      const frames = data[type]
      if (type === 'audio' && this.tracks.video && !this.tracks.video.readyToDecode) continue /* if video is present, don't add audio until video get ready */
      if (frames.length > 0) {
        this.tracks[type].remux(frames)
      }
    }
    this.flush()
  }
}
