<!-- admin 权限-权限 -->
<template>
    <div class="admin-permission">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-permission-main">
            <div class="permission-search">
                <el-row :gutter="24">
                    <el-col :span="4">
                        <el-select size="small" v-model="queryParams.permType" placeholder="权限类型">
                            <el-option 
                            v-for="item in permTypeOptions"
                            :key="item.key"
                            :value="item.key"
                            :label="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-input size="small" v-model="queryParams.permName" placeholder="权限名称" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="search()">搜索</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="clear()" plain>重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="permission-botton">
                <el-row :gutter="24">
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" size="small" type="primary" @click="openEditDialog()">新增</el-button>
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
            <div class="permission-table">
                <el-table
                :data="dataList"
                stripe
                v-loading="loading"
                style="width: 100%">
                    <el-table-column align="center" min-width="5" type="selection"/>
                    <el-table-column align="center" min-width="5" label="序号" type="index" fixed="left"/>
                    <el-table-column align="center" prop="permName" label="权限名称" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span @click="getPermInfo(scope.row.id)" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #409EFF; cursor: pointer;">
                                {{scope.row.permName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="permUrl" label="权限api" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.permUrl}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="permType" label="权限类型" min-width="60">
                        <template slot-scope="scope">
                            <span>{{permTypes[scope.row.permType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="permSort" label="权限排序" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.permSort}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="90">
                        <template slot-scope="scope">
                            <span style="text-decoration: none; color: #409EFF; cursor: pointer;" @click="openEditDialog(scope.row.id)">编辑</span>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deletePerm(scope.row.id)">
                                <span style="text-decoration: none; color: #409EFF; cursor: pointer;" slot="reference">删除</span>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="permission-page">
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
            :title="id === 0 ? '新增权限' : '编辑权限'"
            :visible.sync="editDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <el-form
                :inline="true"
                :model="editData"
                :rules="rules"
                ref="permRef"
                label-position="right"
                style="margin: 0 5% 0 5%">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="权限类型:" prop="permType">
                            <el-select @change="selectChange()" size="small" v-model="editData.permType" placeholder="请选择权限类型">
                                <el-option 
                                v-for="item in permTypeOptions"
                                :key="item.key"
                                :value="item.key"
                                :label="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col v-show="parentVisible" :span="12">
                        <el-form-item label="所属菜单:" prop="parentId">
                            <el-select size="small" v-model="editData.parentId" placeholder="请选择父菜单">
                                <el-option 
                                v-for="item in parentList"
                                :key="item.id"
                                :value="item.id"
                                :label="item.permName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="权限名称:" prop="permName">
                            <el-input size="small" v-model="editData.permName" placeholder="请输入权限名称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限api:" prop="permUrl">
                            <el-input size="small" v-model="editData.permUrl" placeholder="请输入权限api" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="路由组件:" prop="routerComponent">
                            <el-input size="small" v-model="editData.routerComponent" placeholder="请输入路由组件" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="路由path:" prop="routerPath">
                            <el-input size="small" v-model="editData.routerPath" placeholder="请输入路由path" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="菜单Icon:" prop="routerIcon">
                            <el-input size="small" v-model="editData.routerIcon" placeholder="请输入菜单Icon" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限排序:" prop="permSort">
                            <el-input-number size="small" v-model="editData.permSort" :min="1" placeholder="请输入权限排序" clearable></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()" v-loading="editLoading">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="权限详情"
            :visible.sync="infoDialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <el-row :gutter="24">
                <el-col :span="12">
                    <span>权限类型: {{ permTypes[editData.permType] }}</span>
                </el-col>
                <el-col :span="12">
                    <span>所属菜单: {{ editData.parentName }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <span>权限名称: {{ editData.permName }}</span>
                </el-col>
                <el-col :span="12">
                    <span>权限api: {{ editData.permUrl }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <span>路由组件: {{ editData.routerComponent }}</span>
                </el-col>
                <el-col :span="12">
                    <span>路由path: {{ editData.routerPath }}</span>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <span>菜单Icon: {{ editData.routerIcon }}</span>
                </el-col>
                <el-col :span="12">
                    <span>权限排序: {{ editData.permSort }}</span>
                </el-col>
            </el-row>
        </el-dialog>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getPermList, getPermInfo, insertPerm, deletePerm, updatePerm, getByType } from '@/api/admin/authority/permission'
export default {
    name: 'adminpermission',
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
            parentVisible: false,
            id: '',
            total: 0,
            dataList: [],
            parentList: [],
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                permName: '',
                permType: ''
            },
            rules: {
                permName: [
                    { required: true, message: '权限名不能为空！', trigger: 'blur' }
                ],
                permType: [
                    { required: true, message: '权限类型不能为空！', trigger: 'blur' }
                ],
            },
            editData: {
                id: 0,
                permName: '',
                permType: '',
                parentId: '',
                permUrl: '',
                routerComponent: '',
                routerPath: '',
                routerIcon: '',
                permSort: ''
            },
            permTypes: ['', '菜单', '二级菜单', '操作'],
            permTypeOptions: [
                { key: 0, value: '全部' },
                { key: 1, value: '菜单' },
                { key: 2, value: '二级菜单' },
                { key: 3, value: '操作' }
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
            getPermList(this.queryParams).then(response => {
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
            this.queryParams.permName = ''
            this.queryParams.permType = ''
            this.loading = true
            this.getList()
        },

        //查看详情
        getPermInfo(id) {
            getPermInfo({ id: id }).then(response => {
                this.editData = response.data.body.dataInfo
            })
            this.infoDialogVisible = true
        },

        //打开编辑弹窗
        openEditDialog(id) {
            if (id == null || id == 0) {
                this.editDialogVisible = true
            } else {
                this.id = id
                this.editData.id
                getPermInfo({ id: id }).then(response => {
                    this.editData = response.data.body.dataInfo
                    console.log(this.editData.permType)
                    this.selectChange()
                })
                this.editDialogVisible = true
            }
        },

        //取消弹窗
        closeDialog() {
            this.editLoading = false
            this.editDialogVisible = false
            this.infoDialogVisible = false
            this.parentVisible = false
            this.id = 0
            this.editData.id = 0
            this.editData.permName = ''
            this.editData.permType = ''
            this.editData.parentId = ''
            this.editData.permUrl = ''
            this.editData.routerComponent = ''
            this.editData.routerPath = ''
            this.editData.routerIcon = ''
            this.editData.permSort = ''
        },

        //选择器变化
        selectChange() {
            if (this.editData.permType === 2 || this.editData.permType === 3) {
                this.parentVisible = true
                var type = this.editData.permType
                getByType({permType: type - 1}).then(response => {
                    if (response.data.recode == 200) {
                        this.parentList = response.data.body.dataList
                    }
                })
            } else {
                this.parentVisible = false
            }
        },

        //确定
        submit() {
            var data = {
                id: this.editData.id,
                permName: this.editData.permName,
                permType: this.editData.permType,
                parentId: this.editData.parentId,
                permUrl: this.editData.permUrl,
                routerComponent: this.editData.routerComponent,
                routerPath: this.editData.routerPath,
                routerIcon: this.editData.routerIcon,
                permSort: this.editData.permSort
            }
            this.$refs.permRef.validate((valid) => {
                if (valid) {
                    this.editLoading = true
                    if (this.editData.id == 0) {
                        insertPerm(data).then(response => {
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
                        updatePerm(data).then(response => {
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

        //删除
        deletePerm(id) {
            this.loading = true
            deletePerm({ id: id }).then(response => {
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
.admin-permission {
    width: 100%;
}
.admin-permission-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.permission-botton {
    padding-top: 10px;
}
.permission-table {
    padding-top: 10px;
}
.permission-page {
    padding-top: 10px;
}

</style>


