<template>
  <div class="like_item col-md-12 col-sm-6 col-xs-6">
    <img v-lazy="item.main_image" width="100%" alt="">
    <h5>{{item.title}}</h5>
    <div class="aside_price">CYN {{item.price}}</div>
    <a @click="go" class="as_addcar">查看详情</a>
  </div>
</template>

<script>
  export default {
    name: 'LikeItem',
    inject: ['reload'],
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      go() {
        this.$router.push({
          path: '/detail',
          query: {
            id: this.item.id
          }
        })
        this.reload()
      }
    }
  }
</script>

<style scoped>
  .like_item {
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
  }
  .like_item:last-child {
    border-bottom: 0;
  }
  .like_item h5 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
  }
  .aside_price {
    font-weight: 700;
    margin: 10px 0;
    text-align: center;
  }
  .as_addcar {
    display: block;
    width: 88px;
    line-height: 26px;
    text-align: center;
    border: 1px solid var(--color-high-text);
    margin: 10px auto;
    font-size: 14px;
    color: var(--color-high-text);
    font-weight: 700;
    transition: all .8s;
  }
  .as_addcar:hover {
    border: 1px solid transparent;
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>