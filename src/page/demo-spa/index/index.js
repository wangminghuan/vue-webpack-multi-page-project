import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import {
  Toast
} from 'mint-ui'
Vue.use(Router)
// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果

// const debug = process.env.NODE_ENV == 'development'
// 全局toast提示
const toast = function (txt) {
  Toast({
    message: txt,
    position: 'bottom',
    duration: 2000
  })
}
//* ********************************路由设置*********************************/
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '*',
    redirect: '/error'
  },
  {
    path: '/error',
    meta: {
      title: '404'
    },
    component: resolve => require(['./components/error.vue'], resolve)
  },
  {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: resolve => require(['./components/index.vue'], resolve)
  },
  {
    path: '/list',
    meta: {
      title: '我的作品'
    },
    component: resolve => require(['./components/list.vue'], resolve)
  },
  {
    path: '/detail',
    meta: {
      title: '详情'
    },
    component: resolve => require(['./components/detail.vue'], resolve)
  }
  ]
})
Vue.prototype.$toast = toast
//* ********************************挂载vue实例*********************************/

/* eslint-disable */
__webpack_public_path__ = window.resourceBaseUrl;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
