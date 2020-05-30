<template>
  <div class="user">
    <form class="layui-inline" @submit.prevent="submit_user" method="post">
      <div class="layui-inline">
        <label class="layui-form-label">ID</label>
        <div class="layui-input-block">
          <input name="id" type="text" class="layui-input" v-model="formUser.id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">手机号</label>
        <div class="layui-input-block">
          <input name="name" type="text" class="layui-input" v-model="formUser.phone" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline" style="margin:-6px 0 0 30px;">
        <button class="layui-btn"><i class="layui-icon layui-icon-search"></i></button>
      </div>
    </form>
    <div class="addbtn" @click="add">
      <button class="layui-btn">添加新用户</button>
    </div>
    <table class="table table-striped" style="margin-top:15px;">
      <thead>
        <tr>
          <th class="col-md-1">ID</th>
          <th class="col-md-2">昵称</th>
          <th class="col-md-2">手机号</th>
          <th class="col-md-2">邮箱</th>
          <th class="col-md-1">头像</th>
          <th class="col-md-3">注册时间</th>
          <th class="col-md-1">操作</th>
        </tr>
      </thead>
      <tbody v-show="this.search.length">
        <tr :key="index" v-for="(item, index) in this.search">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.email}}</td>
          <td><img :src="item.userimg" alt="userimg" width="40px"></td>
          <td>{{item.update_time}}</td>
          <td><button type="button" class="btn btn-danger" @click="del(index)">注销</button></td>
        </tr>
      </tbody>
      <tbody v-show="!this.search.length">
        <tr :key="index" v-for="(item, index) in this.totalPage[cur-1]">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.email}}</td>
          <td><img :src="item.userimg" alt="userimg" width="40px"></td>
          <td>{{item.update_time}}</td>
          <td><button type="button" class="btn btn-danger" @click="del(index)">注销</button></td>
        </tr>
      </tbody>
    </table>
    <nav v-if="user!=''">
      <ul class="pagination">
        <li v-if="cur>1" @click="cur=1">
          <span><span aria-hidden="true">&laquo;</span></span>
        </li>
        <li class="disabled" v-if="cur==1">
          <span><span aria-hidden="true">&laquo;</span></span>
        </li>
        <li :key="index" v-for="index in indexs" :class="{ 'active': cur == index}" @click="btnClick(index)">
          <span>{{index}}</span>
        </li>
        <li v-if="cur<pageNum" @click="cur=pageNum">
          <span><span aria-hidden="true">&raquo;</span></span>
        </li>
        <li v-if="cur==pageNum" class="disabled">
          <span><span aria-hidden="true">&raquo;</span></span>
        </li>
        <li>
          <span>共 {{pageNum}} 页</span>
        </li>
      </ul>
    </nav>
    <div class="popup">
      <div class="adduser">
        <h3>添加新用户 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
        <form action="post" @submit.prevent="submit_adduser">
          <li>
            <label>昵称：</label>
            <input type="text" v-model="adduser.name" required  lay-verify="required" placeholder="输入昵称">
          </li>
          <li>
            <label>密码：</label>
            <input type="password" v-model="adduser.pwd" required  lay-verify="required" placeholder="输入密码">
          </li>
          <li>
            <label>手机：</label>
            <input type="tel" v-model="adduser.phone" required  lay-verify="required" placeholder="输入手机号" pattern="(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$">
          </li>
          <li>
            <label>邮箱：</label>
            <input type="email" v-model="adduser.email" required  lay-verify="required" placeholder="输入邮箱">
          </li>
          <li>
            <label>头像：</label>
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage">
          </li>
          <li>
            <button type="submit">确认添加</button>
          </li>
        </form>
        <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    inject: ['reload'],
    data() {
      return {
        user: [],
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 7,
        adduser: {
          img: ''
        },
        formUser: {},
        search: []
      }
    },
    computed: {
      indexs() {
        let left = 1; //默认起始值是1
        let right = this.pageNum; //终止值是全部
        let arr = [];
        if (this.pageNum >= 5) {
          if (this.cur > 3 && this.cur < this.pageNum - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.pageNum
              left = this.pageNum -4
            }
          }
        }
        while (left <= right) {
          arr.push(left)
          left ++
        }
        return arr
      }
    },
    created() {
      this.usershow()
    },
    methods: {
      usershow() {
        this.$http.get("/api/admin/usershow", {},{}).then((data) => {
          this.user = data.body
          for (let i in this.user) {
            if (this.user[i].userimg[0] == 'u') {
              this.user[i].userimg = require('@/assets/images/user/'+this.user[i].userimg)
            }
          }
          this.pageNum = Math.ceil(this.user.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.user.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        },function(response) {
          console.log(response)
        })
      },
      add() {
        $('.user .popup').css('right', 0)
        $('.adduser').show()
      },
      close() {
        $('.user .popup').css('right', '-350px')
      },
      del(i) {
        this.$http.post("/api/admin/deluser", {
          id: this.totalPage[this.cur-1][i].id
        },{}).then((data) => {
          alert('注销成功')
          this.usershow()
        },function(response) {
          console.log(response)
        })
      },
      btnClick(data) {
        if (data != this.cur) { //判断是不是当前页，不是就计算
          this.cur = data 
        }
      },
      changeImage(e) {
        // 上传图片事件
        var files = this.$refs.avatarInput.files;
        var that = this;

        function readAndPreview(file) {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader()
            reader.onload = function(e) {
              that.adduser.img = this.result
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

      },
      submit_adduser() {
        this.$http.post("/api/admin/adduser", {
          user: this.adduser
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
              alert("添加成功!")
              $('.user .popup').css('right', '-350px')
              $('.update').hide()
              this.usershow()
            }
        },function(response){
          console.log(response)
        })
      },
      submit_user() {
        let _searchid = this.formUser.id
        let _searchphone = this.formUser.phone
        let newListData = []
        console.log(_searchid)
        console.log(_searchphone)
        if (_searchid || _searchphone) {
          this.user.filter(item => {
            if (item.id == _searchid || item.phone.indexOf(_searchphone) !== -1) {
              newListData.push(item)
            }
          }) 
        }
        this.search = newListData
      }
    }
  }
</script>

<style scoped>
  .user {
    margin: 20px 40px 0;
  }
  .addbtn {
    float: right;
  }
  nav {
    position: fixed;
    bottom: 25px;
    right: 40px;
  }
  .pagination > li > span {
    color: #009688;
  }
  .pagination > .active > span {
    background-color: #009688;
    border-color: #009688;
    color: #fff;
  }
  .popup {
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100vh;
    background-color: #2f2f2f;
    z-index: 2;
    padding: 100px 35px 20px;
    color: #959595;
    transition: all .8s;
  }
  .popup h3 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .popup li {
    margin: 20px 0;
  }
  .popup li:hover {
    color: #fff;
  }
  .popup li:hover input {
    display: inline-block;
  }
  .popup input {
    margin-left: 10px;
    border: 0;
    border-bottom: 1px solid #959595;
    background-color: #2f2f2f;
    outline-width: 0;
    padding-left: 10px;
    width: 228px;
  }
  .popup input[type="file"] {
    display: inline-block;
    border: 0;
    padding-left: 0;
  }
  .popup button {
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
  .adduser {
    display: none;
  }
</style>