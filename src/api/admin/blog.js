/**
 * 博客管理 api
 */

import request from '@/utils/request'

//列表
export function getList(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/list',
        data: params
    });
}

//详情
export function getBlog(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/get',
        data: params
    });
}

//新增
export function insertBlog(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/insert',
        data: params
    });
}

//删除
export function deleteBlog(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/delete',
        data: params
    });
}

//修改
export function updateBlog(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/update',
        data: params
    });
}

//导出
export function exportBlog(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/export',
        data: params
    });
}

//上传图片
export function uploadImage(params) {
    return request({
        method: 'post',
        url: '/apiweb/admin/blog/uploadimage',
        data: params
    });
}



