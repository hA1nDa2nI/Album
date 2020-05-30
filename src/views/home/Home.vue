<template>
  <div id="home">
    <nav-bar><a href="javascript:;" slot="index" class="active">首页</a></nav-bar>
    <div class="container">
      <search-box/>
      <rotation-chart/>
      <recommend/>
      <div class="box" :key="index" v-for="(val, key, index) in products">
        <box-top :name="key"><h3 slot="name">{{key}}</h3></box-top>
        <div class="box-content row">
          <box-item :key="index" v-for="(item, index) in val" :id="item.id">
            <img v-lazy="item.bigimage" :alt="item.title" slot="boxImg" />
            <span slot="title" class="title">{{item.title}}</span>
            <span slot="price" class="price">￥{{item.price}}</span>
          </box-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import RotationChart from 'components/common/rotationchart/RotationChart'
  import BoxTop from './childComps/categorybox/BoxTop'
  import BoxItem from 'components/common/categorys/BoxItem'
  import Recommend from './childComps/recommend/Recommend'

  import {getProduct, getCommenttop} from 'network/product'

  export default {
    name: 'Home',
    components: {
      NavBar,
      SearchBox,
      RotationChart,
      BoxTop,
      BoxItem,
      Recommend
    },
    data() {
      return {
        products: {}
      }
    },
    created() {
      this.getProduct()
    },
    methods: {
      // 网络请求部分
      getProduct() {
        getProduct().then(res => {
          this.products = res
          for (let i in this.products) {
            for (let j in this.products[i]) {
              if (this.products[i][j].bigimage[0] == 'p') {
                this.products[i][j].bigimage = require('@/assets/images/product/'+this.products[i][j].bigimage)
              }
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .box {
    margin-top: 50px;
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
  }
</style>
