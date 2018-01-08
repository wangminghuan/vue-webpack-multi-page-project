<template>
<div id="app">
	<div class="dp-header">
	    <div class="inputBox"><i class="icon"></i><input autocomplete="off" class="input" name="search" v-model="req.keyword"  @keyup.enter="searchEvent" type="text" placeholder="搜索保险条款"></div>
		<div class="all" @click="getCompanyListEvent()">{{c_name}}</div>
	</div>
	<div class="list">
		<div class="item" v-for="(item,index) in listItem" @click="openPdf(item)" :key="index">
			<img src="../icon.jpg" alt="图标">
			<div class="font">
				<p class='title'>{{item.zcl_title}}</p>
				<p class="tag">
					<span class="tag_item">{{item.zcl_tag}}</span>
				</p>
			</div>
		</div>
		<div v-if="listItem.length<1" class="tol">暂无相关内容</div>
	</div>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import { Cell,Group,Divider } from 'vux'
import axios from 'axios';
import qs from 'qs';
axios.interceptors.request.use(
  config => {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if(config.method === 'post') {
        let data = qs.parse(config.data);
        config.data = qs.stringify({
            ...data,
        })
    } else if(config.method === 'get') {
        config.params = {
            ...config.params,
        }
        
    }
      return config;
  },
  err => {
      return Promise.reject(err);
  });
  axios.interceptors.response.use(function (response) {  
      return response  
  }, function (error) { 
      console.log(error);
      return Promise.reject(error)  
  });
export default {
  data() {
    return {
        listItem:{},
        req:{c_id:''},
        c_name:'',
        c_id:'',
	}
  },
  components: {
	Cell,Group,Divider	
  },
  //已成功挂载，相当ready()
  mounted(){
      var storage=window.localStorage;
      this.c_name=storage.getItem("y_companyName");
      this.req.c_id=storage.getItem("y_c_id");
      if(this.c_name==undefined||this.c_name=='')
	  {
          this.c_name= '全部公司';
          axios.get('/api/clause/lists')
              .then(function (resp) {
                  if (typeof(resp.data) != "undefined" && resp.data.code == "0") {
                      this.listItem=resp.data.data;
                  }
                  else if (typeof(resp) != "undefined" && resp.data.code!= "0") {
                  }
              }.bind(this)).catch(function (error) {
              console.log(error);
          });
	  }
	  else{
          axios.get('/api/clause/lists?c_id='+this.req.c_id)
              .then(function (resp) {
                  if (typeof(resp.data) != "undefined" && resp.data.code == "0") {
                      this.listItem=resp.data.data;
                  }
                  else if (typeof(resp) != "undefined" && resp.data.code!= "0") {
                  }
              }.bind(this)).catch(function (error) {
              console.log(error);
          });
	  }
  },
  //相关操作事件
  methods: {
      getCompanyListEvent:function () {
		 window.location.href='/html/insurProducts/termslist?c_id='+this.req.c_id;
      } ,
      openPdf:function(item) {
          var parms={};
          parms.title=item.zcl_title;
          parms.url=item.zcl_fileSrc;
          parms.type='pdf'
          if (typeof(CustomJS) != "undefined") {
              try {
                  CustomJS.openFile(JSON.stringify(parms));
              }
              catch (err) {
              }
          }
          else{
              window.location.href=item.zcl_fileSrc;
          }
      } ,
      searchEvent:function() {
          axios.post('/api/clause/search',this.req)
              .then(function (resp) {
                  if (typeof(resp.data) != "undefined" && resp.data.code == "0") {
                      this.listItem=resp.data.data;
                  }
                  else if (typeof(resp) != "undefined" && resp.data.code!= "0") {
                  }
              }.bind(this)).catch(function (error) {
              console.log(error);
          });
      }
  }
}
</script>
<style lang="scss" scoped="">
	#app{
		box-sizing: border-box;
		background: #f2f2f2;
	}
	.dp-header{
		height: 45px;
		padding: 5px 10px 5px 10px;
		background: #ffffff;
	}
	.inputBox{
		background: #f2f2f2;
		height: 40px;
		border-radius: 5px;
		width: 70%;
		float: left;
		position: relative;
	}
	.input{
		width: 70%;
		background: #f2f2f2;
		border: none;
		outline: none;
		height: 80%;
		margin: 4px 0 0 35px;
	}
	.icon{
		width: 16px;
		height: 16px;
		display: inline-block;
		background: url("../search.png") no-repeat center;
		background-size: cover;
		position: absolute;
		top: 10px;
		left: 10px;
	}
	.all{
		width: 25%;
		float: right;
		color: #969696;
		height: 80%;
		padding-top: 10px;
		margin-right: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		position: relative;
		padding-right: 4px;
	}
	.all:after{
		content: " ";
		display: inline-block;
		height: 6px;
		width: 6px;
		border-width: 2px 2px 0 0;
		border-color: #C8C8CD;
		border-style: solid;
		transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
	   top: 50%;
		margin-top: -9px;
		right: 2px;
	}
	.list{
		width: 100%;
		height: auto;
		box-sizing: border-box;
		border-top: 1px solid #e3e3e3;
	}
	.tol{
		height: 300px;
		line-height: 300px;
		text-align: center;
		color: #C8C8CD;
		font-size: 14px;
	}
	.item{
		width: 100%;
		padding: 10px;
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #e3e3e3;
		box-sizing: border-box;
	}
	.item .font{
		width: 80%;
		float: left;
		margin-left: 10px;
		color: #555;
	}
	.item img{
		width: 45px;
		height: 45px;
		float: left;
	}
	.item .title{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.tag{
		margin-top: 5px;
	}
	.item .tag_item{
		border: 1px solid #949494;
		color: #949494;
		font-size: 12px;
		border-radius: 4px;
		padding: 0 2px;
	}
</style>