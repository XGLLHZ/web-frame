import Vue from 'vue'
import Router from 'vue-router'
import adminRouters from './admin'   //引入管理系统路由
import webRouters from './web'   //引入 web 路由
import index from '@/views/web/index'   //引入 web 首页

//注册路由
Vue.use(Router)

export const routerMap = [
    {
        name: 'webindex',
        path: '/',
        component: index,
        redirect: 'index',
        children: [{
            name: 'webindex',
            path: '/index',
            component: index,
            meta: {
                requireAuth: false
            }
        }]
    }
]

const routers = [
    ...adminRouters,
    ...webRouters
]

const router = new Router({
    routes: routerMap.concat(routers)
});

export default router



