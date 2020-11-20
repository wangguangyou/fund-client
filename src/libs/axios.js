const axios = require('axios')
// import adapter from 'axios/lib/adapters/http.js'
// axios.defaults.adapter = adapter
/**
 * @description 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})


export const GET = (url, params) => {
  return axios.get(`${url}`, {
    params
  }).then(data => data)
}

export const POST = (url, params) => {
  return axios.post(`${url}`, params).then(data => data)
}