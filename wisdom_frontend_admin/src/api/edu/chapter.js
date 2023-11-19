import request from '@/utils/request'

export default {
    getAllChapter(courseId) {
        return request({
            url: `/edu/chapter/list/${courseId}`,
            method: 'get'
        })
    },
    getChapterById(chapterId) {
        return request({
            url: `/edu/chapter/${chapterId}`,
            method: 'get'
        })
    },
    addChapter(eduChapter) {
        return request({
            url: `/edu/chapter/save`,
            method: 'post',
            data: eduChapter
        })
    },
    updateChapter(eduChapter) {
        return request({
            url: `/edu/chapter/update`,
            method: 'put',
            data: eduChapter
        })
    },
    deleteChapter(chapterId) {
        return request({
            url: `/edu/chapter/deleteById/${chapterId}`,
            method: 'delete'
        })
    }
}