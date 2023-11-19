import request from '@/utils/request'

export default {
    getAll() {
        return request({
            url: '/edu/subject/list',
            method: 'get'
        })
    },
    save(eduSubject) {
        return request({
            url: `/edu/subject/save`,
            method: 'post',
            data: eduSubject
        })
    }
}