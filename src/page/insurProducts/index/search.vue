<template>
<div class="index-wrap search-wrap">
<div class="top-wrap ">
  <input class="searchBtn" type="text" v-model="userInput"  placeholder="请输入搜索内容" />
  <div class="cancelBtn" @click="handleSearch">搜索</div>
  </div>
<ul class="list-wrap" v-if="listData.length>0">
    <li v-for="(item,index) in listData" :key="index" class="item clearfix" @click="handleJump(item.url)"><div class="item-cover"><img v-lazy="item.p_img"></div><div class="item-cont"><div class="top">{{item.p_short_name}}</div><div class="mid">{{item.p_short_feature}}</div><div class="btm clearfix"><span v-if="item.p_is_main==1" class="main-tag">主险</span><span v-else class="addmain-tag">附加险</span><span v-show="item.p_is_hot==1" class="hot-tag">热销</span><span v-show="item.p_is_new==1" class="new-tag">新品</span></div></div></li>
  </ul>
  <div v-else class="no-content">暂无相关内容</div>
  <div class="btm-loading-tips" v-show="isShowLoading>0"><span v-if="isShowLoading==1">努力加载中....</span><span v-else>没有新内容了</span></div>
  <go-top></go-top>
</div>
</template>
<script>
import {getScrollTop,setScrollTop,getClientHeight,getDocumentHeight} from "../../../common/utils";
import goTop from "../../../components/goTop";
export default {
    components:{
      goTop
  },
data(){
    
    return{
        userInput:"",
        listData:[],
        pageIndex:1,
      ableAjax:true,
      preScrollTop:0,
      nowScrollTop:0,
      isShowLoading:0,
    }
},
methods:{
    renderContent(sucb,ercb){
       let txt=this.userInput.replace(/\s+/g,"");
       if(txt=="") return;
       this.$axios.post("/bxdInsurProduct/search",{
              keyWord:txt,
              page:this.pageIndex,
              pagesize:15,
       }).then((res)=> {
            const _data=res.data;
            if(_data.code==0){
                this.listData=this.listData.concat(_data.data);
                this.pageIndex++;
                if(_data.data.length==0 && ercb){
                    ercb();
                }else if(sucb){
                      sucb()
                }
            }else if(ercb){
                  ercb();
            }
       }).catch((err)=>{
                if(ercb) ercb();
       })
    },
    handleSearch(){
      let txt=this.userInput.replace(/\s+/g,"");
       if(txt=="") return;
       this.pageIndex=1;
       this.ableAjax=true,
       this.preScrollTop=0,
       this.nowScrollTop=0,
       this.isShowLoading=0,
       this.$axios.post("/bxdInsurProduct/search",{
              keyWord:txt,
              page:this.pageIndex,
              pagesize:15,
       }).then((res)=> {
            const _data=res.data;
            if(_data.code==0){
                this.listData=_data.data;
                this.pageIndex++;
            }
       })
    },
     handleJump(url){
     if(url && url!==""){
       window.location.href=url
     }
     }
},
mounted(){
    if(typeof CustomJS!=="undefined" && CustomJS.openSoftKeyboard){
        // 调起软键盘
        CustomJS.openSoftKeyboard()
    }
    window.addEventListener('scroll', ()=>{
            this.nowScrollTop = getScrollTop();
            if (this.ableAjax && this.nowScrollTop > 0 && this.preScrollTop <= this.nowScrollTop && (this.nowScrollTop + 1 * getClientHeight()>= getDocumentHeight())) {
                this.ableAjax= false;
                this.isShowLoading=1;
                this.renderContent(()=>{
                      this.ableAjax=true;
                },()=>{
                      this.isShowLoading=2; 
                })
            }
            setTimeout(function() { this.preScrollTop = this.nowScrollTop }, 0);
        }) 
  }
} 
</script>

<style lang="scss">
@import "../../../common/pxToRem.scss";
.search-wrap{
    .searchBtn{
        width: pxToRem(520px);
        color: #333;
    }
    .cancelBtn{
       margin-right: pxToRem(22px);
       padding: 0 20px;
       font-size: 14px;
    }
}
</style>

