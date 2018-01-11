<template>
<div id="app">
<scroller lock-y :scrollbar-x='false' ref="scroll" @on-scroll="handleScroll" :bounce="true">
      <div class="box1" :style="{width:wrapWith}">
        <div :class="[{active:activeIndex==index},'tab-item']" v-for="(item, index) in menuList" :key="index"  @click="()=>handleClickTab(index)"><span>{{item}}</span></div>
      </div>
    </scroller>
	<!-- <tab :line-width='2' active-color='#fc378c' v-model="modelIndex">
        <tab-item class="vux-center"  v-for="(item, index) in menuList" @click="activeIndex = index" :key="index">{{item}}</tab-item>
      </tab>  -->
      <div class="tab-hide-wrap">
      <div class="tab-outer-wrap" ref="outerWrap">
      <ul class="tab-wrap">
         <li ref="tabItem" :class="{active:activeIndex==index}" v-for="(item, index) in menuList" @click="activeIndex = index" :key="index">{{item}}</li>
      </ul>
      </div>
      </div>
      <swiper  v-model="activeIndex" height="400px" :show-dots="false">
        <swiper-item v-for="(item, index) in menuList" :key="index">
          <div @touchstart="handleMoveSwiper" class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
</div>
</template>

<script>
import { Scroller, Tab, TabItem,Swiper,SwiperItem } from 'vux'
export default {
  components: {
  Tab, TabItem ,Swiper,SwiperItem,Scroller
  },
  data() {
    return {
      tabItemWidth:0,
      hasClickTab:false,
      activeIndex:0,
      modelIndex: 0,
      wrapWith:"100%",
      // activeIndex: '精选',
      menuList:['精选', '美食', '电影', '酒店', '外卖','精选2', '美食2', '电影2', '酒店2', '外卖2']
    }
  },
  watch:{
      activeIndex:function(val){
        let _index=val-5;
        if(_index<0 || this.hasClickTab) return false;
        this.$refs.scroll.reset({
          left: _index*this.tabItemWidth,
        })
        // console.log(this.$refs.outerWrap.scrollLeft)
        this.$refs.outerWrap.scrollLeft=_index*this.tabItemWidth;
        console.log(this.$refs.outerWrap)
      }
  },
  //相关操作事件
  methods:{
    handleMoveSwiper(){
     console.log("2")
    },
    handleClickTab(index){
      this.activeIndex = index;
      this.hasClickTab=true;
    },
    handleScroll(pos){
    //  console.log(pos)
    },
    handler(){
     console.log(11)
    },
    handleClick(){
		Toast({
		message: '你点击了图片',
		position: 'bottom',
		duration: 1000
		});
	}
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){
  },  
  //在挂载开始之前被调用
  beforeMount(){
  }, 
  //已成功挂载，相当ready()
  mounted(){
    const tabItemArr=this.$refs.tabItem;
    this.outerWrap=this.$refs.outerWrap;
    this.tabItemWidth=tabItemArr[0].clientWidth;
    
    this.wrapWith=(this.tabItemWidth*tabItemArr.length)+"px";
    // console.log(this.$refs.tabItem[0].clientWidth)
  },
}
</script>
<style lang="scss">
@import "../../../common/reset.css";
@import "../../../common/pxToRem.scss";
// 根据UI稿直接（750）直接量取即可
.box1{
  display: flex;
  height: 40px;
  position: relative;
}
.tab-item{
   width: pxToRem(125px);
    padding: 0 6px;
    flex-shrink:0;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    // border-right :1px solid red;
    text-align: center;
}
.tab-item.active{
    color: red;
    // border-bottom:1px solid red;
  }
.jumpUrl{
	font-size: 12px;
	line-height: pxToRem(40px);
}
.tab-hide-wrap{
  width: 100%;
  overflow: hidden;
  height: 40px;
}
.tab-outer-wrap{
  overflow-x: scroll;
  height: 70px;
  width: 100%;;
}
.tab-wrap{
  display: flex;
  border-bottom: 1px solid red;
  // justify-content:space-between;
  li{
    width: pxToRem(125px);
    padding: 0 6px;
    flex-shrink:0;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    // border-right :1px solid red;
    text-align: center;
    &:after{
         content:"";
         display: block;
    }
  }
  li.active{
    color: red;
    // border-bottom:1px solid red;
  }
  
}

</style>