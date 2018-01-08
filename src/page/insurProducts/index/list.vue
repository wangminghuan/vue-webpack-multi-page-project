<template>
  <div class="index-wrap">
  <div class="top-wrap">
  <router-link to="/search" tag="div" class="searchBtn">请输入搜索内容</router-link>
  <router-link  to="/select" tag="div" class="selectBtn">{{company}}</router-link>
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
    const __company=localStorage.getItem("__insur_company__")&& localStorage.getItem("__insur_company__").split("#")[0]?localStorage.getItem("__insur_company__").split("#"):[];
    const __type=sessionStorage.getItem("__insur_type__") && sessionStorage.getItem("__insur_type__").split("#")[1]?sessionStorage.getItem("__insur_type__").split("#")[1]:"";
    const __age=sessionStorage.getItem("__insur_age__") && sessionStorage.getItem("__insur_age__").split("#")[1]?sessionStorage.getItem("__insur_age__").split("#")[1]:"";
    return {
      isShowSearch:false,
      userInput:"",
      listData:[],
      company:__company[0]||"全部公司",
      companyId:__company[1]||"",
      typeId:__type,
      ageId:__age,
      pageIndex:1,
      ableAjax:true,
      preScrollTop:0,
      nowScrollTop:0,
      isShowLoading:0,
    }
  },
  methods:{
    handleFocus(){
      this.isShowSearch=true;
      this.listData=[];
    },
    handleCancel(){
          this.userInput="";
          this.isShowSearch=false;
          this.renderContent()
    },
    handleJump(url){
     if(url && url!==""){
       window.location.href=url
     }
    },
    submit(){
      let txt=this.userInput.replace(/\s+/g,"");
      if(txt=="") return;
      this.$axios.post("/bxdInsurProduct/search",{
              keyWord:txt,
          }).then((res)=> {
                const _data=res.data;
                if(_data.code==0){
                    this.listData=_data.data;
                }
          })
    },
     renderContent(sucb,ercb){
       this.$axios.post("/bxdInsurProduct/lists",{
           companyId:this.companyId,
           catId:this.typeId,
           at_id:this.ageId,
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
  },
  created(){
    this.renderContent();
    window.addEventListener('scroll', ()=>{
            this.nowScrollTop = getScrollTop();
            if (this.ableAjax && this.nowScrollTop > 0 && this.preScrollTop <= this.nowScrollTop && (this.nowScrollTop + 1 * getClientHeight()+50 >= getDocumentHeight())) {
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
.btm-loading-tips{
  text-align: center;
  font-size: 10px;
  color: #959595;
}
.top-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #e6e6e6;
  .searchBtn{
    margin-left: pxToRem(22px);
     border-radius: 6px;
     width: pxToRem(450px);
     height: 30px;
     line-height: 30px;
     color: #909090;
     background-color: #f2f2f2;
    padding-left: 30px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAAHxUf8aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzUwMjEwRjBFMTQwMTFFNzkwRTc4OEI1MEM4MjQ5MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzUwMjEwRjFFMTQwMTFFNzkwRTc4OEI1MEM4MjQ5MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NTAyMTBFRUUxNDAxMUU3OTBFNzg4QjUwQzgyNDkzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NTAyMTBFRkUxNDAxMUU3OTBFNzg4QjUwQzgyNDkzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlToKR8AAAMZSURBVHjaYvz//z8DMmABEdOmTXMCUvuA+B8TVGIflM5iQVIN0nsHIIAYMcwA6kcRAJlxFl3AGKp/I0gAIIDAZiBpgxl4AYgNYTpA4CKUZoRikGQSsgJ9II5mQAXT4FbgAwABRFABLGxA1A0gVkdyC0NWVhbcDSBjNJAcGYjsbxDwRzN5PRDvQVbAgsX638gK1qBJFgCxJ7JOkMK9QOyE5Mi7QKxM0JsAAURQASEAdzw0rNiA+CcQtwFxNZraSUCcC9XzFz0cQcADiJ9B3V+NxbI8qNxnWEpBDiUQ2A7EBkS42hyINzNgCX8HIL4OxLwEDDiLywUHgVgAmiwWYNG4Dir3GIivMuBIAX9hCQ0LCEJi34YGtg7F0QgQQBQbwMRAIUBPSLCsswGLWhdoemeAJSJsLtgFxGuhUcmIhIWAeDcQr8bpAiDwg+YmbHnzPdSyf0BsDcRHsRmwkYhEJAnEL5CjGt0LXwgY8JLqsUB1A8QJqFfBZ4AzNIDwgdvQegCrAaCKbBU0x8lhsfk/UpTi9EI4tAJ7CNUAw7eghY0sED+C0jgL9HN4sjQDVPNjmJqBz40AAUaxC6hWHGApFrD51h2IA4DYAogVgJgPGqsPgPgYNBUcRopxrABWlBAThOxAPB9qIKi8XgytteuB2AaIpYHYCohboZXiFmiJAcK9QMxMSRzOA+If0MrAG5pqRIA4B1pgXoZWpDegZWAaNERA6oJBHgXiP0DcSaoDmKCGJkJ9xg/E20iMWlADiBOIZwNxGRAfIcUB06BtsclAXENhGkuDpgtQId5MrAMiofQcKiX0SVA6ilgH/KFWHkcz5xuxDlgOyy1UckARlF5FrANyoZ2FVCCeRaHl66Dlxm5S0sB/aOuvD+oIUBssjozE9wfaX6gFYjdyyoFiaEnZB21tghz2HYg3AXE61FBQ1WULxNlAvAOIf0HVTYW20m9DfX4XuQojpTIBlX6VUHWMUAuPQdtQXdACCZTXfaF5XQ+qjhWI64BYDWrxP2g9egfdISwkBu01KO4gQc8TIFYFYhlogbYY2hkYHLUhAGAyxi7LArB4AAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: 20px auto;
    background-position: 4px 6px;
  }
  .selectBtn{
    position: relative;
    margin-right: pxToRem(22px);
    padding-right: 8px;
    // padding: 0 20px;
    text-align: center;
    width: pxToRem(130px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .selectBtn:after{
     content: "";
    display: inline-block;
    height: 8px;
    width: 8px;
    border-width: 1px 1px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
    position: relative;
    position: absolute;
    top: 50%;
    margin-top: -8px;
    right: 2px;
  }
}

.index-wrap{
.no-content{
  line-height: 60px;
  color: #909090;
  text-align: center;
}
.list-wrap{
  padding: 0 pxToRem(22px);
  .item{
    padding: 12px 0;
    border-bottom: 1px solid #e6e6e6;
  }
    .item-cover {
    float: left;
    width: 114px;
    height: 76px;
    overflow: hidden
}

.item-cont {
    padding-left: 128px
}

.item-cont .mid,.item-cont .top {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.item-cont .top {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: #353535
}

.item-cont .mid {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #959595
}

.item-cont .btm {
    padding-top: 3px;
    span{
    float: left;
    display: block;
    height: 16px;
    line-height: 16px;
    font-size: 10px;
    border-radius: 2px;
    padding: 0 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 6px;
}
.main-tag{
  color: #ff9822;
    border: 1px solid #ff9822
}
.addmain-tag{
color: #81d63a;
    border: 1px solid #81d63a
}
.new-tag{
   color: #b681f3;
    border: 1px solid #b681f3
  
}
.hot-tag{
  color: #e73f24;
    border: 1px solid #e73f24
}
}

// .item-cont .btm span {
//     color: #ec4b2c;
//     border: 1px solid #ec4b2c
// }

// .item-cont .btm em {
//     margin-left: 6px;
//     margin-right: 6px;
//     color: #b582f3;
//     border: 1px solid #b582f3
// }
// .item-cont .btm i {
//     color: #ec4b2c;
//     border: 1px solid #ec4b2c
// } 
}
}
</style>


