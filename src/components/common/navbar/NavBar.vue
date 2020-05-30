<template>
  <nav class="nav navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <div class="navbar-brand" style="font-size: 14px;">当前位于:
          <span href="#" class="dropdown-toggle" data-toggle="dropdown">
            {{this.$store.state.current_city}}<span class="caret"></span>
          </span>
          <dl class="dropdown-menu address">
            <dd :key="index"
             v-for="(item, index) in address"
             @click="addressClick(index)"
             :class="isActive==index?'active':''">
              {{item.label}}
            </dd> 
          </dl>  
        </div>
      </div>
      <div id="menu" class="collapse navbar-collapse navbar-right">
        <ul class="nav navbar-nav" @mouseleave="leave()">
          <li @mouseover="over($event)"><slot name="index"><router-link to='/home'>首页</router-link></slot></li>
          <li v-show="!this.$store.state.profileStatus" @mouseover="over($event)"><slot name="login"><router-link to='/login'>登录</router-link></slot></li>
          <li v-show="!this.$store.state.profileStatus" @mouseover="over($event)"><slot name="register"><router-link to='/register'>注册</router-link></slot></li>
          <slot name="cart"></slot>
          <li class="cart" @mouseover="over($event)"><router-link to='/cart'>购物车</router-link></li>
          <li @mouseover="over($event)"><slot name="order"><router-link to='/order'>订单中心</router-link></slot></li>
          <li class="dropdown" @mouseover="over($event)"><slot name="list">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              频道分类<span class="caret"></span>
            </a></slot>
            <categorys/>
          </li>
          <li @mouseover="over($event)"><slot name="profile"><router-link to='/profile'>个人中心</router-link></slot></li>
          <li @mouseover="over($event)" v-show="this.$store.state.profileStatus"><a @click="logoutClick">退出登录</a></li>
          <li>
            <i class="layui-icon layui-icon-theme" @click="colorshow" @mouseover="over($event)"></i>
            <sketch v-model="colors" @input="handleChangeColor" v-show="isshow"></sketch>
          </li>
          <span class="layui-nav-bar"></span>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {regionData} from 'element-china-area-data'
  import Categorys from 'components/common/categorys/Categorys'
  import { Sketch } from 'vue-color'

  export default {
    name: 'NavBar',
    components: {
      Categorys,
      Sketch
    },
    data() {
      return {
        address: regionData,
        isActive: 0,
        colors: {
          hex: '#92bf9d',
          a: 1
        },
        isshow: 0
      }
    },
    methods: {
      over($event) {
        let left = $event.srcElement.offsetParent.offsetLeft
        let width = $event.srcElement.offsetWidth
        $(".layui-nav-bar").css('left', left)
        $(".layui-nav-bar").css('width', width)
        $(".layui-nav-bar").css('opacity', 1)
      },
      leave() {
        $(".layui-nav-bar").css('opacity', 0)
        $(".layui-nav-bar").css('width', 0)
      },
      addressClick(index) {
        this.$store.state.current_city = this.address[index].label
        this.isActive = index
      },
      logoutClick() {
        this.$store.state.profileStatus = false
        alert("退出成功!")
      },
      handleChangeColor(val) {
        document.documentElement.style.setProperty('--color-high-text', val.hex8)
      },
      colorshow() {
        this.isshow = !this.isshow
      }
    }
  }
</script>

<style scoped>
  .navbar-fixed-top {
    font-size: 16px;
    background-color: var(--color-tint);
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.2);
  }
  .navbar-inverse .navbar-nav > li {
    cursor: pointer;
  }
  .navbar-inverse .navbar-nav > li > .active,
  .navbar-inverse .navbar-nav > li > .active:hover {
    background-color: var(--color-high-text);
    color: #fff;
  }

  .navbar-inverse .navbar-nav > li > a:focus {
    color: #fff;
  }
  .layui-nav-bar {
    bottom: 0;
    top: auto;
    background: var(--color-high-text);
  }
  .cart {
    display: none;
  }
  @media (min-width: 768px) {
    .address {
      left: 80px;
      top: 46px;
      width: 348px;
      padding: 2px 5px;
    }
  }
  @media (max-width: 767px) {
    .cart {
      display: block;
    }
  }
  .address dd {
    display: inline-block;
    padding: 0 8px;
    width: 112px;
    color: #333;
    line-height: 30px;
    font-size: 12px;
  }
  .address dd:hover, dd:focus {
    background-color: #f5f5f5;
    color: #262626;
  }
  .address .active {
    background-color: var(--color-high-text);
    color: #fff;
  }
  .navbar-inverse .navbar-nav > .open > a {
    background-color: var(--color-high-text);
  }
  .navbar-inverse .navbar-toggle:hover, 
  .navbar-inverse .navbar-toggle:focus {
    background-color: var(--color-high-text);
  }
  .navbar-inverse .navbar-nav > li > .cates {    
    background-color: var(--color-high-text);
    color: #fff;
  }
  .vc-sketch {
    position: fixed;
    right: 0;
  }
  .layui-icon-theme {
    color: #9d9d9d;
    padding: 14px 15px;
    display: block;
  }
  .layui-icon-theme:hover {
    color: #fff;
  }
</style>