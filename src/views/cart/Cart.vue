<template>
  <div id="cart">
    <nav-bar><li slot="cart"><a href="#" class="active">购物车</a></li></nav-bar>
    <div class="container">
      <search-box/>
      <div class="allgoods">
        <h4>全部商品<span>{{this.cart_data.length}}</span></h4>       
        <div class="cart-main">
          <div class="cart-th">
            <li class="col-md-2 col-sm-2 col-xs-2"><input type="checkbox" v-model="allCheck" @click="allClick">全选</li>
            <li class="col-md-5 col-sm-4 col-xs-3">商品</li>
            <li class="col-md-1 col-sm-2 col-xs-2">单价(元)</li>
            <li class="col-md-2 col-sm-1 col-xs-2">数量</li>
            <li class="col-md-1 col-sm-2 col-xs-2">小计(元)</li>
            <li class="col-md-1 col-sm-1 col-xs-1">操作</li>
          </div>
          <div class="cart-title">
            <h5>Album Collection</h5>
            <div class="yunfei" v-show="all_price.money<500">
              运费：￥12.00,还差￥<span>{{(500-all_price.money).toFixed(2)}}</span>免运费
            </div>
            <div class="yunfei" v-show="all_price.money>=500">
              已满￥<span>500.00</span>免运费
            </div>
          </div>
        </div>
        <div class="alert alert-warning" role="alert" v-if="!this.$store.state.profileStatus">当前未登录，请先登录!</div>
        <div class="alert alert-success" role="alert" v-if="this.$store.state.profileStatus && !this.cart_data.length">空空如也~快去购物吧!</div>
        <div class="cart-item" v-if="this.$store.state.profileStatus">
          <ul class="goods-list" :key="index" v-for="(item, index) in this.cart_data">
            <li class="col-md-1 col-sm-1"><input type="checkbox" class="good-checkbox" v-model="item.checked" @click="singleClick(index)"></li>
            <li class="col-md-1 col-sm-1">
              <img v-lazy="item.main_image" width="100%">
            </li>
            <li class="col-md-3 col-sm-2">{{item.title}}</li>
            <li class="col-md-2 col-sm-2">{{item.author}}</li>
            <li class="col-md-1 col-sm-1">￥{{item.price.toFixed(2)}}</li>
            <li class="col-md-2 col-sm-2">
              <a href="javascript:;" class="increment" @click="decrease(index)">-</a>
              <input autocomplete="off" type="text" v-model="item.quantity" minnum="1" class="itxt">
              <a href="javascript:;" class="increment" @click="add(index)">+</a>
            </li>
            <li class="col-md-1 col-sm-1">￥{{total_price[index]}}</li>
            <li class="col-md-1 col-sm-2"><a href="javascript:;" class="del" @click="delect(index)">删除<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a></li>
          </ul>
          <ul class="goods-list-mobile" :key="index" v-for="(item, index) in this.cart_data">
            <li class="mobile_img">
              <input type="checkbox" class="good-checkbox" v-model="item.checked" @click="singleClick(index)">
              <img v-lazy="item.main_image" width="100%">
            </li>
            <li>{{item.title}}</li>
            <li class="mobile_author">{{item.author}}</li>
            <li class="mobile_price">
              <a href="javascript:;" class="increment" @click="decrease(index)">-</a>
              <input autocomplete="off" type="text" v-model="item.quantity" minnum="1" class="itxt">
              <a href="javascript:;" class="increment" @click="add(index)">+</a>
            </li>
            <li class="mobile_price">￥{{total_price[index]}}</li>
            <li class="del"><a href="javascript:;" @click="delect(index)">删除<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a></li>
          </ul>
        </div>
        <div class="sumprice" v-if="this.$store.state.profileStatus && this.cart_data.length">
          <span>已选择 <strong>{{all_price.num}}</strong> 件商品</span>
          <em>总价（不含运费）：</em><i class="summoney">￥<span>{{all_price.money}}</span></i>
          <div><em>运费：</em><i>￥<span>{{yunfei}}</span></i></div>
          <div class="sum-btn" @click="submit">结算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'

  export default {
    name: 'Cart',
    inject: ['reload'],
    components: {
      NavBar,
      SearchBox
    },
    data() {
      return {
        cart_data: {},
        num: 1,
        total: [],
        price: {
          num: 0,
          money: 0
        },
        allCheck: false,
        list: [],
        ids: []
      }
    },
    computed: {
      total_price() {
        for (let i in this.cart_data) {
          this.total[i] = parseFloat(this.cart_data[i].price * this.cart_data[i].quantity).toFixed(2)
        }
        return this.total
      },
      all_price() {
        this.price.num = 0
        this.price.money = 0
        for (let i in this.cart_data) {
          if (this.cart_data[i].checked) {
            this.price.num = this.price.num + this.cart_data[i].quantity
            this.price.money = parseFloat(parseFloat(this.price.money) + this.cart_data[i].quantity * this.total[i]).toFixed(2)
          }
        }
        return this.price
      },
      yunfei() {
        if (this.all_price.money >= 500 || this.all_price.money <= 0) {
          return 0
        } else {
          return 12
        }
      }
    },
    created() {
      if (this.$store.state.profileStatus) {
        this.$http.post("/api/carts/show", {
          user_id: this.$store.state.user_id
        },{}).then((data) => {
          this.cart_data = data.body
        },function(response){
          console.log(response);
        })
      }
    },
    methods: {
      // 增加商品
      add(index) {
        this.cart_data[index].quantity = this.cart_data[index].quantity + 1
        this.$http.post("/api/carts/update", {
          num: this.cart_data[index].quantity,
          id: this.cart_data[index].id
        },{}).then((data) => {},function(response){
          console.log(response);
        })
      },
      // 减少商品
      decrease(index) {
        if (this.cart_data[index].quantity <= 1) {
          alert('该商品不能再减少了!')
        } else {
          this.cart_data[index].quantity = this.cart_data[index].quantity - 1
          this.$http.post("/api/carts/update", {
            num: this.cart_data[index].quantity,
            id: this.cart_data[index].id
          },{}).then((data) => {},function(response){
            console.log(response);
          })
        }
      },
      // 移出购物车
      delect(index) {
        this.$http.post("/api/carts/del", {
          id: [this.cart_data[index].id]
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
            alert("成功移除购物车!")
            this.reload()
          }
        },function(response){
          console.log(response);
        })
      },
      // 全选按钮
      allClick() {
        for (let i in this.cart_data) {
          this.cart_data[i].checked = !this.allCheck;
        }
        this.allCheck = !this.allCheck
      },
      // 单个商品选择按钮
      singleClick(i) {
        this.cart_data[i].checked = !this.cart_data[i].checked
        let flag = 0
        for (let i in this.cart_data) {
          if (!this.cart_data[i].checked) {
            this.allCheck = false
            flag = 1
          }
        }
        if (!flag) {
          this.allCheck = true
        }
      },
      // 立即结算
      submit() {
        if (!this.all_price.num) {
          alert("当前未选中商品，无法进行结算!")
        } else {
          for (let i in this.cart_data) {
            if (this.cart_data[i].checked) {
              this.list.push(this.cart_data[i])
              this.ids.push(this.cart_data[i].id)
            }
          }
          this.$http.post("/api/carts/submit", {
            ids: this.ids
          },{}).then((data) => {
            if (data.body == 1) {
              this.$router.push({
                name: 'pay',
                params: {
                  list: this.list,
                  all_price: this.all_price,
                  yunfei: this.yunfei
                }
              })
            }
          },function(response){
            console.log(response);
          })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .allgoods {
    border-top: 2px solid var(--color-high-text);
	  margin-bottom: 30px;
	  min-height: 500px;
  }
  .allgoods h4 {
	  color: #333;
	  padding: 9px 0;
  }
  .allgoods h4 span {
    margin-left: 5px;
  }
  .cart-main {
  	font-size: 12px;
    margin-bottom: 30px;
  }
  .cart-th {
    overflow: hidden;
  	border: 1px solid #ddd;
  	background: #f5f5f5;
  }
  .cart-th li {
    line-height: 40px;
  }
  .cart-th li input {
    margin-right: 10px;
  }
  .cart-title {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }
  .cart-title h5 {
    float: left;
	  line-height: 20px;
    margin-left: 10px;
  }
  .yunfei {
    display: block;
    float: right;
    line-height: 40px;
  }
  .yunfei span {
    color: var(--color-high-text);
    font-weight: 700;
  }
  .goods-list {
    overflow: hidden;
    padding: 25px 0;
    border-bottom: 1px solid #dedede;
    margin: 0;
  }
  .goods-list-mobile {
    display: none;
  }
  .good-checkbox {
    float: left;
  }
  .goods-list li {
    text-align: center;
  }
  .goods-list .itxt {
    display: inline-block;
    width: 40px;
    text-align: center;
    border: 0;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
  }
  .goods-list .increment {
    width: 20px;
    display: inline-block;
    border: 1px solid #dedede;
    color: #333;
    text-decoration: none;
  }
  .goods-list .increment:hover {
    text-decoration: none;
  }
  .goods-list .del {
    color: var(--color-tint);
  }
  .sumprice {
    position: relative;
    padding-top: 30px;
  }
  .sumprice>span {
    display: block;
    line-height: 25px;
  }
  .sumprice em, i {
    font-style: normal;
  }
  .sum-btn {
    position: absolute;
    top: 30px;
    right: 0;
    width: 110px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: var(--color-high-text);
    border: 2px solid var(--color-high-text);
    cursor: pointer;
    transition: all .5s;
  }
  .sum-btn:hover {
    background-color: #fff;
    color: var(--color-high-text);
  }
  @media (min-width: 768px) {
    .goods-list li {
      padding: 0 10px;
    }
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
    .cart-th li {
      padding: 0 2px;
    }
    .goods-list {
      display: none;
    }
    .goods-list-mobile {
      display: block;
      overflow: hidden;
    }
    .goods-list-mobile li {
      display: block;
      float: right;
      width: 55%;
    }
    .goods-list-mobile .mobile_img {
      width: 40%;
      float: left;
    }
    .mobile_img input {
      display: block;
      float: left;
    }
    .mobile_img img {
      display: block;
      float: right;
      width: 82%;
    }
    .mobile_author {
      font-size: 12px;
    }
    .goods-list-mobile .itxt {
      display: inline-block;
      width: 40px;
      text-align: center;
      border: 0;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
    }
    .goods-list-mobile .increment {
      width: 20px;
      display: inline-block;
      border: 1px solid #dedede;
      color: #333;
      text-decoration: none;
      text-align: center;
    }
    .goods-list-mobile .increment:hover {
      text-decoration: none;
    }
    .goods-list-mobile .del {
      text-align: right;
      margin-top: 10px;
    }
    .goods-list-mobile .del a {
      color: var(--color-tint);
    }
    .goods-list-mobile .mobile_price {
      width: 27.5%;
      margin-top: 10px;
    }
  }
</style>