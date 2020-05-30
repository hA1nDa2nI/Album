<template>
  <div class="modal fade" v-show="this.$store.state.logregisActive" :style="{opacity: this.$store.state.logregisActive}">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">提示</h4>
      </div>
      <div class="modal-body">
        <slot name="message"></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">好的</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$store.state.logregisActive = 0;
      },
    }
  }
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>