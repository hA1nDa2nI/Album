<template>
  <div class="searchbox row">
    <router-link to='/home' class="col-md-3 col-sm-4">
      <img src="~assets/images/logo.png" alt="logo" style="width: 80%" class="logo">
    </router-link>
    <div class="col-md-5 col-md-offset-1 col-sm-5">
      <form class="input-group" @submit.prevent="submit_search">
        <input type="text" class="form-control" placeholder="输入关键词"
               v-model="search">
        <span class="input-group-btn">
          <button class="btn btn-default" type="submit">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </form>
    </div>
    <div class="col-md-3 col-sm-3">
      <router-link to='/cart' class="cart right">购物车<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBox',
    inject: ['reload'],
    data() {
      return {
        search: ''
      }
    },
    methods: {
      submit_search() {
        if (this.search == '') {
          alert('请输入关键词进行搜索')
        } else {
          this.$router.push({
            path: '/searchresults',
            query: {
              search: this.search
            }
          })
          this.reload()
        }
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 768px) {
    .searchbox {
      margin-bottom: 40px;
    }
    .form-control {
      margin-top: 8px;
    }
    .input-group-btn {
      line-height: 50px;
    }
  }
  @media (max-width: 767px) {
    .cart,
    .searchbox img {
      display: none;
    }
    .searchbox {
      margin-bottom: 20px;
    }
  }
  .form-control:focus {
    border-color: #ccc;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(121, 70, 138, 0.26);
  }
  .btn-default:focus {
    outline: none; 
    border: 1px solid #ccc;
  }
  .cart {
    border: 1px solid var(--color-high-text);
    color: var(--color-high-text);
    padding: 8px 20px;
    margin: 6px 30px 6px 0;
    transition: all .5s;
  }
  .cart:hover {
    background-color: var(--color-high-text);
    color: #fff;
    text-decoration: none;
  }
</style>