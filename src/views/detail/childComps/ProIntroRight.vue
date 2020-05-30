<template>
  <div class="col-md-7 col-sm-7">
    <h3>{{data.title}}</h3>
    <ul class="row">
      <li class="col-md-9 col-sm-9"><i class="col-md-3 col-sm-4 col-xs-3">演唱者:</i><span>{{data.author}}</span></li>
      <li class="col-md-9 col-sm-9"><i class="col-md-3 col-sm-4 col-xs-3">价格:</i><span>CYN {{data.price}}</span></li>
      <li class="col-md-9 col-sm-9"><i class="col-md-3 col-sm-4 col-xs-3">折扣:</i><span>{{(data.price / data.maprice * 10).toFixed(2)}}折</span></li>
      <li class="col-md-9 col-sm-9"><i class="col-md-3 col-sm-4 col-xs-3">定价:</i><span>CYN {{data.maprice}}</span></li>
      <li class="col-md-9 col-sm-9 stock"><i class="col-md-3 col-sm-4 col-xs-3">配送至:</i>
        <span @click="isshow">
          {{curaddress.options}}{{curaddress.selectedOptions}}{{curaddress.region}}
          <i></i>
        </span>
        <address-box v-if="isActive" v-on:address="address" v-on:isshow="close"/>
      </li>
      <li class="col-md-9 col-sm-9"><i class="col-md-3 col-sm-4 col-xs-3">支持快递:</i><span>中通快递、韵达快递、申通快递、百世快递、顺丰速递等</span></li>
      <div class="comment">
        累计评价<span class="count">{{data.commentCount}}</span>
      </div>
    </ul>
    <div class="num">
      购买数量：
      <input type="number" name="num" v-model="num">
      <i @click="add">+</i><i @click="decrease">-</i>
    </div>
    <button @click="addCart">加入购物车</button>
    <button @click="pay">立即购买</button>
  </div>
</template>

<script>
  import AddressBox from 'components/common/addressbox/AddressBox'

  export default {
    name: 'ProIntroRight',
    components: {
      AddressBox
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isActive: false,
        curaddress: {
          options: '北京市',
          selectedOptions: '市辖区',
          region: '东城区'
        },
        num: 1
      }
    },
    methods: {
      isshow() {
        this.isActive = true
      },
      address(data) {
        this.curaddress.options = data.options
        this.curaddress.selectedOptions = data.selectedOptions
        this.curaddress.region = data.region
      },
      close(data) {
        this.isActive = data
      },
      add() {
        this.num = parseInt(this.num) + 1
      },
      decrease() {
        if (this.num <= 0) {
          alert('当前商品不能再减少了！')
        } else {
          this.num = parseInt(this.num) - 1
        }
      },
      addCart() {
        if (!this.$store.state.profileStatus) {
          alert("您还未登录，请先登录完重试!")
          this.$router.push('/login')
        } else {
          this.$http.post("/api/carts/add", {
            user_id: this.$store.state.user_id,
            product_id: this.data.id,
            quantity: this.num
          },{}).then((data) => {
            alert(data.body)
          },function(response){
            console.log(response);
          })
        }
      },
      pay() {
        if (!this.$store.state.profileStatus) {
          alert("当前未登录，请先登录账号!")
        } else {
          let all_price = {
            money: (this.data.price * this.num).toFixed(2),
            num: this.num
          }
          let yunfei = 0
          if (all_price.money < 500) {
            yunfei = 12
          }
          let list = [{
            author: this.data.author,
            main_image: this.data.main_image,
            price: this.data.price,
            product_id: this.data.id,
            quantity: this.num,
            title: this.data.title
          }]
          this.$router.push({
            name: 'pay',
            params: {
              list,
              all_price,
              yunfei
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  h3 {
    min-height: 70px;
  }
  ul {
    position: relative;
  }
  li {
    border-bottom: 1px solid #EDEDED;
    line-height: 50px;
    overflow: hidden;
  }
  li i {
    font-style: normal;
  }
  li span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stock {
    position: relative;
  }
  .stock span i {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 10px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
  .comment {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    padding-left: 20px;
  }
  .count {
    display: block;
    margin: 10px 0;
    padding: 0 20px;
    font-size: 40px;
    color: var(--color-high-text);
  }
  .num {
    margin: 40px 0;
    padding-left: 20px;
  }
  .num input {
    display: inline-block;
    text-align: center;
    border: 1px solid #ededed;
    padding: 0 10px;
    line-height: 30px;
    margin-right: 10px;
  }
  .num i {
    display: inline-block;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ededed;
    border-radius: 50%;
    margin: 0 5px;
  }
  button {
    width: 90px;
    background-color: var(--color-high-text);
    color: #fff;
    border: 2px solid var(--color-high-text);
    line-height: 30px;
    margin: 0 10px;
    transition: all .6s;
  }
  button:hover {
    background: #fff;
    color: var(--color-high-text);
  }
  @media (max-width: 767px) {
    .comment {
      display: none;
    }
    .num input {
      width: 130px;
    }
    .col-xs-3 {
      padding: 0;
    }
  }
</style>