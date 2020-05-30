<template>
  <div class="order">
    <form class="layui-inline" @submit.prevent="submit_order" method="post">
      <div class="layui-inline">
        <label class="layui-form-label">订单号</label>
        <div class="layui-input-block">
          <input name="id" type="text" class="layui-input" v-model="formOrder.id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">用户ID</label>
        <div class="layui-input-block">
          <input name="name" type="text" class="layui-input" v-model="formOrder.user_id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">商品ID</label>
        <div class="layui-input-block">
          <input name="name" type="text" class="layui-input" v-model="formOrder.product_id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline" style="margin:-6px 0 0 30px;">
        <button class="layui-btn"><i class="layui-icon layui-icon-search"></i></button>
      </div>
    </form>
    <div class="layui-table-box" style="margin-top:10px;">
      <table class="table table-striped table-auto">
        <thead>
          <tr>
            <th>订单号</th>
            <th>用户ID</th>
            <th>商品ID</th>
            <th>商品名</th>
            <th>购买数量</th>
            <th>总金额</th>
            <th>运费</th>
            <th>收货人</th>
            <th>收货地址</th>
            <th>联系电话</th>
            <th>创建时间/更改时间</th>
            <th>支付状态</th>
            <th style="text-align:center;">操作</th>
          </tr>
        </thead>
        <tbody v-show="!this.search.length">
          <tr :key="index" v-for="(item, index) in this.totalPage[cur-1]">
            <td>{{item.id}}</td>
            <td>{{item.user_id}}</td>
            <td>{{item.product_id}}</td>
            <td style="min-width:200px"><p data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</p></td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
            <td>{{item.postage}}</td>
            <td>{{item.receiver_name}}</td>
            <td>{{item.receiver_phone}}</td>
            <td>{{item.receiver_phone}}</td>
            <td style="min-width:200px">{{item.updatetime}}</td>
            <td>{{item.status}}</td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  更新状态 <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li :key="i" v-for="(statu, i) in status" @click="update(i, index)">
                    <a>{{statu}}</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-show="this.search.length">
          <tr :key="index" v-for="(item, index) in this.search">
            <td>{{item.id}}</td>
            <td>{{item.user_id}}</td>
            <td>{{item.product_id}}</td>
            <td style="min-width:200px"><p data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</p></td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
            <td>{{item.postage}}</td>
            <td>{{item.receiver_name}}</td>
            <td>{{item.receiver_phone}}</td>
            <td>{{item.receiver_phone}}</td>
            <td style="min-width:200px">{{item.updatetime}}</td>
            <td>{{item.status}}</td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  更新状态 <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li :key="i" v-for="(statu, i) in status" @click="update(i, index)">
                    <a>{{statu}}</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-show="!this.search.length">
      <ul class="pagination">
        <li v-if="cur>1" @click="cur=1">
          <span><span aria-hidden="true">&laquo;</span></span>
        </li>
        <li class="disabled" v-if="cur==1">
          <span><span aria-hidden="true">&laquo;</span></span>
        </li>
        <li :key="index" v-for="index in indexs" :class="{ 'active': cur == index}" @click="btnClick(index)">
          <span>{{index}}</span>
        </li>
        <li v-if="cur<pageNum" @click="cur=pageNum">
          <span><span aria-hidden="true">&raquo;</span></span>
        </li>
        <li v-if="cur==pageNum" class="disabled">
          <span><span aria-hidden="true">&raquo;</span></span>
        </li>
        <li>
          <span>共 {{pageNum}} 页</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        order: {},
        pageNum: 1,
        cur: 1,
        totalPage: [],
        pageSize: 5,
        status: ['接单', '发货', '退款'],
        formOrder: {},
        search: []
      }
    },
    computed: {
      indexs() {
        let left = 1; //默认起始值是1
        let right = this.pageNum; //终止值是全部
        let arr = [];
        if (this.pageNum >= 5) {
          if (this.cur > 3 && this.cur < this.pageNum - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.pageNum
              left = this.pageNum -4
            }
          }
        }
        while (left <= right) {
          arr.push(left)
          left ++
        }
        return arr
      }
    },
    created() {
      this.$http.get("/api/admin/order", {},{}).then((data) => {
        this.order = data.body
        this.pageNum = Math.ceil(this.order.length / this.pageSize) || 1
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.order.slice(this.pageSize * i, this.pageSize * (i + 1))
        }
      },function(response) {
        console.log(response)
      })
    },
    methods: {
      btnClick(data) {
        if (data != this.cur) {
          this.cur = data 
        }
      },
      update(i, index) {
        let item = this.totalPage[this.cur-1][index]
        if (item.status == '已退款') {
          alert('该订单已退款，操作失败...')
        } else if (item.status == '待收货') {
          alert('操作失败，该订单待收货中...')
        } else if (item.status == '待评价') {
          alert('操作失败，用户已确认收货...')
        } else if (item.status == '订单完成') {
          alert('该订单已经完成...')
        } else if (item.status == '待发货' && i == 0) {
          alert('该订单待发货中...')
        } else {
          let n = ''
          if (i == 0) {
            n = '待发货'
          } else if (i == 1) {
            n = '待收货'
          } else {
            n = '已退款'
          }
          this.$http.post("/api/admin/orderupdate", {
            status: n,
            order: item.id,
            product: item.product_id
          },{}).then((data) => {
            if (data.body.affectedRows > 0) {
              this.totalPage[this.cur-1][index].status = n
            }
          },function(response){
            console.log(response)
          })
        }
      },
      submit_order() {
        let _searchid = this.formOrder.id
        let _searchuser = this.formOrder.user_id
        let _searchproduct = this.formOrder.product_id
        let newListData = []
        if (_searchid && _searchproduct && _searchuser) {
          this.order.filter(item => {
            if (item.id.toString().indexOf(_searchid.toString()) !== -1 && item.product_id.toString().indexOf(_searchproduct.toString()) !== -1 && item.user_id.toString().indexOf(_searchuser.toString()) !== -1) {
              newListData.push(item)
            }
          }) 
        } else if (_searchid && _searchproduct) {
          this.order.filter(item => {
            if (item.id.toString().indexOf(_searchid.toString()) !== -1 && item.product_id.toString().indexOf(_searchproduct.toString()) !== -1) {
              newListData.push(item)
            }
          }) 
        } else if (_searchid && _searchuser) {
          this.order.filter(item => {
            if (item.id.toString().indexOf(_searchid.toString()) !== -1 && item.user_id.toString().indexOf(_searchuser.toString()) !== -1) {
              newListData.push(item)
            }
          }) 
        } else if (_searchproduct && _searchuser) {
          this.order.filter(item => {
            if (item.product_id.toString().indexOf(_searchproduct.toString()) !== -1 && item.user_id.toString().indexOf(_searchuser.toString()) !== -1) {
              newListData.push(item)
            }
          }) 
        } else {
           this.order.filter(item => {
            if (item.id == _searchid || item.product_id.toString().indexOf(_searchproduct.toString()) !== -1 || item.user_id.toString().indexOf(_searchuser.toString()) !== -1) {
              newListData.push(item)
            }
          }) 
        }
        if (!newListData.length) {
          alert('未检索到相关订单信息,请确认后再次检索')
          this.search = []
        } else {
          this.search = newListData
        }
      }
    }
  }
</script>

<style scoped>
  .order {
    margin: 20px 40px 0;
  }
  .table-auto {
    display: block;
    height: 400px;
    overflow: auto;
  }
  .table-auto th,td {
    min-width: 80px;
  }
  .table-auto td p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .btn {
    margin-right: 10px;
  }
  nav {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
  .pagination > li > span {
    color: #009688;
  }
  .pagination > .active > span {
    background-color: #009688;
    border-color: #009688;
    color: #fff;
  }
</style>