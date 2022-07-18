<template>
  <el-switch v-model="val" size="large" inline-prompt active-text="开" inactive-text="关" :active-value="type?1:true"
  :inactive-value="type?0:false" style="--el-switch-off-color: #707070" @change="change"/>
</template>

<script>
export default {
  emits: ['change', 'update:modelValue'],
  props: ['type', 'modelValue'],
  data() {
    return { val: '' }
  },
  created() {
    this.val = this.modelValue
  },
  methods: {
    change(v) {
      this.$emit('update:modelValue', v)
      this.$emit('change')
    }
  }
}
</script>
