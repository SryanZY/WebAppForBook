const fs = require('fs');

/*获取数据的两种方式*/
/*1、获取线上json数据*/
exports.get_search_data = function (start, end, keyword) {

    //返回异步的函数
    return function (callback) {

        const http = require('http');
        const querystring = require('querystring'); //Node将一个对象转换成http查询参数
        //例：将{a:1}转换成http://localhost:3000?a=1的形式
        let data = {
            start: start,
            end: end,
            s: keyword
        };
        //将参数转换成http参数的形式
        let content = querystring.stringify(data);
        //指定线上接口的hostname、port、path、method等
        let http_request = {
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content,
            method: 'GET'
        };
        //发送请求
        req_obj = http.request(http_request, function (_res) {

            let content = "";
            _res.setEncoding('utf8'); //设置编码格式
            _res.on('data', function (chunk) { //chunk-块,只是一部分，所以要拼接
                content += chunk;
            });
            _res.on('end', function () {
                callback(null, content);
            });
        });
        //代码健壮，监听error事件
        req_obj.on('error', function (err) {console.log(err)});
        req_obj.end();
    }
}

/*2、读取本地模拟的mock数据*/
//获取首页数据
exports.get_index_data = function () {
    
    var content = fs.readFileSync('./mock/home.json', 'utf-8');
    return content;
}

//获取排序的接口
exports.get_rank_data = function () {
    
    var content = fs.readFileSync('./mock/rank.json', 'utf-8');
    return content;
}

//获取类别的接口
exports.get_category_data = function () {
    
    var content = fs.readFileSync('./mock/category.json', 'utf-8');
    return content;
}

//获取男生频道服务接口
exports.get_male_data = function(channelId) {

    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
    return content;
}

//获取女生频道服务接口
exports.get_female_data = function(channelId) {

    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
    return content;
}

//获取章节信息接口
exports.get_chapter_data = function () {

    var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
    return content;
}

//获取章节内容接口
exports.get_chapter_content_data = function (id) {
    
    if(!id) {
        id = 1;
    }
    var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
    return content;
}

//获取书籍的接口
exports.get_book_data = function (id) {
    
    if(!id) {
        id = "18218";
    }
    if(fs.existsSync('./mock/book' + id + '.json')) {
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    } else {
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
    
}
