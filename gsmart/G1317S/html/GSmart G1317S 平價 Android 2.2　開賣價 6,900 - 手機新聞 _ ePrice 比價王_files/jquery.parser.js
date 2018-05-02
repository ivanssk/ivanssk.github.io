$(function(){
	$.Parser = {
		numberWithCommas: function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		
		timestampToDate: function(timestamp) {
			var d = new Date(timestamp * 1000);			
		},
		queryStringToObject: function(s) {			
			var o = {};
			var _ary = s.split('&');
			
			for ( var i = 0 ; i < _ary.length ; i++ ) {
				var _arg = _ary[i].split('=');
				o[_arg[0]] = _arg[1];				
			}
			return o;
		},
		replaceUrl: function(s) {
			s = s.replace(/[\/\-# ]+/ig, '-');
			s = s.replace(/[\?]+/ig, '');
			return s;
		}		
	};
	
});