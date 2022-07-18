import { createStore } from 'vuex'
import { getToken, userInfo } from '../api/http/interface'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    user: {},
    login: 0,
    userDetail: {},
    cameraInfo: {}
  },
  getters: {
  },
  mutations: {
    set_login(state, value) {
      state.login = value
    },
    set_userDetail(state, value) {
      state.userDetail = value
    },
    set_cameraInfo(state, value) {
      state.cameraInfo = value
    },
    set_user(state, value) {
      state.user = value || {}
    }
  },
  actions: {
    login({ commit }, data) {
      return getToken(data).then(res => {
        commit('set_login', 1)
        commit('set_user', res)
        // checktokenTid = setInterval(() => {
        //   checkToken().then(res=> {
        //     console.log(res);
        //   })
        // }, process.env.VUE_APP_CHECK_TOKEN || 10000);
        return userInfo().then(info => {
          commit('set_userDetail', info)
          return res
        })
      })
    }
  },
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
