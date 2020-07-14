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

//导出
export function exportLog(params) {
    return request({
        method: 'post',
        url: '/apiadmin/log/export',
        data: params,
        responseType: 'arraybuffer'   //返回结果为二进制
    });
}

//导入
export function importLog(params) {
    return request({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        url: '/apiadmin/log/import',
        data: params
    });
}




