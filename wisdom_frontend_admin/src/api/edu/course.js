import request from '@/utils/request'

export default {
    getByPage(current, size, eduCourse) {
        return request({
            url: `/edu/course/page/${current}/${size}`,
            method: 'post',
            data: eduCourse
        })
    },
    getAllTeacher() {
        return request({
            url: `/edu/teacher/list`,
            method: 'get'
        })
    },
    getAllSubject() {
        return request({
            url: `/edu/subject/list`,
            method: 'get'
        })
    },
    getInfoById(id) {
        return request({
            url: `/edu/course/${id}`,
            method: 'get'
        })
    },
    getEduCoursePublishVo(courseId) {
        return request({
            url: `/edu/course/beforePublish/${courseId}`,
            method: 'get'
        })
    },
    save(eduCourse) {
        return request({
            url: '/edu/course/save',
            method: 'post',
            data: eduCourse
        })
    },
    deleteById(id) {
        return request({
            url: `/edu/course/${id}`,
            method: 'delete',
        })
    },
    update(eduCourseInfo) {
        return request({
            url: '/edu/course/update',
            method: 'put',
            data: eduCourseInfo
        })
    },
    updateDraft(courseId) {
        return request({
            url: `/edu/course/updateDraft/${courseId}`,
            method: 'put'
        })
    },
    updateNormal(courseId) {
        return request({
            url: `/edu/course/updateNormal/${courseId}`,
            method: 'put'
        })
    }
}