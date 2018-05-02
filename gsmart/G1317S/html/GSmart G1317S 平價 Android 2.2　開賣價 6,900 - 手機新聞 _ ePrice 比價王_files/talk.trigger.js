$(function(){

	$.Layout = ( typeof $.Layout == 'undefined' )? {} : $.Layout;
	
	$.Layout.showAlertMessage = function(msg) {
		var setting = {
			id: 'dialog-message',
			title: '',		
			close_btn: false,
			html: "<div class=\"text-center\">" + msg + "</div>",
			width: 400,
			buttons: [
				{
					text: '確定',
					click: function() {
						$.dialog.close_dialog('dialog-message');
					}
				}
			]
		};
										
		$.dialog.replace_dialog(setting);
	};
	
	$.Layout.Thread = ( typeof $.Layout.Thread == 'undefined' )? {} : $.Layout.Thread;
	
	$.Layout.Thread.EP = {
		init: function() {
			if ( typeof $.gv != 'undefined' ) {
				if ( $('dl.thread-list').length > 0 ) {
					$.Layout.Thread.EP.loadData({
						'site': $.gv.site,
						'lib': $.gv.lib,
						'talk-id': $.gv['talk-id']
					}, $.Layout.Thread.EP.showData);
				}
			}
			else {
				setTimeout(function(){
					$.Layout.Thread.EP.init();
				}, 500);
			}
		},		
		loadData: function(args, callback){
			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/bonus/article/' + args.site + '/' + args.lib + '/' + args['talk-id'] + '/',
				type: 'GET',
				dataType: 'json',
				data: $.param(args),
				success: function(oRes) {
					var _errno = parseInt(oRes.errno, 10);
					var _msg = oRes.msg;
			
					if ( _errno == 0 ) {
						callback && callback(oRes);						
					}
					else {
						$.dialog.show_alert_dialog("<div class=\"text-center\">" + _msg + "</div>");
					}
				}
			});			
		},
		showData: function(oRes){
			
			$.each(oRes.res, function(idx, data){
				var callbackWearBadge = null;
				switch(data.action) {
					case 'sp-article-suggested' :
						data.res = data.res.slice(0,1);
					case 'sp-article-selected' :
						callbackWearBadge = $.Layout.Thread.EP.wearBadgeLv1;
						break;
					case 'sp-article-event': 
						callbackWearBadge = $.Layout.Thread.EP.wearBadgeLv2;
						break;
				}
				
				if ( callbackWearBadge != null ){
					$.each(data.res, function(idx,record){
						callbackWearBadge(record);
					});
				}				
			});

		},
		wearBadgeLv1: function(data) {
			var $oBadge = $('<div />').addClass('ep-badge article-selected text-center')
									  .append( $('<strong />').text( $.Parser.numberWithCommas(data.comment.pt) )
											  				  .append( $('<small />').text(' EP') ) );
			
			var $p = $('dd[data-id="' + data.comment['talk-id'] + '"]').first();
			var $r = $p.find('.article-right').first();
			$oBadge.insertBefore($r);
		},
		wearBadgeLv2: function(data){			
			var $p = $('dd[data-id="' + data.comment['talk-id'] + '"]').first();
			if ( $p.length > 0 ) {
				
				var $oBadge = $('<div />').addClass('ep-badge article-event text-center')
										  .append( $('<span />').text( '此文額外獲得' ) )
									  	  .append( $('<strong />').text( $.Parser.numberWithCommas(data.comment.pt) )
												  				  .append( $('<small />').text('EP') ) )
									  	  .append( $('<span />').text('獎勵點數') );
				
				if ( data.comment['talk-id'] == $.gv['talk-id'] ) {
					var $c = $p.find('.social-share-block').last();
				}
				else {
					var $c = $p.find('.comment-list').first();			
				}
				
				$oBadge.insertBefore($c);
				$('<div />').addClass('clearfix')
							.insertBefore($c);
			}
		},
		sendData: function(args, callback) {
			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/bonus/user/' + args.action + '/' + args.account + '/',
				type: 'post',
				dataType: 'json',
				data: $.param(args),
				beforeSend: function() {
					var setting = {
						id: 'dialog-add-bonus',
						title: '',						
						close_btn: false,
						html: "<div class=\"text-center\">處理中，請稍候...</div>",
						width: 400,
						buttons: []
					};
										
					$.dialog.replace_dialog(setting);
				},
				success: function(oRes) {										
					if ( oRes.errno == 0 ) {
						callback && callback(oRes);
					}
					else {
						$.Layout.showAlertMessage(oRes.msg);						
					}
				}
			});
			
		},
		deleteLog: function(args, callback) {			
			$.ajax({
				url: 'https://market.eprice.com.tw/api/v1/bonus/delete/article/' + args.action + '/',
				type: 'POST',
				dataType: 'json',
				data: $.param(args),
				success: function(oRes) {
					var _errno = parseInt(oRes.errno, 10);
					var _msg = oRes.msg;
			
					if ( _errno == 0 ) {
						callback && callback(oRes);						
					}
					else {
						$.dialog.show_alert_dialog("<div class=\"text-center\">" + _msg + "</div>");
					}
				}
			});			
		}		
	};
		
	
	/* 相關產品開始 */
	$('.related-product .h-list li, .related-product .product-block').bind('mouseenter', function(e){
		$(this).removeClass('normal').addClass('selected');
	})
	.bind('mouseleave', function(e){
		$(this).removeClass('selected').addClass('normal');
	});

	$('.related-product a.prev').bind('click', function(e){
		e.preventDefault();
		$gContainer = $(this).siblings('.h-list').first();
		var _current_page = parseInt($gContainer.attr('data-current-page'), 10);
		var _total_page = parseInt($gContainer.attr('data-total-page'), 10);

		if ( $(this).parent().hasClass('related-video') ) {
			var _amount_of_page = 4;
		}
		else {
			var _amount_of_page = 5;
		}

		if ( isNaN(_current_page) || isNaN(_total_page) ) { return false; }

		if ( _current_page > 1 ) {
			$children = $gContainer.children(':not(.sepline)');
			var _total_child_count = $children.length - 1;
			
			var _sIdx = Math.max(0, _current_page - 1)*_amount_of_page;
			var _eIdx = Math.max(0, Math.min( _sIdx + _amount_of_page, _total_child_count));
			if ( _sIdx == _eIdx ) {
				$children.slice(_sIdx).animate({ opacity: 0 }, 300, function(){ $(this).addClass('hidden'); });
			}
			else {
				$children.slice(_sIdx, _eIdx).animate({ opacity: 0 }, 300, function(){ $(this).addClass('hidden'); });
			}

			_current_page -= 1;
			var _sIdx = Math.max(0, _current_page - 1 )*_amount_of_page;
			var _eIdx = Math.max(0, Math.min( _sIdx + _amount_of_page, _total_child_count));			
			if ( _sIdx == _eIdx ) {
				$children.slice(_sIdx).removeClass('hidden').animate({ opacity: 1 }, 300);
			}
			else {
				$children.slice(_sIdx, _eIdx).removeClass('hidden').animate({ opacity: 1 }, 300);
			}

			$gContainer.attr('data-current-page', _current_page);

			if ( _current_page < _total_page ) {
				$gContainer.siblings('.next').first().removeClass('disabled');
			}

			if ( _current_page <= 1 ) {
				$gContainer.siblings('.prev').first().addClass('disabled');
			}

		}
		
	});

	$('.related-product a.next').bind('click', function(e){

		e.preventDefault();
		$gContainer = $(this).siblings('.h-list').first();
		var _current_page = parseInt($gContainer.attr('data-current-page'), 10);
		var _total_page = parseInt($gContainer.attr('data-total-page'), 10);
		
		if ( $(this).parent().hasClass('related-video') ) {
			var _amount_of_page = 4;
		}
		else {
			var _amount_of_page = 5;
		}
		
		if ( isNaN(_current_page) || isNaN(_total_page) ) { return false; }
		
		if ( _current_page < _total_page ) {
			$children = $gContainer.children(':not(.sepline)');
			var _total_child_count = $children.length - 1;
			
			var _sIdx = Math.max(0, _current_page - 1 )*_amount_of_page;
			var _eIdx = Math.max(0, Math.min( _sIdx + _amount_of_page, _total_child_count));
			if ( _sIdx == _eIdx ) {
				$children.slice(_sIdx).animate({ opacity: 0 }, 300, function(){ $(this).addClass('hidden'); });
			}
			else {
				$children.slice(_sIdx, _eIdx).animate({ opacity: 0 }, 300, function(){ $(this).addClass('hidden'); });
			}

			_current_page += 1;
			var _sIdx = Math.max(0, _current_page - 1 )*_amount_of_page;
			var _eIdx = Math.max(0, Math.min( _sIdx + _amount_of_page, _total_child_count));
			if ( _sIdx == _eIdx ) {
				$children.slice(_sIdx).removeClass('hidden').animate({ opacity: 1 }, 300);
			}
			else {
				$children.slice(_sIdx, _eIdx).removeClass('hidden').animate({ opacity: 1 }, 300);
			}
			
			$gContainer.attr('data-current-page', _current_page);

			if ( _current_page >= _total_page ) {
				$gContainer.siblings('.next').first().addClass('disabled');
			}

			if ( _current_page > 1 ) {
				$gContainer.siblings('.prev').first().removeClass('disabled');
			}
		}
		
	});
	/* 相關產品結束 */
	
	
	$("dl dd iframe").each(function(index, element){
		
		var _src = $(element).attr('src');
		if ( typeof _src == 'undefined' ) { return true; }

		if ( !/wmode=/.test(_src) ) {
			if ( _src.indexOf('?') < 0 ) {
				_src = _src + '?wmode=opaque';
			}
			else {
				_src = _src + '&wmode=opaque';
			}
		}
		else {
			_src = _src.replace(/wmode=[^&$]+/, 'wmode=opaque');
		}
		
		$(element).attr('src', _src);
		
	});

	$(document).on('mouseenter mousemove', 'ul.comment-list li:not(.post)', function(){

		if ( $(this).hasClass('deleted') ) {
			return false;
		}

		$(this).find('a.delete').first().removeClass('hidden');
		
	})
	.on('mouseleave', 'ul.comment-list li:not(.post)', function(){
		if ( $(this).find('form').length > 0 ) {
			return false;
		}
		$(this).find('a.delete').first().addClass('hidden');
	});


	/*
	$('ul.mgmt-btn-list li a[data-url]').each(function(index, element) {
		$(this).attr('href', $(this).data('url'))
		.removeData('url');
    });
	*/
	
	$(document).on('click', 'ul.mgmt-btn-list li.expand a', function(e){
		e.preventDefault();		
		$p = $(this).parents('ul').first();
		if ( $p.hasClass('expanded') ) {
			var _h = $p.children('li').first().height();
			$p.animate({ 'height' : _h }, 300, function(e){ $(this).removeClass('expanded').children('li:not(.expand)').css('display', 'none'); });
			$(this).text('更多功能').removeClass('collapse');
		}
		else {
			var _h = $p.children('li').first().height() * $p.children('li').length;
			$p.css('height', $p.children('li').first().height());
			$p.children('li').css('display', 'block');
			$p.animate({ 'height' : _h }, 300, function(e){ $(this).addClass('expanded'); });
			$(this).text('隱藏功能').addClass('collapse');
		}
	});

	
	$('dd > .user-comment-block a[data-url]').each(function(index, element) {
		var _url = $(this).attr('url');
		if ( /ori\.(jpg|jpeg|png|gif)/.test(_url.toLowerCase()) ) {
			$(element).bind('mouseenter', function(){
				$(this).css('opacity', 0.8);
			})
			.bind('mouseleave', function(){
				$(this).css('opacity', 1);
			});
		}
	});
	
	$(document).on('click', 'ul.mgmt-btn-list li a.delete', function(e){
		e.preventDefault();
		
		$container = $(this).parents('ul.comment-list').first();
		if ( $container.length <= 0 ) {
			$container = $(this).parents('dd').first();
		}
		else {
			$container = $(this).parents('.mgmt-btn-list').parent();
		}
				
		var _data_obj = {
			lib: $(this).data('lib'),
			prod_id: $(this).data('prod-id'),
			par_id: $(this).data('par-id'),
			tid: $(this).attr('data-id'),
			level: '1'
		};
		
		var _msg = "您確定要將此";
		_msg += ( _data_obj.par_id == _data_obj.tid )? "文章" : "回應";
		_msg += "刪除?";
		
		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">" + _msg + "</div>",
			width: 300,
			buttons: [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$.fn.comment.remove($container, _data_obj);
						if ( _data_obj.par_id == _data_obj.tid ) {
							location.href = '/' + _data_obj.lib + '/talk/' + _data_obj.prod_id + '/0/1/';
						}
						else {
							$.fn.destroy_all_dialog();
						}
					}
				},
				{
					text: "取消",
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_all_dialog();
					}
				}
			]
			
		};
		
		$.fn.replace_dialog(setting);

	});

	$('ul.mgmt-btn-list li a.top, ul.mgmt-btn-list li a.locked').bind('click', function(e){
		e.preventDefault();
		
		$btn = $(this);		
		var _data = 'lib=' + $btn.data('lib') + '&tid=' + $btn.attr('data-id');
		
		var _op = $btn.data('op');
		var _op_txt = '';		
		switch(_op) {
			case 'top' :
				_op_txt = '置頂';
				break;
			case 'locked' :
				_op_txt = '鎖定';
				break;
		}
		
		if ( $btn.hasClass('selected') ) {
			var _msg = '您確定要將此文取消' + _op_txt + '?';
			var _url = '/ajax/talk/' + _op + '.down.php';
		}
		else {
			var _msg = '您確定要將此文' + _op_txt + '?';
			var _url = '/ajax/talk/' + _op + '.up.php';
		}
				
		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">" + _msg + "</div>",
			width: 300,
			buttons: [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();

						$.ajax({
							url: _url,
							type: 'post',
							dataType: 'xml',
							async: false,
							data: _data,				
							success: function(data) {
								var _code = $(data).find('code').first().text();				
								var _msg = $(data).find('msg').first().text();
																
								if ( _code == 1 ) {
									$btn = $('ul.mgmt-btn-list li a.' + _op).first();
									if ( $btn.hasClass('selected') ) {
										$btn.removeClass('selected')
											.addClass('normal')
											.attr('title', _op_txt)
											.text(_op_txt);
									}
									else {
										$btn.removeClass('normal')
											.addClass('selected')
											.attr('title', '取消' + _op_txt)
											.text('取消' + _op_txt);
									}

								}
								
								var setting = {
									id: 'dialog_message',
									title: '',
									html: "<div class=\"align-center\">" + _msg + "</div>",
									width: 300,
									buttons: [
										{
											text: '確定',
											click: function(e){
												$.fn.destroy_all_dialog();
											}
										}
									]
								};
									
								$.fn.replace_dialog(setting);

							}
							
						});
						
					}
				},
				{
					text: "取消",
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_all_dialog();
					}
				}
			]
			
		};
		
		$.fn.replace_dialog(setting);

	});


	$('ul.mgmt-btn-list li a.user-disable').bind('click', function(e){
		e.preventDefault();
		
		var doDisableCallback = function() {
			$frm_disabled = $('#frm-disabled').first();
								
			var _u = $('#u', $frm_disabled).val();
			var _reason = $('#reason', $frm_disabled).val();
								
			var _data = 'u=' + _u + '&reason=' + _reason;

			$.ajax({
				url: '/ajax/talk/disabled.php',
				type: 'post',
				dataType: 'xml',
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
				success: function(data) {
										
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();

					if ( _code == '1' ) {
						setTimeout(function(){
							$.fn.comment.update_most_reply(_data_obj);
							location.reload(true);
						}, 100);
					}
					else {
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "</div>",
							width: 400,
							buttons: [
								{
									text: '確定',
									click: function(e){
										$.fn.destroy_all_dialog();
									}
								}
							]
						};
										
						$.fn.replace_dialog(setting);

					}
				}
			});	
		};
		
		var loadDialogSuccessCallback = function(data) {
			var setting = {
				id: 'dialog_message',
				title: '',
				html: "<div class=\"align-center\">" + data + "</div>",
				width: Math.min(400, $(window).width()),
				close_by_overlay: false,
				buttons: [
					{
						text: '確定',
						click: function(){
							doDisableCallback();
						}
					}
				]
			};
									
			$.fn.replace_dialog(setting);
		};

		$btn = $(this);
		var _id = $btn.attr('data-id');
		var _data = 'u=' + _id;
		var _data_obj = { 'lib' : $btn.data('lib'), 'prod_id' : $btn.data('prod-id') };

		$.ajax({
			url: '/ajax/talk/tpl/disabled.tpl.php',
			type: 'post',
			dataType: 'html',
			async: false,
			data: _data,
			success: function(data) {
				loadDialogSuccessCallback(data);
			}
		});
		
	});


	$('dd a.reply').bind('click', function(e){
		e.preventDefault();

		if ( $(this).hasClass('login-first') ) {
			return true;
		}

		$dd = $(this).parents('dd').first();
		$ul = $dd.find('ul.comment-list').first().removeClass('hidden');
		$post = $ul.children('li.post').removeClass('hidden');
		$post.find('textarea').first().val('').trigger('focus');
	});
	
	$(document).on('keyup', 'form.frm_comment textarea', function(e){

		$p = $(this).parents('li.post');
		if ( $p.length > 0 ){
			// 第二層回應
		}
		else {
			$p = $(this).parent();

			if ( e.keyCode == 13 ) {
				return false;
			}
		}

		if ( e.keyCode == 8 || e.keyCode == 46 ) {
			$(this).css('height', 'auto');
			$(this).parent().css('height', $(this).outerHeight(true));
		}
		
		var _cH = this.clientHeight;
		var _sH = this.scrollHeight;
		if (  _cH < _sH ) {
			$(this).css('height', _sH);
			$(this).parent().css('height', $(this).outerHeight(true));
		}
		
	})
	.on('keydown', 'form.frm_comment textarea', function(e){
		$p = $(this).parents('li.post');
		if ( $p.length > 0 ){
			// 第二層回覆
			if ( e.ctrlKey && e.keyCode == 13) {
			}
			else if ( e.keyCode == 27 ) {
				// ESC
				// 關閉輸入框
				var _text = $(this).val();
				if ( _text == '回應' || _text.length <= 0 ) {
					$(this).val('回應').addClass('empty');
			
					$parent = $(this).parents('ul.comment-list').first();
					if ( $parent.length > 0 ) {
						$parent.find('li.post').addClass('hidden');
					}
				}
			}
		}
		
	})
	.on('focus', 'form.frm_comment textarea', function(){
		
		if ( $(this).hasClass('login-first') ) {
			$.Member.login();
			return true;
		}

		if ( $(this).val() == '回應' ) {
			$(this).val('');			
		}
		$(this).removeClass('empty');
	});
	
	$(document).on('click', 'div.user-comment-block > a.submit', function(e){

		e.preventDefault();

		if ( $(this).hasClass('login-first') ) {
			return true;
		}
		
		$frm = $(this).siblings('form.frm_comment').first();
		$.fn.comment.reply($frm);		
	});

	$('div.user-comment-block > a.adv-comment').each(function(index, element) {
		$(this).bind('click', function(e){
			if ( $(this).hasClass('login-first') ) {
				e.preventDefault();
				return true;
			}
		
			return true;
		});
    });
	
	$.fn.resize_comment_block = function($container) {
		/*
		$h = $container.children('a.nickname').first();
		$c = $container.children('.user-comment-block').first();
		var _w = $container.width() - $h.width();
		$c.css('width', _w - 154);
		*/
	}
		

	$.fn.create_comment_block = function($container, _data_obj) {
				
		$href = $('<a></a>')
		.addClass('nickname')		
		.attr('href', _data_obj.url)
		.attr('target', '_blank')
		.text(_data_obj.nickname)
		.appendTo($container);

		$('<span></span>')
		.addClass('time')
		.text('發表於 ' + _data_obj.time)
		.appendTo($container);

		$_block = $('<div></div>')
				 .addClass('user-comment-block')
				 .html(_data_obj.content)
				 .appendTo($container);

		if ( _data_obj.agent.length > 0 ) {
			$('<br></br>').appendTo($_block);
				
			$('<span></span>')
			.addClass('agent')
			.text(_data_obj.agent)
			.appendTo($_block);
		}
		
		$_block.find('img[alt="icon"]').each(function(index, element) {
			$(this).css('width', 20);
		});
		
		$_ul = $('<ul></ul>').addClass('mgmt-btn-list').appendTo($container);
		$_li = $('<li></li>').appendTo($_ul);		
		
		$('<a></a>')
		.addClass(_data_obj.class_close)
		.addClass('hidden')
		.attr('href', '#')
		.attr('data-name', 'id')
		.attr('data-lib', _data_obj.lib)
		.attr('data-prod-id', _data_obj.prod_id)
		.attr('data-par-id', _data_obj.par_id)
		.attr('data-id', _data_obj.tid)
		.text('刪除')
		.appendTo($_li);

		$('<div></div>').addClass('clear').appendTo($container);	
		
	}
		
	/* 取回第二層回文資料 */
	$.fn.loading_comments = function() {
		$h = $(this).children('a.bm-id').first();
		if ( typeof $h.attr('id') == 'undefined' ) { 
			return false; 
		}
		
		var _prod_id = $h.data('prod-id');
		var _lib = $h.data('lib');
		var _par_id = $h.attr('id');
		var _page = 1;		
		
		var _data = 'lib=' + _lib + '&prod_id=' + _prod_id + '&tid=' + _par_id + '&page=' + _page;		

		$.ajax({
			url: '/ajax/talk/more.php',
			type: 'post',
			dataType: 'xml',
			data: _data,
			success: function (data) {
				var _code = $(data).find('code').first().text();
				var _msg = $(data).find('msg').first().text();
				var _par_id = $(data).find('par_id').first().text();
				var _remained = $(data).find('remained').first().text();
				var _page = $(data).find('page').first().text();
				
				if ( _code == 1 ) {
					$h = $('#' + _par_id);
					$dd = $h.parent();
					if ( $dd.length > 0 ) {

						$ul = $dd.find('ul.comment-list').first();
						$li = $ul.children('li.post').first();
						$comment = $(data).find('comment');						
						if ( $comment.length > 0 ) {
							$ul.removeClass('hidden');

							$comment = $(data).find('comment').each(function() {
								var _data_obj = [];
								$(this).children().each(function(){
									_data_obj[this.tagName] = $(this).text();
								});

								_data_obj.par_id = _par_id;

								$block = $('<li></li>')
										 .addClass(_data_obj.status)
										 .insertBefore($li);
										 
								$.fn.create_comment_block($block, _data_obj);
            		        });

							if ( parseInt(_remained, 10) > 0 ) {
								$li = $('<li></li>').addClass('more').insertBefore($ul.children(':first'));
								$('<a></a>')
								.addClass('more')
								.attr('href', '#')
								.data('par-id', _par_id)
								.data('page', _page)
								.text('顯示較新的 ' + _remained + ' 則留言')
								.appendTo($li);
							}
						}
						else {
							null;
						}
						
					}
					else {
					}
				}
				else {
					alert(_msg);
				}
			}
		});	
	};
	
	$.fn.refresh_post_time = function(_stamp) {
		
		$('em > time[data-stamp="' + _stamp + '"]').each(function(index, element) {
			var _time = $(this).data('time');
			var _timestamp = $(this).data('stamp');				
			var _diff = ( $.now() / 1000 ) - _timestamp;				
				
			var _d = Math.floor(_diff/86400);
			var _h = Math.floor(_diff/3600);
			var _m = Math.floor(_diff/60);
				
			var _txt = "於 ";
			if ( _h >= 24 ) {
				_txt += _time;
			}					
			else if ( _m >= 60 ) {
				_txt += _h + " 小時前";
			}
			else if ( _m >= 1 ) {
				_txt += _m + " 分鐘前";
			}
			else {
				_txt += "幾秒前";
			}

			_txt += $(this).hasClass('modified')? ' 重新編輯' : '';
                
			$(this).text(_txt);
        });
		
		setTimeout("$.fn.refresh_post_time(" + _stamp + ");", $.gv.refresh_post_time_sec);
	};
	

	$('dd').each(function(index, element) {
		$(this).delay(1000).loading_comments();
	});
	
	$('ul.mgmt-btn-list li a.btn-add-bonus').bind('click', function(e){
		e.preventDefault();

		var addBonusToUserCallback = function() {
			$frm = $('#frm-bonus').first();
			var _pt = $frm.find('#pt').val();
			if ( _pt == '' || _pt == '0' ) {
				$.Layout.showAlertMessage('請輸入給分');
				return false;
			}
			
			var args = $frm.serializeArray();
			
			var _action = $frm.find('#action').val();
			var _account = $frm.find('#account').val();			
			
			args.push({
				'name': 'viewer',
				'value': $.gv.viewer
			});
			args.action = _action;
			args.account = _account;
						
			$.Layout.Thread.EP.sendData(args, function(oRes){
				var msg = oRes.msg;
				$.Layout.Thread.EP.deleteLog(args, function(oRes){
					$.dialog.close_dialog('dialog-add-bonus');
					$.dialog.show_alert_dialog(msg);					
				});
			});
		};

		var _data = 'site=' + $.gv.site + '&lib=' + $.gv.lib + '&id=' + $(this).data('id');
		
		$.ajax({
			url: '/ajax/talk/tpl/bonus.tpl.php',
			type: 'post',
			dataType: 'html',
			async: true,
			data: _data,
			beforeSend: function() {
				var setting = {
					id: 'dialog-add-bonus',
					title: '',						
					close_btn: false,
					html: "<div class=\"align-center\">資料讀取中，請稍候...</div>",
					width: 400,
					buttons: []
				};
										
				$.fn.replace_dialog(setting);
			},
			success: function(data) {
				var setting = {
					id: 'dialog-add-bonus',					
					html: "<div class=\"align-center\">" + data + "</div>",					
					close_by_overlay: false,
					width: Math.min(400, $(window).width()),
					buttons: [
						{
							text: '送出',
							click: function(){
								addBonusToUserCallback();
							}
						},
						{
							text: '取消',
							click: function() {
								$.fn.destroy_all_dialog();
							}
						}
					]
				};
									
				$.fn.replace_dialog(setting);
			}
		});
	
	});
		
	$(document).on('click', 'ul.comment-list li.more a.more', function(e){
		e.preventDefault();

		$h = $(this).parents('dd').first().children('a.bm-id').first();
		if ( typeof $h.attr('id') == 'undefined' ) { 
			return false; 
		}
		
		var _prod_id = $h.data('prod-id');
		var _lib = $h.data('lib');
		var _par_id = $h.attr('id');
		var _page = parseInt($(this).data('page'), 10) + 1;
		
		var _data = 'lib=' + _lib + '&prod_id=' + _prod_id + '&tid=' + _par_id + '&page=' + _page;
		$.ajax({
			url: '/ajax/talk/more.php',
			type: 'post',
			dataType: 'xml',
			data: _data,
			success: function (data) {
				var _code = $(data).find('code').first().text();
				var _msg = $(data).find('msg').first().text();
				var _par_id = $(data).find('par_id').first().text();
				var _remained = $(data).find('remained').first().text();
				var _page = $(data).find('page').first().text();
				
				if ( _code == 1 ) {
					$h = $('#' + _par_id);
					$dd = $h.parent();
					if ( $dd.length > 0 ) {

						$ul = $dd.find('ul.comment-list').first();
						$li = $ul.children('li.post').first();
						
						$comment = $(data).find('comment');
						if ( $comment.length > 0 ) {
							$ul.removeClass('hidden');

							$comment = $(data).find('comment').each(function() {
								var _data_obj = [];
								$(this).children().each(function(){
									_data_obj[this.tagName] = $(this).text();
								});
								
								_data_obj.par_id = _par_id;

								$block = $('<li></li>')
										 .addClass(_data_obj.status)
										 .insertBefore($li);
										 
								$.fn.create_comment_block($block, _data_obj);
            		        });
						}
						else {
						}
						
						$ul.find('li.more').remove();
						if ( parseInt(_remained, 10) > 0 ) {								
							$li = $('<li></li>')
							.addClass('more')
							.insertBefore($ul.children(':first'));
								
							$('<a></a>')
							.addClass('more')
							.attr('href', '#')
							.data('par-id', _par_id)
							.data('page', _page)
							.text('顯示較新的 ' + _remained + ' 則留言')
							.appendTo($li);
						}
						else {
							null;
						}

					}
					else {
					}
				}
				else {
				}
			}
			
		});
		
	});


	$('iframe.video-player').each(function(i,f) {
		var _w = $(f).width();
		var _h = _w * 5625 / 10000;			
		$(f).css('height', _h + 'px');		
	});
		
	$('iframe.video-player-640x480').bind('load', function(e){
		var _w = $(this).width();
		_w = ( _w > 640 )? 640 : _w;
		var _h = ( _w / 640 ) * 480;
		$(this).css('width', _w + 'px').css('height', _h + 'px');
	});

	$('iframe.video-player-640x345').bind('load', function(e){
		var _w = $(this).width();
		_w = ( _w > 640 )? 640 : _w;
		var _h = ( _w / 640 ) * 345;
		$(this).css('width', _w + 'px').css('height', _h + 'px');
	});
	
	$.Layout.Thread.EP.init();

});
