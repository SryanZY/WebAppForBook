var id = location.href.split('?id=').pop();
var windowWidth = $(window).width();
if(windowWidth < 320) windowWidth = 320;
$.get('/ajax/book?id=' + id,function(d){
	new Vue({
		el:'#app',
		data: {
            d: d,
            screen_width: windowWidth
        },
		methods:{
			readBook:function(){
				location.href = "/reader"
			}
		}
	});
},'json');