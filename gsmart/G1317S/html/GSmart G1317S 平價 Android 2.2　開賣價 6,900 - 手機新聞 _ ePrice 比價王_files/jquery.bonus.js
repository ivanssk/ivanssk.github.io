$(function(){
	
	$.Bonus = {
		retry: 0,
		showMessage: function(args) {
			args.api = 'https://market.eprice.com.tw/api/v1/message/bonus/' + args.account + '/' + args.action + '/';
			$.Messages.show(args);
		},
		insert: function(args, callback) {			
			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/bonus/user/' + args.action + '/' + args.account + '/',
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
				url: '//market.eprice.com.tw/api/v1/bonus/log/' + args.action + '/' + args.account + '/' + args.page + '/',
				dataType: 'json',
				data: null,
				type: 'GET',
				timeout: 3000,
				error: function(xhr, txtStatus, errorThrown) {
					if ( txtStatus == 'timeout' && this.retry < 5 ) {
						this.retry++;
						//console.log('retry ' + this.retry);
						setTimeout(function(){
							this.showLog(args,callback);
						}, 1000);
					}				
				},
				complete: function(xhr, txtStatus) {
					this.retry = 0;					
				},
				success: function(oRes) {
					if ( oRes.errno == '0' ) {
						callback && callback(oRes);
					}

				}
			});
		}
	};
	
});