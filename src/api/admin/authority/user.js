/**
 * 管理员 api
 */

import request from '@/utils/request'
import qs from 'qs'

//列表
export function getUserList(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/list',
        data: params
    });
}

//详情
export function getUserInfo(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/get',
        data: params
    });
}

//新增-注册
export function insertUser(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/register',
        data: params
    });
}

//删除
export function deleteUser(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/delete',
        data: params
    });
}

//编辑
export function updateUser(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/update',
        data: params
    });
}

//全部角色
export function getAllRole(params) {
    return request({
        method: 'post',
        url: '/apiadmin/role/getAll',
        data: params
    });
}

//登录
export function adminLogin(params) {
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'post',
        url: '/apiadmin/user/login',
        data: qs.stringify(params)
    });
}

//修改密码
export function updatePassWord(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/updatePassWord',
        data: params
    });
}

//退出登录
export function adminLogout(params) {
    return request({
        method: 'post',
        url: '/apiadmin/user/logout',
        data: params
    });
}

