import request from '@/utils/request'

export default {
  //生成订单
  createOrder(courseId) {
    return request({
      url: '/order/save/' + courseId,
      method: 'post'
    })
  },
  //根据订单id查询订单信息
  getOrderByNo(orderNo) {
    return request({
      url: '/order/getOrderByNo/' + orderNo,
      method: 'get'
    })
  },
  //生成二维码的方法
  createNative(orderNo) {
    return request({
      url: '/order/paylog/createNative/createNative/' + orderNo,
      method: 'get'
    })
  },
  //查询订单状态的方法
  getPayStatus(orderNo) {
    return request({
      url: '/order/paylog/getPayStatus/' + orderNo,
      method: 'get'
    })
  }
}