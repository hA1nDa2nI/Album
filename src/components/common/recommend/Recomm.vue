<template>
  <div class="col-md-6">
    <slot name="name"></slot>
    <div class="row content" v-if="productdata.length!==0">
      <div class="col-md-6 col-sm-6 top" @click="go(productdata[0].id)">
        <img v-lazy="productdata[0].main_image" :alt="productdata[0].title">
        <i class="top1" :style="note"></i>
        <p>{{productdata[0].title}}</p>
        <span class="num"><slot name="datatitle"></slot>:{{productdata[0].numdata}}</span>
        <span class="price">CYN {{productdata[0].price}}</span>
      </div>
      <div class="col-md-6 col-sm-6 other" v-if="productdata">
        <recomm-item :key="index" v-for="(item, index) in otherdata" :id="item.id">
          <img slot="img"
               v-if="item.main_image !== undefined"
               v-lazy="item.main_image"
               :alt="item.title">
          <i class="top2" :style="note2" slot="ico" v-if="index==0"></i>
          <i class="top2" :style="note3" slot="ico" v-if="index==1"></i>
          <i class="top2" :style="note4" slot="ico" v-if="index==2"></i>
          <p slot="title">{{item.title}}</p>
          <span class="num" slot="num"><slot name="datatitle"></slot>{{item.numdata}}</span>
          <span class="price" slot="price">CYN {{item.price}}</span>
        </recomm-item>
      </div>
    </div>
  </div>
</template>

<script>
  import RecommItem from './RecommItem'

  export default {
    name: 'Recomm',
    components: {
      RecommItem
    },
    data() {
      return {
        note: {
          backgroundImage: "url(" + require("assets/images/top1.png") + ")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        },
        note2: {
          backgroundImage: "url(" + require("assets/images/top2.png") + ")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        },
        note3: {
          backgroundImage: "url(" + require("assets/images/top3.png") + ")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        },
        note4: {
          backgroundImage: "url(" + require("assets/images/top4.png") + ")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }
      }
    },
    props: {
      productdata: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      otherdata() {
        return [this.productdata[1], this.productdata[2], this.productdata[3]]
      }
    },
    methods: {
      go(id) {
        this.$router.push({
          path: '/detail',
          query: {
            id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    border: 1px solid #dedede;
    margin: 30px 0 0;
  }
  .top {  
    position: relative;
    background-color: #f4f6f9;
    padding: 40px 20px 20px;
  }
  .top img {
    margin: 0 auto 10px;
    width: 100%;
  }
  .top .num {
    display: block;
    text-align: center;
    color: #808080;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 15px;
  }
  .top .price {
    display: block;
    color: var(--color-high-text);
    font-size: 16px;
    text-align: center;
    font-weight: 700;
  }
  .top p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .other {
    padding: 20px;
  }
  i {
    display: block;
    width: 50px;
    height: 40px;
    position: absolute;
    top: 15px;
    left: 20px;
  }
  .top2 {
    width: 40px;
    height: 32px;
    top: -15px;
    left: 15px;
  }
</style>