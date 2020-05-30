<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo">
        Album Collection
      </div>
      <ul class="layui-nav layui-layout-right"> 
        <li class="layui-nav-item" v-if="!this.$store.state.admin"><router-link to='/admin'>登录</router-link></li>
        <li class="layui-nav-item" v-if="this.$store.state.admin">admin</li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <ul class="layui-nav layui-nav-tree" @mouseleave="leave()">
          <li class="layui-nav-item" role="presentation" @click="layuinavclick(0)" @mouseover="over(0)">
            <a href="#user" aria-controls="user" role="tab" data-toggle="tab">用户管理</a>
          </li>
          <li class="layui-nav-item" role="presentation" @click="openclick(1)" @mouseover="over(1)">
            <a href="javascript:;">商品管理<span class="layui-nav-more"></span></a>
            <dl class="layui-nav-child">
              <dd @click="openchild(0)"><a href="#category" aria-controls="caregory" role="tab" data-toggle="tab">商品分类</a></dd>
              <dd @click="openchild(1)"><a href="#product" aria-controls="product" role="tab" data-toggle="tab">商品详情</a></dd>
              <dd @click="openchild(2)"><a href="#comment" aria-controls="comment" role="tab" data-toggle="tab">商品评论</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item" role="presentation" @click="layuinavclick(2)" @mouseover="over(2)">
            <a href="#order" aria-controls="order" role="tab" data-toggle="tab">订单管理</a>
          </li>
          <li class="layui-nav-item" role="presentation" @click="layuinavclick(3)" @mouseover="over(3)">
            <a href="#banner" aria-controls="banner" role="tab" data-toggle="tab">首页banner管理</a>
          </li>
          <span class="layui-nav-bar"></span>
        </ul>
      </div>
    </div>

    <div class="layui-body" v-if="this.$store.state.admin">
      <div class="content fade active in">
        <div class="text">Album Collection 后台管理系统</div>
      </div>
      <div class="content fade" id="user">
        <User/>
      </div>
      <div class="content fade" id="category">
        <Category/>
      </div>
      <div class="content fade" id="product">
        <Product/>
      </div>
      <div class="content fade" id="comment">
        <Comment/>
      </div>
      <div class="content fade" id="order">
        <Order/>
      </div>
      <div class="content fade" id="banner">
        <Banner/>
      </div>
    </div>

    <div class="layui-body" v-if="!this.$store.state.admin">
      <div class="content">
        <div class="text">请先登录...</div>
      </div>
    </div>

    <div class="layui-footer">
      AlbumCollection 后台管理系统
    </div>
  </div>
</template>

<script>
  import User from './childComps/User'
  import Category from './childComps/Category'
  import Product from './childComps/Product'
  import Comment from './childComps/Comment'
  import Order from './childComps/Order'
  import Banner from './childComps/Banner'

  export default {
    name: 'Admin',
    components: {
      User,
      Category,
      Product,
      Comment,
      Order,
      Banner
    },
    methods: {
      over(i) {
        let top = $('.layui-nav-tree').children('li').eq(i).offset().top - 60
        $(".layui-nav-bar").css('top', top)
        $(".layui-nav-bar").css('height', '45px')
        $(".layui-nav-bar").css('opacity', 1)
      },
      leave() {
        $(".layui-nav-bar").css('opacity', 0)
        $(".layui-nav-bar").css('height', '0')
      },
      layuinavclick(i) {
        let dd = $('.layui-nav-child').children('dd').eq(0)
        dd.removeClass('layui-this').siblings().removeClass('layui-this')
        let li = $('.layui-nav-tree').children('li').eq(i)
        li.addClass('layui-this').siblings().removeClass('layui-this')
        li.siblings().removeClass('layui-nav-itemed')
      },
      openclick(i) {
        let li = $('.layui-nav-tree').children('li').eq(i)
        li.addClass('layui-nav-itemed').siblings().removeClass('layui-nav-itemed')
      },
      openchild(i) {
        let li = $('.layui-nav-tree').children('li').eq(0)
        li.removeClass('layui-this').siblings().removeClass('layui-this')
        let dd = $('.layui-nav-child').children('dd').eq(i)
        dd.addClass('layui-this').siblings().removeClass('layui-this')
      }
    }
  }
</script>

<style scoped>
  .layui-body {
    background-color: #fff;
  }
  .layui-footer {
    z-index: 2;
  }
  .layui-layout-admin .layui-logo {
    font-size: 22px;
  }
  .layui-nav-item {
    cursor: pointer;
  }
  .layui-nav-item a {
    color: #fff;
  }
  .layui-layout-right li {
    margin-left: 30px;
  }
  .layui-layout-right li i {
    font-size: 18px;
  }
  .content {
    position: fixed;
    top: 60px;
    right: 0;
    left: 200px;
    bottom: 44px;
  }
  .content .text {
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
  li:hover a {
    text-decoration: none;
  }
  .fade.in {
    z-index: 2;
  }
  .layui-nav-tree li {
    transition: all .8s;
  }
  .layui-nav-tree .layui-this a,
  .layui-nav-tree .layui-nav-itemed a {
    text-decoration: none;
  }
  .layui-nav-item .layui-nav-child dd a {
    padding: 0 0 0 40px;
  }
</style>