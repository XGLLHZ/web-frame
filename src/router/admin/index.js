/**
 * admin 路由
 */

import adminindex from '@/views/admin/index'
import userindex from '@/views/admin/authority/user/index'
import permissionindex from '@/views/admin/authority/permission/index'
import roleindex from '@/views/admin/authority/role/index'
import logindex from '@/views/admin/system/log/index'
import adminlogin from '@/views/admin/login'

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
        path: '/adminuser',
        component: userindex
    },
    {
        name: 'adminrole',
        path: '/adminrole',
        component: roleindex
    },
    {
        name: 'adminpermission',
        path: '/adminpermission',
        component: permissionindex
    },
    {
        name: 'adminlog',
        path: '/adminlog',
        component: logindex
    }
]

export default adminRouters



