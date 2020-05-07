/**
 * admin 路由
 */

import adminindex from '@/views/admin/index'
import userindex from '@/views/admin/authority/user/index'
import permissionindex from '@/views/admin/authority/permission/index'
import roleindex from '@/views/admin/authority/role/index'
import logindex from '@/views/admin/system/log/index'
import adminlogin from '@/views/admin/login'
import adminonline from '@/views/admin/system/online/index'

const adminRouters = [
    {
        name: 'adminlogin',
        path: '/admin/login',
        component: adminlogin
    },
    {
        name: 'adminindex',
        path: '/system',
        component: adminindex
    },
    {
        name: 'adminuser',
        path: '/admin/user',
        component: userindex
    },
    {
        name: 'adminrole',
        path: '/admin/role',
        component: roleindex
    },
    {
        name: 'adminpermission',
        path: '/admin/permission',
        component: permissionindex
    },
    {
        name: 'adminlog',
        path: '/admin/log',
        component: logindex
    },
    {
        name: 'adminonline',
        path: '/admin/online',
        component: adminonline
    }
]

export default adminRouters



