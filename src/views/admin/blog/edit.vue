
<!-- admin 博客编辑 -->
<template>
    <div class="admin-blog">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-blog-main">
            <div class="blog-edit">
                <el-form style="width: 100%; height:100%"
                    :inline="true"
                    :model="editData"
                    :rules="rules"
                    ref="blogRef"
                    label-position="right">
                    <el-row :gutter="24">
                        <el-col :span="20">
                        <el-form-item style="width: 100%" label="文章标题:" prop="blogTitle">
                            <el-input style="width: 600px" size="small" v-model="editData.blogTitle" placeholder="文章标题" clearable></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="20">
                        <el-form-item style="width: 100%" label="文章分类:" prop="blogType">
                            <el-select size="small" v-model="editData.blogType" placeholder="文章分类" style="width: 200px">
                            <el-option 
                                v-for="item in blogTypeOptions"
                                :key="item.key"
                                :value="item.key"
                                :label="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <mavon-editor v-model="editData.content" ref="md" :style="'height:' + height" @imgAdd="uploadImage" />
                    <div style="text-align: center; margin-top: 20px; margin-bottom: 20px">
                        <el-button style="width: 10%" type="primary" v-loading="loading" @click="insertClock()">提&nbsp;&nbsp;交</el-button>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getBlog, insertBlog, updateBlog, uploadImage } from '@/api/admin/blog'
export default {
    name: 'adminblogedit',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            height: document.documentElement.clientHeight - 200 + 'px',
            loading: false,
            exportLoading: false,
            id: '',
            total: 0,
            dataList: [],
            editData: {
                blogType: '',
                blogTitle: '',
                content: ''
            },
            rules: {
                blogTitle: [
                    { required: true, message: '文章标题不能为空！', trigger: 'blur' }
                ],
                blogType: [
                    { required: true, message: '文章类别不能为空！', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '文章内容不能为空！', trigger: 'blur' }
                ]
            },
            blogTypes: ['全部', 'Java', 'Spring Boot', 'Spring Cloud', 'Python', 'Story'],
            blogTypeOptions: [
                { key: 1, value: 'Java' },
                { key: 2, value: 'Spring Boot' },
                { key: 3, value: 'Spring Cloud' },
                { key: 4, value: 'Python' },
                { key: 5, value: 'Story' }
            ]
        }
    },

    created() {
        this.getBlog();
    },

    mounted() {
        const _this = this
        window.onresize = function temp() {
            _this.height = document.documentElement.clientHeight - 200 + 'px'
        }
    },

    methods: {
        //详情
        getBlog() {
            if(this.$route.query.onType === 'update') {
                this.editData.id = this.$route.query.id
                getBlog({ id: this.editData.id }).then(response => {
                    if (response.data.recode == 200) {
                        this.editData = response.data.body.dataInfo
                        this.initEditor()
                    } else {
                        this.$notify({
                            title: '错误',
                            message: response.data.remsg,
                            type: 'error',
                            position: 'top-right'
                        });
                    }
                }).catch(() => {});
            }
        },

        uploadImage(pos, $file) {
            var data = new FormData()
            data.append('file', $file)
            uploadImage(data).then(response => {
                this.$refs.md.$img2Url(pos, response.data.body.dataInfo)
            })
        },

        //提交
        insertClock() {
            console.log(this.editData);
            var data = {
                id: this.editData.id,
                blogType: this.editData.blogType,
                blogTitle: this.editData.blogTitle,
                content: this.editData.content
            }
            this.$refs.blogRef.validate((valid) => {
                if (valid) {
                    this.loading = true
                    if (this.$route.query.onType != 'update') {
                        insertBlog(data).then(response => {
                            if (response.data.recode == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功！',
                                    type: 'success',
                                    position: 'top-right'
                                });
                                this.loading = false
                                this.$router.go(-1)
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: response.data.remsg,
                                    type: 'error',
                                    position: 'top-right'
                                });
                                this.loading = false
                            }
                        }).catch(reponse => {});
                    } else {
                        updateBlog(data).then(response => {
                            if (response.data.recode == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success',
                                    position: 'top-right'
                                });
                                this.loading = false
                                this.$router.go(-1)
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: response.data.remsg,
                                    type: 'error',
                                    position: 'top-right'
                                });
                                this.loading = false
                            }
                        }).catch(reponse => {});
                    }
                }
            });
        },

    }

}
</script>

<style>
.admin-blog {
    width: 100%;
}
.admin-blog-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.blog-botton {
    padding-top: 10px;
}
.blog-table {
    padding-top: 10px;
}
.blog-page {
    padding-top: 10px;
}

</style>






