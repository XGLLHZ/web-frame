<!-- admin 权限-用户 -->
<template>
    <div class="admin-user">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-user-main">
            <div class="user-search">
                <el-row :gutter="24">
                    <el-col :span="4">
                        <el-select size="small" v-model="queryParams.userType" placeholder="用户类型">
                            <el-option 
                            v-for="item in userTypeOptions"
                            :key="item.key"
                            :value="item.key"
                            :label="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-input size="small" v-model="queryParams.username" placeholder="用户名" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="search()">搜索</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="clear()" plain>重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="user-botton">
                <el-row :gutter="24">
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="primary" @click="openEditDialog()">新增</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="danger" @click="search()">删除</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="success" v-loading="exportLoading" @click="exportExcel()">导出</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="user-table">
                <el-table
                :data="dataList"
                stripe
                v-loading="loading"
                style="width: 100%">
                    <el-table-column align="center" min-width="5" type="selection"/>
                    <el-table-column align="center" min-width="5" label="序号" type="index" fixed="left"/>
                    <el-table-column align="center" prop="username" label="用户名" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span @click="getUserInfo(scope.row.id)" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #409EFF; cursor: pointer;">
                                {{scope.row.username}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="userType" label="用户类型" min-width="60">
                        <template slot-scope="scope">
                            <span>{{userTypes[scope.row.userType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <span style="text-decoration: none; color: #409EFF; cursor: pointer;" @click="openEditDialog(scope.row.id)">编辑</span>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteUser(scope.row.id)">
                                <span style="text-decoration: none; color: #409EFF; cursor: pointer;" slot="reference">删除</span>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="user-page">
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
            :title="id === 0 ? '新增用户' : '编辑用户'"
            :visible.sync="editDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <el-form
                :inline="true"
                :model="editData"
                :rules="rules"
                ref="userRef"
                style="margin: 0 5% 0 5%">
                <el-row :gutter="24">
                    <el-form-item label="用户名:" prop="username">
                        <el-input size="small" v-model="editData.username" placeholder="请输入用户名" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="用户类型:" prop="userType">
                        <el-select size="small" v-model="editData.userType" placeholder="请选择用户类型">
                            <el-option 
                            v-for="item in userTypeOptions"
                            :key="item.key"
                            :value="item.key"
                            :label="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="角色:" prop="roleIds" style="width: 100%">
                        <el-select size="small" v-model="editData.roleIds" multiple placeholder="请选择角色" style="width: 300px">
                            <el-option 
                            v-for="item in roleList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.roleNamez + ' ' + item.roleNamey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()" v-loading="editLoading">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="用户详情"
            :visible.sync="infoDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <span>
                <div>用户名: {{editData.username}}</div>
                <div>用户类型: {{userTypes[editData.userType]}}</div>
                <div>角色列表: {{editData.roleIds}}</div>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getUserList, getUserInfo, insertUser, deleteUser, updateUser, getAllRole } from '@/api/admin/authority/user'
export default {
    name: 'adminuser',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            loading: false,
            editLoading: false,
            exportLoading: false,
            editDialogVisible: false,
            infoDialogVisible: false,
            id: 0,
            total: 0,
            dataList: [],
            roleList: [],
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                username: '',
                userType: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空！', trigger: 'blur' }
                ],
                userType: [
                    { required: true, message: '用户类型不能为空！', trigger: 'blur' }
                ],
                roleIds: [
                    { required: true, message: '角色不能为空！', trigger: 'blur' }
                ]
            },
            editData: {
                id: 0,
                username: '',
                userType: '',
                roleIds: []
            },
            userTypes: ['全部', '超级管理员', '管理员'],
            userTypeOptions: [
                { key: 0, value: '全部' },
                { key: 1, value: '超级管理员' },
                { key: 2, value: '管理员' }
            ],
        }
    },

    created() {
        this.getList();
    },

    methods: {
        //列表
        getList() {
            this.loading = true
            this.queryParams.currentPage = 1,
            this.queryParams.pageSize = 10,
            getUserList(this.queryParams).then(response => {
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
            this.queryParams.username = ''
            this.queryParams.userType = ''
            this.loading = true
            this.getList()
        },

        //查看详情
        getUserInfo(id) {
            getUserInfo({ id: id }).then(response => {
                this.editData = response.data.body.dataInfo
                this.editData.roleIds = []
                var list = response.data.body.dataInfo.list
                for (let i = 0; i < list.length; i++) {
                    this.editData.roleIds.push(list[i].roleNamez + ' ' + list[i].roleNamey)
                }
            })
            this.infoDialogVisible = true
        },

        //打开编辑弹窗
        openEditDialog(id) {
            getAllRole({}).then(response => {
                this.roleList = response.data.body.dataList
            })
            if (id == null || id == 0) {
                this.editDialogVisible = true
            } else {
                this.id = id
                this.editData.id
                getUserInfo({ id: id }).then(response => {
                    this.editData = response.data.body.dataInfo
                })
                this.editDialogVisible = true
            }
        },

        //确定
        submit() {
            console.log(this.editData)
            var data = {
                id: this.editData.id,
                username: this.editData.username,
                userType: this.editData.userType,
                roleIds: this.editData.roleIds
            }
            this.$refs.userRef.validate((valid) => {
                if (valid) {
                    this.editLoading = true
                    if (this.editData.id == 0) {
                        insertUser(data).then(response => {
                            console.log(response)
                            if (response.data.recode == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功！',
                                    type: 'success',
                                    position: 'top-right'
                                });
                                this.editLoading = false
                                this.editDialogVisible = false
                                this.getList()
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: response.data.remsg,
                                    type: 'error',
                                    position: 'top-right'
                                });
                                this.editLoading = false
                                this.editDialogVisible = false
                            }
                        }).catch(reponse => {});
                    } else {
                        updateUser(data).then(response => {
                            if (response.data.recode == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success',
                                    position: 'top-right'
                                });
                                this.editLoading = false
                                this.editDialogVisible = false
                                this.getList()
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: response.data.remsg,
                                    type: 'error',
                                    position: 'top-right'
                                });
                                this.editLoading = false
                                this.editDialogVisible = false
                            }
                        }).catch(reponse => {});
                    }
                }
            })
        },

        //取消弹窗
        closeDialog() {
            this.editLoading = false
            this.editDialogVisible = false
            this.infoDialogVisible = false
            this.id = 0
            this.editData.id = 0
            this.editData.username = ''
            this.editData.userType = ''
            this.editData.roleIds = []
        },

        //删除
        deleteUser(id) {
            this.loading = true
            deleteUser({ id: id }).then(response => {
                if (response.data.recode == 200) {
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success',
                        position: 'top-right'
                    });
                    this.getList();
                } else {
                    this.$notify({
                        title: '错误',
                        message: response.data.remsg,
                        type: 'error',
                        position: 'top-right'
                    });
                    this.loading = false
                }
            }).catch({});
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
.admin-user {
    width: 100%;
}
.admin-user-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.user-botton {
    padding-top: 10px;
}
.user-table {
    padding-top: 10px;
}
.user-page {
    padding-top: 10px;
}

</style>


