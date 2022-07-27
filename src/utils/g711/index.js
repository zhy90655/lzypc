
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
