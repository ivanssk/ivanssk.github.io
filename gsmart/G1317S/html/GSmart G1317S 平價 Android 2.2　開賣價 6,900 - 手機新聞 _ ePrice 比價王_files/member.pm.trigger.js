$(function(){
	
	$.fn.pm = {
		
		send: function() {
			
			$.fn.close_dialog('dialog');
			$frm = $('#frm_pm').first();
			if ( $frm.length > 0 ) {
				var _data = $frm.serialize();
				var _options = {
					url: '/ajax/member/pm/send.php',
					type: 'post',
					dataType: 'xml',
					data: _data,
					success: function(data) {
						var _code = $(data).find('code').first().text();
						var _msg = $(data).find('msg').first().text();
						$.fn.switch_dialog(_code, _msg);						
					}
				};
				$.ajax(_options);
			}
		
		},
		
		upload: function() {

			$frm = $('#frm_pm').first();
			if ( $frm.length > 0 ) {
				var _data = new FormData($frm[0]);

				$.ajax({
					url: '/ajax/member/pm/upload.php',
				    data: _data,
					async: true,
				    cache: false,
				    contentType: false,
				    processData: false,
				    type: 'post',
					dataType: 'xml',
				    success: function(data){
						var _code = $(data).find('code').first().text();
						var _msg = $(data).find('msg').first().text();
						var _imgurl = $(data).find('imgurl').first().text();
						var _prefix = $(data).find('prefix').first().text();
						
						$container = $frm.find('.thumbnail').first();
						if ( parseInt(_code, 10) == 1 ) {
							
							$container.addClass('success');
							
							$("<label></label>").text("預覽網址:").appendTo($container);
							
							$("<a></a>")
							.attr('target', '_blank')
							.attr('href', _imgurl)
							.addClass('preview')
							.addClass('text-wrap')
							.text(_imgurl)
							.appendTo($container);
							
							$frm.find('input[id="img_url"]').first().val(_prefix);
							$frm.find('input[id="img_counter"]').first().val(1);
							$frm.find('.image-preview-block > .btn-remove').first().removeClass('hidden');
							/*
							$img = $href.children('img').first();
							if ( $img.length > 0 ) {
								$img.attr('src', _imgurl);
							}
							$.fn.destroy_all_dialog();
							*/
						}
						else {
							$container.addClass('failure').text(_msg);
							$frm.find('.image-preview-block > .btn-remove').first().removeClass('hidden');
							/*
							$.fn.switch_dialog(_code, _msg);
							*/
						}
				    }
				});
				
			}
			
		}

	};
	
	$('div.friend-block a.send-pm').bind('click', function(e){

		e.preventDefault();

		if ( $(this).hasClass('login-first') ) {
			return true;
		}
				
		var _data = 'account=' + $(this).attr('data-value');

		var _options = {
			url: '/ajax/member/pm/tpl/write.tpl.php',
			type: 'post',
			dataType: 'html',
			data: _data,
			success: function(data) {
				var setting = {
					id: 'dialog',
					title: '',
					html: data,
					close_by_overlay: false,
					width: 520,
					btn_text: '發送',
					btn_click: function() { 
						$.fn.pm.send(); 
					}
				};
				
				$.fn.show_dialog(setting);
			}
		};
		
		$.ajax(_options);
		
	});
	
	$frm_pmbox = $('#frm_pmbox');
	
	$('ul.field-list', $frm_pmbox).bind('mouseenter', function(){
		$(this).addClass('selected');
	})
	.bind('mouseleave', function(){
		$(this).removeClass('selected');
	});
		
	$(document).on('click', '#frm_pmbox a.select-all, #frm_pmbox a.deselect-all', function(e){
		e.preventDefault();

		if ( $(this).hasClass('select-all') ) {
			$('input[name^="smsg_"], input[name^="msg_"]', $frm_pmbox).each(function(index, element) {
				if ( /_[0-9]+$/.test($(this).attr('id')) ) {
					$(this).prop('checked', true);
				}            
	        });
			$(this).removeClass('select-all').addClass('deselect-all');
		}
		else {
			$('input[name^="smsg_"], input[name^="msg_"]', $frm_pmbox).each(function(index, element) {
				if ( /_[0-9]+$/.test($(this).attr('id')) ) {
					$(this).prop('checked', false);
				}
	        });
			$(this).removeClass('deselect-all').addClass('select-all');
		}		
	});

	$('a.delete-all', $frm_pmbox).bind('click', function(e){
		
		e.preventDefault();

		var setting = {
			id: 'dialog_message',
			title: '',
			width: 300			
		};

		var _length = $('input[name^="smsg_"], input[name^="msg_"]', $frm_pmbox).filter(':checked').length;
		
		if ( _length <= 0 ) {			
			setting.html = "<div class=\"align-center\">請勾選要刪除的訊息</div>";
			setting.buttons = [
				{
					text: '確認',
					click: function(e) {
						$.fn.destroy_all_dialog();
					}
				}
			];
		}
		else {
			setting.html = "<div class=\"align-center\">您確定要將勾選的訊息刪除?</div>";
			setting.buttons = [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$('#frm_pmbox').submit();
					}
				},
				{
					text: "取消",
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_dialog('dialog_message');
					}
				}
			];		
		}


		$.fn.show_dialog(setting);
		
	});
	
	$('div.member-pm-read-toolbar .btn-back-pmbox').bind('click', function(e){
		e.preventDefault();
		location.href = '/member/pm/?type=' + $(this).attr('data-name') + '&page=' + $(this).attr('data-value');
	});
		
	$('div.member-pm-read-toolbar .btn-delete').bind('click', function(e){
		e.preventDefault();

		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">您確定要將刪除此訊息?</div>",
			width: 300,
			buttons: [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$('#frm_delete').submit();
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

	$('div.member-pm-read-toolbar .btn-reply').bind('click', function(e){
		e.preventDefault();

		var _data = 'id=' + $(this).attr('data-value');

		var _options = {
			url: '/ajax/member/pm/tpl/reply.tpl.php',
			type: 'post',
			dataType: 'html',
			data: _data,
			success: function(data) {
				var setting = {
					id: 'dialog',
					title: '',
					html: data,
					width: 520,
					close_by_overlay: false,
					btn_text: '發送',
					btn_click: function() {
						$.fn.pm.send();
					}
				};
				
				$.fn.show_dialog(setting);
				$('#frm_pm').find('textarea').first().focus();
			}
		};
		
		$.ajax(_options);
		
		//$('div.content > div.toolbar').first().css('display', 'none');
		//$('#fast-reply').css('display', 'block').find('textarea').first().focus();
		
	});
	
	$(document).on('click', '#frm_pm a.btn-attachment', function(e){
		e.preventDefault();		
		$(this).siblings('.image-preview-block').children('input[type="file"]').first().click();
	});
	
	$(document).on('click', '#frm_pm a.btn-remove', function(e){
		e.preventDefault();

		$p = $(this).parent('.image-preview-block').first();
		$p.addClass('hidden');
		$p.siblings('a.btn-attachment').first().removeClass('hidden');
		
		$p.children('.thumbnail').children().remove();
		$p.children('.file').val('');

		$frm = $p.parents('form').first();
		$frm.children('input[name="img_counter"]').first().val(0);
		$frm.children('input[name="img_url"]').first().val('');
		
	});

	$(document).on('change', "input:file", function() {
		var filename = $(this).val();
		if ( filename == '' ) {
			console.log('empty');
			return false;
		}
		
		$.fn.pm.upload();
		
		$p = $(this).parent('.image-preview-block').first();
		$p.removeClass('hidden');
		$p.siblings('.btn-attachment').first().addClass('hidden');

	});

});
