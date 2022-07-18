import { h } from 'vue'
function install(Vue) {
  Vue.component(this.name, this)
}
export default {
  install,
  name: 'icon',
  props: {
    href: String
  },
  render() {
    return h(
      'svg',
      { class: 'l_icon', 'aria-hidden': true },
      [h('use', { 'xlink:href': '#' + this.href })]
    )
  }
}
