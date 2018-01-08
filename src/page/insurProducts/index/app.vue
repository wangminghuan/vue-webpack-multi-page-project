<template>
    <div id="app">
     <router-view></router-view>
    </div>
</template>
<style lang="scss">
    @import "../../../common/reset.css"; 
  .clearfix:after {
    content: "";
    clear: both;
    height: 0;
    width: 0;
    font-size: 0;
    display: block;
}
</style>

// <script>
// import Lib from 'assets/js/Lib';
// import { Cell,Group,Divider } from 'vux'
// export default {
//   data() {
//     return {
//     }
//   },
//   components: {
// 	Cell,Group,Divider	
//   },
//   //实例初始化最之前，无法获取到data里的数据
//   beforeCreate(){

//   },  
//   //在挂载开始之前被调用
//   beforeMount(){
  	
  
//   }, 
//   //已成功挂载，相当ready()
//   mounted(){

	
//   },
//   //相关操作事件
//   methods: {
	
//   }
// }
// </script>
// <style lang="scss">
// @import "../../../common/reset.css"
// </style>