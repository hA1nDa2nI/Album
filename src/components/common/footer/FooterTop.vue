<template>
  <div class="footer-top row">
    <footer-txt>
      <h3 slot="name">网站推荐</h3>
      <ul slot="item">
        <li><a target="_blank" href="http://www.cnave.com/">CNAVE中国音像商务网</a></li>
        <li><a target="_blank" href="https://www.discogs.com/">Discogs</a></li>
        <li><a target="_blank" href="https://www.ktown4u.cn/">Ktown4u</a></li>
        <li><a target="_blank" href="http://www.5music.com.tw/">Five Music</a></li>
      </ul>
    </footer-txt>
    <footer-txt>
      <h3 slot="name">Album Collection</h3>
      <ul slot="item">
        <li><a href="javascript:;">About us</a></li>
        <li><a href="javascript:;">用户协议</a></li>
        <li><a href="javascript:;">隐私声明</a></li>
      </ul>
    </footer-txt>
    <div class="f-family col-md-3 col-sm-3 col-xs-12">
      <h3>立即分享</h3>
      <i class="layui-icon layui-icon-login-wechat" @click="weixin"></i>
      <i class="layui-icon layui-icon-login-weibo" @click="weibo"></i>
      <i class="layui-icon layui-icon-login-qq" @click="qZone"></i>
    </div>
    <div class="f-cs col-md-3 col-sm-3 col-xs-12">
      <h3>客服中心</h3>
      <span><a href="javascript:;">1:1留言</a></span>
      <ul>
        <li><a href="javascript:;">周一 ~ 周五   AM 09 : 00 ~ PM 18: 00</a></li>
        <li><a href="javascript:;">午餐休息   PM 12:00 ~ PM 13:00</a></li>
        <li><a href="javascript:;">除周末,公休日以外，将在48小时内回复您的留言咨询。</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import FooterTxt from './FooterTxt'

  export default {
    name: 'FooterTop',
    components: {
      FooterTxt
    },
    methods: {
      weibo() {
        let param = {
          type:'3',
          count:'1',
          appkey:'Album Collection',
          title: 'Album Collection',
          rnd:new Date().valueOf()
        }
        let temp = [];
        for(let p in param){
          temp.push(p + '=' +encodeURIComponent( param[p ] || '' ) )
        }
        let target_url = "http://service.weibo.com/share/share.php?"+temp.join('&')
        window.open(target_url, 'sinaweibo', 'height=500, width=400')
      },
      weixin() {
        let target_url = "http://qr.liantu.com/api.php?text=https://weixin.qq.com/"
        window.open(target_url, 'weixin', 'height=320, width=320')
      },
      qZone() {
        let param = {
          summary: 'AlbumCollection',/*分享摘要(可选)*/
          title: 'AlbumCollection',/*分享标题(可选)*/
          style: '101',
          width: 199,
          height: 30
        }
        let temp = [];
        for(let p in param){
          temp.push(p + '=' +encodeURIComponent( param[p ] || '' ) )
        }
        let target_url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+temp.join('&')
        window.open(target_url, 'qZone', 'height=430, width=400')
      }
    }
  }
</script>

<style scoped>
  .footer-top {
    width: 100%;
    margin: 60px 0 0;
    background-color: #f4f6f9;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
  }
  @media (min-width: 768px) {
    .footer-top {
      padding: 40px;
    }
  }
  .f-cs h3,
  .f-family h3 {
    font-size: 16px;
    font-weight: 600;
    color: #444;
  }
  .f-cs span a {
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--color-high-text);
    font-size: 28px;
  }
  .f-cs li {
    font-weight: 600;
    margin-top: 2px;
  }
  .f-cs a {
    color: #666;
    font-size: 13px;
    display: block;
  }
  .layui-icon {
    font-size: 50px;
    color: var(--color-text);
    margin-right: 10px;
    cursor: pointer;
    transition: all .6s;
  }
  .layui-icon:hover {
    color: var(--color-high-text);
  }
</style>
