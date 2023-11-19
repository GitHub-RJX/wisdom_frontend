import request from '@/utils/request'

export default {
  getFrontCourseList() {
    return request({
      url: '/edu/front/courseList',
      method: 'get'
    })
  },
  //条件分页课程查询的方法
  getCourseList(current, size, eduCourseVo) {
    return request({
      url: `/edu/front/course/getByPage/${current}/${size}`,
      method: 'post',
      data: eduCourseVo
    })
  },
  //查询所有分类的方法
  getAllSubject() {
    return request({
      url: '/edu/subject/list',
      method: 'get'
    })
  },
  //课程详情的方法
  getCourseInfo(id) {
    return request({
      url: `/edu/front/course/getById/${id}`,
      method: 'get'
    })
  }
}