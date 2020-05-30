<template>
  <div class="product">
    <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{curcategory}} <span class="caret"></span>
      </button>
      <ul class="dropdown-menu layui-anim layui-anim-upbit">
        <li :key="(index)" v-for="(item, index) in category" @click="categoryClick(index)">
          <a href="javascript:;">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="addbtn">
      <button class="layui-btn" @click="addproduct">添加新商品</button>
    </div>
    <form class="layui-inline" @submit.prevent="submit_product" method="post">
      <div class="layui-inline">
        <label class="layui-form-label">ID</label>
        <div class="layui-input-block">
          <input name="id" type="text" class="layui-input" v-model="formProduct.id" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">商品名</label>
        <div class="layui-input-block">
          <input name="name" type="text" class="layui-input" v-model="formProduct.name" autocomplete="off" placeholder="请输入">
        </div>
      </div>
      <div class="layui-inline" style="margin:-6px 0 0 30px;">
        <button class="layui-btn"><i class="layui-icon layui-icon-search"></i></button>
      </div>
    </form>
    <div class="text" v-show="!this.search.length && this.totalPage[0]==''">该类别暂无商品</div>
    <div class="layui-table-box" style="margin-top:10px;" v-show="this.search.length || this.totalPage[0]!=''">
      <table class="table table-striped table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>名字</th>
            <th>类别名</th>
            <th>演唱者</th>
            <th>价格</th>
            <th>定价</th>
            <th>主图</th>
            <th>详细图</th>
            <th>评论数</th>
            <th>好评数</th>
            <th>中评数</th>
            <th>差评数</th>
            <th>好评率</th>
            <th>内容简介</th>
            <th>目录</th>
            <th>详情</th>
            <th>评论便签</th>
            <th>艺人介绍</th>
            <th>编辑推荐</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-show="!this.search.length">
          <tr :key="index" v-for="(item, index) in this.totalPage[cur-1]">
            <td>{{item.id}}</td>
            <td style="min-width:200px"><p data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</p></td>
            <td>{{item.category}}</td>
            <td style="min-width:200px"><p data-toggle="tooltip" data-placement="bottom" :title="item.author">{{item.author}}</p></td>
            <td>{{item.price}}</td>
            <td>{{item.maprice}}</td>
            <td><img v-lazy="item.main_image" alt="main_image" width="50px"></td>
            <td>{{item.sub_image}}</td>
            <td>{{item.commentCount}}</td>
            <td>{{item.goodCount}}</td>
            <td>{{item.generalCount}}</td>
            <td>{{item.poorCount}}</td>
            <td>{{item.goodRate}}</td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.validity">{{item.validity}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.catalog">{{item.catalog}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.detail">{{item.detail}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.tags">{{item.tags}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.artist_intro">{{item.artist_intro}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.editor_recom">{{item.editor_recom}}</p></td>
            <td style="min-width:200px">{{item.time}}</td>
            <td style="min-width:150px">
              <button type="button" class="btn btn-info" @click="update(item)">修改</button>
              <button type="button" class="btn btn-danger" @click="del(item.id)">下架</button>
            </td>
          </tr>
        </tbody>
        <tbody v-show="this.search.length">
          <tr :key="index" v-for="(item, index) in this.search">
            <td>{{item.id}}</td>
            <td style="min-width:200px"><p data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</p></td>
            <td>{{item.category}}</td>
            <td>{{item.author}}</td>
            <td>{{item.price}}</td>
            <td>{{item.maprice}}</td>
            <td><img v-lazy="item.main_image" alt="main_image" width="50px"></td>
            <td>{{item.sub_image}}</td>
            <td>{{item.commentCount}}</td>
            <td>{{item.goodCount}}</td>
            <td>{{item.generalCount}}</td>
            <td>{{item.poorCount}}</td>
            <td>{{item.goodRate}}</td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.validity">{{item.validity}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.catalog">{{item.catalog}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.detail">{{item.detail}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.tags">{{item.tags}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.artist_intro">{{item.artist_intro}}</p></td>
            <td style="min-width:400px"><p data-toggle="tooltip" data-placement="bottom" :title="item.editor_recom">{{item.editor_recom}}</p></td>
            <td style="min-width:200px">{{item.time}}</td>
            <td style="min-width:150px">
              <button type="button" class="btn btn-info" @click="update(item)">修改</button>
              <button type="button" class="btn btn-danger" @click="del(item.id)">下架</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-show="!this.search.length && this.totalPage[0]!=''">
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
    <div class="popup">
      <div class="pro-update">
        <h3>修改商品信息 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
        <form action="post" @submit.prevent="submit_update">
          <li>
            <label>标题：</label>
            <input type="text" v-model="updatepro.title" required  lay-verify="required" placeholder="标题">
          </li>
          <li>
            <label>艺人：</label>
            <input type="text" v-model="updatepro.author" required  lay-verify="required" placeholder="艺人">
          </li>
          <li>
            <label>价格：</label>
            <input type="number" v-model="updatepro.price" required  lay-verify="required" placeholder="价格">
          </li>
          <li>
            <label>定价：</label>
            <input type="number" v-model="updatepro.maprice" required  lay-verify="required" placeholder="定价">
          </li>
          <li>
            <label>内容简介：</label>
            <textarea type="text" v-model="updatepro.validity" placeholder="内容简介"></textarea>
          </li>
          <li>
            <label>目录：</label>
            <textarea type="text" v-model="updatepro.catalog" placeholder="目录"></textarea>
          </li>
          <li>
            <label>详情：</label>
            <textarea type="text" v-model="updatepro.detail" required  lay-verify="required" placeholder="详情"></textarea>
          </li>
          <li>
            <label>评论标签：<br/>逗号隔开</label>
            <textarea type="text" v-model="updatepro.tags" placeholder="评论标签,逗号隔开"></textarea>
          </li>
          <li>
            <label>艺人介绍：</label>
            <textarea type="text" v-model="updatepro.artist_intro" placeholder="艺人介绍"></textarea>
          </li>
          <li>
            <label>编辑推荐：</label>
            <textarea type="text" v-model="updatepro.editor_recom" placeholder="编辑推荐"></textarea>
          </li>
          <li>
            <label>主图：</label>
            <img v-lazy="updatepro.main_image">
            <input type="file" accept="image/*" ref="updateInput" @change="changeImage">
          </li>
          <li>
            <button type="submit">确认修改</button>
          </li>
        </form>
        <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
      </div>
      <div class="pro-add">
        <h3>添加新商品 <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></h3>
        <form action="post" @submit.prevent="submit_addpro">
          <li>
            <label>类别：</label>
            <p class="leibie"><span :key="(index)" v-for="(item, index) in category" @click="spanclick(index)">{{item.name}}</span></p>
          </li>
          <li>
            <label>标题：</label>
            <input type="text" v-model="addpro.title" required  lay-verify="required" placeholder="标题">
          </li>
          <li>
            <label>艺人：</label>
            <input type="text" v-model="addpro.author" required  lay-verify="required" placeholder="艺人">
          </li>
          <li>
            <label>价格：</label>
            <input type="text" v-model="addpro.price" required  lay-verify="required" placeholder="价格" oninput="value=value.replace(/[^\d.]/g,'')">
          </li>
          <li>
            <label>定价：</label>
            <input type="text" v-model="addpro.maprice" required  lay-verify="required" placeholder="定价" oninput="value=value.replace(/[^\d.]/g,'')">
          </li>
          <li>
            <label>详情：</label>
            <textarea type="text" v-model="addpro.detail" required  lay-verify="required" placeholder="详情"></textarea>
          </li>
          <li>
            <label>内容简介：</label>
            <textarea type="text" v-model="addpro.validity" placeholder="内容简介"></textarea>
          </li>
          <li>
            <label>目录：</label>
            <textarea type="text" v-model="addpro.catalog" placeholder="目录"></textarea>
          </li>
          <li>
            <label>评论标签：<br/>逗号隔开</label>
            <textarea type="text" v-model="addpro.tags" placeholder="评论标签，逗号隔开"></textarea>
          </li>
          <li>
            <label>艺人介绍：</label>
            <textarea type="text" v-model="addpro.artist_intro" placeholder="艺人介绍"></textarea>
          </li>
          <li>
            <label>编辑推荐：</label>
            <textarea type="text" v-model="addpro.editor_recom" placeholder="编辑推荐"></textarea>
          </li>
          <li>
            <label>主图：</label>
            <input type="file" accept="image/*" ref="addInput" @change="changeImage">
          </li>
          <li>
            <button type="submit">确认添加</button>
          </li>
        </form>
        <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    inject: ['reload'],
    data() {
      return {
        category: {},
        curcategory: '',
        pageSize: 5,
        totalPage: [],
        cur: 1,
        pageNum: 1,
        formProduct: {},
        search: [],
        updatepro: {},
        addpro: {}
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
      this.showpro()
    },
    methods: {
      showpro() {
        this.$http.get("/api/admin/categorypro", {},{}).then((data) => {
          this.category = data.body
          this.curcategory = this.category[0].name
          this.category[0].totalPage = []
          this.category[0].cur = 1
          this.$http.post("/api/admin/product", {
            category: this.category[0].name
          },{}).then((data) => {
            for (let i in data.body) {
              if (data.body[i].main_image[0] == 'p') {
                data.body[i].main_image = require('@/assets/images/product/'+data.body[i].main_image)
              }
            }
            this.category[0].pageNum = Math.ceil(data.body.length / this.pageSize) || 1
            for (let i = 0; i < this.category[0].pageNum; i++) {
              this.category[0].totalPage[i] = data.body.slice(this.pageSize * i, this.pageSize * (i + 1))
            }
            this.totalPage = this.category[0].totalPage
            this.pageNum = this.category[0].pageNum
          },function(response) {
            console.log(response)
          })
        },function(response) {
          console.log(response)
        })
      },
      categoryClick(i) {
        this.search = []
        this.formProduct = {}
        let li = $('.dropdown-menu').children('li').eq(i)
        li.addClass('layui-this').siblings().removeClass('layui-this')
        this.curcategory = this.category[i].name
        if (!this.category[i].totalPage) {
          this.category[i].totalPage = []
          this.category[i].cur = 1
          this.$http.post("/api/admin/product", {
            category: this.category[i].name
          },{}).then((data) => {
            this.category[i].pageNum = Math.ceil(data.body.length / this.pageSize) || 1
            for (let n = 0; n < this.category[i].pageNum; n++) {
              this.category[i].totalPage[n] = data.body.slice(this.pageSize * n, this.pageSize * (n + 1))
            }
            this.cur = 1
            this.totalPage = this.category[i].totalPage
            this.pageNum = this.category[i].pageNum
          },function(response) {
            console.log(response)
          })
        } else {
          this.cur = 1
          this.totalPage = this.category[i].totalPage
          this.pageNum = this.category[i].pageNum
        }
      },
      btnClick(data) {
        if (data != this.cur) {
          this.cur = data 
        }
      },
      submit_product() {
        if (!this.formProduct.id && !this.formProduct.name) {
          alert('请先输入要检索的商品ID或商品标题...')
        } else {
          this.$http.post("/api/admin/productsearch", {
            product: this.formProduct
          },{}).then((data) => {
            this.search = data.body
            if (!this.search.length) {
              alert('未检索到...')
            }
          },function(response){
            console.log(response)
          })
        }
      },
      update(item) {
        $('.product .popup').css('right', 0)
        $('.pro-update').css('opacity', 1)
        $('.pro-update').css('z-index',2)
        this.updatepro = item
      },
      close() {
        $('.product .popup').css('right', '-550px')
        $('.pro-update').css('opacity', 0)
        $('.pro-update').css('z-index',1)
        $('.pro-add').css('opacity', 0)
        $('.pro-add').css('z-index',1)
      },
      changeImage(e) {
        // 上传图片事件
        let updatefiles = this.$refs.updateInput.files;
        let addfiles = this.$refs.addInput.files;
        let that = this;
        function readAndPreview(file) {
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader()
            reader.onload = function(e) {
              that.updatepro.img = this.result
              that.addpro.img = this.result
            };
            reader.readAsDataURL(file)
          }
        }
        if (updatefiles.length) {
          [].forEach.call(updatefiles, readAndPreview)
        }
        if (addfiles.length) {
          [].forEach.call(addfiles, readAndPreview)
        }
        if (updatefiles.length === 0 && addfiles.length === 0) {
          return;
        }
      },
      submit_update() {
        if (this.updatepro.tags != '') {
          this.updatepro.tags = this.updatepro.tags + ','
        }
        if (!this.updatepro.img) {
          this.updatepro.img = this.updatepro.main_image
        }

        this.$http.post("/api/admin/productupdate", {
          updatepro: this.updatepro
        },{}).then((data) => {
          if (data.body.affectedRows >0) {
            alert("修改成功!")
            $('.product .popup').css('right', '-550px')
            $('.pro-update').css('opacity', 0)
            this.showpro()
          }
        },function(response){
          console.log(response)
        })
      },
      addproduct() {
        $('.product .popup').css('right', 0)
        $('.pro-add').css('opacity', 1)
        $('.pro-add').css('z-index',2)
      },
      spanclick(i) {
        $('.leibie span').removeClass('active')
        $('.leibie span').eq(i).addClass('active')
        this.addpro.category = this.category[i].name
        this.addpro.categoryid = this.category[i].id
      },
      submit_addpro() {
        if (!this.addpro.img) {
          alert('请上传商品主图...')
        } else {
          if (this.addpro.tags != '') {
            this.addpro.tags = this.addpro.tags + ','
          }
          this.$http.post("/api/admin/productadd", {
            addpro: this.addpro
          },{}).then((data) => {
            if (data.body.affectedRows >0) {
              alert("添加成功!")
              $('.popup').css('right', '-550px')
              $('.pro-add').css('opacity', 0)
              this.showpro()
            }
          },function(response){
            console.log(response)
          })
        }
      },
      del(id) {
        this.$http.post("/api/admin/productdel", {
          id: id
        },{}).then((data) => {},function(response){
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .product {
    margin: 20px 40px 0;
  }
  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
    background-color: #f2f2f2;
    transition: .5s all;
  }
  .dropdown-menu > .layui-this > a,
  .dropdown-menu > .layui-this > a:hover {
    background-color: #5FB878;
    color: #fff;
  }
  .addbtn {
    float: right;
  }
  .layui-input-block {
    margin-left: 80px;
  }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #636b6f;
    font-weight: 100;
    min-width: 552px;
    text-align: center;
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
  .popup {
    position: fixed;
    top: 0;
    right: -550px;
    width: 550px;
    height: 100vh;
    background-color: #2f2f2f;
    z-index: 2;
    color: #959595;
    transition: all .8s;
    overflow-y: auto;
  }
  .popup::-webkit-scrollbar {
    width: 6px;
  }
  .popup::-webkit-scrollbar-thumb {
    background-color: #009688;
    border-radius: 2em;
  }
  .popup h3 {
    color: #fff;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .popup li {
    margin: 20px 0;
    overflow: hidden;
  }
  .popup li:hover {
    color: #fff;
  }
  .popup li:hover input {
    display: inline-block;
  }
  .popup label {
    width: 70px;
    float: left;
  }
  .popup p {
    float: left;
    width: 383px;
    overflow: hidden;
  }
  .popup p span {
    display: block;
    float: left;
    padding: 0 10px;
    line-height: 20px;
    border: 1px solid #959595;
    margin: 5px 10px;
    cursor: pointer;
    transition: all .3s;
  }
  .popup p span:hover,
  .popup p .active {
    border-color: #5FB878;
    background: #5FB878;
    color: #fff;
  }
  .popup input {
    margin-left: 10px;
    border: 0;
    border-bottom: 1px solid #959595;
    background-color: #2f2f2f;
    outline-width: 0;
    padding-left: 4px;
    width: 383px;
    float: left;
  }
  .popup input[type="file"] {
    display: inline-block;
    border: 0;
    padding-left: 0;
    width: 300px;
    margin-left: 30px;
  }
  .popup textarea {
    margin-left: 10px;
    resize: none;
    width: 383px;
    float: left;
    background: none;
    height: 100px;
  }
  .popup textarea::-webkit-scrollbar {
    width: 5px;
  }
  .popup textarea::-webkit-scrollbar-thumb {
    background-color: #009688;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
  .popup button {
    padding: 10px 0;
    width: 100%;
    background-color: #2f2f2f;
    border: 2px solid #959595;
    color: #959595;
    margin-top: 30px;
  }
  .popup button:hover {
    color: #fff;
    border-color: #fff;
  }
  .pro-update img {
    display: block;
    float: left;
    width: 60px;
    height: 60px;
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
  .pro-update,
  .pro-add {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all .8s;
    padding: 100px 35px 20px;
  }
</style>