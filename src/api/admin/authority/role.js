/**
 * 角色 api
 */

import request from '@/utils/request'

//列表
export function getRoleList(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/list',
        data: params
    });
}

//详情
export function getRoleInfo(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/get',
        data: params
    });
}

//新增
export function insertRole(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/insert',
        data: params
    });
}

//删除
export function deleteRole(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/delete',
        data: params
    });
}

//修改
export function updateRole(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/update',
        data: params
    });
}

//全部权限
export function getAllPerm(params) {
    return request({
        method: 'post',
        url: '/apiadmin/permission/getAll',
        data: params
    });
}


