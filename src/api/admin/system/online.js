/**
 * 在线用户 api
 */

import request from '@/utils/request'

//列表
export function getUserList(params) {
    return request({
        method: 'post',
        url: '/apiadmin/online/list',
        data: params
    });
}





