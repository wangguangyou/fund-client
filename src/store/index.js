import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import localStorage from './modules/localStorage'
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    localStorage
  },
  plugins: [
    createPersistedState({
      paths: ['localStorage'],
      storage: window.localStorage
      // storage: {
      //   getItem: (key) => {
      //     if (process.server) {
      //       const parsedCookies = cookie.parse(req.headers.cookie);
      //       return parsedCookies[key];
      //     } else {
      //       return Cookies.get(key);
      //     }
      //   },
      //   setItem: (key, value) =>
      //     Cookies.set(key, value, {
      //       // expires: 365,
      //       secure: false
      //     }),
      //   removeItem: key => Cookies.remove(key)
      // }
    })
  ]
})