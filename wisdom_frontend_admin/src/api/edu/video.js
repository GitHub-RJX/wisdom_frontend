import request from '@/utils/request'

export default {
    getVideoById(videoId) {
        return request({
            url: `/edu/video/${videoId}`,
            method: 'get'
        })
    },
    addVideo(video) {
        return request({
            url: `/edu/video/save`,
            method: 'post',
            data: video
        })
    },
    updateVideo(video) {
        return request({
            url: `/edu/video/update`,
            method: 'put',
            data: video
        })
    },
    deleteVideo(videoId) {
        return request({
            url: `/edu/video/delete/${videoId}`,
            method: 'delete'
        })
    }
}