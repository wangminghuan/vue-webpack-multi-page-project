
import Vue from 'vue'
import App from './app'
import Router from 'vue-router';
import select from './select';
import list from "./list";
import search from "./search";
import axios from "axios";
import qs from 'qs';
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {  
  preLoad: 1.3,  
  error: '//s29.9956.cn/res/crowdsource/apph5/common/img/lazy-default.png',  
  loading:'//s29.9956.cn/res/crowdsource/apph5/common/img/lazy-default.png',  
  attempt: 1  
}); 
axios.interceptors.request.use(
  config => {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if(config.method === 'post') {
        let data = qs.parse(config.data);
        config.data = qs.stringify({
            ...data,
        })
    } else if(config.method === 'get') {
        config.params = {
            ...config.params,
        }
        
    }
      return config;
  },
  err => {
      return Promise.reject(err);
  });
  axios.interceptors.response.use(function (response) {  
      return response  
  }, function (error) { 
      console.log(error);
      return Promise.reject(error)  
  });
Vue.prototype.$axios=axios;
Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/select',
      name: 'select',
      component: select
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
