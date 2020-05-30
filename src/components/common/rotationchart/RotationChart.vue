<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" :data-slide-to="index" 
          :class="{active:index==0}"
          :key="index" v-for="(item, index) in banner"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="item" :key="index" v-for="(item, index) in banner" :class="{active:index==0}">
        <img :src="item.image" alt="banner">
      </div>
    </div>
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'RotationChart',
    data() {
      return {
        banner: []
      }
    },
    // 组件创建时发送网络请求
    created() {
      this.$http.get("/api/products/banner", {},{}).then((data) => {
        this.banner = data.body
        for (let i in this.banner) {
          this.banner[i].image = require('@/assets/images/banner/'+this.banner[i].image)
        }
      },function(response) {
        console.log(response)
      })
    }
  }
</script>

<style scoped>
  .item {
    height: 460px;
    overflow: hidden;
  }
  .item img {
    min-height: 460px;
    min-width: 100%;
  }
  .carousel-indicators li {
    margin: 0 3px;
    transition: all .5s;
  }
  .carousel-indicators .active {
    width: 20px;
    height: 10px;
    border-radius: 5px;
    background: var(--color-high-text);
    border-color: var(--color-high-text);
  }
  @media (max-width: 992px) {
    .item {
      height: 290px;
    }
    .item img {
      min-height: 290px;
    }
  }
  @media (max-width: 768px) {
    .item {
      height: 194px;
    }
    .item img {
      min-height: 194px;
    }
  }
</style>