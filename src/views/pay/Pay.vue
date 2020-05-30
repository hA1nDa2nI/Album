<template>
  <div id="Pay">
    <nav-bar></nav-bar>
    <div class="container">
      <search-box/>
      <div class="content">
        <p>填写并核对订单信息</p>
        <div class="message">
          <p>收件人信息</p>
          <div class="address" v-if="!selectAdd">
            <receiving-info v-on:address="address">
              <span slot="title">选择收货地址</span>
            </receiving-info>
          </div>
          <div class="address" v-if="selectAdd">
            <b>{{selectAdd.receiver_name}} {{selectAdd.receiver_province}}</b>
            <p>{{selectAdd.receiver_name}} {{selectAdd.receiver_province}}{{selectAdd.receiver_city}}{{selectAdd.receiver_district}}{{selectAdd.receiver_address}} {{selectAdd.receiver_phone}}</p>
            <receiving-info v-on:address="address" class="update">
              <span slot="title">更改地址</span>
            </receiving-info>
          </div>
        </div>
        <div class="message">
          <p>选择物流方式</p>
          <ul class="message-select kuaidi">
            <li :key="index" v-for="(item, index) in this.express" @click="selectExrepss(index)">{{item}}</li>
          </ul>
        </div>
        <div class="message">
          <p>选择支付方式</p>
          <ul class="message-select m-pay">
            <li :key="index" v-for="(item, index) in this.pay" @click="selectPay(index)">{{item}}</li>
          </ul>
        </div>
        <div class="message">
          <p>送货清单</p>
          <div class="me-bt">
              <span>配送时间</span>
              <p class="col-md-5 col-md-offset-1 col-sm-6 col-sm-offset-1">预计 {{time}} 09:00-15:00送达</p>
          </div>
          <div class="me-bd">
              <span>订单详情</span>
              <ul class="me-bs">
                <li :key="index" v-for="(item, index) in this.list">
                  <div class="col-md-1 col-md-offset-1 col-sm-1 col-sm-offset-1 col-xs-2 imgbox"><img v-lazy="item.main_image" alt="" width="100%"></div>
                  <div class="col-md-4 col-sm-4 col-xs-4 title">{{item.title}}</div>
                  <div class="col-md-1 col-md-offset-3 col-sm-1 col-sm-offset-2 col-xs-2">{{item.price}}</div>
                  <div class="col-md-1 col-sm-1 col-xs-1">{{item.quantity}}</div>
                  <div class="col-md-1 col-sm-1 col-xs-2">{{(item.quantity * item.price).toFixed(2)}}</div>
                </li>
              </ul>
          </div>
        </div>
        <div class="message">
          <p>发票信息</p>
          <span class="col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1">普通发票（电子） 个人 明细</span>
          <dl class="col-md-4 col-md-offset-3 col-sm-4 col-sm-offset-3">
            <dt class="col-md-8 col-sm-8 col-xs-9">{{all_price.num}}件商品，总商品金额：</dt><dd class="col-md-4 col-sm-4 col-xs-3">¥{{all_price.money}}</dd>
            <dt class="col-md-8 col-sm-8 col-xs-9">优惠：</dt><dd class="col-md-4 col-sm-4 col-xs-3">¥0.00</dd>
            <dt class="col-md-8 col-sm-8 col-xs-9">运费：</dt><dd class="col-md-4 col-sm-4 col-xs-3">¥{{(yunfei).toFixed(2)}}</dd>
          </dl>
        </div>
        <div class="me-money">
          <p>应付总额 ： <span>¥{{all_price.money * 1 + yunfei * 1}}</span></p>
          <p>寄送至：{{selectAdd.receiver_province}}{{selectAdd.receiver_city}}{{selectAdd.receiver_district}} {{selectAdd.receiver_address}}</p>
          <p>收货人：{{selectAdd.receiver_name}}  {{selectAdd.receiver_phone}}</p>
        </div>
        <a class="me-commit" @click="submit">提交订单</a>
        <div style="clear: both;"></div>
        <div class="alert alert-warning alert-dismissible" v-show="message != ''">
          <strong>Warning!</strong> {{message}}
        </div>
      </div>
    </div>
    <div class="popup">
      <div class="qrcode" ref="qrCodeUrl">
        <span>扫描二维码支付</span>
        <i class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import AddressBox from 'components/common/addressbox/AddressBox'
  import ReceivingInfo from 'components/common/receivinginfo/ReceivingInfo'
  import QRCode from 'qrcodejs2'

  export default {
    name: 'Pay',
    components: {
      NavBar,
      SearchBox,
      AddressBox,
      ReceivingInfo
    },
    data() {
      return {
        isActive: false,
        curaddress: {
          options: '北京市',
          selectedOptions: '市辖区',
          region: '东城区'
        },
        all_price: {},
        selectAdd: '',
        express: ['顺丰','中通','圆通','邮政','百世','申通'],
        currentExpress: '',
        pay: ['银联', '微信', '支付宝', '花呗', 'PayPal'],
        currentPay: '',
        list: [],
        yunfei: 0,
        message: '',
        time: ''
      }
    },
    created() {
      let moment = require('moment');
      this.time = moment().add(3, 'days').format("YYYY-MM-DD");
      this.list = this.$route.params.list
      this.all_price = this.$route.params.all_price
      this.yunfei = this.$route.params.yunfei
    },
    methods: {
      address(data) {
        this.selectAdd = data
      },
      selectExrepss(i) {
        let li = $('.kuaidi').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        this.currentExpress = this.express[i]
      },
      selectPay(i) {
        let li = $('.m-pay').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        this.currentPay = i
        console.log(this.currentPay)
      },
      submit() {
        console.log(this.currentPay)
        if (!this.currentExpress) {
          this.message = '请选择快递类别！'
        } else if (!(this.currentPay+1)) {
          this.message = '请选择支付方式！'
        } else if (!this.selectAdd) {
          this.message = '请填写收货地址！'
        } else {
          $(".popup").show()
        }
      },
      qrcode() {
        let qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: '您此次消费总金额为' + (this.all_price.money * 1 + this.yunfei * 1) + '元，其中运费为' + this.yunfei + '元。',
          width: 180,
          height: 180,
          colorDark: '#000',
          colorLight: '#fff'
        })
      },
      close() {
        $(".popup").hide()
        this.message = ''
          let product = {
            id: [],
            num: []
          }
          for (let i in this.list) {
            product.id.push(this.list[i].product_id)
            product.num.push(this.list[i].quantity)
          }
          this.$http.post("/api/order/add", {
            user_id: this.$store.state.user_id,
            shipping_id: this.selectAdd.id,
            payment: this.all_price.money * 1 + this.yunfei * 1,
            payment_type: this.currentPay,
            postage: this.yunfei,
            status: '支付成功',
            express: this.currentExpress,
            product: product
          },{}).then((data) => {
            if (data.body.affectedRows >0) {
              alert("购买成功!")
              this.$router.push('/order')
            }
          },function(response){
            console.log(response)
          })
      }
    },
    mounted() {
      this.qrcode()
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .content {
    border-top: 2px solid var(--color-high-text);
    padding-top: 20px;
  }
  .content p {
    font-size: 16px;
    color: #656565;
  }
  .message {
    overflow: hidden;
    padding: 20px;
    border-bottom: 1px solid #dedede;
  }
  .message p {
    color: #333;
    font-size: 14px;
    font-weight: 700;
  }
  .message .address {
    margin: 28px 0 0 60px;
  }
  .address {
    position: relative;
  }
  .address b {
    font-weight: 400;
    margin-right: 60px;
  }
  .address p {
    display: inline-block;
    color: #656565;
  }
  .address .update {
    position: absolute;
    right: 0;
    top: 0;
  }
  .message-select {
    margin-top: 28px;
    overflow: hidden;
  }
  .message-select li {
    line-height: 36px;
    cursor: pointer;
    margin-right: 20px;
    transition: all .6s;
    text-align: center;
    float: left;
    padding: 0 30px;
  }
  .message-select .current,
  .message-select li:hover {
    background: var(--color-high-text);
    color: #fff;
  }
  .me-bt {
    overflow: hidden;
    padding-bottom: 20px;
    background-color: #F3F3F3;
    margin-top: 20px;
  }
  .me-bt span,
  .me-bd span {
    display: block;
    color: #656565;
    font-size: 12px;
    padding: 20px 0 10px 30px;
  }
  .me-bt i {
    font-style: normal;
    border: 1px solid #dedede;
    padding: 5px auto;
  }
  .me-bd {
    background-color: #f3f3f3;
  }
  .me-bs li {
    padding: 20px 0;
    overflow: hidden;
    border-bottom: 1px solid #dedede;
  }
  .me-bs li:last-child {
    border: 0;
  }
  .me-bs .imgbox {
    border: 1px solid #dedede;
    padding: 0 5px;
  }
  .me-bs .title {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .message dl {
    font-size: 12px;
    color: #333;
  }
  .message dt {
    text-align: right;
    line-height: 20px;
  }
  .message dd {
    line-height: 20px;
    text-align: right;
  }
  .me-money {
    background-color: #F3F3F3;
    padding: 20px 10px 20px 0;
    box-sizing: border-box;
  }
  .me-money p {
    text-align: right;
    font-size: 12px;
    color: #656565;
    line-height: 20px;
  }
  .me-money p span {
    color: var(--color-high-text);
    font-size: 16px;
    font-weight: 700;
  }
  .me-commit {
    display: block;
    float: right;
    width: 120px;
    font-size: 18px;
    color: #fff;
    background-color: var(--color-high-text);
    border: 2px solid var(--color-high-text);
    text-align: center;
    line-height: 40px;
    margin: 20px 0;
    cursor: pointer;
  }
  .me-commit:hover {
    background-color: #fff;
    color: var(--color-high-text);
  }
  @media (min-width: 768px) {
    .message .address {
      margin: 28px 0 0;
    }
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
    .message .address {
      margin: 10px 0 0;
    }
    .message .update {
      position: inherit;
    }
    .me-bt p {
      margin-left: 62px;
    }
    .message {
      padding: 20px 0;
    }
    .message dl {
      overflow: hidden;
      margin-top: 20px;
    }
  }
  .popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
  }
  .qrcode{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    background: #fff;
    padding: 10px 20px;
  }
  .qrcode span {
    display: block;
    margin-bottom: 10px;
  }
  .qrcode .glyphicon-remove {
    position: absolute;
    top: 12px;
    right: 20px;
    color: #333;
    cursor: pointer;
  }
</style>