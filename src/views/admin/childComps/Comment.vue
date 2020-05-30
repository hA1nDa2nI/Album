<template>
  <div class="comment">
    <form class="layui-inline" @submit.prevent="submit_comment" method="post">
      <div class="layui-inline">
        <label class="layui-form-label">商品ID</label>
        <div class="layui-input-block">
          <input name="id" type="text" v-model="formComment.product" class="layui-input" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">用户ID</label>
        <div class="layui-input-block">
          <input name="name" type="text" v-model="formComment.user" class="layui-input" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline" style="margin:-6px 0 0 30px;">
        <button class="layui-btn"><i class="layui-icon layui-icon-search"></i></button>
      </div>
    </form>
    <div class="text" v-show="this.totalPage[0]==''">该商品或用户暂无评论</div>
    <table class="table table-striped table-auto" style="margin-top:15px;" v-show="this.totalPage[0]!=''">
      <thead>
        <tr>
          <th class="col-md-1">商品ID</th>
          <th class="col-md-1">用户ID</th>
          <th class="col-md-1">用户名</th>
          <th class="col-md-5">评论内容</th>
          <th class="col-md-2">评论时间</th>
          <th class="col-md-1">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(item, index) in this.totalPage[cur-1]">
          <td>{{item.product_id}}</td>
          <td>{{item.user_id}}</td>
          <td>{{item.user_name}}</td>
          <td><p data-toggle="tooltip" data-placement="bottom" :title="item.content">{{item.content}}</p></td>
          <td>{{item.create_time}}</td>
          <td><button type="button" class="btn btn-danger" @click="del(index)">删除</button></td>
        </tr>
      </tbody>
    </table>
    <nav v-if="comment!=''">
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
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    inject: ['reload'],
    data() {
      return {
        comment: {},
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 6,
        formComment: {}
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
      this.$http.post("/api/comment/show", {
        id: '20000777'
      },{}).then((data) => {
        this.comment = data.body
        this.pageNum = Math.ceil(this.comment.length / this.pageSize) || 1
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.comment.slice(this.pageSize * i, this.pageSize * (i + 1))
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
      submit_comment() {
        if (!this.formComment.user && !this.formComment.product) {
          alert('请先输入商品ID或用户ID...')
        } else {
          this.$http.post("/api/admin/comment", {
            user: this.formComment.user,
            product: this.formComment.product
          },{}).then((data) => {
            console.log(data.body)
            this.totalPage = []
            this.comment = data.body
            this.pageNum = Math.ceil(this.comment.length / this.pageSize) || 1
            for (let i = 0; i < this.pageNum; i++) {
              this.totalPage[i] = this.comment.slice(this.pageSize * i, this.pageSize * (i + 1))
            }
            this.cur = 1
          },function(response) {
            console.log(response)
          })
        }
      },
      del(i) {
        this.$http.post("/api/admin/commentdel", {
          id: this.totalPage[this.cur-1][i].id,
          product: this.totalPage[this.cur-1][i].product_id
        },{}).then((data) => {
          if (data.body.length == 2) {
            alert('删除成功!')
            this.reload()
          }
        },function(response){
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .comment {
    margin: 20px 40px 0;
  }
  .addbtn {
    float: right;
  }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #636b6f;
    font-weight: 100;
    min-width: 552px;
    text-align: center;
  }
  .table-auto tbody tr {
    height: 67px;
  }
  .table-auto td p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
</style>