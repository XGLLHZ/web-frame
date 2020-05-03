/**
 * 日志 api
 */

import request from '@/utils/request'

//列表
export function getLogList(params) {
    return request({
        method: 'post',
        url: '/apiadmin/log/list',
        data: params
    });
}

//详情
export function getLogInfo(params) {
    return request({
        method: 'post',
        url: '/apiadmin/log/get',
        data: params
    });
}




