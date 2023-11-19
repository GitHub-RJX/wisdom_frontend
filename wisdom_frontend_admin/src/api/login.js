import request from '@/utils/request'

// 登录
export function login(data) {
  // debugger
   return request({
     url: '/edu/login',
     method: 'post',
     data
   })
 }
 
 // 获取用户信息
 export function getInfo(token) {
   return request({
     url: '/edu/info',
     method: 'get',
     params: { token }
   })
 }
 
 // 登出
 export function logout() {
   //debugger
   return request({
     url: '/edu/logout',
     method: 'post'
   })
 }
