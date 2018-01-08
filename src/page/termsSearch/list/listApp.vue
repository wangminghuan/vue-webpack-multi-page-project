<template>
<div id="app">
    <div class="list">
     <li class="item" v-if="item.c_id"  v-for='(item,index) in listItem' :class="{ 'on':req.c_id==item.c_id}"  @click="clickItemEvent(item)" :key="index">{{item.c_name}}</li>
     <li v-else class="empty"></li>
    </div>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import { Cell,Group,Divider } from 'vux'
import axios from 'axios';
export default {
  data() {
    return {
        listItem:{},
        req:{c_id:0},
    }
  },
  //已成功挂载，相当ready()
  mounted(){
      var myurl=GetQueryString("c_id");
      if(myurl !=null && myurl.toString().length>=1)
      {
          this.req.c_id=GetQueryString("c_id");
      }
      function GetQueryString(name)
      {
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
      }

      axios.post('/v6_company')
          .then(function (resp) {
              if (typeof(resp.data) != "undefined" && resp.data.code == "0") {
                  this.listItem=resp.data.data;
                  const _data=resp.data;
                  for(let i=0;i<_data.data.length%3;i++){
                    _data.data.push({id:"",name:""})
                 }
                 this.listItem=_data.data;
              }
              else if (typeof(resp) != "undefined" && resp.data.code!= "0") {
              }
          }.bind(this)).catch(function (error) {
          console.log(error);
      });
  },
  //相关操作事件
  methods: {
      clickItemEvent:function(item){
          if(item.c_id){
          this.req.c_id=item.c_id;

          if(!window.localStorage){
              return false;
          }else{
              var storage=window.localStorage;
              storage.setItem("y_companyName",item.c_name);
              storage.setItem("y_c_id",item.c_id);
          }
          window.history.go(-1);
          }
      }
  }
}
</script>

<style lang="scss">
@import "../../../common/pxToRem.scss";
    #app{
        width: 100%;
        // min-height: 750px;
        box-sizing: border-box;
        background: #fff;
    }
    .list{
    padding: 0 pxToRem(22px);
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item,.empty{
        width: pxToRem(210px);
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 34px;
        margin-bottom:10px;
        border: 1px solid #e3e3e3;
    }
    li.on{
        border-color: #2891fa;
        color:#2891fa;
    }
    .empty{
        border-color: transparent;
    }
}
    // .list{
    //     padding: 10px;
    // }
    // .item{
    //     width: 30%;
    //     height: 28px;
    //     line-height: 28px;
    //     text-align: center;
    //     border: 1px solid #e4e4e4;
    //     display: inline-block;
    //     margin-top: 5px;
    //     font-size: 12px;
    //     margin-right: 2.69%;
    //     overflow: hidden;
    // }
    
</style>

