<template>
  <ul class="dropdown-menu">
    <li :key="index" v-for="(item, index) in category">
      <a @click="listClick(item)">{{item}}</a>
    </li>
  </ul>
</template>

<script>
  import {getCategory} from 'network/category'

  export default {
    name: 'Categorys',
    inject: ['reload'],
    data() {
      return {
        category: []
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          this.category = res
        })
      },
      listClick(item) {
        this.$router.push({
          path: '/list',
          query: {
            name: item
          }
        })
        this.reload()
      },
    }
  }
</script>

<style scoped>

</style>