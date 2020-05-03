<!-- admin 左侧菜单栏组件 -->
<template>
    <div class="admin-aside">
        <div class="aside-title">
            <span><span style="color: yellow">0_0 XGLLHZ </span>管理系统</span>
        </div>
        <div class="aside-menu">
            <el-menu 
                v-for="(item, index) in this.menuList" 
                :key="index"
                style="border: none" 
                background-color="#181818" 
                text-color="#F4F5F8" 
                active-text-color="#ffff00">
                <router-link v-if="item.permType === 1 && item.childrenList.length === 0" :to="item.routerPath" style="text-decoration: none;">
                    <el-menu-item :index="item.permName"><i :class="item.routerIcon"/>{{item.permName}}</el-menu-item>
                </router-link>
                <el-submenu v-if="item.permType === 1 && item.childrenList.length > 0" :index="item.permName" >
                    <template slot="title"><i :class="item.routerIcon"/>{{item.permName}}</template>
                    <div v-for="(menuItem, index) in item.childrenList" :key="index">
                        <router-link :to="menuItem.routerPath" style="text-decoration: none;">
                            <el-menu-item :index="menuItem.permName"><i :class="menuItem.routerIcon"/>{{menuItem.permName}}</el-menu-item>
                        </router-link>
                    </div>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { getPermTree } from '@/api/admin/authority/permission'
export default {
    name: 'adminindex',
    data() {
        return {
            menuList: []
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            this.menuList = JSON.parse(localStorage.getItem('menuList'))
        }
    }

}
</script>

<style>
.admin-aside {
    width: 15%;
    height: 100%;
    position: fixed;
    background-color: #181818;
}
.aside-title {
    width: 100%;
    height: 55px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 3;
    border-bottom: 1px solid #999;
}
.aside-menu {
    width: 100%;
    height: calc(100% -56px);
}

</style>
