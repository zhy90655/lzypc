import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import Store from '../../store/index'
import Router from '../../router/index'
const request = axios.create({
  baseURL: process.env.VUE_APP_HTTP_URL,
  // baseURL: '/api',
  timeout: 60000
})
request.interceptors.request.use(config => { // 请求拦截
  config.headers.Authorization = config.token || `bearer ${Store.state.user.access_token}`
  if (config.url.includes('check_token')) config.headers.Authorization = `bearer ${Store.state.user.refresh_token}`
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

request.interceptors.response.use(({ data, status, config }) => { // 响应拦截
  if (status === 200) return config.fmt ? data : data.data
  else {
    ElMessage(data.msg || '网络繁忙')
    return Promise.reject(data)
  }
}, err => {
  console.log(err.response.data)
  if (err.response.status === 424) {
    Store.commit('set_login', 0)
    Router.push('/')
  } else ElMessage.error(err.response.data.msg || err.response.data?.error_description || '网络繁忙')
  return Promise.reject(err)
})

export default request
