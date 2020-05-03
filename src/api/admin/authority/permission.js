/**
 * 权限 api
 */

import request from '@/utils/request'

//列表
export function getPermList(params) {
    return request({
        method: 'post',
        url: '/apiadmin/permission/list',
        data: params
    });
}

//详情
export function getPermInfo(params) {
    return request({
        method: 'post',
        url :'/apiadmin/permission/get',
        data: params
    });
}

//新增
export function insertPerm(params) {
    return request({
        method: 'post',
        url :'/apiadmin/permission/insert',
        data: params
    });
}

//删除
export function deletePerm(params) {
    return request({
        method: 'post',
        url :'/apiadmin/permission/delete',
        data: params
    });
}

//修改
export function updatePerm(params) {
    return request({
        method: 'post',
        url :'/apiadmin/permission/update',
        data: params
    });
}

//根据类型获取
export function getByType(params) {
    return request({
        method: 'post',
        url :'/apiadmin/permission/getByType',
        data: params
    });
}

//获取权限树（菜单树）
export function getPermTree(params) {
    return request({
        method: 'post',
        url: '/apiadmin/permission/getPermTree',
        data: params
    });
}


