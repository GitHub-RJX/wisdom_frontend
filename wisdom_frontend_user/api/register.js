import request from '@/utils/request'

export default {
    //根据手机号发验证码
  sendCode(phone) {
    return request({
      url: `/msm/getCode/${phone}`,
      method: 'get'
    })
  },

  //注册的方法
  register(registerVo) {
    return request({
      url: `/ucenter/register`,
      method: 'post',
      data: registerVo
    })
  }

}