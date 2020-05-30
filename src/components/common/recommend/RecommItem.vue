<template>
  <div class="recomm-item row" @click="go(id)">
    <div class="col-md-5 col-sm-5 col-xs-5 item-left">
      <slot name="img"></slot>
      <slot name="ico"></slot>
    </div>
    <div class="col-md-7 col-sm-7 col-xs-7 item-right">
      <slot name="title"></slot>
      <slot name="num"></slot>
      <slot name="price"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommItem',
    props: {
      id: {
        type: Number,
        default: ''
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
  .recomm-item {
    margin-bottom: 26px;
  }
  .recomm-item:last-child {
    margin-bottom: 0;
  }
  .item-left,
  .item-right {
    padding: 0 10px;
  }
  .recomm-item img {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #e5e5e5;
  }
  .recomm-item .num {
    display: block;
    color: #808080;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recomm-item .price {
    display: block;
    color: var(--color-high-text);
    font-size: 16px;
    font-weight: 700;
  }
  .item-right p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>