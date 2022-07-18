import { mapState } from 'vuex'
import Switch from '../common/switch.vue'
export default {
  props: ['title', 'labelkey'],
  emits: ['close', 'change'],
  computed: mapState(['cameraInfo']),
  components: { Switch },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    hdchange() {
      this.$emit('change')
    }
  },
  created() {
    this.data = this.cameraInfo[this.labelkey]
    console.log(this.data, 887)
  },
  watch: {
    cameraInfo(v) {
      this.data = v[this.labelkey]
    }
  }
}
