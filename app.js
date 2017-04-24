const koa = require('koa');
const controller = require('koa-route'); //引入koa路由
const app = koa();
const querystring = require('querystring'); //引入node原生模块
const service = require('./service/webAppService');
//引入模板引擎插件
const views = require('co-views');
const render = views('./view', { //第一个参数是模板存放的路径，第二个是模板的类型-ejs
    map: { html: 'ejs' }
});
//集成koa静态文件
const koa_static = require('koa-static-server');

//调用静态资源文件中间件
app.use(koa_static({

    rootDir: './static', //根文件目录
    rootPath: '/static', //url地址中的路径,
    maxage: 0  //过期时间（即考虑性能优化时的缓存时间)

}));

/*测试使用*/
//调用模板引擎中间件
app.use(controller.get('/ejs_test', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', { nav: 'nav_test' });

}));


/*业务代码*/
//暴漏线上接口
app.use(controller.get('/ajax/search', function* () {

    this.set('Cache-Control', 'no-cache');

    let params = querystring.parse(this.req._parsedUrl.query);
    //反解析，即将http格式的参数转换成object
    let start = params.start;
    let end = params.end;
    let keyword = params.keyword;

    this.body = yield service.get_search_data(start, end, keyword); //函数是异步返回，所以用yield
}));

//暴漏首页接口
app.use(controller.get('/ajax/index', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

//排序接口
app.use(controller.get('/ajax/rank', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();

}));

//类别接口
app.use(controller.get('/ajax/category', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

//男女生频道接口
app.use(controller.get('/ajax/male', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/female', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));

//章节信息接口
app.use(controller.get('/ajax/chapter', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

//章节具体内容接口
app.use(controller.get('/ajax/chapter_content', function* () {

    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}))

//书籍接口
app.use(controller.get('/ajax/book', function* () {

    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id) {
        id = "";
    }
    this.body = service.get_book_data(id);

}));


/*模板引擎部分*/
//首页
app.use(controller.get('/', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', { nav: '书城首页' });
}));

//书籍页
app.use(controller.get('/book', function* () {

    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', { bookId: bookId, nav: '书籍详情' })
}));

//搜索部分
app.use(controller.get('/search', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', { nav: '搜索' });
}));

//男女生频道
app.use(controller.get('/male', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male', { nav: '男生频道' });
}));
app.use(controller.get('/female', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female', { nav: '女生频道' });
}));

//排名
app.use(controller.get('/rank', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank', { nav: '排行' });
}));

//分类
app.use(controller.get('/category', function* () {
    
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category', { nav: '分类' });
}));

//用户中心
app.use(controller.get('/user-center', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = yield render('user-center', { nav: '用户中心'});
}));

//阅读器
app.use(controller.get('/reader', function* () {

    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader', { nav: '阅读器'});
}));


app.listen(3001);
console.log('port is listening at port 3001');

/*
    业务代码与模板引擎的区别:
        业务代码获取数据（线上或本地mock)，
        模板引擎通过html将获取到的数据渲染到页面中
 */
