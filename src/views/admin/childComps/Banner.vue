<template>
  <div class="banner">
    <div class="addbtn">
      <button class="layui-btn" @click="addbanner">添加banner图</button>
    </div>
    <div class="banner_table" style="margin-top:15px;" v-if="banner!=[]">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="col-md-1">ID</th>
            <th class="col-md-1">缩略图</th>
            <th class="col-md-1">状态</th>
            <th class="col-md-1">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in this.totalPage[cur-1]">
            <td>{{item.id}}</td>
            <td><img v-lazy="item.image" alt="banner图" height="80px"></td>
            <td>{{item.status}}</td>
            <td>
              <button type="button" class="btn btn-info" @click="use(index)">使用</button>
              <button type="button" class="btn btn-danger" @click="del(index)">禁用</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-if="banner!=[]">
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
      <div class="addbanner">
        <h3>添加banner图 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
        <form action="post" @submit.prevent="submit_addbanner">
          <li>
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
    name: 'Banner',
    inject: ['reload'],
    data() {
      return {
        banner: [],
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 4,
        img: ''
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
      this.$http.get("/api/admin/banner", {},{}).then((data) => {
        this.banner = data.body
        for (let i in this.banner) {
          this.banner[i].image = require('@/assets/images/banner/'+ this.banner[i].image)
        }
        this.pageNum = Math.ceil(this.banner.length / this.pageSize) || 1
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.banner.slice(this.pageSize * i, this.pageSize * (i + 1))
        }
      },function(response) {
        console.log(response)
      })
    },
    methods: {
      btnClick(data) {        
        if (data != this.cur) { //判断是不是当前页，不是就计算
          this.cur = data 
        }
      },
      del(i) {
        console.log(this.totalPage[this.cur-1][i].status)
        if (this.totalPage[this.cur-1][i].status == '已禁用') {
            alert('该图已禁用')
        } else {
          this.$http.post("/api/admin/bannerdel", {
            id: this.totalPage[this.cur-1][i].id,
            state: '已禁用'
          },{}).then((data) => {
            this.totalPage[this.cur-1][i].status = '已禁用'
          },function(response) {
            console.log(response)
          })
        }
      },
      use(i) {
        if (this.totalPage[this.cur-1][i].status == '使用中') {
            alert('该图使用中')
        } else {
          this.$http.post("/api/admin/bannerdel", {
            id: this.totalPage[this.cur-1][i].id,
            state: '使用中'
          },{}).then((data) => {
            this.totalPage[this.cur-1][i].status = '使用中'
          },function(response) {
            console.log(response)
          })
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

      },
      addbanner() {
        $('.popup').css('right', 0)
      },
      close() {
        $('.popup').css('right', '-350px')
      },
      submit_addbanner() {
        this.$http.post("/api/admin/banneradd", {
          img: this.img,
          status: '使用中'
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
              alert("添加成功!")
              $('.popup').css('right', '-350px')
            }
        },function(response){
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .banner {
    margin: 20px 40px 0;
  }
  .addbtn {
    float: right;
  }
  .btn {
    margin-right: 10px;
  }
  nav {
    position: fixed;
    bottom: 40px;
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
  .popup input[type="file"] {
    display: inline-block;
    border: 0;
    padding-left: 0;
  }
  .popup li:hover {
    color: #fff;
  }
  .popup li:hover input {
    display: inline-block;
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
</style>