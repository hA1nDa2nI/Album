<template>
  <div id="detail">
    <nav-bar>
      <a slot="list" href="#" class="dropdown-toggle cates" data-toggle="dropdown">
        频道分类<span class="caret"></span>
      </a>
    </nav-bar>
    <div class="container">
      <search-box/>
      <nav-main>
        <span slot="name">{{detail.name}}</span>
        <span slot="btn">
          <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
          <button class="btn btn-default btn-sm xs_title" type="button">
            {{detail.title}}
          </button>
        </span>
      </nav-main>
      <pro-intro :data="detail"/>
      <div class="detail_bottom">
        <detail-tab :data="detail"/>
        <like :data="data" v-show="this.detail.id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SearchBox from 'components/content/searchbox/SearchBox'
  import NavMain from 'components/common/navmain/NavMain'
  import ProIntro from './childComps/ProIntro'
  import Like from './childComps/Like'
  import DetailTab from './childComps/DetailTab'

  export default {
    name: 'Detail',
    components: {
      NavBar,
      SearchBox,
      NavMain,
      ProIntro,
      Like,
      DetailTab
    },
    data() {
      return {
        detail: {},
        data: []
      }
    },
    created() {
      var url="/api/products/detail"
      this.$http.post(url,{
        id: this.$route.query.id
      },{}).then((data) => {
        this.detail = data.body
        if (this.detail.main_image[0] == 'p') {
          this.detail.main_image = require('@/assets/images/product/'+this.detail.main_image)
        }
        if (this.detail.sub_images != null) {
          this.detail.sub_images = this.detail.sub_images.split(',')
        } else {
          this.detail.sub_images = [this.detail.main_image]
        }
        this.detail.tags = this.detail.tags.split(',')
        this.detail.detail = this.detail.detail.replace(/\'/g, '').replace(/\s/g, '').split(',')
        if (this.detail.validity != null) {
          this.detail.validity = this.detail.validity.trim().replace("[\\pZ]", "")
        }
        if (this.detail.catalog != null) {
          this.detail.catalog = this.detail.catalog.split(',')
        }
        var url="/api/products/like"
        this.$http.post(url,{
          id: this.detail.id,
          category_id: this.detail.category_id
        },{}).then((data) => {
          this.data = data.body
          for (let i in this.data) {
            if (this.data[i].main_image[0] == 'p') {
              this.data[i].main_image = require('@/assets/images/product/'+this.data[i].main_image)
            }
          }
        },(response) => {
          console.log(response)
        })
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