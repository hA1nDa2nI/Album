<template>
  <div class="f-txt col-md-3 col-sm-3 col-xs-6">
    <slot name="name"></slot>
    <slot name="item"></slot>
  </div>
</template>

<script>
  export default {
    name: 'FooterTxt',
  }
</script>

<style scoped>
  .f-txt h3 {
    font-size: 16px;
    font-weight: 600;
    color: #444;
    height: 38px;
  }
  .f-txt li {
    line-height: 20px;
  }
  .f-txt a {
    color: #666;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
</style>