/**
 * 聊天室 api
 */

import request from '@/utils/request'

//全部群组列表
export function getList(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/group/list',
        data: params
    });
}

//群组详情
export function getGroup(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/group/get',
        data: params
    });
}

//我的群组
export function getMyGroup(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/group/myGroup',
        data: params
    });
}

