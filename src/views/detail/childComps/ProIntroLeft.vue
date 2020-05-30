<template>
  <div class="col-md-5 col-sm-5">
    <div class="preview_img"
         ref="imgbox"
         @mouseover="over" 
         @mouseout="out" 
         @mousemove="move($event)">
      <img v-if="isshow" v-lazy="bigPic" width="100%">
      <img v-if="!isshow" v-lazy="bigimg" width="100%">
      <div class="mask"
           v-show="isActive" 
           ref="mask" 
           :style="{left: maskleft, top: masktop}"></div>
      <div class="big" v-show="isActive" ref="big">
        <img v-if="!isshow" v-lazy="bigimg"
             alt="" width="200%"
             ref="bigimg"
             :style="{left: bigimgleft, top: bigimgtop}">
        <img v-if="isshow" v-lazy="bigestPic"
             alt="" width="200%"
             ref="bigimg"
             :style="{left: bigimgleft, top: bigimgtop}">
      </div>
    </div>
    <div class="preview_list">
        <ul class="list_item">
          <li :key="index" v-for="(item, index) in this.smallimg" @click="pic(index)" :class="{'current':index==0}">
            <img v-lazy="item" alt="" width="100%">
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProIntroLeft',
    props: {
      bigimg: {
        type: String,
        default: ''
      },
      smallimg: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isActive: false,
        maskleft: '0px',
        masktop: '0px',
        bigimgleft: '0px',
        bigimgtop: '0px',
        bigPic: '',
        bigestPic: '',
        isshow: false
      }
    },
    methods: {
      over() {
        this.isActive = true
      },
      out() {
        this.isActive = false
      },
      move(e) {
        let top = e.currentTarget.getBoundingClientRect().top
        let left = e.currentTarget.getBoundingClientRect().left
        let scrollTop=document.body.scrollTop||document.documentElement.scrollTop
        let scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft
        let x = e.pageX - (left + scrollLeft)
        let y = e.pageY - (top + scrollTop)
        let maskX = x - this.$refs.mask.offsetHeight / 2
        let maskY = y - this.$refs.mask.offsetWidth / 2
        let maskMax = this.$refs.imgbox.offsetWidth - this.$refs.mask.offsetWidth
        let bigMax = this.$refs.bigimg.offsetWidth - this.$refs.big.offsetWidth
        let bigX = maskX * bigMax / maskMax
        let bigY = maskY * bigMax / maskMax
        if (maskX <= 0) {
          maskX = 0;
        } else if (maskX >= maskMax) {
          maskX = maskMax;
        }
        if (maskY <= 0) {
          maskY = 0;
        } else if (maskY >= maskMax) {
          maskY = maskMax;
        }
        if (bigX <= 0) {
          bigX = 0;
        } else if (bigX >= bigMax) {
          bigX = bigMax;
        }
        if (bigY <= 0) {
          bigY = 0;
        } else if (bigY >= bigMax) {
          bigY = bigMax;
        }
        this.maskleft = maskX + 'px'
        this.masktop = maskY + 'px'
        this.bigimgleft = -bigX + 'px'
        this.bigimgtop = -bigY + 'px'
      },
      pic(i) {
        let li = $('.list_item').children().eq(i)
        li.addClass('current').siblings().removeClass('current')
        this.isshow = true
        this.bigPic = this.smallimg[i]
        this.bigPic = this.bigPic.replace('/n5/', '/n1/')
        this.bigestPic = this.bigPic.replace('/n1/', '/n0/')
      }
    }
  }
</script>

<style scoped>
  .mask {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: var(--color-high-text);
    opacity: .5;
    border: 1px solid #ccc;
    cursor: move;
  }
  .big {
    position: absolute;
    left: 100%;
    top: 0;
    width: 500px;
    height: 500px;
    z-index: 999;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: #fff;
  }
  .big img {
    position: absolute;
  }
  .preview_list {
    margin-top: 60px;
    position: relative;
  }
  .preview_img {
    position: relative;
  }
  ul {
    overflow: hidden;
  }
  .list_item li {
    width: 56px;
    height: 56px;
    float: left;
    margin: 0 2px;
    border: 2px solid transparent;
    cursor: pointer;
    box-sizing: border-box;
  }
  .list_item .current,
  .list_item li:hover {
    border: 2px solid var(--color-high-text);
  }
  @media (max-width: 767px) {
    .preview_list {
      display: none;
    }
  }
</style>