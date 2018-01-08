var argv=null;
try { 
    argv = JSON.parse(process.env.npm_config_argv).original;
}	
catch(ex){    
    argv = process.argv;
}
var activeProject="";
if(argv[argv.length-1].match(/^--[a-z || A-Z]/g) ) {
  activeProject=argv[argv.length-1].replace(/^--/g,"");	
}
// var entries = activeProject && argv? utils.getMultiEntry('./src/page/'+activeProject+'/**/*.js'):{}// 获得入口js文件
module.exports = activeProject;