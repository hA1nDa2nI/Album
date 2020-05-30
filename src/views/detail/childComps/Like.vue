<template>
  <div class="like col-md-2 col-sm-12 col-xs-12">
    <ul class="tab_list">
      <li @click="tab(0)" class="current">猜你喜欢</li>
      <li @click="tab(1)">新碟推荐</li>
    </ul>
    <ul class="tab_con" v-show="isShow">
      <like-item :key="index" v-for="(item, index) in this.data" :item="item"/>
      <div class="none" v-if="!this.data.length">
        <img src="~assets/images/wu.png" alt="none" style="width: 100%">
        <p>暂无推荐</p>
      </div>
    </ul>
    <ul class="tab_con" v-show="!isShow">
      <like-item :key="index" v-for="(item, index) in this.news" :item="item"/>
      <div class="none" v-if="!this.news.length">
        <img src="~assets/images/wu.png" alt="none" style="width: 30%">
          <p>暂无推荐</p>
      </div>
    </ul>
  </div>
</template>

<script>
  import LikeItem from './LikeItem'

  export default {
    name: 'Like',
    components: {
      LikeItem
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isShow: true,
        news: []
      }
    },
    methods: {
      tab(i) {
        let li = $('.tab_list').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        this.isShow = !this.isShow
      }
    },
    created() {
      var url="/api/products/news"
        this.$http.post(url,{
          id: this.$route.query.id,
        },{}).then((data) => {
          this.news = data.body
          for (let i in this.news) {
            if (this.news[i].main_image[0] == 'p') {
              this.news[i].main_image = require('@/assets/images/product/'+this.news[i].main_image)
            }
          }
        },(response) => {
          console.log(response)
        })
    }
  }
</script>

<style scoped>
  .like {
    float: left;
    border: 1px solid #ccc;
    padding: 0;
  }
  .tab_list {
    display: flex;
  }
  .tab_list li {
    flex: 1;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .tab_list .current {
    background-color: #fff;
    border-bottom: 0;
    color: var(--color-tint);
  }
  .tab_con {
    padding: 0 10px;
  }
  .none p {
    text-align: center;
    color: #959595;
  }
</style>