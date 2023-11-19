import request from '@/utils/request'

export default {
    getByPage(current, size, eduTeacher) {
        return request({
            url: `/edu/teacher/page/${current}/${size}`,
            method: 'post',
            data: eduTeacher
        })
    },
    getById(id) {
        return request({
            url: `/edu/teacher/${id}`,
            method: 'get'
        })
    },
    save(eduTeacher) {
        return request({
            url: `/edu/teacher/save`,
            method: 'post',
            data: eduTeacher
        })
    },
    deleteById(id) {
        return request({
            url: `/edu/teacher/${id}`,
            method: 'delete',
        })
    },
    update(eduTeacher) {
        return request({
            url: `/edu/teacher/update`,
            method: 'put',
            data: eduTeacher
        })
    }
}