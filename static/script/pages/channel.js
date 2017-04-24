var sex = location.href.split('/').pop();
var device_width = $('window').width();
if(device_width < 360) {
    device_width = 360;
}
$.get('/ajax/' + sex,function(d){
	new Vue({
	  el: '#app',
	  data: {
        d: d.items,
        screen_width: device_width,
        double_screen_width: device_width * 2
      }
	});
},'json');