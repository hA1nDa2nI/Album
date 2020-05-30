<template>
  <div class="category" @submit.prevent="submit_category" method="post">
    <form class="layui-inline">
      <div class="layui-inline">
        <label class="layui-form-label">ID</label>
        <div class="layui-input-block">
          <input name="id" type="text" class="layui-input" v-model="formCategory.id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">类别名</label>
        <div class="layui-input-block">
          <input name="name" type="text" class="layui-input" v-model="formCategory.name" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline" style="margin:-6px 0 0 30px;">
        <button class="layui-btn"><i class="layui-icon layui-icon-search"></i></button>
      </div>
    </form>
    <div class="addbtn" @click="addcategory">
      <button class="layui-btn">添加新类别</button>
    </div>
    <div class="category_table" style="margin-top:15px;">
      <table class="table table-striped" v-show="!this.search.length">
        <thead>
          <tr>
            <th class="col-md-1">ID</th>
            <th class="col-md-2">类别名</th>
            <th class="col-md-1">状态</th>
            <th class="col-md-3">创建时间</th>
            <th class="col-md-1 col-md-offset-4" style="text-align:center;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in totalPage[cur-1]">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.status}}</td>
            <td>{{item.update_time}}</td>
            <td style="text-align:center;">
              <button type="button" class="btn btn-info" @click="use(index)" v-if="item.operation=='使用'">{{item.operation}}</button>
              <button type="button" class="btn btn-danger" @click="del(index)" v-if="item.operation=='禁用'">{{item.operation}}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-striped table-auto" v-show="this.search.length">
        <thead>
          <tr>
            <th class="col-md-1">ID</th>
            <th class="col-md-2">类别名</th>
            <th class="col-md-1">状态</th>
            <th class="col-md-3">创建时间</th>
            <th class="col-md-1 col-md-offset-4" style="text-align:center;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in search">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.status}}</td>
            <td>{{item.update_time}}</td>
            <td style="text-align:center;">
              <button type="button" class="btn btn-info" @click="use(index)" v-if="item.operation=='使用'">{{item.operation}}</button>
              <button type="button" class="btn btn-danger" @click="del(index)" v-if="item.operation=='禁用'">{{item.operation}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-show="!this.search.length">
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
    <div class="popupcategory">
      <h3>添加新类别 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
      <form action="post" @submit.prevent="submit_addcategory">
        <li>
          <label>类别名：</label>
          <input type="text" v-model="name" required  lay-verify="required" placeholder="输入类别名">
        </li>
        <li>
          <button type="submit">确认添加</button>
        </li>
      </form>
      <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    inject: ['reload'],
    data() {
      return {
        category: {},
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 7,
        formCategory: {},
        search: [],
        name: ''
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
      this.categoryshow()
    },
    methods: {
      categoryshow() {
        this.$http.get("/api/admin/category", {},{}).then((data) => {
          this.category = data.body
          for (let i in this.category) {
            if (this.category[i].status == '禁用中') {
              this.category[i].operation = '使用'
            } else {
              this.category[i].operation = '禁用'
            }
          }
          this.totalPage = []
          this.pageNum = Math.ceil(this.category.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.category.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        },function(response) {
          console.log(response)
        })
      },
      btnClick(data) {
        if (data != this.cur) { //判断是不是当前页，不是就计算
          this.cur = data 
        }
      },
      submit_category() {
        let _searchid = this.formCategory.id
        let _searchname = this.formCategory.name
        let newListData = []
        if (_searchid || _searchname) {
          this.category.filter(item => {
            if (item.id.toString().indexOf(_searchid.toString()) !== -1 || item.name.indexOf(_searchname) !== -1) {
              newListData.push(item)
            }
          }) 
        }
        this.search = newListData
      },
      addcategory() {
        $('.popupcategory').css('right', 0)
      },
      close() {
        $('.popupcategory').css('right', '-350px')
      },
      submit_addcategory() {
        this.$http.post("/api/admin/addcategory", {
          name: this.name
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
            alert("添加成功!")
            $('.popupcategory').css('right', '-350px')
            this.categoryshow()
          }
        },function(response){
          console.log(response)
        })
      },
      del(i) {
        this.$http.post("/api/admin/delcategory", {
          id: this.totalPage[this.cur-1][i].id,
          status: '禁用中'
        },{}).then((data) => {
          if (data.body.affectedRows > 0) {
            this.totalPage[this.cur-1][i].status = '禁用中'
            this.totalPage[this.cur-1][i].operation = '使用'
          }
        },function(response){
          console.log(response)
        })
      },
      use(i) {
        this.$http.post("/api/admin/delcategory", {
          id: this.totalPage[this.cur-1][i].id,
          status: '使用中'
        },{}).then((data) => {
          if (data.body.affectedRows > 0) {
            this.totalPage[this.cur-1][i].status = '使用中'
            this.totalPage[this.cur-1][i].operation = '禁用'
          }
        },function(response){
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .category {
    margin: 20px 40px 0;
  }
  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
    background-color: #f2f2f2;
    transition: .5s all;
  }
  .dropdown-menu > .layui-this > a,
  .dropdown-menu > .layui-this > a:hover {
    background-color: #5FB878;
    color: #fff;
  }
  .addbtn {
    float: right;
  }
  .layui-input-block {
    margin-left: 80px;
  }
  .btn {
    margin-right: 10px;
  }
  .table-auto {
    display: block;
    height: 400px;
    overflow: auto;
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
  .popupcategory {
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
  .popupcategory h3 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .popupcategory li {
    margin: 20px 0;
  }
  .popupcategory li:hover {
    color: #fff;
  }
  .popupcategory input {
    margin-left: 10px;
    border: 0;
    border-bottom: 1px solid #959595;
    background-color: #2f2f2f;
    outline-width: 0;
    padding-left: 10px;
  }
  .popupcategory button {
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