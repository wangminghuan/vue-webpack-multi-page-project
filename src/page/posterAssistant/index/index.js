
import Vue from 'vue'
import App from './indexApp2';
import axios from "axios";
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper)
// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果
__webpack_public_path__ = window.resourceBaseUrl;
axios.interceptors.request.use(
  config => {
      let u_id="";
      if (typeof CustomJS != "undefined") {
          try {
              var userinfo = JSON.parse(CustomJS.getUser()||"{}");
                  u_id = userinfo.u_id||"";
          } catch (err) {
              console.log(err)
          }
      }
      if(u_id=="" && urlArgs.u_id && urlArgs.u_id!==""){
          //优先通过custom获取uid，取不到的话再从url获取
          u_id=urlArgs.u_id
      }
      const _params={
        u_id:u_id
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      
      if(config.method === 'post') {
          let data = qs.parse(config.data);
          const __final={
            ..._params,
            ...data
          };
          config.data = qs.stringify({
              ...encodeParams(config.url,__final),
          })
         
      } 
      return config;
  },
  err => {
      return Promise.reject(err);
  });
  axios.interceptors.response.use(function (response) {  
      return response  
  }, function (error) { 
      alert('抱歉，网络连接异常，请稍候重试~');
      return Promise.reject(error)  
  });
Vue.prototype.$axios=axios;
new Vue({
  render: h => h(App)
}).$mount('#app')
