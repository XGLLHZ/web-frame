<!-- admin 首页 -->
<template>
    <div class="admin-index">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-index-main"></div>
    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
export default {
    name: 'adminindex',
    components: {
        adminaside,
        adminheader
    }

}
</script>

<style>
.admin-index {
    width: 100%;
}
.admin-index-main {
    width: 85%;
    height: 100%;
    position: fixed;
    margin: 0 0 0 15%;
    background-image: url('../../assets/logo.jpeg');
    background-repeat: no-repeat;
    background-size: 100%;
}

</style>
