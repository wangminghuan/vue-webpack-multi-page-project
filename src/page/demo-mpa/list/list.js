import Vue from 'vue'
import App from './listApp'
// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果
/* eslint-disable */
__webpack_public_path__ = window.resourceBaseUrl;
new Vue({
  render: h => h(App)
}).$mount('#app')
