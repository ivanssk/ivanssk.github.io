$(function(){
			
	$.fn.friend = {
		
		add: function(_data) {

				var _options = {
					url: '/ajax/member/friend/add.php',
					type: 'post',
					dataType: 'xml',
					data: _data,
					success: function(data) {
								
						var _code = $(data).find('code').first().text();
						var _msg = $(data).find('msg').first().text();

						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "</div>",
							buttons: [
								{
									text: "確定",
									click: function(e) {
										$.fn.destroy_all_dialog();
									}
							}]
						};
					
						$.fn.replace_dialog(setting);								
					}
				};
		
				$.ajax(_options);
			
		},
		
		remove: function(_data) {

			var _options = {
				url: '/ajax/member/friend/delete.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();

					var setting = {
						id: 'dialog_message',
						title: '',
						html: "<div class=\"align-center\">" + _msg + "</div>",
						buttons: [
							{
								text: "確定",
								click: function(e) {
									e.preventDefault();
									$.fn.destroy_all_dialog();
								}
						}]
					};
					
					$.fn.replace_dialog(setting);
				}
			};
					
			$.ajax(_options);
			
		}		

	};
		
	$(document).on('click', 'div.friend-block a.delete-friend', function(e){
		e.preventDefault();

		if ( $(this).hasClass('login-first') ) {
			return true;
		}

		var _data = 'account=' + $(this).attr('data-value');

		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">您確定要將 " + $(this).attr('data-nickname') + " 刪除?</div>",
			width: 300,
			height: 140,
			buttons: [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$.fn.friend.remove(_data);
					}
				},
				{
					text: "取消",
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_dialog('dialog_message');
					}
				}
			]
			
		};
		
		$.fn.show_dialog(setting);
				
	});
		
	$(document).on('click', 'div.friend-block a.add-friend', function(e){
		e.preventDefault();

		if ( $(this).hasClass('login-first') ) {
			return true;
		}
		
		var _data = 'account=' + $(this).attr('data-value');
		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">您確定要將 " + $(this).attr('data-nickname') + " 加為好友?</div>",
			width: 300,
			buttons: [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$.fn.friend.add(_data);
					}
			}]
		};
		
		$.fn.show_dialog(setting);
				
	});
	

});
