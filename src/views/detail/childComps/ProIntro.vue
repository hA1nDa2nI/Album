<template>
  <div class="pro_intro">
    <pro-intro-left :bigimg="data.main_image" :smallimg="data.sub_images"/>
    <pro-intro-right :data="data" />
  </div>
</template>

<script>
  import ProIntroLeft from './ProIntroLeft'
  import ProIntroRight from './ProIntroRight'

  export default {
    name: 'proIntro',
    components: {
      ProIntroLeft,
      ProIntroRight
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .pro_intro {
    margin: 20px 0 80px;
    overflow: hidden;
  }
</style>