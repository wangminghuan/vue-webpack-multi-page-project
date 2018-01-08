<template>
<div>
 <ul class="select-wrap">
     <li v-for="(item,index) in tabData" :key="index" @click="handleClickTab(index)" :class="{active:index == nowActive}">{{item}}</li>
 </ul>
 <ul class="select-content">
   <li v-for="item in renderData" v-if="item.id" :key="item.val" :class="[{active: item.isActive}, 'item']" @click="handleSelected(item)">{{item.name}}</li>
   <li v-else class="empty"></li>
 </ul>
</div>
</template>
<<script>
export default {
  data(){
      const __company= localStorage.getItem("__insur_company__")||"全部公司";
      const __type=sessionStorage.getItem("__insur_type__")||"全部险种";
      const __age=sessionStorage.getItem("__insur_age__")||"全部年龄";
      return {
          tabData:[__company.split("#")[0],__type.split("#")[0],__age.split("#")[0]],
          nowActive:0,
          renderData:[],
          companyCache:[],
          typeCache:[],
          ageCache:[],
      }
  },
  methods:{
      renderContent(url,cacheData){
       if(cacheData && this[cacheData] && this[cacheData].length>0){
          this.renderData=this[cacheData];
          return false;
       } 
       this.$axios.post(url).then((res)=> {
            const _data=res.data;
            if(_data.code==0){
                for(let i=0;i<_data.data.length%3;i++){
                    _data.data.push({id:"",name:""})
                }
                _data.data.map((item)=>{
                  item.isActive= (item.name==this.tabData[this.nowActive])?1:0;
                })
                this.renderData=_data.data;
                this[cacheData]=_data.data;
            }
       })
      },
      
      handleSelected(item){
          if(this.nowActive==0){  
             localStorage.setItem("__insur_company__",item.name+"#"+item.id);
          }else if(this.nowActive==1){
              sessionStorage.setItem("__insur_type__",item.name+"#"+item.id)
          }else if(this.nowActive==2){
              sessionStorage.setItem("__insur_age__",item.name+"#"+item.id)
          }
          this.renderData.map((_item)=>{
                _item.isActive=0
          })
          item.isActive=1;
          this.tabData.splice(this.nowActive,1,item.name);
          window.history.go(-1);
      },
      handleClickTab(index){
        this.nowActive=index;
        switch (index) {
            case 0:
                this.renderContent("/api/companyandproducts/companylist","companyCache")
                break;
            case 1:
                this.renderContent("/api/companyandproducts/insurancetype","typeCache")
                break;
            case 2:
                this.renderContent("/api/companyandproducts/atage","ageCache")
                break;
        }
      }
  },
  created(){
     this.renderContent("/api/companyandproducts/companylist","companyCache")
  }
}
</script>

<style lang="scss">
@import "../../../common/pxToRem.scss";
.select-wrap{
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
     border-bottom: 1px solid #e3e3e3;
     margin-bottom: 20px;
    li{
        height: 16px;
        position: relative;
        width: pxToRem(248px);
        text-align: center;
        box-sizing: border-box;
    }
    li:nth-of-type(2){
         border-left: 1px solid #e3e3e3;
         border-right: 1px solid #e3e3e3;
    }
li:after{
    content: " ";
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
    margin-top: -5px;
    right: pxToRem(34px);
}
li.active:after{
    transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
    margin-top: -1px;
}
li.active:before{
   content: "";
    display: block;
    height: 8px;
    width: 8px;
    background-color: #fff;
    border-width: 1px 1px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
    position: relative;
    position: absolute;
    bottom:-19px;
    left: 0;right: 0;
    margin: 0 auto;
}
}
.select-content{
     padding: 0 pxToRem(22px);
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
    li.active{
        border-color: #2891fa;
        color:#2891fa;
    }
    .empty{
        border-color: transparent;
    }
}
</style>

