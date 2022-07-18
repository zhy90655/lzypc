import request from './requst'
import qs from 'qs'
import Store from '../../store/index'
export function getToken(data) { // 用户登录
  return request({
    url: '/auth/oauth/token?grant_type=password',
    method: 'post',
    token: 'Basic dGVzdDp0ZXN0',
    fmt: 1, // 返回参数区别处理表示
    data: qs.stringify(data)
  })
}
export function userInfo(data) { // 获取用户详情
  return request({
    url: '/admin/user/info',
    method: 'get',
    data
  })
}
export function getDeviceList(data) { // 获取设备列表
  const { sysUser } = Store.state.userDetail
  return request({
    url: `/device/deviceinformation/user/page/${sysUser.userId}?${qs.stringify(data)}`,
    method: 'get'
  })
}
export function checkToken(data) { // 刷新token check_token
  return request({
    url: '/auth/oauth/check_token',
    method: 'get'
  })
}
export function getEvent(data) { // 根据设备id获取事件信息
  return request({
    url: '/event/eventinformation/page?' + qs.stringify(data),
    method: 'get'
  })
}
export function getDeviceConnection(deviceUuid) { // 根据设备id获取在线状态
  return request({
    url: '/getcls/api/v4/clients/' + deviceUuid,
    token: 'Basic YWRtaW46cHVibGlj',
    method: 'get'
  })
}
