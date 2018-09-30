

## 一、使用前注意事项

1、直接使用 `cnpm`可能会导致依赖不正确。强烈建议给 `npm` 设置 taobao 的 registry。

`npm install --registry=https://registry.npm.taobao.org`

2、如果你遇到运行失败报错问题，一般是因为node-sass模块没安装上，该模块需要翻墙才可以，请自行翻墙重新安装 `npm i node-sass --save`。

3、新建项目，需重新`npm run dev --你的文件夹名称`才可以正常访问新建的页面。（新建项目步奏请参见第二部分说明）

4、`npm run dev --文件夹名称`将会自动在浏览器打开页面，如未正常打开，请访问完整的路径`http://localhost:8070/文件夹名称/index.html`

5. 在localhost本地服务器下可以通过设置反向代理请求任何域名的请求，这对前后端分离开发非常有帮助！！，具体请修改config/index.js中的此处：
以后端请求接口为 http://zc.dev.bxd365.com/api/xxx 为例，这样设置

	    proxyTable: {
	          '/api/':{    
	            target:'http://zc.dev.bxd365.com',
	            changeOrigin:true,
	            pathRewrite:{
	                // '/api':'/app'  //此处为重定向的设置，即将http://zc.dev.bxd365.com/api/xx的请求重定向到http://zc.dev.bxd365.com/app/xx;一般情况下不需要开启；
	            }
	        }
	        },

异步请求我们在代码中正常写即可（axios为例：）

    this.$axios.post('/api/head',{
      page:1
    }).then((res)=>{
          console.log(res)
    })
开发环境联调无误后，打包提交到svn即可！！！！
## 二、新建项目
> 本项目支持单页（SPA）模式开发，也支持多页项目开发（多个html）。  

### 1. 单页项目  
#### demo-spa 项目结构

		├─index
		|   ├─App.vue  ## 入口组件
		|   ├─index.html ## 模板文件
		|   ├─index.js   ## 入口js
		|   ├─components
		|   |     ├─detail.vue  ## 详情组件
		|   |     ├─error.vue  ## 错误组件
		|   |     ├─index.vue  ## 首页组件
		|   |     └list.vue   ## 列表组件
		├─img           ## 图片资源目录
		|  ├─down_01.jpg   
		|  ├─copy     ## 不在项目中引用但需要上线的，构建工具会自动复制一份合并到dist的img下
		|  |  └share.jpg

通过 `npm run dev --demo-spa` 启动本地环境  
通过 `npm run build --demo-spa`  打包代码（会在dist目录下生成一个`demo-spa`文件夹）

#### 打包之后的代码引用示例：

		
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
		  <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width">
		  <meta name="format-detection" content="telephone=no">
		  <meta name="format-detection" content="email=no">
			<title>demo-index</title>
			<script type="text/javascript">
		    !function(e){var t={};t.resizeEvt="orientationchange"in window?"orientationchange":"resize",t.Html=e.getElementsByTagName("html")[0],t.widthProportion=function(){var n=Number((e.body&&e.body.clientWidth||t.Html.offsetWidth)/10);return n>76.8?76.8:n<32?32:n},t.changePage=function(){t.Html.setAttribute("style","font-size:"+t.widthProportion()+"px"),t.correctPx()},t.correctPx=function(){var e=document.documentElement,n=e.clientWidth;if(n&&!(n>768)){var i=document.createElement("div");i.style.width="10rem",i.style.height="0",t.Html.appendChild(i);var o=n,d=i.clientWidth/o;1!==d&&(e.style.fontSize=n/10/d+"px"),t.Html.removeChild(i)}},t.changePage(),document.addEventListener&&(window.addEventListener(t.resizeEvt,t.changePage,!1),document.addEventListener("DOMContentLoaded",t.changePage,!1))}(document)
		      window.resourceBaseUrl = 'http://s29.bxdins.cn/static/crowdsource_apph5/'; //线上和开发环境路径
		  </script>
		    <link type="text/css" rel="stylesheet" href="http://s29.bxdins.cn/static/crowdsource_apph5/demo-spa/index.min.css?v=1537864984" />
		    <script type="text/javascript" src="http://s29.bxdins.cn/static/common/js/vue.min.js?v=1537864984"></script>
		    <script type="text/javascript" src="http://s29.bxdins.cn/static/common/js/sign.min.js?v=1537864984"></script> 
		</head>
		<body>
		<div id="app"></div>
		<script type="text/javascript" src="http://s29.bxdins.cn/static/crowdsource_apph5/demo-spa/index.min.js?v=1537864984"></script>
		</body>
		</html>

因为测试与线上资源路径不同，所以都通过全局的`resourceBaseUrl`进行拼接加载  


### 2. 多页项目
#### demo-mpa 项目结构

		├─list            ## 列表页
		|  ├─list.html    ## 模板文件
		|  ├─list.js      ## 入口文件
		|  └listApp.vue   ## 入口组件
		├─index           ## 首页页
		|   ├─index.html
		|   ├─index.js    
		|   └indexApp.vue 
		├─img             ## 图片资源目录
		|  ├─down_01.jpg
		|  ├─copy        ## 不在项目中引用但需要上线的，构建工具会自动复制一份合并到dist的img下
		|  |  └share.jpg
		├─detail          ## 详情页
		|   ├─detail.html
		|   ├─detail.js
		|   └detailApp.vue

通过 `npm run dev --demo-mpa` 启动本地环境  
通过 `npm run build --demo-mpa`  打包代码（会在dist目录下生成一个`demo-mpa`文件夹）

#### 打包之后的代码引用示例：

		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
		  <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width">
		  <meta name="format-detection" content="telephone=no">
		  <meta name="format-detection" content="email=no">
			<title>demo-index</title>
			<script type="text/javascript">
		    !function(e){var t={};t.resizeEvt="orientationchange"in window?"orientationchange":"resize",t.Html=e.getElementsByTagName("html")[0],t.widthProportion=function(){var n=Number((e.body&&e.body.clientWidth||t.Html.offsetWidth)/10);return n>76.8?76.8:n<32?32:n},t.changePage=function(){t.Html.setAttribute("style","font-size:"+t.widthProportion()+"px"),t.correctPx()},t.correctPx=function(){var e=document.documentElement,n=e.clientWidth;if(n&&!(n>768)){var i=document.createElement("div");i.style.width="10rem",i.style.height="0",t.Html.appendChild(i);var o=n,d=i.clientWidth/o;1!==d&&(e.style.fontSize=n/10/d+"px"),t.Html.removeChild(i)}},t.changePage(),document.addEventListener&&(window.addEventListener(t.resizeEvt,t.changePage,!1),document.addEventListener("DOMContentLoaded",t.changePage,!1))}(document)
		      window.resourceBaseUrl = 'http://s29.bxdins.cn/static/crowdsource_apph5/'; //线上和开发环境路径
		  </script>
		  <!-- 页面css -->
		    <link type="text/css" rel="stylesheet" href="http://s29.bxdins.cn/static/crowdsource_apph5/demo-mpa/index.min.css?v=1537864984" />
		    <!-- 签名函数 -->
		    <script type="text/javascript" src="http://s29.bxdins.cn/static/common/js/vue.min.js?v=1537864984"></script>
		    <!-- vue依赖 -->
		    <script type="text/javascript" src="http://s29.bxdins.cn/static/common/js/sign.min.js?v=1537864984"></script> 
		</head>
		<body>
		<div id="app"></div>
		<!-- 页面js -->
		<script type="text/javascript" src="http://s29.bxdins.cn/static/crowdsource_apph5/demo-mpa/index.min.js?v=1537864984"></script>
		</body>
		</html>
因为测试与线上资源路径不同，所以都通过全局的`resourceBaseUrl`进行拼接加载  

## 存在问题(单页模式和多页模式同时存在)：  
1. 一个目录下只能有一个js文件，因为多个入口是通过遍历每个文件夹下的js文件来查找出来的。
2. 不引用vue-router的时候css背景图路径在生产环境会出错，可参见`demo-mpa/index/indexApp` 中require解决方案（如果引用了vue-router则可忽略该问题）


## 使用流程


		# 安装依赖
		npm install
		
		# 调试环境 serve with hot reload at localhost:8091
		npm run dev --你的文件夹名称
		
		# 生产环境 build for production with minification
		npm run build --你的文件夹名称


本地默认访问端口为8070，需要更改的童鞋请到项目目录文件`config/index.js`修改。


## 目录结构

		├─.babelrc
		├─.gitignore
		├─.postcssrc.js
		├─package.json
		├─README.md
		├─该项目为vue多页面项目,使用说明请看readme.txt
		├─test
		|  ├─unit
		|  |  ├─.eslintrc
		|  |  ├─index.js
		|  |  ├─karma.conf.js
		|  |  ├─specs
		|  |  |   └Hello.spec.js
		|  ├─e2e
		|  |  ├─nightwatch.conf.js
		|  |  ├─runner.js
		|  |  ├─specs
		|  |  |   └test.js
		|  |  ├─custom-assertions
		|  |  |         └elementCount.js
		├─src
		|  ├─page
		|  |  ├─termsSearch   //条款查询
		|  |  |      ├─icon.jpg
		|  |  |      ├─search.png
		|  |  |      ├─list           //公司列表
		|  |  |      |  ├─list.html
		|  |  |      |  ├─list.js
		|  |  |      |  └listApp.vue
		|  |  |      ├─index          //条款查询首页组件
		|  |  |      |   ├─index.html
		|  |  |      |   ├─index.js
		|  |  |      |   └indexApp.vue
		|  |  ├─signJS   //lib下签名函数源码
		|  |  |   ├─index
		|  |  |   |   ├─index.html
		|  |  |   |   └index.js
		|  |  ├─shopCard
		|  |  |    ├─index
		|  |  |    |   ├─index.html
		|  |  |    |   ├─index.js
		|  |  |    |   └indexApp.vue
		|  |  |    ├─img
		|  |  |    |  ├─bg_01.png
		|  |  |    |  ├─bg_02.png
		|  |  |    |  ├─bg_03.png
		|  |  |    |  ├─bg_04.png
		|  |  |    |  ├─bg_05.png
		|  |  |    |  └bg_06.png
		|  |  ├─posterAssistant  //海报助手项目
		|  |  |        ├─index     //首页
		|  |  |        |   ├─index.html   
		|  |  |        |   ├─index.js        //入口js
		|  |  |        |   ├─indexApp.vue    //主组件
		|  |  |        |   ├─itemSlide.vue   //tab切换组件
		|  |  |        |   └perview.vue   
		|  |  |        ├─img
		|  |  |        |  ├─close.png
		|  |  |        |  ├─down.png
		|  |  |        |  ├─hascol.png
		|  |  |        |  ├─nocol.png
		|  |  |        |  └share.png
		|  |  |        ├─collection           //收藏页
		|  |  |        |     ├─colApp.vue      //主组件
		|  |  |        |     ├─collection.html 
		|  |  |        |     ├─collection.js   //入口js
		|  |  |        |     └perview.vue     //预览组件
		|  |  ├─insurProducts
		|  |  |       ├─index
		|  |  |       |   ├─app.vue
		|  |  |       |   ├─index.html
		|  |  |       |   ├─index.js
		|  |  |       |   ├─list.vue
		|  |  |       |   ├─search.vue
		|  |  |       |   └select.vue
		|  |  ├─headline
		|  |  |    ├─subject
		|  |  |    |    ├─subject.html
		|  |  |    |    ├─subject.js
		|  |  |    |    └subjectApp.vue
		|  |  |    ├─search
		|  |  |    |   ├─search.html
		|  |  |    |   ├─search.js
		|  |  |    |   └searchApp.vue
		|  |  |    ├─patent
		|  |  |    |   ├─patent.html
		|  |  |    |   ├─patent.js
		|  |  |    |   └patentApp.vue
		|  |  |    ├─detail
		|  |  |    |   ├─detail.html
		|  |  |    |   ├─detail.js
		|  |  |    |   ├─detailActicle.vue
		|  |  |    |   └detailApp.vue
		|  |  |    ├─comment
		|  |  |    |    ├─comment.html
		|  |  |    |    ├─comment.js
		|  |  |    |    └commentApp.vue
		|  |  |    ├─assets
		|  |  |    |   ├─img
		|  |  |    |   |  ├─s01.png
		|  |  |    |   |  ├─tool_icons.png
		|  |  |    |   |  └top_btn.png
		|  |  |    |   ├─components
		|  |  |    |   |     ├─goTop.vue
		|  |  |    |   |     ├─inputComment.vue
		|  |  |    |   |     ├─itemActicleList.vue
		|  |  |    |   |     ├─itemCommentList.vue
		|  |  |    |   |     └showToast.vue
		|  |  ├─highGralityServer    //优质服务商
		|  |  |    ├─index     //主文件
		|  |  |    |    ├─index.html
		|  |  |    |    ├─index.js
		|  |  |    |    └indexApp.vue
		|  |  |    ├─img
		|  |  |        ├─location-icon.png    //定位图标
		|  |  |        └logobg.png    //服务商固定背景图
		|  |  |
		|  |  |
		|  |  ├─workpass    //助手活动-->活动地址:http://mall.bxd365.com/html/zsWorkpass(注:由于活动页面中没有注入customjs,所以把活动的入口放在了商城之中)
		|  |  |             //(接上↑:活动的真实地址是:http://bxd.9956.cn/huodong/workpass/index#/)
		|  |  |
		|  |  ├─demo
		|  |  |  ├─list
		|  |  |  |  ├─list.html
		|  |  |  |  ├─list.js
		|  |  |  |  └listApp.vue
		|  |  |  ├─index
		|  |  |  |   ├─index.html
		|  |  |  |   ├─index.js
		|  |  |  |   └indexApp.vue
		|  |  |  ├─img
		|  |  |  |  └down_01.jpg
		|  |  |  ├─detail
		|  |  |  |   ├─detail.html
		|  |  |  |   ├─detail.js
		|  |  |  |   └detailApp.vue
		|  |  ├─dailyRecord               //日志日报
		|  |  |      ├─search                //日志搜索
		|  |  |      |   ├─search.html
		|  |  |      |   ├─search.js
		|  |  |      |   └searchApp.vue
		|  |  |      ├─index                 //日志首页
		|  |  |      |   ├─index.html
		|  |  |      |   ├─index.js
		|  |  |      |   ├─indexApp.vue
		|  |  |      |   └swipeItem.vue
		|  |  |      ├─img
		|  |  |      |  ├─add.png
		|  |  |      |  ├─add1.png
		|  |  |      |  ├─close-3@3x.png
		|  |  |      |  ├─search.png
		|  |  |      |  ├─up.png
		|  |  |      |  └zhaopian@3x.png
		|  |  |      ├─detail                //日志详情
		|  |  |      |   ├─detail.html
		|  |  |      |   ├─detail.js
		|  |  |      |   └detailApp.vue
		|  |  |      ├─creat
		|  |  |      |   ├─creat.html
		|  |  |      |   ├─creat.js
		|  |  |      |   ├─creatApp.vue
		|  |  |      |   └tree.vue
		|  ├─components
		|  |     ├─goTop.vue
		|  |     └~tpl.vue
		|  ├─common
		|  |   ├─pxToRem.scss
		|  |   ├─reset.css
		|  |   └utils.js
		|  ├─assets
		|  |   ├─js
		|  |   | ├─common.js
		|  |   | ├─conf.js
		|  |   | ├─Lib.js
		|  |   | └vueFilter.js
		|  |   ├─font
		|  |   |  ├─iconfont.eot
		|  |   |  ├─iconfont.svg
		|  |   |  ├─iconfont.ttf
		|  |   |  └iconfont.woff
		|  |   ├─css
		|  |   |  └common.css
		├─dist
		|  ├─home
		|  |  ├─detail.min.css
		|  |  ├─detail.min.js
		|  |  ├─index.min.css
		|  |  ├─index.min.js
		|  |  ├─list.min.css
		|  |  ├─list.min.js
		|  |  ├─img
		|  |  |  ├─000.ca2075e.jpg
		|  |  |  └down_01.ca2075e.jpg
		├─config
		|   ├─dev.env.js
		|   ├─index.js
		|   ├─prod.env.js
		|   └test.env.js
		├─build
		|   ├─activeProject.js
		|   ├─build.js
		|   ├─check-versions.js
		|   ├─dev-client.js
		|   ├─dev-server.js
		|   ├─utils.js
		|   ├─vue-loader.conf.js
		|   ├─webpack.base.conf.js
		|   ├─webpack.dev.conf.js
		|   ├─webpack.prod.conf.js
		|   └webpack.test.conf.js

参照 demo-spa 或 demo-mpa 项目可完成多数需求

