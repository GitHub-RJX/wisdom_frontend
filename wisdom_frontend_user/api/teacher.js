import request from '@/utils/request'

export default {
  getFrontTeacherList() {
    return request({
      url: '/edu/front/teacherList',
      method: 'get'
    })
  },
  //分页讲师查询的方法
  getTeacherList(current, size) {
    return request({
      url: `/edu/front/teacher/getByPage/${current}/${size}`,
      method: 'get'
    })
  },
  //讲师详情的方法
  getTeacherInfo(id) {
    return request({
      url: `/edu/front/teacher/getById/${id}`,
      method: 'get'
    })
  }
}