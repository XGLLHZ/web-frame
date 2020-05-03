<!-- admin 顶部组件 -->
<template>
    <div class="admin-header">
        <div class="admin-header-user">
            <el-popover
                placement="top-start"
                trigger="hover">
                <span style="line-height: 3; font-size: 17px; color: #777; cursor: pointer;" slot="reference">
                    <i class="el-icon-user"/>
                    {{this.userName}}
                </span>
                <div class="admin-user-update" @click="updatePassWord()">修改密码</div>
                <div class="admin-user-logout" @click="logout()">退出</div>
            </el-popover>
        </div>

        <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="50%"
            top="5%"
            @close="closeDialog()"
            v-loading="loading">
            <el-form
                :inline="true"
                :model="editData"
                :rules="rules"
                ref="passRef"
                style="margin: 0 5% 0 5%">
                <el-row :gutter="24">
                    <el-form-item label="旧密码:" prop="oldPassword">
                        <el-input size="small" v-model="editData.oldPassword" placeholder="请输入旧密码" show-password clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="24">
                    <el-form-item label="新密码:" prop="password">
                        <el-input size="small" v-model="editData.password" placeholder="请输入新密码" show-password clearable></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()" v-loading="loading">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { updatePassWord } from '@/api/admin/authority/user'
export default {
    name: 'adminheader',
    data() {
        return {
            loading: false,
            dialogVisible: false,
            userName: '',
            editData: {
                id: '',
                password: '',
                oldPassword: '',
            },
            rules: {
                oldPassword: [
                    {  required: true, message: '旧密码不能为空！', trigger: 'blur'}
                ],
                password: [
                    {  required: true, message: '新密码不能为空', trigger: 'blur'}
                ]
            }
        }
    },

    created() {
        this.getUser()
    },

    methods: {

        getUser() {
            this.userName = JSON.parse(localStorage.getItem('userInfo')).username
        },

        updatePassWord() {
            this.dialogVisible = true
        },

        submit() {
            this.editData.id = JSON.parse(localStorage.getItem('userInfo')).id
            this.$refs.passRef.validate((valid) => {
                if (valid) {
                    this.loading = true
                    updatePassWord(this.editData).then(response => {
                        if (response.data.recode === 200) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success',
                            });
                            this.loading = false
                            this.logout()
                        } else {
                            this.$message({
                                message: response.data.remsg,
                                type: 'error',
                            });
                            this.loading = false
                        }
                    })
                }
            })
        },

        closeDialog() {
            this.editData.id = '',
            this.editData.oldPassword = '',
            this.editData.password = ''
        },

        logout() {
            this.$router.push('/admin/login')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            localStorage.removeItem('menuList')
        }

    }

}
</script>

<style>
.admin-header {
    width: 85%;
    height: 55px;
    margin-left: 15%;
    background-color: white;
    border-bottom: 1px solid rgb(212, 213, 218);
}
.admin-header-user {
    height: 100%;
    float: right;
    margin-right: 2%;
}
.admin-user-update {
    margin-bottom: 8%;
    color: #777;
    cursor: pointer;
}
.admin-user-logout {
    color: #777;
    cursor: pointer;
}
.admin-user-update:hover {
    color: #409EFF;
}
.admin-user-logout:hover {
    color: #409EFF;
}

</style>


