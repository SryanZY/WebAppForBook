# WebAppForBook
一个书城的WebApp

# 项目运行  

```  
 下载源码: cd 任意文件夹 git clone  
 
 安装依赖项: yarn(或者npm install)  
 
 运行: node app.js,在浏览器中输入localhost:3001(接口可更改)     
 ```
 
 # 用到的技术点  
 
 * Koa中间件、Koa-route
 * ejs模板引擎
 * Vue双向绑定
 * H5 LocalStorage

## 项目构建  
### package.json文件  
   在项目根目录下运行yarn init或者yarn init -y(默认值),填写好之后会生成package.json文件。  
在命令行输入  ```  yarn add co-views auto-reload koa ejs koa-route koa-views koa-static-server  ```  
依赖的包会自动安装。  

### 编写入口文件app.js  
   现将依赖项引入  
```  
var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views')
var render = views('./view', {
  map: { html: 'ejs' }
});
var koa_static = require('koa-static-server');
var querystring = require('querystring');   //node原生模块  
var service = require('./service/webAppService.js');  //引入service配置文件   
```  

***引用静态资源***  
```  
app.use(koa_static({
    rootDir: './static/',  //静态资源所在的目录
	rootPath: '/static/',  //项目上线发布后所在的目录
	maxage: 0
}));   
```  

***解析模板引擎页面***  
```  
app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');  //设置响应头
	this.body = yield render('index');   //异步加载
}));  

Koa2.0版本的写法:  要想使用koa2则Node.js必须在7.0版本以上且var app = new Koa()
app.use(controller.get('/', async ctx => {

	ctx.set('Cache-Control', 'no-cache');
	ctx.body = await render('index');
}));   

如果模板引擎中需要传入变量，则需要如此更改  
app.use(controller.get('/book', function*(){
  this.set('Cache-Control', 'no-cache');
  var params = querystring.parse(this.req._parsedUrl.query);  //querystring.parse反解析，类似于JSON.parse
  var bookId = params.id;  //获取参数
  this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));
```       

# 未完待续。。。
