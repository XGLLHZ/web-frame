<!-- 首页-详情 -->
<template>
    <div class="info">
        <div class="info-homenav">
            <div class="nav-menu">
                <el-row style="width: 100%; height: 100%;" :gutter="24">
                    <el-col class="nav-col" :span="11">
                        <router-link style="text-decoration: none;" class="nav-one" to="/">
                            <span style="color:yellow">0_0 </span>
                                XGLLHZ
                        </router-link>
                    </el-col>
                    <el-col :span="2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Home</router-link>
                    </el-col>
                    <el-col :span="2.2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Java</router-link>
                    </el-col>
                    <el-col :span="2.2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Spring Boot</router-link>
                    </el-col>
                    <el-col :span="2.2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Spring Cloud</router-link>
                    </el-col>
                    <el-col :span="2.2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Python</router-link>
                    </el-col>
                    <el-col :span="2.2">
                        <router-link class="nav-two" style="text-decoration: none;" :to="{ path: '/', query: { blogType: 5 } }">Story</router-link>
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
        <div class="info-bg"></div>
        <div class="info-main">
            <div class="main-con">
                <mavon-editor
                    class="md"
                    :value="dataInfo.content"
                    :subfield = "prop.subfield"
                    :defaultOpen = "prop.defaultOpen"
                    :toolbarsFlag = "prop.toolbarsFlag"
                    :editable="prop.editable"
                    :scrollStyle="prop.scrollStyle"
                ></mavon-editor>
            </div>
        </div>
        <div class="info-footer">
            <div>
                <img style="width: 15%" src="../../assets/gongzhonghao.jpeg"/>
            </div>
            <div><span>扫描微信二维码&nbsp;&nbsp;关注公众号 人世间子</span></div>
            <div class="footer-footer">
                <div>
                    <span>
                        <span>
                            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62082202000006" style="display:inline-block;text-decoration:none;height:16px;line-height:20px;">
                                <img src="../../assets/beian.png" style="float:left;"/>
                                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:gray;">甘公网安备 62082202000006号</p>
                            </a>
                        </span>
                    </span>
                    <span style="color: gray">|</span>
                    <span><a target="_blank" class="footer-a"  href="http://www.beian.gov.cn">津ICP备18006982号-1</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBlog } from '@/api/web/index'
export default {
    name: 'info',

    data() {
        return {
            loading: false,
            id: '',
            dataInfo: {}
        }
    },

    created() {
        this.getBlog();
    },

    computed: {
        prop () {
            let data = {
                subfield: false,   //单双栏    单栏
                defaultOpen: 'preview',   //edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
                editable: false,
                toolbarsFlag: false,
                scrollStyle: true
            }
            return data
        }
    },

    methods: {
        
        //详情
        getBlog() {
            getBlog({ id: this.$route.query.id }).then(response => {
                if (response.data.recode == 200) {
                    this.dataInfo = response.data.body.dataInfo
                } else {
                    this.$notify({
                        title: '错误',
                        message: response.data.remsg,
                        type: 'error',
                        position: 'top-right'
                    });
                }
            }).catch(() => {});
        },

    }

}
</script>

<style scoped>
.info {
    width: 100%;
    height: 100%;
    margin: 0%;
}
.info-homenav {
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
.nav-menu a:hover {
    color: yellow;
    border-bottom: 4px solid yellow
}
.info-bg {
    width: 100%;
    height: 315px;
    background-image: url('../../assets/bg.png');
}
.info-main {
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
.info-footer {
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

