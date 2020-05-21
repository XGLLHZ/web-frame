
<!-- admin 博客 -->
<template>
    <div class="admin-blog">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-blog-main">
            <div class="blog-search">
                <el-row :gutter="24">
                    <el-col :span="4">
                        <el-select size="small" v-model="queryParams.blogType" placeholder="文章分类">
                            <el-option 
                            v-for="item in blogTypeOptions"
                            :key="item.key"
                            :value="item.key"
                            :label="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-input size="small" v-model="queryParams.blogTitle" placeholder="请输入标题" clearable></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input size="small" v-model="queryParams.blogAuthor" placeholder="请输入作者" clearable></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="search()">搜索</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="width:100%; border: none" type="primary" size="small" @click="clear()" plain>重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="blog-botton">
                <el-row :gutter="24">
                    <el-col :span="2">
                        <router-link :to="{ path: '/admin/blog/edit', query: { onType: 'insert' } }">
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
            <div class="blog-table">
                <el-table
                :data="dataList"
                stripe
                v-loading="loading"
                style="width: 100%">
                    <el-table-column align="center" min-width="5" type="selection"/>
                    <el-table-column align="center" min-width="5" label="序号" type="index" fixed="left"/>
                    <el-table-column align="left" prop="blogTitle" label="文章标题" min-width="100" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <router-link :to="{ path: '/admin/blog/info', query: { id: scope.row.id } }" style="text-decoration: none;">
                                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #409EFF; cursor: pointer;">
                                    {{scope.row.blogTitle}}
                                </span>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="blogAuthor" label="作者" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.blogAuthor}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="blogType" label="文章分类" min-width="60">
                        <template slot-scope="scope">
                            <span>{{blogTypes[scope.row.blogType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="readNumber" label="阅读人数" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.readNumber}} 人</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="commentNumber" label="评论人数" min-width="60">
                        <template slot-scope="scope">
                            <span>{{scope.row.commentNumber}} 人</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="发表时间" min-width="60" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                {{ scope.row.createTime }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" min-width="90">
                        <template slot-scope="scope">
                            <router-link style="text-decoration: none; color: #409EFF" :to="{ path: '/admin/blog/edit', query: { onType: 'update', id: scope.row.id } }">
                                编辑
                            </router-link>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteBlog(scope.row.id)">
                                <span style="text-decoration: none; color: #409EFF; cursor: pointer;" slot="reference">删除</span>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="blog-page">
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

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getList, deleteBlog } from '@/api/admin/blog'
export default {
    name: 'adminblog',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            loading: false,
            exportLoading: false,
            id: '',
            total: 0,
            dataList: [],
            queryParams: {
                currentPage: 1,
                pageSize: 10,
                blogType: '',
                blogTitle: '',
                blogAuthor: ''
            },
            blogTypes: ['全部', 'Java', 'Spring Boot', 'Spring Cloud', 'Python', 'Story'],
            blogTypeOptions: [
                { key: 0, value: '全部' },
                { key: 1, value: 'Java' },
                { key: 2, value: 'Spring Boot' },
                { key: 3, value: 'Spring Cloud' },
                { key: 4, value: 'Python' },
                { key: 5, value: 'Story' }
            ]
        }
    },

    created() {
        this.getList();
    },

    methods: {
        //列表
        getList() {
            this.loading = true
            getList(this.queryParams).then(response => {
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
            this.queryParams.blogType = '',
            this.queryParams.blogTitle = '',
            this.queryParams.blogAuthor = ''
            this.loading = true
            this.getList()
        },

        //查看详情
        getblogInfo(id) {
            getblogInfo({ id: id }).then(response => {
                this.editData = response.data.body.dataInfo
                this.editData.permIds = []
                var list = response.data.body.dataInfo.list
                for (let i = 0; i < list.length; i++) {
                    this.editData.permIds.push(list[i].permName)
                }
            })
            this.infoDialogVisible = true
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




