<template>
  <div>
    <button type="button" class="btn btn-primary" 
            data-toggle="modal" data-target="#exampleModal" 
            data-whatever="@getbootstrap"><slot name="title"></slot></button>
    <div class="modal fade" id="exampleModal" 
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel"><slot name="title"></slot></h4>
          </div>
          <div class="modal-body">
            <p>新增收货地址
              <span class="glyphicon glyphicon-chevron-down" aria-hidden="true" v-show="!addShow" @click="show"></span>
              <span class="glyphicon glyphicon-chevron-up" aria-hidden="true" v-show="addShow" @click="show"></span>
            </p>
            <form class="add" v-show="addShow">
              <li>
                <label for="name">收货名:</label>
                <input type="text" id="name" v-model="addForm.name">
              </li>
              <li>
                <label for="message-text">联系电话:</label>
                <input type="text" id="tel" v-model="addForm.tel">
              </li>
              <li>
                <label>地址:</label>
                <div class="btn-group">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{address.options}}<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li :key="index" v-for="(item, index) in this.options" 
                        @click="handleChange(item)">{{item.label}}</li>
                  </ul>
                </div>
                <div class="btn-group">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{address.selectedOptions}}<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li :key="index" v-for="(item, index) in this.selectedOptions" 
                        @click="optionsChange(item)">{{item.label}}</li>
                  </ul>
                </div>
                <div class="btn-group">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{address.region}}<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li :key="index" v-for="(item, index) in this.region" 
                        @click="regionChange(item.label)">{{item.label}}</li>
                  </ul>
                </div>
              </li>
              <li>
                <label for="address">详细地址</label>
                <textarea id="address" v-model="addForm.text"></textarea>
              </li>
              <button type="button" class="btn btn-primary" @click="add">添加</button>
              <div class="alert alert-warning alert-dismissible" v-show="message != ''">
                <strong>Warning!</strong> {{message}}
              </div>
            </form>
            <ul v-show="!addShow" class="addressItem">
              <p>选择已有收货地址</p>
              <li :key="index" v-for="(item, index) in this.data" 
                  @click="selectAdd(index)">
                <b>{{item.receiver_name}} {{item.receiver_phone}}</b>
                <p>{{item.receiver_province}} {{item.receiver_city}} {{item.receiver_district}} {{item.receiver_address}}</p>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="go">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {regionData} from 'element-china-area-data'

  export default {
    name: 'ReceivingInfo',
    inject: ['reload'],
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
        addForm: {
          name: '',
          tel: '',
          text: ''
        },
        message: '',
        addShow: false,
        currentAddress: {}
      }
    },
    methods: {
      handleChange(item) {
        this.selectedOptions = item.children
        this.address.options = item.label
        this.address.selectedOptions = this.selectedOptions[0].label
      },
      optionsChange(item) {
        if (item.children == undefined) {
          this.address.region = ''
        } else {
          this.region = item.children
          this.address.region = this.region[0].label
        }
        this.address.selectedOptions = item.label
      },
      regionChange(value) {
        this.address.region = value
      },
      show() {
        this.addShow = !this.addShow
      },
      add() {
        if (this.addForm.name == '') {
          this.message = '请填写收货名!'
        } else if (this.addForm.tel == '') {
          this.message = '请填写联系电话!'
        } else if (this.addForm.text == '') {
          this.message = '请填写详细地址!'
        } else {
          this.message = ''
          this.$http.post("/api/address/add", {
            id: this.$store.state.user_id,
            name: this.addForm.name,
            tel: this.addForm.tel,
            province: this.address.options,
            city: this.address.selectedOptions,
            district: this.address.region,
            address: this.addForm.text
          },{}).then((data) => {
            this.addShow = false
            $('#exampleModal').modal('hide')
            this.reload()
          },function(response){
            console.log(response);
          })
        }
      },
      selectAdd(i) {
        let li = $('.addressItem').children('li').eq(i)
        li.addClass('current').siblings('li').removeClass('current')
        this.currentAddress = this.data[i]
      },
      go() {
        this.$emit('address', this.currentAddress)
      }
    },
    created() {
      this.$http.post("/api/address/show", {
        id: this.$store.state.user_id
      },{}).then((data) => {
        this.data = data.body
      },function(response){
        console.log(response);
      })
    }
  }
</script>

<style scoped>
  .btn-primary {
    background-color: var(--color-high-text);
    border: none;
    outline: none;
  }
  .btn-primary:active:focus {
    background-color: var(--color-high-text);
    border: none;
    outline: none;
  }
  .modal-body p {
    position: relative;
  } 
  .modal-body p span {
    position: absolute;
    right: 5px;
  }
  .modal-body .message {
    margin-left: 10px;
    border: 1px solid #dedede;
    padding: 5px;
  }
  .add {
    padding-left: 20px;
  }
  .add label {
    width: 80px;
    margin-bottom: 10px;
  }
  .btn-group {
    margin: 0 10px 10px 0;
  }
  .dropdown-menu {
    height: 400px;
    overflow-y: scroll;
  }
  .dropdown-menu li {
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
  }
  .dropdown-menu li:hover {
    color: #262626;
    background-color: #f5f5f5;
  }
  textarea {
    outline-color: var(--color-tint);
  }
  .alert {
    margin-top: 10px;
  }
  .addressItem {
    border-top: 1px solid #dedede;
    padding-top: 15px;
    height: 180px;
    overflow-y: scroll;
  }
  .addressItem li {
    border-bottom: 1px solid #dedede;
    padding: 10px 0 0 20px;
  }
  .addressItem li:last-child {
    border: 0;
    padding-bottom: 10px;
  }
  .addressItem .current,
  .addressItem li:hover {
    background-color:#f5f5f5;
  }
</style>