$(function(){
	
	$.Exp = {
		showMessage: function(args) {
			args.api = 'https://market.eprice.com.tw/api/v1/message/exp/' + args.account + '/' + args.action + '/';
			$.Messages.show(args);
		},
		insert: function(args, callback) {			
			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/exp/' + args.account + '/' + args.action + '/',
				data: $.param(args),
				type: 'POST',
				dataType: 'json',
				error: function( jqXHR, textStatus, errorThrown ) {
					var setting = {
						id: 'dialog_message',
						title: '',
						html: "<div class=\"align-center\">" + errorThrown + "</div>",
						width: 300,
						height: 100,
						overlay: false,
						close_btn: false,
						autoFadeOut: true,
						fadeOut: 1000,
						closeDelay: 1000
					};
					
					$.fn.replace_dialog(setting);
				},
				success: function(oRes) {
					callback && callback(oRes, args);
				}
			});			
		},
		showLog: function(args, callback) {
			$.ajax({
				url: '//market.eprice.com.tw/api/v1/exp/log/' + args.action + '/' + args.account + '/' + args.page + '/',
				dataType: 'json',
				data: null,
				type: 'GET',
				success: function(oRes) {
					if ( oRes.errno == '0' ) {
						callback && callback(oRes);
					}
				}					
			});
		}
	};
	
});