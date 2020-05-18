
<!-- admin md -->
<template>
    <div class="admin-md">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-md-main">
            <div class="md-edit">
                <mavon-editor v-model="content" ref="md" :style="'height:' + height" @imgAdd="uploadImage" />
            </div>
        </div>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { uploadImage } from '@/api/admin/blog'
export default {
    name: 'admimd',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            height: document.documentElement.clientHeight - 200 + 'px',
            content: ''
        }
    },

    mounted() {
        const _this = this
        window.onresize = function temp() {
            _this.height = document.documentElement.clientHeight - 200 + 'px'
        }
    },

    methods: {

        uploadImage(pos, $file) {
            var data = new FormData()
            data.append('file', $file)
            uploadImage(data).then(response => {
                this.$refs.md.$img2Url(pos, response.data.body.dataInfo)
            })
        },

    }

}
</script>

<style>
.admin-md {
    width: 100%;
}
.admin-md-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.md-botton {
    padding-top: 10px;
}
.md-table {
    padding-top: 10px;
}
.md-page {
    padding-top: 10px;
}

</style>








