$(function(){
		
	$(document).on('click', 'a.login-first', function(e){		
		e.preventDefault();
		$.Member.login($(this).attr('data-value'));		
	});
		
	$(document).on('keypress', '#frm_login input[id="password"]', function(e){		
		var code = e.keyCode || e.which;
		if( code == 13 ) { //Enter keycode
		   //Do something
		   $(this).parents('form').first().find('a.submit').first().trigger('click');
		   //$('#frm_login a.submit').first().click();
		 }
	});
	
	$(document).on('click', '#frm_login a.submit', function(e){
		e.preventDefault();

		if ( $.fn.CUR_LIB == 'member' ) {			
			if ( $.gv.browser.msie == true ) {
				$(this).parents('form').first().trigger('submit');
			}
			else {
				$.Member.checkThenLogin();
			}						
		}
		else {
			$.Member.doLogin(function(data){
				$.Member.refreshUI(data);

				var _timestamp = $(data).find('timestamp').first().text();
				var _action = $(data).find('exp_action').first().text();
				var _account = $(data).find('loginname').first().text();
				
				$.fn.close_dialog('dialog');
				$('#member-overlay').remove();
				
				$.Exp.showMessage({ 'account': _account,
								    'action': 'user-' + _action,
								    'timestamp' : _timestamp });
			});
		}
	});
	
	$('div.sidebar > ul.menu > li.item > a.change-email').bind('click', function(e){
		e.preventDefault();
		$href = $(this);
		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">您必須先登出才能修改註冊信箱。<br /><em class=\"warning\">注意: 修改信箱後必須重新啟用帳號，否則將無法登入。</em><br />請問您要繼續嗎?<br /><br /></div>",
			width: 400,
			buttons: [
				{
					text: '是',
					click: function(e) { 
						e.preventDefault();
						location.href = '/member/logout.html?cp=' + $href.attr('href');
					}
				},
				{
					text: '否',
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_all_dialog();
					}
				}
			]
		};
				
		$.fn.replace_dialog(setting);		
	});

});
