<!-- admin 系统-日志 -->
<template>
    <div class="admin-log">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-log-main">
            <div class="log-search">
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-date-picker
                        v-model="queryParams.searchTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:100%"
                        size="small">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                        <el-select size="small" v-model="queryParams.logType" placeholder="日志类型">
                            <el-option 
                            v-for="item in logTypeOptions"
                            :key="item.key"
                            :value="item.key"
                            :label="item.value">
                            </el-option>
                        </el-select>
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
                        <router-link :to="{ path: '/blogedit', query: { onType: 'insert', id: id } }">
                            <el-button style="width:100%; border: none" size="small" type="primary">新增</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="success" @click="search()">修改</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="danger" @click="search()">删除</el-button>
                    </el-col>
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
                    <el-table-column align="center" prop="operateName" label="操作名" min-width="60">
                        <template slot-scope="scope">
                            <span @click="getInfo(scope.row.id)" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #409EFF; cursor: pointer;">
                                {{scope.row.operateName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="requestApi" label="请求API" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.requestApi}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="requestTime" label="请求耗时" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.requestTime}} ms</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="logType" label="日志类型" min-width="60">
                        <template slot-scope="scope">
                            <div v-if="scope.row.logType === 1">
                                <span style="color: #606266">{{logTypes[scope.row.logType]}}</span>
                            </div>
                            <div v-if="scope.row.logType === 2">
                                <span style="color: red">{{logTypes[scope.row.logType]}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="requestIp" label="IP" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.requestIp}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="address" label="IP来源" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.address}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="browser" label="浏览器" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.browser}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="日志时间" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{scope.row.createTime}}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="log-page">
                    <el-pagination
                        style="text-align: center"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-sizes="[5, 10, 20, 30, 40]"
                        :total="total"
                        :current-page="queryParams.currentPage"
                        :page-size="queryParams.pageSize"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog
            title="日志详情"
            :visible.sync="dialogVisible"
            width="80%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <span>
                <div>方法名:</div>
                <div>{{className}}</div>
                <div>请求参数:</div>
                <div>{{requestParams}}</div>
                <div>异常详情:</div>
                <div>{{exceptionDetail}}</div>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getLogList, getLogInfo, exportLog } from '@/api/admin/system/log'
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
            dialogVisible: false,
            id: '',
            dataList: [],
            total: 0,
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                logType: '',
                searchTime: []
            },
            logTypes: [ '全部', '正常', '异常'],
            logTypeOptions: [
                { key: 0, value: '全部' },
                { key: 1, value: '正常' },
                { key: 2, value: '异常' }
            ],
            className: '',
            requestParams: '',
            exceptionDetail: ''
        }
    },

    created() {
        this.getList();
    },

    methods: {
        //列表
        getList() {
            this.loading = true
            getLogList(this.queryParams).then(response => {
                this.dataList = response.data.body.dataList
                this.total = response.data.body.total
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
            this.queryParams.searchTime = []
            this.queryParams.logType = ''
            this.loading = true
            this.getList()
        },

        //详情
        getInfo(id) {
            this.dialogVisible = true
            getLogInfo({ id: id }).then(response => {
                this.className = response.data.body.dataInfo.className
                this.requestParams = response.data.body.dataInfo.requestParams
                this.exceptionDetail = response.data.body.dataInfo.exceptionDetail
                this.loading = false
            }).catch(() => {
                this.loading = false
            });
        },

        closeDialog() {
            this.dialogVisible = false
        },

        //删除
        deleteBlog(id) {
            this.loading = true
            deleteBlog({ id: id }).then(response => {
                if (response.data.recode == 200) {
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success',
                        position: 'top-right'
                    });
                } else {
                    this.$notify({
                        title: '错误',
                        message: response.data.body.remsg,
                        type: 'error',
                        position: 'top-right'
                    });
                }
            }).catch({});
            this.getList();
        },

        //导出
        exportExcel() {
            this.exportLoading = true
            exportLog(this.queryParams).then(response => {
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

        //改变当前页
        handleCurrentChange(val) {
            this.queryParams.currentPage = val
            this.getList()
        },

        //改变页面大小
        handleSizeChange(val) {
            this.queryParams.pageSize = val
            this.getList()
        }

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




