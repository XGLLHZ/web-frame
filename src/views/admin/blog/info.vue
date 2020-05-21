
<!-- admin 博客详情 -->
<template>
    <div class="admin-blog">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-blog-main">
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
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { getBlog } from '@/api/admin/blog'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'adminbloginfo',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            loading: false,
            id: '',
            blogTypes: ['全部', 'Java', 'Spring Boot', 'Spring Cloud', 'Python', 'Story'],
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









