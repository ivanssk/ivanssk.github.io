$(function(){
	
	$.Member = ( typeof $.Member == 'undefined' )? {} : $.Member;
	
	$.Member = {
		
		checkIn: function(callback) {
			var _data = null;
			$.ajax({
				url: '/ajax/member/check-in.php',
				type: 'post',
				dataType: 'json',
				data: _data,
				success: function(oRes) {
					var _code = parseInt(oRes.code, 10);
					if ( _code == 1 ) {
						$.Bonus.showMessage({
							account: oRes.account,
						    action: 'user-' + oRes.action,
						    timestamp: oRes.timestamp
						});
												
					}
					else if ( _code == 2 ) {
						$.ajax({
							url: '/ajax/member/check-update.php',
							type: 'post',
							dataType: 'json',
							data: 'timestamp=' + oRes.timestamp,
							success: function(oRes) {
								console.log('timestamp updated');
							}
						});
						$.Messages.checkUrlToShow();
					}
					else {
						$.Messages.checkUrlToShow();
					}
					callback && callback(oRes);
				}
			});			
		},
		
		refreshUI: function(data) {			
			
			$('.login-first').removeClass('login-first');

			var _class_close = $(data).find('class_close').first().text();
			$('div.user-comment-block > a.abuse').each(function(index, element) {
				$(element).removeClass('abuse').addClass(_class_close); 
            });
						
			var _imgurl = $(data).find('imgurl').first().text();
			$('img.viewer').each(function(index, element) {
            	$(element).attr('src', _imgurl);
			});
						
			var _url = $(data).find('url').first().text();
			$('a.img').filter('.viewer').each(function(index, element) {
				$(element).attr('href', _url);
			});
					
			var _nickname = $(data).find('nickname').first().text();
			var _loginname = $(data).find('loginname').first().text();
			$ul = $('#member-area');
			if ( $ul.length > 0 ) {				
					
				$ul.children().remove();
												
				$li = $('<li></li>').appendTo($ul);
				$("<a></a>")
				.attr('href', '/member/logout.html')
				.attr('title', '登出')
				.text("登出").appendTo($li);
						
				$li = $('<li></li>').appendTo($ul);
				$("<a></a>")
				.attr('href', '/member/pm/?type=in')
				.attr('title', '私人訊息')
				.text("訊息").appendTo($li);
				
				$li = $('<li></li>').appendTo($ul);
				$("<a></a>")
				.attr('href', '/member/')
				.attr('title', '會員專區')				
				.data('value', _loginname)
				.text(_nickname + ' 您好!').appendTo($li);
				
			}
		},
		
		doLogin: function(_callback) {
			
			$frm_login = $('#frm_login').first();
			var _data = $frm_login.serialize();
		
			$.ajax({
				url: '/ajax/member/login.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();

					if ( parseInt(_code, 10) == 1 ) {
						_callback && _callback(data);
					}
					else {
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "</div>",
							width: 300,
							height: 100,
							overlay: false,
							close_btn: false,
							autoFadeOut: true,
							fadeOut: 1000,
							closeDelay: 1000
						};

						$.fn.close_dialog('dialog');					
						$('#member-overlay').remove();
						$.fn.replace_dialog(setting);						
					}
					
				}
			});
		},
		
		login: function(_account) {

			var _data = 'account=' + _account;

			$.ajax({
				url: '/ajax/member/tpl/login.tpl.php',
				type: 'post',
				dataType: 'html',
				data: _data,
				beforeSend: function() {
					var setting = {
						id: 'dialog',
						title: '',
						html: "<div class=\"align-center\">讀取登入畫面中，請稍候...<br /><br /></div>",
						width: 320,
						close_by_overlay: false,
						close_btn: false
					};
				
					$.fn.replace_dialog(setting);
				},			
				success: function(data) {
					var setting = {
						id: 'dialog',
						title: '',
						html: data,
						width: 320
					};
					
					$.fn.replace_dialog(setting);
				}
			});
			
		},
		
		checkThenLogin: function() {
			
			$frm_login = $('#frm_login').first();
			$frm_login.validate({ 

				onkeyup: false,
	 			onfocusout: false,
				onclick: false,

				messages: {
					username: {
						required: '請填上帳號'
					},
					password: {
						required: '請填上密碼'
					}
				},

				showErrors: function(errorMap, errorList) {
					
					if ( errorList.length > 0 ) {
						if ( typeof $.fn.show_alert_dialog != 'undefined' ) {
							$.fn.show_alert_dialog(errorList[0].message);
						}
						else {
							alert(errorList[0].message);
						}
					}
					
				},
				
				submitHandler: function(form) {

					var _data = $frm_login.serialize();
					$.ajax({
						url: '/ajax/member/check.php',
						type: 'post',
						dataType: 'xml',
						data: _data,
						beforeSend: function() {
							var setting = {
								id: 'dialog_message',
								title: '',
								html: "<div class=\"align-center\">登入檢查中，請稍候...<br />(系統忙碌時，可能需要等候約1分鐘)<br /><br /></div>",
								width: 320,
								close_by_overlay: false,
								close_btn: false
							};
							
							$.fn.replace_dialog(setting);
						},
						success: function(data) {
							
							var _code = $(data).find('code').first().text();
							var _msg = $(data).find('msg').first().text();
							if ( parseInt(_code, 10) == 1 ) {
								$.Member.doLogin(function(data){
									
									var _timestamp = $(data).find('timestamp').first().text();
									var _action = $(data).find('exp_action').first().text();
									var _account = $(data).find('loginname').first().text();									
									var _url = $(data).find('url').first().text();
									
									location.href = _url + '#' + _timestamp;
								});
							}
							else {
								$.fn.show_alert_dialog(_msg);
							}
	
						}
						
					});
					
				}
		
			});
		
			$frm_login.trigger('submit');

		},
		
		loadDisabledDialog: function(account, callback) {
			$href = $('#member-area li.nickname a[data-value]').first();
			if ( $href.length <= 0 ) {
				return false;
			}
			
			var viewer = $href.data('value');
			if ( viewer == '' ) {
				return false;
			}
			
			$b = $('body').first();
			var $d = $('<div />').attr('id', 'user-disabled-panel')
								 .appendTo($b);
						
			var $frm = $('<form />').attr('id', 'frm-disabled')
									.attr('name', 'frm-disabled')
									.append( $('<input />').attr('id', 'viewer')
										   				   .attr('name', 'viewer')
										   				   .attr('type', 'hidden')
										   				   .val(viewer) )
									.appendTo($d);
			
			$('<ul />').appendTo($frm)
					   .append( $('<li />').text('使用者帳號： ' + account) )
					   .append( $('<li />').text('停權事由 (若要寄送 E-mail 寄給會原，請注意用字)') )
					   .append( $('<li />').append( $('<textarea />').attr('id', 'reason')
												  					 .attr('name', 'reason')
												  					 .addClass('content') ) )
			
					   .append( $('<li />').append( $('<input />').attr('id', 'notify')
												  				  .attr('name', 'notify')
												  				  .attr('type', 'checkbox')
												  				  .prop('checked', true) )
							  			   .append( $('<label />').text('寄送 E-mail 給會員') ) );
			$dialog = $d.dialog({
				width: '400px',
				draggable: false,
				resizable: false,
				buttons: [
					{
						text: '送出',
						'click': function(e){
							e.preventDefault();
							$dialog.dialog( 'close' );
							$.Member.disabled(account, callback);
						}
					}
				]
			});
			
		},
		
		disabled: function(account, callback) {
			
			$frm = $('#frm-disabled').first();								
			var _data = $frm.serialize();

			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/user/disabled/' + account + '/?timestamp=' + (new Date()).getTime(),
				type: 'post',
				dataType: 'json',
				data: _data,
				beforeSend: function() {
					var setting = {
						id: 'dialog_message',
						title: '',
						close_btn: false,
						html: "<div class=\"align-center\">處理中，請稍候...</div>",
						width: 400,
						buttons: []
					};
										
					$.fn.replace_dialog(setting);
										
				},
				success: function(oRes) {
					if ( oRes.errno == 0 ) {
						callback && callback(oRes);
					}
					else {
						$.fn.show_alert_dialog(oRes.msg);
					}
				}
			});
			
		},
		
		checkDataComplete: function(args, callback) {
			var _data = 'account=' + args.account + '&url=' + args.url;
			$.ajax({
				url: '/ajax/member/user/check-data-complete.php',
				type: 'POST',
				dataType: 'json',
				data: _data,
				success: function(oRes) {						
					callback && callback(oRes);
				}
			});				
		},
		
		Article: {
			List: function(args, callback) {
				var _data = null;
				$.ajax({
					url: '//market.eprice.com.tw/api/v1/user/article/' + args.account + '/' + args.type + '/' + args.page + '/' + (new Date()).getTime(),
					type: 'GET',
					dataType: 'json',
					data: _data,
					success: function(oRes) {						
						if ( oRes.errno == '0' ) {
							callback && callback(oRes);
						}
					}
				});				
			}
		}
		
	};
	
});
