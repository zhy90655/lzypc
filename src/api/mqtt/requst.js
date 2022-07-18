import mqtt from 'mqtt'
import { ElMessage } from 'element-plus'
import Store from '../../store/index'
export const mqttcfg = {
  basecfg: { clean: true, reconnectPeriod: 40000, connectTimeout: 2000 },
  qos: 0
}
export const $mqtt = {}
export const dicget = { // 命令和数据属性对应字典
  getDeviceGeneralInformationCommand: 'deviceGeneralInformation', // 设备信息数据
  getAlarmNotificationInformationCommand: 'notificationInformation', // 告警消息设置
  getAudioInformationCommand: 'audioInformation', // 声音设置数据
  getVideoInformationCommand: 'videoInformation', // 视频设置
  getMotionDetectionInformationCommand: 'motionDetectionInformation', // 运动侦测
  getAlarmInformationCommand: 'alarmInformation', // 告警配置数据
  getPeripheralControlInformationCommand: 'peripheralControlInformation', // 灯光控制
  getMotorControlInformationCommand: 'motorControlInformation', // 电机控制
  getStorageInformationCommand: 'storageInformation' // 存储信息
}
export const dicset = { // 命令和数据属性对应字典
  notificationInformation: 'setAlarmNotificationInformationCommand', // 告警消息设置
  deviceGeneralInformation: 'setDeviceGeneralInformationCommand', // 设备信息数据
  audioInformation: 'setAudioInformationCommand', // 声音设置
  videoInformation: 'setVideoInformationCommand', // 视频设置
  motionDetectionInformation: 'setMotionDetectionInformationCommand', // 运动侦测
  peripheralControlInformation: 'setPeripheralControlInformationCommand', // 灯光控制
  motorControlInformation: 'setMotorControlInformationCommand', // 电机控制
  alarmInformation: 'setAlarmInformationCommand' // 告警配置数据
}

export const settoinfo = { // 命令和数据属性对应字典
  General: 'deviceGeneralInformation', // 设备信息数据
  Notification: 'notificationInformation', // 告警消息设置
  AudioSettings: 'audioInformation', // 声音设置数据
  VideoSettings: 'videoInformation', // 视频设置
  MotionDetection: 'motionDetectionInformation', // 运动侦测
  AlarmInformation: 'alarmInformation', // 告警配置数据
  SpotlightSettings: 'peripheralControlInformation', // 灯光控制
  NightVision: '', // 夜间模式
  MotorSettings: 'motorControlInformation' // 电机控制
}

export default ({ uuidId }) => {
  $mqtt.uuidId = uuidId
  const { userId } = Store.state.userDetail.sysUser
  const client = mqtt.connect(process.env.VUE_APP_MQTT_URL, mqttcfg.basecfg)
  const subscribe = e => {
    client.subscribe(`v1/devices/${userId}/rpc/response/${$mqtt.uuidId}`, { qos: mqttcfg.qos }, (err, res) => {
      if (!err) console.log('订阅成功', res)
      else console.log('消息订阅失败！', err)
    })
  }
  client.on('connect', () => { console.log('链接成功:'); subscribe() })
  client.on('message', (topic, message) => {
    const res = JSON.parse(message.toString())
    if (res.status > 0) {
      if (res.params) {
        const key = dicget[res.method.replace('Respone', '')]
        if (key) {
          Store.commit('set_cameraInfo', { ...Store.state.cameraInfo, [key]: res.params[key] })
          console.log(res.params[key], key, res, 1000)
        }
      } else {
        Store.commit('set_cameraInfo', { ...Store.state.cameraInfo })
        console.log(topic, res, 1001)
      }
    } else {
      console.log(res, 'err')
      ElMessage.error(res.method || '操作失败')
    }
  })
  $mqtt.uidchange = function(uid) {
    client.unsubscribe(`v1/devices/${userId}/rpc/response/${$mqtt.uuidId}`, (error) => {
      if (error) console.log('取消订阅失败:', error)
      else console.log('取消订阅成功')
    })
    $mqtt.uuidId = uid
    subscribe()
  }
  $mqtt.publish = function(method, params) { // 发布消息方法
    console.log({ method, params }, '发布111')
    method && client.publish(`v1/devices/${$mqtt.uuidId}/rpc/request/${userId}`, JSON.stringify({ method, params }), { qos: mqttcfg.qos }, error => {
      if (error) console.log('发布失败', error)
    })
  }
  client.on('reconnect', (error) => {
    console.log('正在重连:', error, client.connected)
  })
  client.on('error', error => {
    console.log('链接失败', error)
  })
  $mqtt.unconnect = () => { // 断开连接
    $mqtt.client.end()
    $mqtt.client = null
    console.log('服务器已断开连接！')
  }
  $mqtt.client = client
}
