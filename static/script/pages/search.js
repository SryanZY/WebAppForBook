new Vue({
	el: "#app_search",
	data: {
		search: [],  //存放查找结果的数组
		condition: false,  //表示是否有查询结果的变量
		empty: true 
	},
	methods: {
		doSearch: function () {
			var keyword = $('#search_box').val();
			var _this = this;

			$.get('/ajax/search', { keyword: keyword }, function (d) {

				_this.condition = true;
				_this.search = d.items;
				if(_this.search.length === 0) {
					_this.empty = true;
				} else {
					_this.empty = false;
				}
			}, 'json');
		}
	}
})