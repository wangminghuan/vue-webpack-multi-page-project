/**
 * @module  ajax 
 * @description ajax原生js封装
 * @parameter:参数说明:
 **method: 请求方式:GET/POST,默认值:'GET';
 **url:    发送请求的地址, 默认值: 当前页地址;
 **data:   string,json;
 **async:  是否异步:true/false,默认值:true;
 **cache:  是否缓存：true/false,默认值:true;
 **contentType: HTTP头信息，默认值：'application/x-www-form-urlencoded';
 **success: 请求成功后的回调函数;
 **error:   请求失败后的回调函数;
 *  使用例子
 *  ajax({
 *        method: "GET",
 *       url: "/ipservice/",
 *       data: '222',
 *       cache: false,
 *       success: function(data) {
 *           //数据默认为字符串形式
 *           console.log(JSON.parse(data).localname)
 *       },
 *       error: function(err) {console.log(err)}
 *   });
 */
/*
 **ajax工作步骤
 **1. 创建XMLHttpRequest对象
 **2. 同服务器建立联系，open方法
 **3. 向服务器发送请求，send方法
 **4. 接收服务器返回请求内容，onreadystatechange
 */
export
var ajax=function(opts) {
    var defaults = {
        method: "GET",
        url: "",
        data: '',
        async: true,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        success: function() {},
        error: function() {}
    };
    for (var key in opts) {
        defaults[key] = opts[key]
    }

    //处理用户输入的data数据

    if (typeof defaults.data == 'object' && !Object.prototype.toString.call(defaults.data) == "[object Array]") {
        var dataStr = "";
        for (var k in defaults.data) {
            dataStr += encodeURIComponent(k) + "=" + encodeURIComponent(defaults.data[k]) + "&"
        }
        defaults.data = dataStr.substring(0, dataStr.length - 1)
    }
    //将请求方式改为大写
    defaults.method = defaults.method.toUpperCase();

    //设置cache ,cache为false时设置随机数，防止缓存
    defaults.cache = defaults.cache ? "" : "&" + (new Date()).getTime();

    //GET方式下将data拼接到url中进行传递
    if (defaults.method == "GET" && (defaults.data || defaults.cache)) {
        defaults.url += "?" + defaults.data + defaults.cache;
    }

    //1. 创建XMLHttpRequest对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //2. 同服务器建立联系，open方法
    xhr.open(defaults.method, defaults.url, defaults.async)

    //3. 向服务器发送请求，send方法
    if (defaults.method == "GET") {
        xhr.send()
    } else {
        xhr.setRequestHeader('Content-Type', defaults.contentType);
        //提交的数据格式，默认application/x-www-form-urlencoded
        xhr.send(defaults.data);
    }

    //4. 接收服务器返回请求内容，onreadystatechange

    /* *onreadystatechange事件
      * readyState属性：请求状态
      * 0 （初始化）还没有调用open()方法
      * 1 （载入）已调用send()方法，正在发送请求
      * 2 （载入完成）send()方法完成，已收到全部响应内容
      * 3 （解析）正在解析响应内容
      * 4 （完成）响应内容解析完成，可以在客户端调用了
      * status属性：服务器(请求资源)的状态,http状态码
      * 返回的内容
      * responseText：返回以文本形式存放的内容
      * responseXML：返回XML形式的内容
      */
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                defaults.success(xhr.responseText)
            } else {
                defaults.error(xhr.status)
            }
        }
    }
};

/*
 取窗口可视范围的高度 
*/
export
var getClientHeight=function()
{
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight)
    {
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
    }
    else
    {
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
    }
    return parseFloat(clientHeight);
};
/*
    取窗口滚动条高度 
*/
export 
var getScrollTop=function(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return parseFloat(scrollTop);
};
export 
var setScrollTop=function(height){
    if(document.documentElement&&document.documentElement.scrollTop){
        document.documentElement.scrollTop=height;
    }else if(document.body){
        document.body.scrollTop=height;
    }
};
/*
    取文档高度 
*/
export 
var getDocumentHeight= function ()
{
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}
export
var getUrlArgs=function() {
    var argStr = window.location.search ? window.location.search.substring(1) : "";
    var argObj = {},
        item = null,
        value = null,
        key = null,
        argArr = argStr.length > 0 ? argStr.split("&") : [];
    for (var i = 0, len = argArr.length; i < len; i++) {
        item = argArr[i].split("=");
        key = item[0];
        value = item[1];
        argObj[key] = value;
    }
    return argObj
}