<template>
  <div class="login fxi">
    <el-form :model="form" class="demo-form-inline">
      <el-form-item label="用户名:" label-width="60px">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码:" label-width="60px">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: { username: 'zhougong', password: 'JFat0Zdc' }
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      if (this.pending) return ''
      this.pending = 1
      this.login(this.form).then(res => {
        this.$router.push('/main')
      }).finally(() => (this.pending = 0))
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  justify-content: center;
  .el-form {
    width: 350px;
    margin-top: -100px;
  }
  .btn :deep {
    .el-form-item__content {
      display: flex;
      justify-content: center;
    }
    .el-button {
      width: 80px;
    }
  }
}
</style>
