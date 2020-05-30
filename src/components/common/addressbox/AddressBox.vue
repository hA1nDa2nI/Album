<template>
  <div class="address_tab">
    <ul>
      <li :class={current:isActive[0]}>{{address.options}}</li>
      <li :class={current:isActive[1]}>{{address.selectedOptions}}</li>
      <li :class={current:isActive[2]}>{{address.region}}</li>
    </ul>
    <div class="item" v-show="isActive[0]">
      <span :key="index" v-for="(item, index) in this.options" @click="handleChange(item)">{{item.label}}</span>
    </div>
    <div class="item" v-show="isActive[1]">
      <span :key="index" v-for="(item, index) in this.selectedOptions" @click="optionsChange(item)">{{item.label}}</span>
    </div>
    <div class="item" v-show="isActive[2]">
      <span :key="index" v-for="(item, index) in this.region" @click="regionChange(item.label)">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
  import {regionData} from 'element-china-area-data'

  export default {
    name: 'AddressBox',
    data() {
      return {
        data: {},
        address: {
          options: '北京市',
          selectedOptions: '市辖区',
          region: '东城区'
        },
        options: regionData,
        selectedOptions: {},
        region: {},
        isActive: [true, false, false],
        isshow: false
      }
    },
    methods: {
      handleChange(item) {
        this.selectedOptions = item.children
        this.address.options = item.label
        this.address.selectedOptions = this.selectedOptions[0].label
        this.isActive[0] = false
        this.isActive[1] = true
        this.$emit('address', this.address)
      },
      optionsChange(item) {
        if (item.children == undefined) {
          this.isActive[2] = false
          this.isActive[0] = true
          this.address.region = ''
          this.$emit('isshow', false)
        } else {
          this.region = item.children
          this.address.region = this.region[0].label
          this.isActive[2] = true
        }
        this.isActive[1] = false
        this.address.selectedOptions = item.label
        this.$emit('address', this.address)
      },
      regionChange(value) {
        this.address.region = value
        this.isActive[2] = false
        this.isActive[0] = true
        this.$emit('address', this.address)
        this.$emit('isshow', false)
      }
    }
  }
</script>

<style scoped>
  .address_tab {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 760px;
    height: 402px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0px 0px 20px 5px rgba(196, 200, 204, 0.8);
  }
  ul {
    border-bottom: 2px solid var(--color-high-text);
    height: 45px;
  }
  ul li {
    display: inline-block;
    padding: 5px 20px;
    line-height: 30px;
  }
  .current {
    background-color: var(--color-high-text);
    color: #fff;
  }
  .item {
    padding-left: 20px;
  }
  .item span {
    display: inline-block;
    width: 140px;
    padding: 0 8px;
    border: 1px solid #fff;
    line-height: 30px;
    font-size: 12px;
  }
  .item span:hover {
    border-color: var(--color-high-text);
  }
  @media (max-width: 767px) {
   .address_tab {
     width: 350px;
   }
  }
</style>