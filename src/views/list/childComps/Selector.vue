<template>
  <div id="selector">
    <div>
      <nav-main><span slot="name">{{category.name}}</span></nav-main>
      <div class="s-title">
        <h3><b>{{category.name}}</b><em>商品筛选</em></h3>
      </div>
      <div style="overflow: hidden;">
        <box-item :key="index" v-for="(item, index) in this.page.totalPage[this.page.cur-1]" 
                  :id="item.id">
          <img v-lazy="item.bigImg" :alt="item.title" slot="boxImg"/>
          <span slot="title" class="title">{{item.title}}</span>
          <span slot="price" class="price">￥{{item.price}}</span>
        </box-item>
      </div>
    </div>
    <nav v-if="list.length">
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
    <div class="none" v-if="!list.length">
      <img src="~assets/images/wu.png" alt="" style="width: 30%">
      <p>/(ㄒoㄒ)/~~~暂无该类别的商品/(ㄒoㄒ)/~~</p>
    </div>
  </div>
</template>

<script>
  import NavMain from 'components/common/navmain/NavMain'
  import BoxItem from 'components/common/categorys/BoxItem'

  export default {
    name: 'Selector',
    components: {
      NavMain,
      BoxItem
    },
    props: {
      category: {
        type: Object,
        defalut: {}
      },
      page: {
        type: Object,
        default: {}
      },
      list: {
        type: Array,
        default: {}
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
    }
  }
</script>

<style scoped>
  .s-title {
    background-color: #f4f6f9;
    border: 1px solid #dedede;
    padding: 0 5px;
    margin: 10px 0;
  }
  .s-title h3 {
    font-size: 12px;
    color: var(--color-high-text);
    line-height: 40px;
    margin: 0;
  }
  .s-title em {
    font-style: normal;
    color: #333;
    margin: 0 10px;
  }
  nav {
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