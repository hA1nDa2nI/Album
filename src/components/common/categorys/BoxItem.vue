<template>
  <div class="col-md-3 col-sm-4 col-xs-6 box-item" @click="item">
    <div class="box-img"><slot name="boxImg"></slot></div>
    <slot name="title"></slot>
    <slot name="author"></slot>
    <slot name="price"></slot>
  </div>
</template>

<script>
  export default {
    name: 'BoxItem',
    props: {
      id: {
        type: Number,
        default() {
          return ''
        }
      }
    },
    methods: {
      item() {
        this.$router.push({
          path: '/detail',
          query: {
            id: this.id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .box-item {
    transition: 0.6s;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  .box-item:hover img {
    box-shadow: 0 5px 10px rgba(23,24,25,.6);
    transform: translateY(-10px);
  }
  .box-img {
    padding: 0 10px;
  }
  .box-img img {
    width: 100%;
    transition: 0.6s;
  }
  .title {
    display: block;
    margin: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .author {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
  .price {
    display: block;
    text-align: center;
  }
</style>