/* eslint-disable no-throw-literal */
/* eslint-disable eqeqeq */
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
