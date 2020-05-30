<template>
  <div id="profile">
    <nav-bar><a href="#" slot="profile" class="active">个人中心</a></nav-bar>
    <div class="container">
      <search-box/>
      <div class="content">
        <ul class="content-left col-md-2 col-sm-3">
          <li @click="tabClick(0)">用户信息</li>
          <li @click="tabClick(1)">收货信息</li>
          <li @click="tabClick(2)">我的订单</li>
          <li @click="tabClick(3)">我的购物车</li>
        </ul>
        <div class="alert alert-warning col-md-8 col-md-offset-1" role="alert" v-if="!this.$store.state.profileStatus">当前未登录，请先登录!</div>
        <div class="content-right col-md-9 col-sm-8" v-if="this.$store.state.profileStatus">
          <div class="content-right-message" id="message1">
            <h3>个人信息</h3>
            <div class="user">
              <div class="img">
                <img v-lazy="this.data.userimg" alt="userimg">
              </div>
              <span class="username">{{data.username}}</span>
            </div>
            <p class="phone"><span class="left">联系电话：</span><span>{{data.phone}}</span></p>
            <p class="email"><span class="left">邮 箱：</span><span>{{data.email}}</span></p>
            <button class="btn btn-primary" @click="update">更改个人信息</button>
          </div>
          <div class="content-right-message" id="message2">
            <h3>收货信息</h3>
            <div class="list-group" v-if="address.length!=0">
              <a class="list-group-item">
                <p>{{default_address.receiver_name}} {{default_address.receiver_phone}}</p>
                <p>{{default_address.receiver_province}} {{default_address.receiver_city}} {{default_address.receiver_district}} {{default_address.receiver_address}}</p>
                <span class="mr-address">默认地址</span>
              </a>
              <a class="list-group-item" :key="index" v-for="(item, index) in this.address">
                <p>{{item.receiver_name}} {{item.receiver_phone}}</p>
                <p>{{item.receiver_province}} {{item.receiver_city}} {{item.receiver_district}} {{item.receiver_address}}</p>
                <div class="mr-address">
                  <span @click="setaddress(index)">设为默认地址</span><br>
                  <span @click="del(index)">删除</span>
                </div>
              </a>
            </div>
            <div class="add">
              <receiving-info>
                <span slot="title">添加收货地址</span>
              </receiving-info>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="update">
      <h3>修改资料 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
      <form action="post" @submit.prevent="submit_update">
        <li>
          <label>昵称：</label>
          <input type="text" v-model="name" required  lay-verify="required" placeholder="请修改昵称">
        </li>
        <li>
          <label>邮箱：</label>
          <input type="text" v-model="email" required  lay-verify="required" placeholder="请修改邮箱">
        </li>
        <li>
          <label>头像：</label>
          <img v-lazy="this.img">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage">
        </li>
        <li>
          <button type="submit">确认修改</button>
        </li>
      </form>
      <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import ReceivingInfo from 'components/common/receivinginfo/ReceivingInfo'

  export default {
    name: 'Profile',
    inject: ['reload'],
    components: {
      NavBar,
      SearchBox,
      ReceivingInfo
    },
    data() {
      return {
        data: {},
        address: {},
        name: '',
        email: '',
        img: '',
        default_address: {}
      }
    },
    methods: {
      tabClick(i) {
        if (i == 0) {
          let top = $('#message1').offset().top - 70
          $('html,body').animate({scrollTop: top}, 500)
        } else if (i == 1) {
          let top = $('#message2').offset().top - 50
          $('html,body').animate({scrollTop: top}, 500)
        } else if (i == 2) {
          this.$router.push('/order')
        } else {
          this.$router.push('/cart')
        }
      },
      setaddress(i) {
        this.default_address = this.address[i]
        this.$http.post("/api/address/default", {
          id: this.address[i].id,
          user_id: this.$store.state.user_id
        },{}).then((data) => {},function(response){
          console.log(response)
        })
      },
      del(i) {
        this.$http.post("/api/address/del", {
          id: this.address[i].id
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
            alert("删除成功!")
            this.reload()
          }
        },function(response){
          console.log(response)
        })
      },
      update() {
        $('.update').css('right', 0)
      },
      close() {
        $('.update').css('right', '-350px')
      },
      submit_update() {
        this.$http.post("/api/users/update", {
          id: this.$store.state.user_id,
          name: this.name,
          email: this.email,
          img: this.img
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
              alert("修改成功!")
              $('.update').css('right', '-350px')
              this.reload()
            }
        },function(response){
          console.log(response)
        })
      },
      changeImage(e) {
        // 上传图片事件
        var files = this.$refs.avatarInput.files;
        var that = this;

        function readAndPreview(file) {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader()
            reader.onload = function(e) {
              that.img = this.result
            };
            reader.readAsDataURL(file)
          }
        }
        if (files) {
          [].forEach.call(files, readAndPreview)
        }
        if (files.length === 0) {
          return;
        }
      }
    },
    created() {
      if (this.$store.state.profileStatus) {
        this.$http.post("/api/users/profile", {
          id: this.$store.state.user_id
        },{}).then((data) => {
          this.data = data.body[0]
          if (!this.data.username) {
            this.data.username = this.$store.state.user_id
          }
          if (!this.data.email) {
            this.data.email = '空'
          }
          if (this.data.userimg[0] == 'u') {
            this.data.userimg = require('@/assets/images/user/'+this.data.userimg)
          }
          this.name = this.data.username
          this.email = this.data.email
          this.img = this.data.userimg
        },function(response){
          console.log(response)
        })

        this.$http.post("/api/address/show", {
          id: this.$store.state.user_id
        },{}).then((data) => {
          this.address = data.body
          for (let i in this.address) {
            if (this.address[i].state == 1) {
              this.default_address = this.address[i]
            }
          }
        },function(response){
          console.log(response);
      })
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .content {
    border-top: 2px solid var(--color-high-text);
    padding-top: 20px;
  }
  .content-left {
    padding: 0 0 40px 0;
    background-color: var(--color-high-text);
  }
  .content-left li {
    float: right;
    width: 60%;
    margin-top: 40px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: var(--color-tint);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    cursor: pointer;
  }
  .content-right {
    margin-left: 30px;
    padding: 30px;
  }
  .content-right-message {
    border-bottom: 1px solid #dedede;
    position: relative;
  }
  .content-right-message:last-child {
    border-bottom: 0;
    padding: 20px 0;
  }
  .content-right-message h3 {
    margin-bottom: 20px;
  }
  .content-right-message .user {
    position: relative;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .content-right-message .img {
    float: left;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #dedede;
    overflow: hidden;
  }
  .content-right-message .img img {
    min-height: 70px;
    width: 100%;
  }
  .content-right-message .username {
    float: left;
    margin: 20px;
    font-size: 20px;
  }
  .content-right-message p {
    color: #333;
  }
  .content-right-message .left {
    width: 75px;
    color: #9d9d9d;
  }
  .content-right-message button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--color-high-text);
    border: none;
    outline: none;
  }
  .btn-primary:active:focus {
    background-color: var(--color-high-text);
    border: none;
    outline: none;
  }
  .list-group-item:first-child {
    background-color: #e1ece4;
    border-color: #e1ece4;
  }
  .list-group-item:first-child p {
    color: var(--color-tint);
  }
  .list-group-item:first-child .mr-address {
    display: block;
  }
  .list-group-item {
    position: relative;
  }
  .mr-address {
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    text-align: right;
  }
  .list-group-item:hover .mr-address {
    display: block;
  }
  .add {
    position: absolute;
    top: 40px;
    right: 0;
  }
  .update {
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100vh;
    background-color: #2f2f2f;
    z-index: 2;
    padding: 120px 35px 20px;
    color: #959595;
    transition: all .8s;
  }
  .update h3 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .update li {
    margin: 20px 0;
  }
  .update li:hover {
    color: #fff;
  }
  .update li:hover input {
    display: inline-block;
  }
  .update input {
    margin-left: 10px;
    border: 0;
    border-bottom: 1px solid #959595;
    background-color: #2f2f2f;
    outline-width: 0;
    padding-left: 10px;
    width: 228px;
  }
  .update input[type="file"] {
    display: none;
    width: 188px;
    border: 0;
    padding-left: 0;
  }
  .update img {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .update button {
    padding: 10px 0;
    width: 100%;
    background-color: #2f2f2f;
    border: 2px solid #959595;
    color: #959595;
    margin-top: 30px;
  }
  .update button:hover {
    color: #fff;
    border-color: #fff;
  }
  .glyphicon-remove {
    position: absolute;
    right: 30px;
    top: 80px;
    color: #959595;
    font-size: 20px;
    cursor: pointer;
  }
  .glyphicon-remove:hover {
    color: #fff;
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
   .content-left {
      display: none;
    }
   .content-right {
     padding: 0;
     margin-left: 0;
   }
  }
</style>