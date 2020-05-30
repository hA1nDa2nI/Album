<template>
  <div class="nav-main">
    <button class="btn btn-default btn-sm" type="button">
      音乐
    </button>
    <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
    <div class="btn-group">
      <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <slot name="name"></slot><span class="caret"></span>
      </button>
      <categorys/>
    </div>
    <slot name="btn"></slot>
  </div>
</template>

<script>
  import Categorys from 'components/common/categorys/Categorys'

  export default {
    name: 'NavMain',
    components: {
      Categorys
    }
  }
</script>

<style scoped>
  .nav-main {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-high-text);
  }
  .glyphicon {
    top: 4px;
    margin: 0 5px;
  }
  .xs_title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 144px;
    margin-right: 18px;
  }
</style>