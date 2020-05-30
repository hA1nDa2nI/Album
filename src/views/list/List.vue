<template>
  <div id="list">
    <nav-bar>
      <a slot="list" href="#" class="dropdown-toggle cates" data-toggle="dropdown">
        {{category.name}}<span class="caret"></span>
      </a>
    </nav-bar>
    <div class="container">
      <search-box/>
      <selector :category="category" :page="page" :list="list"/>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import Selector from './childComps/Selector'

  export default {
    name: 'List',
    components: {
      NavBar,
      SearchBox,
      Selector
    },
    data() {
      return {
        category: {
          id: '',
          name: ''
        },
        list: [],
        page: {
          pageNum: 1,
          cur: 1,
          totalPage: [],
          pageSize: 12
        }
      }
    },
    created() {
      this.category.name = this.$route.query.name
      var url="/api/products/list";
      this.$http.post(url,{
        name: this.category.name
      },{}).then((data) => {
        if (Object.values(data.body)[0]) {
          this.category.name = Object.keys(data.body)[0]
          this.list = data.body[this.category.name]
          for (let i in this.list) {
            if (this.list[i].bigImg[0] == 'p') {
              this.list[i].bigImg = require('@/assets/images/product/'+this.list[i].bigImg)
            }
          }
          if (this.list.length) {
            this.page.pageNum = Math.ceil(this.list.length / this.page.pageSize) || 1
            for (let i = 0; i < this.page.pageNum; i++) {
              this.page.totalPage[i] = this.list.slice(this.page.pageSize * i, this.page.pageSize * (i + 1))
            }
          }
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
  @media (max-width: 767px) {
    .container {
      margin-top: 50px;
    }
  }
</style>