export default class Event {
  constructor (type) {
    this.listener = {}
    this.type = type | ''
  }

  on (event, fn) {
    if (!this.listener[event]) {
      this.listener[event] = []
    }
    this.listener[event].push(fn)
    return true
  }

  off (event, fn) {
    if (this.listener[event]) {
      const index = this.listener[event].indexOf(fn)
      if (index > -1) {
        this.listener[event].splice(index, 1)
      }
      return true
    }
    return false
  }

  offAll () {
    this.listener = {}
  }

  dispatch (event, data) {
    if (this.listener[event]) {
      this.listener[event].forEach((each) => {
        each(data)
      })
      return true
    }
    return false
  }
}
