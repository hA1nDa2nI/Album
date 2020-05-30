<template>
  <div class="search_results">
    <nav-bar></nav-bar>
    <div class="container">
      <search-box/>
      <div v-if="data.length!=0" style="overflow: hidden">
        <div class="s-title">
          <h3>共筛选到<b>{{data.length}}</b>商品</h3>
        </div>
        <box-item :key="index" v-for="(item, index) in page.totalPage[page.cur-1]" 
                :id="item.id">
          <img v-lazy="item.main_image" :alt="item.title" slot="boxImg"/>
          <span slot="title" class="title">{{item.title}}</span>
          <span slot="author" class="author">{{item.author}}</span>
          <span slot="price" class="price">￥{{item.price}}</span>
        </box-item>
      </div>
      <nav v-if="data.length" class="page">
        <ul class="pagination">
          <li v-if="page.cur>1" @click="page.cur=1,pageClick()">
            <span><span aria-hidden="true">&laquo;</span></span>
          </li>
          <li class="disabled" v-if="page.cur==1">
            <span><span aria-hidden="true">&laquo;</span></span>
          </li>
          <li :key="index" v-for="index in indexs" :class="{ 'active': page.cur == index}" @click="btnClick(index),pageClick()">
            <span>{{index}}</span>
          </li>
          <li v-if="page.cur<page.pageNum" @click="page.cur=page.pageNum,pageClick()">
            <span><span aria-hidden="true">&raquo;</span></span>
          </li>
          <li v-if="page.cur==page.pageNum" class="disabled">
            <span><span aria-hidden="true">&raquo;</span></span>
          </li>
          <li>
            <span>共 {{page.pageNum}} 页</span>
          </li>
        </ul>
      </nav>
      <div class="none" v-if="!data.length">
        <img src="~assets/images/wu.png" alt="none" style="width: 30%">
        <p>/(ㄒoㄒ)/~~暂无该商品/(ㄒoㄒ)/~~</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import BoxItem from 'components/common/categorys/BoxItem'

  export default {
    name: 'SearchResults',
    components: {
      NavBar,
      SearchBox,
      BoxItem
    },
    data() {
      return {
        data: [],
        page: {
          pageNum: 1,
          cur: 1,
          totalPage: [],
          pageSize: 12
        }
      }
    },
    computed: {
      indexs() {
        let left = 1; //默认起始值是1
        let right = this.page.pageNum; //终止值是全部
        let arr = [];
        if (this.page.pageNum >= 5) {
          if (this.page.cur > 3 && this.page.cur < this.page.pageNum - 2) {
            left = this.page.cur - 2
            right = this.page.cur + 2
          } else {
            if (this.page.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.page.pageNum
              left = this.page.pageNum -4
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
    methods: {
      btnClick(data) {        
        if (data != this.page.cur) { //判断是不是当前页，不是就计算
          this.page.cur = data 
        }
      },
      pageClick() {
        $('html,body').animate({scrollTop: 0}, 500)
      },
    },
    created() {
      var url="/api/products/search"
      this.$http.post(url,{
        search: '%' + this.$route.query.search + '%'
      },{}).then((data) => {
        this.data = data.body
        this.page.pageNum = Math.ceil(this.data.length / this.page.pageSize) || 1
        for (let i = 0; i < this.page.pageNum; i++) {
          this.page.totalPage[i] = this.data.slice(this.page.pageSize * i, this.page.pageSize * (i + 1))
        }
      },(response) => {
        console.log(response)
      })
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 90px;
  }
  .s-title {
    background-color: #f4f6f9;
    border: 1px solid #dedede;
    padding: 0 5px;
    margin: 10px 0 40px;
  }
  .s-title h3 {
    color: #333;
    font-size: 12px;
    line-height: 40px;
    margin: 0;
  }
  .s-title b {
    font-style: normal;
    color: var(--color-high-text);
    margin: 0 5px;
    font-weight: 700;
  }
  .page {
    text-align: center;
    margin-top: 30px;
  }
  .pagination .active span {
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  }
  .none {
    margin: 0 auto;
    text-align: center;
  }
  .none p {
    color: #959595;
  }
</style>