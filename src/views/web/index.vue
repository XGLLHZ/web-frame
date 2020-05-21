<!-- 首页 -->
<template>
    <div class="index">
        <div class="index-homenav">
            <div class="nav-menu">
                <el-row style="width: 100%; height: 100%;" :gutter="24">
                    <el-col class="nav-col" :span="11">
                        <span @click="index(0)" style="text-decoration: none;" class="nav-one" to="/">
                            <span style="color:yellow">0_0 </span>
                                XGLLHZ
                        </span>
                    </el-col>
                    <el-col :span="2">
                        <span class="nav-two" @click="index(0)">Home</span>
                    </el-col>
                    <el-col :span="2.2">
                        <span class="nav-two" @click="index(1)">Java</span>
                    </el-col>
                    <el-col :span="2.2">
                        <span class="nav-two" @click="index(2)">Spring Boot</span>
                    </el-col>
                    <el-col :span="2.2">
                        <span class="nav-two" @click="index(3)">Spring Cloud</span>
                    </el-col>
                    <el-col :span="2.2">
                        <span class="nav-two" @click="index(4)">Python</span>
                    </el-col>
                    <el-col :span="2.2">
                        <span class="nav-two" @click="index(5)">Story</span>
                    </el-col>
                </el-row>
                <!-- <div class="nav-one">
                    <router-link to="/"><span style="color:yellow">0_0 </span>XGLLHZ</router-link>
                </div>
                <div class="nav-two">
                    <ul>
                        <li><router-link :to="{ path: '/', query: { blogType: 5 } }">Story</router-link></li>
                        <li><router-link :to="{ path: '/', query: { blogType: 4 } }">Python</router-link></li>
                        <li><router-link :to="{ path: '/', query: { blogType: 2 } }">Spring Cloud</router-link></li>
                        <li><router-link :to="{ path: '/', query: { blogType: 1 } }">Spring Boot</router-link></li>
                        <li><router-link :to="{ path: '/', query: { blogType: 3 } }">Java</router-link></li>
                        <li><router-link :to="{ path: '/', query: { blogType: 0 } }">Home</router-link></li>
                    </ul>
                </div> -->
            </div>
        </div>
        <div class="index-bg"></div>
        <div class="index-main">
            <div class="main-con" v-loading="loading">
                <el-row style="width: 100%;" :gutter="24">
                    <el-col :span="18" >
                        <div class="blog-con" v-for="(item, index) in dataList" :key="index">
                            <div style="margin: 20px 10px 10px 0px">
                                <router-link :to="{ path: '/index/info', query: { id: item.id } }" class="blog-title">{{ item.blogTitle }}</router-link>
                            </div>
                            <div class="blog-time">
                                <span>{{ item.updateTime }}&nbsp;&nbsp;</span>
                                <span>阅读数 {{ item.readNumber }}&nbsp;&nbsp;</span>
                                <!-- <span>评论数 {{ item.commentNumber }}</span> -->
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <a href="https://github.com/XGLLHZ"><img style="width: 70%" src="../../assets/github.png"/></a>
                            </el-col>
                            <el-col :span="8">
                                <a href="https://blog.csdn.net/XGLLHZ"><img style="width: 75%" src="../../assets/csdn.png"/></a>
                            </el-col>
                            <el-col :span="8">
                                <a href="https://github.com/XGLLHZ"><img style="width: 70%" src="../../assets/sina.png"/></a>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="index-footer">
            <div>
                <img style="width: 15%" src="../../assets/gongzhonghao.jpeg"/>
            </div>
            <div><span>扫描微信二维码&nbsp;&nbsp;关注公众号 人世间子</span></div>
            <div class="footer-footer">
                <div><router-link class="footer-a"  to="/">津ICP备18006982号-1</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getList } from '@/api/web/index'
export default {
    name: 'index',

    data() {
        return {
            loading: true,
            id: 0,
            dataList: [],
            blogType: 0
        }
    },

    created() {
        this.getLists(0)
    },

    methods: {

        //列表
        getLists(type) {
            this.loading = true
            getList({ blogType: type }).then(response => {
                this.dataList = response.data.body.dataList
                this.loading = false
            }).catch(() => {
                this.loading = false
            });
        },

        index(type) {
            this.getLists(type)
        }

    }

}
</script>

<style scoped>
.index {
    width: 100%;
    height: 100%;
    margin: 0%;
}
.index-homenav {
    width: 100%;
    height: 80px;
    background-color: #181818;
}
.nav-menu {
    margin: 0px 10% 0px 10%;
    width: 80%;
    height: 100%;
}
.nav-one {
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 38px;
    line-height: 80px;
}
.nav-two {
    color: #ffffff;
    font-size: 20px;
    line-height: 80px;
}
.nav-menu span:hover {
    color: yellow;
    border-bottom: 4px solid yellow;
    cursor: pointer;
}
.index-bg {
    width: 100%;
    height: 315px;
    background-image: url('../../assets/bg.png');
}
.index-main {
    width: 100%;
}
.main-con {
    margin: 0px 10% 0px 10%;
    padding-top: 20px;
    padding-bottom: 40px;
    width: 80%;
}
.blog-con {
    border-bottom: 1px solid #ddd;
}
.blog-title {
    font-size: 23px;
    color: peru;
    text-decoration: none;
}
.blog-time {
    margin-bottom: 10px;
    font-size: 13px;
    color: #999;
}
.index-footer {
    width: 100%;
    text-align: center;
}
.footer-footer {
    margin-top: 40px;
    width: 100%;
    height: 150px;
    background-color: #181818;
}
.footer-a {
    text-decoration: none; 
    color:gray; 
    line-height: 70px;
}
.footer-footer a:hover {
    color: peru;
}
</style>

