<template>
  <div class="col-md-9 col-sm-12 col-xs-12">
    <ul class="detail_tab">
      <li @click="tabClick(0)" class="current">商品介绍</li>
      <li @click="tabClick(1)">商品评价 ({{comment.length}})</li>
    </ul>
    <div class="detail_list">
      <div class="list" style="display: block;">
        <div class="list_item">
          <h3>商品规格</h3>
          <span :key="index" v-for="(item, index) in this.data.detail">{{item}}</span>
        </div>
        <div class="list_item" v-if="data.artist_intro!='' && data.artist_intro!=null">
          <h3>艺人介绍</h3>
          <p>{{data.artist_intro}}</p>
        </div>
        <div class="list_item" v-if="data.editor_recom!='' && data.editor_recom!=null">
          <h3>编辑推荐</h3>
          <p>{{data.editor_recom}}</p>
        </div>
        <div class="list_item" v-if="data.catalog!=null && data.catalog!=''">
          <h3>目录</h3>
          <p :key="index" v-for="(item, index) in this.data.catalog">{{item}}</p>
        </div>
        <div class="list_item">
          <h3>内容简介</h3>
          <p>{{data.validity}}</p>
          <div class="list_item">
            <li :key="index" v-for="(item, index) in this.smallPic">
              <img v-lazy="item" alt="" width="100%">
            </li>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="rate">
          <div class="rate-l col-md-2 col-sm-2 col-xs-3">
            <strong>{{(good.length / comment.length * 100).toFixed(0)}}<span>%</span></strong><br><span>好评度</span>
          </div>
          <div class="rate-r col-md-10 col-sm-10 col-xs-9">
            <h3>买家印象</h3>
            <ul class="tag" v-if="data.tags!=''">
              <li :key="index" v-for="(item, index) in this.data.tags" v-show="item!=''">{{item}}</li>
            </ul>
            <div class="alert alert-warning" role="alert" v-if="data.tags==''">
              当前商品未有买家印象...
            </div>
          </div>
        </div> 
        <div class="alert alert-warning" role="alert" v-if="comment==''">
          当前商品还没有评价...
        </div>
        <div class="comment-info" v-if="comment!=''">
          <a href="javascript:;" @click="star(0)" class="current">全部评价 ({{comment.length}})</a>
          <a href="javascript:;" @click="star(1)">好评 ({{good.length}})</a>
          <a href="javascript:;" @click="star(2)">中评 ({{general.length}})</a>
          <a href="javascript:;" @click="star(3)">差评 ({{poor.length}})</a>
        </div>
        <ul class="comment-main" v-if="totalPage!=''">
          <li :key="index" v-for="(item, index) in this.totalPage[cur-1]">
            <div class="comment-main-left">
              <i><img v-lazy="item.userimg" alt="" width="100%"></i>
            </div>
            <div class="comment-main-right col-md-10 col-sm-10 col-xs-10">
              <div class="comment-main-right-name">{{item.user_name}}
                <span>评论于 {{item.create_time}}</span>
              </div>
              <span class="layui-icon layui-icon-rate-solid" aria-hidden="true" 
                    :key="index" v-for="(item, index) in item.score"></span>
              <span class="layui-icon layui-icon-rate" aria-hidden="true"
                :key="n" v-for="(n) in (5-item.score)"></span>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
        <div class="alert alert-warning" role="alert" v-if="totalPage=='' && comment!=''">无</div>
        <nav v-if="totalPage!=''">
          <ul class="pagination">
            <li v-if="cur>1" @click="cur=1,pageClick()">
              <span><span aria-hidden="true">&laquo;</span></span>
            </li>
            <li class="disabled" v-if="cur==1">
              <span><span aria-hidden="true">&laquo;</span></span>
            </li>
            <li :key="index" v-for="index in indexs" :class="{ 'active': cur == index}" @click="btnClick(index),pageClick()">
              <span>{{index}}</span>
            </li>
            <li v-if="cur<pageNum" @click="cur=pageNum,pageClick()">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailTab',
    props: {
      data: {
        type: Object,
        default() {
          return {
            tags: ''
          }
        }
      }
    },
    data() {
      return {
        comment: [],
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 10,
        smallPic: [],
        good: [],
        general: [],
        poor: []
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
    methods: {
      tabClick(i) {
        let li = $('.detail_tab').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        let list = $('.detail_list').children().eq(i)
        list.show().siblings().hide()
      },
      btnClick(data) {
        if (data != this.cur) { //判断是不是当前页，不是就计算
          this.cur = data 
        }
      },
      pageClick() {
        let top = $('.comment-info').offset().top - 70
        $('html,body').animate({scrollTop: top}, 500)
      },
      star(i) {
        let li = $('.comment-info').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        this.cur = 1
        this.totalPage = []
        if (i == 0) {
          this.pageNum = Math.ceil(this.comment.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.comment.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        } else if (i == 1) {
          this.pageNum = Math.ceil(this.good.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.good.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        } else if (i == 2) {
          this.pageNum = Math.ceil(this.general.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.general.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        } else {
          this.pageNum = Math.ceil(this.poor.length / this.pageSize) || 1
          for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.poor.slice(this.pageSize * i, this.pageSize * (i + 1))
          }
        }
      }
    },
    created() {
      var url="/api/comment/show"
      this.$http.post(url,{
        id: this.$route.query.id
      },{}).then((data) => {
        this.comment = data.body
        for (let i in this.comment) {
          if (this.comment[i].userimg[0] == 'u') {
            this.comment[i].userimg = require('@/assets/images/user/'+this.comment[i].userimg)
          } else {
            this.comment[i].userimg = 'https:' + this.comment[i].userimg
          }
          if (this.comment[i].score == 5) {
            if (!this.good.length) {
              this.good[0] = this.comment[i]
            } else {
              this.good.push(this.comment[i])
            }
          } else if (this.comment[i].score >= 3) {
            if (!this.general.length) {
              this.general[0] = this.comment[i]
            } else {
              this.general.push(this.comment[i])
            }
          } else {
            if (!this.poor.length) {
              this.poor[0] = this.comment[i]
            } else {
              this.poor.push(this.comment[i])
            }
          }
        }
        this.pageNum = Math.ceil(this.comment.length / this.pageSize) || 1
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.comment.slice(this.pageSize * i, this.pageSize * (i + 1))
        }
        for (let i in this.data.sub_images) {
          this.smallPic.push(this.data.sub_images[i].replace('/n5/', '/n0/'))
        }
      },(response) => {
        console.log(response)
      })
    }
  }
</script>

<style scoped>
  .col-md-9 {
    float: right;
  }
  .detail_tab {
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    overflow: hidden;
  }
  .detail_tab li {
    line-height: 39px;
    padding: 0 20px;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  .detail_tab .current {
    background-color: var(--color-high-text);
    color: #fff;
  }
  .detail_list .list {
    display: none;
  }
  .list_item {
    padding: 20px;
    border-bottom: 1px solid #dedede;
  }
  .list_item:last-child {
    border: 0;
  }
  .list_item span {
    margin-right: 10px;
  }
  .rate,
  .tag {
    overflow: hidden;
  }
  .rate-l {
    text-align: center;
    margin-top: 20px;
  }
  .rate-l strong {
    font-size: 40px;
    color: var(--color-high-text);
  }
  .rate-r h3 {
    font-size: 16px;
    color: #333;
    font-style: normal;
    width: 700px;
    text-align: left;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .rate-r li {
    float: left;
    border: 1px solid #dedede;
    padding: 0 7px;
    margin: 0 10px 10px 0;
    transition: all .5s;
  }
  .rate-r li:hover {
    border-color: var(--color-high-text);
    background: var(--color-high-text);
    color: #fff;
  }
  .comment-info {
    line-height: 30px;
    background-color: #fafafa;
    border: 1px solid #F5F5F5;
    margin: 20px 0;
    padding-left: 10px;
  }
  .comment-info a {
    font-size: 14px;
    color: #333;
    margin-right: 20px;
  }
  .comment-info a:hover,
  .comment-info .current {
    color: var(--color-high-text);
  }
  .comment-main {
    width: 100%;
    overflow: hidden;
    margin-left: 20px;
  }
  .comment-main li {
    overflow: hidden;
    margin-bottom: 20px;
  }
  .comment-main li:hover .comment-main-right {
    border-color: var(--color-high-text);
  }
  .comment-main-left {
    float: left;
    margin-right: 30px;
  }
  .comment-main-left i {
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .comment-main-left i img {
    min-height: 48px;
  }
  .comment-main-right {
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .comment-main li:last-child .comment-main-right {
    border-bottom: 0
  }
  .comment-main-right-name {
    line-height: 30px;
  }
  .comment-main-right-name span {
    color: #999;
    float: right;
  }
  .layui-icon {
    color: var(--color-high-text);
    margin-right: 2px;
  }
  .comment-main-right p {
    margin: 20px 0;
  }
  nav {
    overflow: hidden;
  }
  .pagination {
    float: right;
  }
  .pagination .active span {
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  }
  .alert {
    margin-top: 20px;
  }
  @media (max-width: 767px) {
    .rate-l {
      padding-left: 0;
    }
    .comment-main-left {
      margin-right: 0;
    }
    .comment-info a {
      display: block;
    }
    .comment-main {
      margin-left: 0;
    }
    .col-xs-12 {
      margin: 0;
      padding: 0;
    }
    .comment-main-right {
      padding-right: 0;
    }
    .comment-main-right-name {
      font-size: 12px;
    }
  }
</style>