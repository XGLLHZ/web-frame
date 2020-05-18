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
import adminblog from '@/views/admin/blog/index'
import blogedit from '@/views/admin/blog/edit'
import adminmd from '@/views/admin/component/md'
import admineditor from '@/views/admin/component/editor'

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
    },
    {
        name: 'adminblog',
        path: '/admin/blog',
        component: adminblog
    },
    {
        name: 'adminblogedit',
        path: '/admin/blog/edit',
        component: blogedit
    },
    {
        name: 'adminmd',
        path: '/admin/component/md',
        component: adminmd
    },
    {
        name: 'admineditor',
        path: '/admin/component/editor',
        component: admineditor
    }
]

export default adminRouters



