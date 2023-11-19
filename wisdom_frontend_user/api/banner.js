import request from '@/utils/request'
export default {
  getAllBannerUser() {
    return request({
      url: '/cms/bannerUser/list',
      method: 'get'
    })
  }
}