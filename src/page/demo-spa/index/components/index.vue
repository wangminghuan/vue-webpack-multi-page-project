<template>
  <div id="app">

    <divider>github 地址 </divider>
    <div class="jumpUrl">
      <a href="https://github.com/bluefox1688/vue-cli-multi-page"
         target="_blank">https://github.com/bluefox1688/vue-cli-multi-page</a>
    </div>
    <p>一个基于vue+webpack的单页面开发项目</p>
    <img @click="handleClick" src="../../img/down_01.jpg"/>
    <div class="bg"></div>
    <divider>单页路由</divider>
    <group>
      <cell title="进入列表页"
            value=""
            is-link
            link="/list"></cell>
      <cell title="进入详情页"
            value=""
            is-link
            link="/detail"></cell>
      <cell title="进入异常"
            value=""
            is-link
            link="/details"></cell>
    </group>
    <name>sssssss</name>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Cell, Group, Divider } from 'vux'
export default {
  components: {
    Cell, Group, Divider
  },
  data () {
    return {
      isShow: true
    }
  },
  // 相关操作事件
  methods: {
    handleClick () {
      Toast({
        message: '你点击了图片',
        position: 'bottom',
        duration: 1000
      })
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate () {
  },
  // 在挂载开始之前被调用
  beforeMount () {
  },
  // 已成功挂载，相当ready()
  mounted () {
  }
}
</script>
<style lang="scss">
@import '../../../../common/pxToRem.scss';
// 根据UI稿直接（750）直接量取即可
.jumpUrl {
  font-size: 12px;
  line-height: pxToRem(40px);
}
.bg {
  width: pxToRem(750px);
  height: pxToRem(481px);
  background-size: 100% 100%;
  background-image: url('../../img/down_01.jpg');
}
</style>
