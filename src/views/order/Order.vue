<template>
  <div id="order">
    <nav-bar><a href="#" slot="order" class="active">订单中心</a></nav-bar>
    <div class="container">
      <search-box/>
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#item1" aria-controls="item1" role="tab" data-toggle="tab">全部订单 <span class="label label-default">{{this.order_data.length}}</span></a></li>
        <li role="presentation"><a href="#item2" aria-controls="item2" role="tab" data-toggle="tab">待发货 <span class="label label-primary">{{this.order_dfh.length}}</span></a></li>
        <li role="presentation"><a href="#item3" aria-controls="item2" role="tab" data-toggle="tab">待收货 <span class="label label-warning">{{this.order_dsh.length}}</span></a></li>
        <li role="presentation"><a href="#item4" aria-controls="item3" role="tab" data-toggle="tab">待评价 <span class="label label-success">{{this.order_dpj.length}}</span></a></li>
        <li role="presentation"><a href="#item5" aria-controls="item4" role="tab" data-toggle="tab">已退款 <span class="label label-danger">{{this.order_ytk.length}}</span></a></li>
      </ul>
      <div class="order-th">
        <li class="col-md-6 col-sm-5 col-xs-3">订单详情</li>
        <li class="col-md-2 col-sm-2 col-xs-3">收货人</li>
        <li class="col-md-2 col-sm-2 col-xs-2">金额</li>
        <li class="col-md-1 col-sm-1 col-xs-2">状态</li>
        <li class="col-md-1 col-sm-2 col-xs-2">操作</li>
      </div>
      <div class="alert alert-warning" role="alert" v-if="!this.$store.state.profileStatus">当前未登录，请先登录!</div>
      <div class="alert alert-success" role="alert" v-if="this.$store.state.profileStatus && !this.order_data.length">最近没有下过订单哦~</div>
      <div class="tab-content" v-if="this.$store.state.profileStatus">
        <ul role="tabpanel" class="tab-pane fade active in" id="item1">
          <li :key="index" v-for="(item, index) in this.order_data" class="item">
            <div class="item_top row">
              <div class="col-md-3 col-sm-3 col-xs-7">{{item.updatetime}}</div>
              <div class="col-md-3 col-sm-3 col-xs-5">订单号：<span>{{item.id}}</span></div>
              <div class="col-md-3 col-sm-3">联系电话：{{item.receiver_phone}}</div>
            </div>
            <div class="item_bottom row">
              <div class="col-md-1 col-sm-1 col-xs-4"><img v-lazy="item.main_image" alt="" width="100%"></div>
              <div class="col-md-4 col-sm-3 col-xs-7 title">{{item.title}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1">×{{item.quantity}}</div>
              <div class="col-md-2 col-sm-2 col-xs-8"><span>{{item.receiver_name}}</span></div>
              <div class="col-md-2 col-sm-2 col-xs-9 aa">
                <div>总额￥{{(item.price * item.quantity).toFixed(2)}}</div>
                <div>运费￥{{(item.postage).toFixed(2)}}</div>
                <span class="money">应付<br/>￥{{((item.price * item.quantity).toFixed(2) * 1 + item.postage * 1).toFixed(2)}}</span>
                <div>在线支付</div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-3">
                <span>{{item.status}}</span>
              </div>
              <div class="col-md-1 col-sm-2 col-xs-3" v-show="item.message">
                <button type="button" class="btn btn-info" @click="delOrder(index)">{{item.message}}</button>
              </div>
            </div>
          </li>
        </ul>
        <ul role="tabpanel" class="tab-pane fade" id="item2">
          <li :key="index" v-for="(item, index) in this.order_dfh" class="item item4">
            <div class="item_top row">
              <div class="col-md-3 col-sm-3 col-xs-7">{{item.updatetime}}</div>
              <div class="col-md-3 col-sm-3 col-xs-5">订单号：<span>{{item.id}}</span></div>
              <div class="col-md-3 col-sm-3">联系电话：{{item.receiver_phone}}</div>
            </div>
            <div class="item_bottom row">
              <div class="col-md-1 col-sm-1 col-xs-4"><img v-lazy="item.main_image" alt="" width="100%"></div>
              <div class="col-md-4 col-sm-3 col-xs-7 title">{{item.title}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1">×{{item.quantity}}</div>
              <div class="col-md-2 col-sm-2 col-xs-8"><span>{{item.receiver_name}}</span></div>
              <div class="col-md-2 col-sm-2 col-xs-9 aa">
                <div>总额￥{{(item.price * item.quantity).toFixed(2)}}</div>
                <div>运费￥{{(item.postage).toFixed(2)}}</div>
                <span class="money">应付<br/>￥{{((item.price * item.quantity).toFixed(2) * 1 + item.postage * 1).toFixed(2)}}</span>
                <div>在线支付</div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-3">
                <span>{{item.status}}</span>
              </div>
              <div class="col-md-1 col-sm-2 col-xs-3">
                <button type="button" class="btn btn-primary" @click="remindOrder">提醒发货</button>
              </div>
            </div>
          </li>
        </ul>
        <ul role="tabpanel" class="tab-pane fade" id="item3">
          <li :key="index" v-for="(item, index) in this.order_dsh" class="item item4">
            <div class="item_top row">
              <div class="col-md-3 col-sm-3 col-xs-7">{{item.updatetime}}</div>
              <div class="col-md-3 col-sm-3 col-xs-5">订单号：<span>{{item.id}}</span></div>
              <div class="col-md-3 col-sm-3">联系电话：{{item.receiver_phone}}</div>
            </div>
            <div class="item_bottom row">
              <div class="col-md-1 col-sm-1 col-xs-4"><img v-lazy="item.main_image" alt="" width="100%"></div>
              <div class="col-md-4 col-sm-3 col-xs-7 title">{{item.title}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1">×{{item.quantity}}</div>
              <div class="col-md-2 col-sm-2 col-xs-8"><span>{{item.receiver_name}}</span></div>
              <div class="col-md-2 col-sm-2 col-xs-9 aa">
                <div>总额￥{{(item.price * item.quantity).toFixed(2)}}</div>
                <div>运费￥{{(item.postage).toFixed(2)}}</div>
                <span class="money">应付<br/>￥{{((item.price * item.quantity).toFixed(2) * 1 + item.postage * 1).toFixed(2)}}</span>
                <div>在线支付</div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-3">
                <span>{{item.status}}</span>
              </div>
              <div class="col-md-1 col-sm-2 col-xs-3">
                <button type="button" class="btn btn-warning" @click="confirmOrder(index, order_dsh)">确认收货</button>
              </div>
            </div>
          </li>
        </ul>
        <ul role="tabpanel" class="tab-pane fade" id="item4">
          <li :key="index" v-for="(item, index) in this.order_dpj" class="item item4">
            <div class="item_top row">
              <div class="col-md-3 col-sm-3 col-xs-7">{{item.updatetime}}</div>
              <div class="col-md-3 col-sm-3 col-xs-5">订单号：<span>{{item.id}}</span></div>
              <div class="col-md-3 col-sm-3">联系电话：{{item.receiver_phone}}</div>
            </div>
            <div class="item_bottom row">
              <div class="col-md-1 col-sm-1 col-xs-4"><img v-lazy="item.main_image" alt="" width="100%"></div>
              <div class="col-md-4 col-sm-3 col-xs-7 title">{{item.title}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1">×{{item.quantity}}</div>
              <div class="col-md-2 col-sm-2 col-xs-8"><span>{{item.receiver_name}}</span></div>
              <div class="col-md-2 col-sm-2 col-xs-9 aa">
                <div>总额￥{{(item.price * item.quantity).toFixed(2)}}</div>
                <div>运费￥{{(item.postage).toFixed(2)}}</div>
                <span class="money">应付<br/>￥{{((item.price * item.quantity).toFixed(2) * 1 + item.postage * 1).toFixed(2)}}</span>
                <div>在线支付</div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-3">
                <span>{{item.status}}</span>
              </div>
              <div class="col-md-1 col-sm-2 col-xs-3">
                <button type="button" class="btn btn-success" @click="commentOrder(index, order_dpj)">去评价</button>
              </div>
            </div>
          </li>
        </ul>
        <ul role="tabpanel" class="tab-pane fade" id="item5">
          <li :key="index" v-for="(item, index) in this.order_ytk" class="item item4">
            <div class="item_top row">
              <div class="col-md-3 col-sm-3 col-xs-7">{{item.updatetime}}</div>
              <div class="col-md-3 col-sm-3 col-xs-5">订单号：<span>{{item.id}}</span></div>
              <div class="col-md-3 col-sm-3">联系电话：{{item.receiver_phone}}</div>
            </div>
            <div class="item_bottom row">
              <div class="col-md-1 col-sm-1 col-xs-4"><img v-lazy="item.main_image" alt="" width="100%"></div>
              <div class="col-md-4 col-sm-3 col-xs-7 title">{{item.title}}</div>
              <div class="col-md-1 col-sm-1 col-xs-1">×{{item.quantity}}</div>
              <div class="col-md-2 col-sm-2 col-xs-8"><span>{{item.receiver_name}}</span></div>
              <div class="col-md-2 col-sm-2 col-xs-9 aa">
                <div>总额￥{{(item.price * item.quantity).toFixed(2)}}</div>
                <div>运费￥{{(item.postage).toFixed(2)}}</div>
                <span class="money">应付<br/>￥{{((item.price * item.quantity).toFixed(2) * 1 + item.postage * 1).toFixed(2)}}</span>
                <div>在线支付</div>
              </div>
              <div class="col-md-1 col-sm-1 col-xs-3">
                <span>{{item.status}}</span>
              </div>
              <div class="col-md-1 col-sm-2 col-xs-3">
                <button type="button" class="btn btn-danger">已退款</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="comment">
      <h3>增加评价 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
      <form action="post" @submit.prevent="submit_comment">
        <li>
          <label>内容：</label>
          <textarea v-model="comment" required  lay-verify="required"></textarea>
        </li>
        <li>
          <label>评分：</label>
          <span class="layui-icon layui-icon-rate star" aria-hidden="true" :key="index" v-for="index in 5" @click="star(index)"></span>
        </li>
        <li>
          <button type="submit">提交</button>
        </li>
      </form>
      <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'

  export default {
    name: 'Order',
    inject: ['reload'],
    components: {
      NavBar,
      SearchBox
    },
    data() {
      return {
        order_data: {},
        order_dfh: [], // 待发货
        order_dsh: [], // 待收货
        order_dpj: [], // 待评价
        order_ytk: [], // 已退款
        comment: '',
        commentstar: 0
      }
    },
    created() {
      if (this.$store.state.profileStatus) {
        this.$http.post("/api/order/show", {
          id: this.$store.state.user_id
        },{}).then((data) => {
          this.order_data = data.body
          for (let i in this.order_data) {
            if (this.order_data[i].status == '支付成功') {
              this.order_data[i].message = '退款'
            } else if (this.order_data[i].status == '待发货') {
              this.order_data[i].message = '提醒发货'
              if (this.order_dfh == []) {
                this.order_dfh = this.order_data[i]
              } else {
                this.order_dfh.push(this.order_data[i])
              }
            } else if (this.order_data[i].status == '待收货') {
              this.order_data[i].message = '确认收货'
              if (this.order_dsh == []) {
                this.order_dsh = this.order_data[i]
              } else {
                this.order_dsh.push(this.order_data[i])
              }
            } else if (this.order_data[i].status == '待评价') {
              this.order_data[i].message = '去评价'
              if (this.order_dpj == []) {
                this.order_dpj = this.order_data[i]
              } else {
                this.order_dpj.push(this.order_data[i])
              }
            } else if (this.order_data[i].status == '已退款') {
              if (this.order_ytk == []) {
                this.order_ytk = this.order_data[i]
              } else {
                this.order_ytk.push(this.order_data[i])
              }
            }
          }
        },function(response){
          console.log(response);
        })
      }
    },
    methods: {
      delOrder(i) {
        this.$http.post("/api/order/del", {
          id: this.order_data[i].id
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
            alert("退款成功!")
            this.reload()
          }
        },function(response){
          console.log(response)
        })
      },
      remindOrder() {
        alert("已提醒，请耐心等待...")
      },
      confirmOrder(i, data) {
        this.$http.post("/api/admin/orderupdate", {
          order: data[i].id,
          product: data[i].product_id,
          status: '待评价'
        },{}).then((data) => {
          if (data.body.affectedRows > 0) {
            this.reload()
          }
        },function(response){
          console.log(response)
        })
      },
      commentOrder(i, data) {
        $('.comment').css('right', '0')
        $('.comment').attr('id', data[i].product_id)
        $('.comment').attr('no', data[i].id)
      },
      close() {
        $('.comment').css('right', '-350px')
      },
      submit_comment() {
        if (!this.commentstar) {
          alert("请点击星星⭐评分！")
        } else {
          let productid = $(".comment").attr('id')
          this.$http.post("/api/comment/add", {
            userid: this.$store.state.user_id,
            productid: productid,
            content: this.comment,
            star: this.commentstar
          },{}).then((data) => {
            if (data.body.affectedRows >0) {
              alert("评价成功!")
              this.$http.post("/api/admin/orderupdate", {
                order: $(".comment").attr('no'),
                product: productid,
                status: '订单完成'
              },{}).then((data) => {
                if (data.body.affectedRows > 0) {
                  this.reload()
                }
              },function(response){
                console.log(response)
              })
            }
          },function(response){
            console.log(response)
          })
        }
      },
      star(i) {
        this.commentstar = i
        $('.star').addClass('layui-icon-rate')
        $('.star').removeClass('layui-icon-rate-solid')
        for (let n = 0; n < i; n++) {
          $('.star').eq(n).addClass('layui-icon-rate-solid').removeClass('layui-icon-rate')
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .order-th {
    overflow: hidden;
  	border-left: 1px solid #ddd;
  	border-right: 1px solid #ddd;
    padding-right: 20px;
  }
  .order-th li {
    line-height: 40px;
    text-align: center;
  }
  .order-th li:first-child {
    text-align: left;
  }
  .item {
    margin: 10px 0;
    overflow: hidden;
    border: 1px solid #dedede;
    color: #aaa;
    font-size: 12px;
  }
  .item:first-child {
    margin: 0;
  }
  .item span {
    color: #333;
  }
  .item .item_top {
    background-color: rgb(245, 245, 245);
    line-height: 30px;
    padding: 0 10px;
  }
  .item .item_bottom {
    padding: 10px 30px 10px 10px;
    text-align: center;
  }
  .item .item_bottom > div:last-child {
    text-align: center;
  } 
  .item_bottom .title {
    text-align: left;
    color: #333;
  }
  .item_bottom .money {
    margin: 5px 0;
    display: block;
  }
  .alert {
    margin-top: 30px;
  }
  .btn-warning,
  .btn-primary,
  .btn-info {
    padding: 6px;
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
    .tab li {
      padding: 0 8px;
    }
    .item_top div {
      padding: 0 10px;
    }
    .item .item_bottom {
      text-align: right;
    }
    .item .item_bottom .aa {
      text-align: left;
      margin-top: 8px;
    }
    .nav-tabs li a {
      padding: 10px 5px;
    }
    .nav-tabs li a span {
      display: none;
    }
    .order-th li {
      padding-right: 0;
    }
  }
  .comment {
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100vh;
    background-color: #2f2f2f;
    z-index: 2;
    padding: 120px 35px 20px;
    color: #959595;
    transition: all .8s;
  }
  .comment h3 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .comment li {
    margin: 20px 0;
  }
  .comment textarea {
    width: 238px;
    resize: none;
    min-height: 100px;
  }
  .comment button {
    padding: 10px 0;
    width: 100%;
    background-color: #2f2f2f;
    border: 2px solid #959595;
    color: #959595;
    margin-top: 30px;
  }
  .comment button:hover {
    color: #fff;
    border-color: #fff;
  }
  .glyphicon-remove {
    position: absolute;
    right: 30px;
    top: 80px;
    color: #959595;
    font-size: 20px;
    cursor: pointer;
  }
  .glyphicon-remove:hover {
    color: #fff;
  }
  .star {
    margin-right: 5px;
    font-size: 20px;
    cursor: pointer;
  }
  .layui-icon-rate-solid {
    color: var(--color-high-text);
  }
</style>