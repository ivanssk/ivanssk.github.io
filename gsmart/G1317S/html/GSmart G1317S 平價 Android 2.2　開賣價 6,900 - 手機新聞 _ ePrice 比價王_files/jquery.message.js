$(function(){
	
	$.Messages = {
		checkUrlToShow: function() {
			var _tmp_ary = window.location.href.split('#');
			if ( _tmp_ary.length > 1 ) {
				var _url = _tmp_ary[0];
				var _timestamp = _tmp_ary[1];
				if ( /^[0-9]+$/.test(_timestamp) ) {
					window.history.replaceState({}, "", _url);
					$.Exp.showMessage({ account: $.gv.viewer,
									    action: 'check',
									    timestamp: _timestamp });
				}
			}			
		},
		show: function(args) {
			if ( typeof args.api == 'undefined' ) {
				args.api = 'https://market.eprice.com.tw/api/v1/message/bonus/' + args.account + '/' + args.action + '/';	
			} 
			
			$.ajax({
				url: args.api,
				data: 'timestamp=' + args.timestamp,
				type: 'GET',
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
					
					$.dialog.replace_dialog(setting);
					
					$.Messages.checkUrlToShow();
				},
				success: function(oRes) {
					if ( oRes.errno == 0 ) {
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + oRes.msg + "</div>",
							width: 300,							
							overlay: false,
							close_btn: false,
							autoFadeOut: true,
							fadeOut: 1000,
							closeDelay: 1000
						};
					
						$.dialog.replace_dialog(setting);
					}
					
					$.Messages.checkUrlToShow();
				}
			});
		}
	};
	
});