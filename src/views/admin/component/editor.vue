
<!-- admin editor -->
<template>
    <div class="admin-editor">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-editor-main">
            <div class="editor-edit">
                <div class="blog-editor" ref="editor"></div>
            </div>
        </div>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import Editor from 'wangeditor'
import { uploadImage } from '@/api/admin/blog'
export default {
    name: 'admieditor',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            content: ''
        }
    },

    mounted() {
        this.initEditor();
    },

    methods: {

        //初始化富文本
        initEditor() {
            var editor = new Editor(this.$refs.editor)   //富文本编辑器初始化时在 mounted() 方法中进行（create() 不行）
            // 自定义菜单配置
            //editor.customConfig.zIndex = 10
            // 文件上传
            editor.customConfig.customUploadImg = function(files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法
                files.forEach(image => {
                    var data = new FormData()
                    data.append('file', image)
                    uploadImage(data).then(response => {
                        insert(response.data.body.dataInfo)
                    })
                })
            }
            editor.customConfig.onchange = (html) => {
                this.content = html
            }
            editor.create()
            editor.txt.html(this.content)
        }

    }

}
</script>

<style>
.admin-editor {
    width: 100%;
}
.admin-editor-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.editor-botton {
    padding-top: 10px;
}
.editor-table {
    padding-top: 10px;
}
.editor-page {
    padding-top: 10px;
}

</style>










