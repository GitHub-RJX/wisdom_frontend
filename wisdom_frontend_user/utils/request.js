import axios from 'axios'
import cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: `http://localhost:8099`, // api的base_url
  timeout: 20000 // 请求超时时间
})
// 第三步http request 拦截器
service.interceptors.request.use(
  config => {
    //debugger
    //判断cookie里面wisdom_token是否有值
    if (cookie.get('wisdom_token')) {
      //吧获取的token放在头部headers中
      config.headers['token'] = cookie.get('wisdom_token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  })

export default service