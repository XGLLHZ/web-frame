<!-- 页面底部组件 -->
<template>
  <div class="homefooter">
    <div class="recode">
      <div class="recode-one">
        <img src="../assets/recode.jpeg">
      </div>
      <div class="recode-two"><span>扫描微信二维码&nbsp;&nbsp;关注公众号 "香格里拉皇子"</span></div>
    </div>
    <div class="footer-info">
        <span>
          <div style="width:300px;margin:0 auto; padding:20px 0;">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62082202000006" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
              <img src="../assets/beian.png" style="float:left;"/>
              <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">甘公网安备 62082202000006号</p>
            </a>
          </div>
        </span>
        <span>哈哈哈</span>
        <span><router-link to="/">津ICP备18006982号-1</router-link></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'homefooter'
}
</script>

<style>
.homefooter {
  width: 100%;
}
.recode {
  width: 100%;
  text-align: center;
}
.recode-one img {
  width: 15%;
}
.recode-two {
  margin-bottom: 40px;
}
.footer-info {
  width: 100%;
  height: 150px;
  background-color: #181818;
  text-align: center;
}
.footer-info a {
  margin-left: 20px;
  margin-right: 20px;
  color:gray;
  font-size: 15px;
  text-decoration: none;
  line-height: 70px;
}
</style>



