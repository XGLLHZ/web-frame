<!-- admin 权限-角色 -->
<template>
    <div class="admin-role">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-role-main">
            <div class="role-search">
                <el-row :gutter="24">
                    <el-col :span="4">
                        <el-input size="small" v-model="queryParams.roleNamey" placeholder="请输入名称" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="search()">搜索</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="clear()" plain>重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="role-botton">
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
            <div class="role-table">
                <el-table
                :data="dataList"
                stripe
                v-loading="loading"
                style="width: 100%">
                    <el-table-column align="center" min-width="5" type="selection"/>
                    <el-table-column align="center" min-width="5" label="序号" type="index" fixed="left"/>
                    <el-table-column align="center" prop="roleNamey" label="英文名" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span @click="getRoleInfo(scope.row.id)" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #409EFF; cursor: pointer;">
                                {{scope.row.roleNamey}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="roleNamez" label="中文名" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.roleNamez}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <span style="text-decoration: none; color: #409EFF; cursor: pointer;" @click="openEditDialog(scope.row.id)">编辑</span>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteRole(scope.row.id)">
                                <span style="text-decoration: none; color: #409EFF; cursor: pointer;" slot="reference">删除</span>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="role-page">
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
            :title="id === 0 ? '新增角色' : '编辑角色'"
            :visible.sync="editDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <el-form
                :inline="true"
                :model="editData"
                :rules="rules"
                ref="roleRef"
                style="margin: 0 5% 0 5%">
                <el-row :gutter="24">
                    <el-form-item label="英文名:" prop="roleNamey">
                        <el-input size="small" v-model="editData.roleNamey" placeholder="请输入英文名" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="中文名:" prop="roleNamez">
                        <el-input size="small" v-model="editData.roleNamez" placeholder="请输入中文名" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="权限:" prop="permIds" style="width: 100%">
                        <el-select size="small" v-model="editData.permIds" multiple placeholder="请选择权限" style="width: 300px">
                            <el-option 
                            v-for="item in permList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.permName">
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
            title="角色详情"
            :visible.sync="infoDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <span>
                <div>英文名: {{editData.roleNamey}}</div>
                <div>中文名: {{editData.roleNamez}}</div>
                <div>权限列表: {{editData.permIds}}</div>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getRoleList, getRoleInfo, insertRole, deleteRole, updateRole, getAllPerm } from '@/api/admin/authority/role'
export default {
    name: 'adminrole',
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
            id: '',
            total: 0,
            dataList: [],
            permList: [],
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                roleNamey: '',
            },
            rules: {
                roleNamey: [
                    { required: true, message: '英文名不能为空！', trigger: 'blur' }
                ],
                roleNamez: [
                    { required: true, message: '中文名不能为空！', trigger: 'blur' }
                ],
                permIds: [
                    { required: true, message: '权限不能为空！', trigger: 'blur' }
                ]
            },
            editData: {
                id: 0,
                roleNamey: '',
                roleNamez: '',
                permIds: []
            },
        }
    },

    created() {
        this.getList();
    },

    methods: {
        //列表
        getList() {
            this.loading = true
            getRoleList(this.queryParams).then(response => {
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
            this.queryParams.roleNamey = ''
            this.loading = true
            this.getList()
        },

        //查看详情
        getRoleInfo(id) {
            getRoleInfo({ id: id }).then(response => {
                this.editData = response.data.body.dataInfo
                this.editData.permIds = []
                var list = response.data.body.dataInfo.list
                for (let i = 0; i < list.length; i++) {
                    this.editData.permIds.push(list[i].permName)
                }
            })
            this.infoDialogVisible = true
        },

        //打开编辑弹窗
        openEditDialog(id) {
            getAllPerm({}).then(response => {
                this.permList = response.data.body.dataList
            })
            if (id == null || id == 0) {
                this.editDialogVisible = true
            } else {
                this.id = id
                this.editData.id
                getRoleInfo({ id: id }).then(response => {
                    this.editData = response.data.body.dataInfo
                })
                this.editDialogVisible = true
            }
        },

        //确定
        submit() {
            var data = {
                id: this.editData.id,
                roleNamey: this.editData.roleNamey,
                roleNamez: this.editData.roleNamez,
                permIds: this.editData.permIds
            }
            this.$refs.roleRef.validate((valid) => {
                if (valid) {
                    this.editLoading = true
                    if (this.editData.id == 0) {
                        insertRole(data).then(response => {
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
                        updateRole(data).then(response => {
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
            this.editData.roleNamey = ''
            this.editData.roleNamez = ''
            this.editData.permIds = []
        },

        //删除
        deleteRole(id) {
            this.loading = true
            deleteRole({ id: id }).then(response => {
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
                        message: response.data.body.remsg,
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
.admin-role {
    width: 100%;
}
.admin-role-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.role-botton {
    padding-top: 10px;
}
.role-table {
    padding-top: 10px;
}
.role-page {
    padding-top: 10px;
}

</style>



