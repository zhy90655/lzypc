import PCMPlayer from './pcm_player'
import { Std } from './std'
let pcmPlayer = null
export function g711(g711data, wasm, importObj) {
  const memory = new Uint8Array(importObj.env.memory.buffer)
  if (pcmPlayer != null) pcmPlayer.close()
  pcmPlayer = new PCMPlayer(1, 8000)
  const decoder = (data) => {
    if (data.byteLength > (importObj.env.memoryBase >>> 6)) throw new Error('overflow')
    memory.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength))
    wasm.instance.exports._decodeG711a(data.byteLength, 0, data.byteLength)
    return new Int16Array(memory.buffer, data.byteLength, data.byteLength)
  }
  const step = 160
  for (let i = 0; i < g711data.byteLength; i += step) {
    const pcm16BitData = decoder(g711data.slice(i, i + step))
    const pcmFloat32Data = Std.shortToFloatData(pcm16BitData)
    pcmPlayer.feed(pcmFloat32Data)
  }
}
