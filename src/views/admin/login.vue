<template>
    <div class="admin-login">
        <div class="admin-login-div">
            <el-form
                :model="submitData"
                :rules="rules"
                ref="loginRef">
                <el-row :gutter="24">
                    <el-col :span="24" style="margin-top: 8%; margin-bottom: 5%; font-size: 30px; color: yellow">XGLLHZ</el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24" style="margin-left: 10%; width: 80%">
                        <el-form-item prop="username">
                            <el-input v-model="submitData.username" placeholder="请输入用户名" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24" style="margin-left: 10%; width: 80%">
                        <el-form-item prop="password">
                            <el-input v-model="submitData.password" placeholder="请输入密码" show-password clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24" style="margin-top: 2%; margin-left: 10%; width: 80%">
                        <el-button v-loading="loading" @click="login()" type="primary" style="width: 100%; border: none;">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { adminLogin } from '@/api/admin/authority/user'
export default {
    name: 'adminlogin',
    data() {
        return {
            loading: false,
            submitData: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {  required: true, message: '用户名不能为空！', trigger: 'blur'}
                ],
                password: [
                    {  required: true, message: '密码不能为空！', trigger: 'blur'}
                ]
            }
        }
    },

    methods: {
        login() {
            var path = this.$route.query.redirect
            this.$refs.loginRef.validate((valid) => {
                if (valid) {
                    this.loading = true
                    adminLogin({
                            username: this.submitData.username, 
                            password: this.submitData.password
                        }).then(response => {
                            if (response.data.recode == 200) {
                                localStorage.setItem('userInfo', JSON.stringify(response.data.body.dataInfo))
                                localStorage.setItem('token', response.data.body.token)
                                localStorage.setItem('menuList', JSON.stringify(response.data.body.menuList))
                                this.$router.push(this.$route.query.redirect || '/system')
                                this.$message({
                                    message: '登录成功',
                                    type: 'success',
                                });
                                this.loading = false
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
        }
    }

}
</script>

<style>
.admin-login {
    width: 100%;
    height: 100%;
    margin: 0%;
    position: fixed;
    background-image: url('../../assets/bg.jpeg');
    background-repeat: no-repeat;
    background-size: 100%;
    align-content: center;
}
.admin-login-div {
    margin: 10% 37% 0 37%;
    width: 26%;
    height: 40%;
    background-color: rgb(153, 153, 153, 0.5);
    text-align: center;
    border-radius: 3%;
}

</style>

