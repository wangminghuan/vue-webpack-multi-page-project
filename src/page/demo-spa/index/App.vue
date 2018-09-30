<template>
<div id="app">
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
@import "../../../common/reset.css";
body,html, #app{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
