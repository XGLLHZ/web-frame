<!-- admin 系统-日志 -->
<template>
    <div class="admin-log">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-log-main">
            <div class="log-search">
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-input size="small" v-model="queryParams.userName" placeholder="请输入用户名、地区等" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="search()">搜索</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="clear()" plain>重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="log-botton">
                <el-row :gutter="24">
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="success" v-loading="exportLoading" @click="exportExcel()">导出</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="log-table">
                <el-table
                :data="dataList"
                stripe
                v-loading="loading"
                style="width: 100%">
                    <el-table-column align="center" min-width="5" type="selection"/>
                    <el-table-column align="center" min-width="5" label="序号" type="index" fixed="left"/>
                    <el-table-column align="center" prop="userName" label="用户名" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="userType" label="用户类型" min-width="60">
                        <template slot-scope="scope">
                            <span>{{userTypes[scope.row.userType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="loginIp" label="登录IP" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.loginIp}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="loginAddress" label="IP来源" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.loginAddress}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="loginBrowser" label="浏览器" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.loginBrowser}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="loginTime" label="登录时间" min-width="60">
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.loginTime}}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getUserList } from '@/api/admin/system/online'
export default {
    name: 'adminlog',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            loading: false,
            exportLoading: false,
            id: '',
            dataList: [],
            total: 0,
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                userName: ''
            },
            userTypes: ['全部', '超级管理员', '管理员', '业务员']
        }
    },

    created() {
        this.getList();
    },

    methods: {
        //列表
        getList() {
            this.loading = true
            getUserList(this.queryParams).then(response => {
                this.dataList = response.data.body.dataList
                this.loading = false
            }).catch(() => {
                this.loading = false
            });
        },

        //查询
        search() {
            this.loading = true
            this.getList()
        },

        //重置
        clear() {
            this.queryParams.currentPage = 1,
            this.queryParams.pageSize = 10,
            this.queryParams.userName = ''
            this.loading = true
            this.getList()
        },

        //导出
        exportExcel() {
            this.exportLoading = true
            exportBlog({ fileTitle: "博客信息表" }).then(response => {
                if (response.data.recode == 200) {
                    this.$notify({
                        title: '成功',
                        message: '导出成功！',
                        type: 'success',
                        position: 'top-right'
                    });
                    this.exportLoading = false
                } else {
                    this.$notify({
                        title: '错误',
                        message: response.data.body.remsg,
                        type: 'error',
                        position: 'top-right'
                    });
                    this.exportLoading = false
                }
            });
        },

    }

}
</script>

<style>
.admin-log {
    width: 100%;
}
.admin-log-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.log-botton {
    padding-top: 10px;
}
.log-table {
    padding-top: 10px;
}
.log-page {
    padding-top: 10px;
}

</style>






