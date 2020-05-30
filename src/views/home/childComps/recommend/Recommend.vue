<template>
  <div id="recommend" class="row">
    <recomm :productdata="commenttop">
      <h3 slot="name">音像热评榜</h3>
      <span slot="datatitle">评论总数</span>
    </recomm>
    <recomm :productdata="updatetime">
      <h3 slot="name">新碟资讯</h3>
      <span slot="datatitle">发布时间</span>
    </recomm>
  </div>
</template>

<script>
  import Recomm from 'components/common/recommend/Recomm'
  import {getCommenttop, getUpdatetime} from 'network/product'

  export default {
    name: 'Recommend',
    components: {
      Recomm
    },
    data() {
      return {
        commenttop: [],
        updatetime: []
      }
    },
    created() {
      this.getCommenttop()
      this.getUpdatetime()
    },
    methods: {
      getCommenttop() {
        getCommenttop().then(res => {
          this.commenttop = res
          for (let i in this.commenttop) {
            if (this.commenttop[i].main_image[0] == 'p') {
              this.commenttop[i].main_image = require('@/assets/images/product/'+this.commenttop[i].main_image)
            }
          }
        })
      },
      getUpdatetime() {
        getUpdatetime().then(res => {
          this.updatetime = res
          for (let i in this.updatetime) {
            if (this.updatetime[i].main_image[0] == 'p') {
              this.updatetime[i].main_image = require('@/assets/images/product/'+this.updatetime[i].main_image)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  #recommend {
    margin-top: 50px;
  }
</style>