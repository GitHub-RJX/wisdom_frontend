import request from '@/utils/request'

export default {
  //登录的方法
  login(ucenter) {
    return request({
      url: `/ucenter/login`,
      method: 'post',
      data: ucenter
    })
  },

  //根据token获取用户信息
  getLoginInfoByToken() {
    return request({
      url: `/ucenter/getByToken`,
      method: 'get'
    })
  }

}