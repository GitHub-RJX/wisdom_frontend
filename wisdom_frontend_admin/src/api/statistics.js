import request from '@/utils/request'

export default {
    createData(date) {
        return request({
            url: `/statistics/daily/countRegisters/${date}`,
            method: 'post'
        })
    },
    getShowData(searchObj) {
        return request({
            url: `/statistics/daily/getShowData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }
}