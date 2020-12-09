// import {
//   GET,
//   POST
// } from '@/libs/axios'
// http://fund.eastmoney.com/pingzhongdata/180012.js?v=20201118155252
import qs from 'qs'
const superagent = require('superagent');

export const searchFund = (params) => superagent.get(
  `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?${qs.stringify(
    Object.assign({ m: 1,  key: '', _: Date.now() },params))
  }`
)
export const getSh = (params) => superagent.get(
  `http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=sh000001,day,,,30,qfq`
)

export const getFundView = (code) => {
  let uri = `http://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`
  return superagent.get(uri)
}
export const getFundDetails = (code) => {
  return superagent.get(`http://fund.eastmoney.com/pingzhongdata/${code}.js`)
}
export const getFundVarietieValuationDetail = (code) => {
  return superagent.get(`https://fundmobapi.eastmoney.com/FundMApi/FundVarietieValuationDetail.ashx?FCODE=${code}&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=${Date.now()}`)
}
// export const searchFund = (params) => GET(
//   `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx`,
//   Object.assign({
//     m: 1,
//     key: '',
//     _: Date.now()
//   }, params))