<template>
  <div class="detail"
       :style="{'display':styles}">我是详情页</div>
</template>
<script>
export default {
  data () {
    return {
      styles: 'block'
    }
  }
}
</script>

<style lang="scss">
@import '../../../../common/pxToRem.scss';
.detail {
  color: red;
  line-height: pxToRem(50px);
  text-align: center;
}
</style>
