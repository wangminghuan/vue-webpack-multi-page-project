<template>
<div>
   <swiper :options="tabSwiperOption" class="tab-wrap" ref="tabSwiper"  @click="test">
        <swiper-slide :class="[{active:activeIndex==index},'tab-item']" v-for="(item, index) in menuList" :key="index" @click="test">{{item}}</swiper-slide>
  </swiper>
  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
        <swiper-slide  v-for="(item, index) in menuList" :key="index">Slide {{item}}</swiper-slide>
  </swiper>
</div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
          activeIndex:0,
          menuList:['精选', '美食', '电影', '酒店', '外卖','精选2', '美食2', '电影2', '酒店2', '外卖2'],
          swiperOption:{
               autoHeight: true,
               on: {
                slideChangeTransitionEnd: this.myTransitionEnd
            },
          },
          tabSwiperOption:{
               slidesPerView: 5,
               preventClicks: false,//默认true
               preventLinksPropagation : true,
          },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      tabSwiper() {
        return this.$refs.tabSwiper.swiper
      }
    },
    methods:{
        test(){
            alert(2)
        },
        myTransitionEnd(data){
          console.log(this.swiper.activeIndex)
          console.log(this.activeIndex=this.swiper.activeIndex)
        },
        handleClickTab(index){
            alert(index)
           this.swiper.slideTo(index)
        },
        callback(){

        }
    },
    mounted() {
        // tabSwiper=this.$refs.tabSwiper.swiper,
        // mySwiper=this.$refs.mySwiper.swiper;
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   console.log('this is current swiper instance object', this.swiper)
    //   this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
<style lang="scss">
@import "../../../common/reset.css";
@import "../../../common/pxToRem.scss";
.tab-wrap{
    .swiper-slide{
    width: pxToRem(125px);
    padding: 0 6px;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    // border-right :1px solid red;
    text-align: center;
    }
    .active{
        color: red;
    }
}
</style>
