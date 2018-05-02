$(function(){
	
	$.fn.convert_obj_to_query_str = function(_data_obj){
	    var tmp_ary = [];
	    for (var index in _data_obj) {
			if ( _data_obj.hasOwnProperty(index) ) {
				tmp_ary.push(index + '=' + _data_obj[index]);
			}
		}
		tmp_ary.push();		
		return tmp_ary.join('&');
	};
	
	$.fn.comment = {
		
		encodeHTML: function(text) {
			return text
				   .replace(/&/g, "&amp;")
				   .replace(/</g, "&lt;")
				   .replace(/>/g, "&gt;")
				   .replace(/"/g, "&quot;")				   
				   .replace(/[\r\n]+/g, "<br />")
				   .replace(/'/g, "&#039;");
		},

		decodeHTML: function(text) {
			return text
				   .replace(/&amp;/g, "&")
				   .replace(/&lt;/g, "<")
				   .replace(/&gt;/g, ">")
				   .replace(/&quot;/g, "\"")
				   .replace(/[\r\n]/g, "")
				   .replace(/<br ?\/?>/ig, "\n")
				   .replace(/&#039;/g, "'");
		},
		
		remove: function($container, _data_obj) {

			$frm = $('dl.comment-list > dt').find('form.frm_comment').first();
		
			var _data = $.fn.convert_obj_to_query_str(_data_obj);
						
			var _options = {
				url: '/ajax/talk/delete.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				beforesend: function() {
					$container.animate({ opacity: 0.5 }, 200);
				},
				
				success: function(data) {
					var _code = $(data).find('code').first().text();				
					var _msg = $(data).find('msg').first().text();
																
					if ( _code == 1 ) {
						setTimeout(function(){
										$.fn.comment.update_most_reply(_data_obj);
									}, 100);
							

						$container.animate({ opacity: 1 }, 200, function(){
							$(this).removeClass('enabled').addClass('deleted');
						});
												
					}
				}
			};
		
			$.ajax(_options);
		},
		
		show_image_preview_block: function($container, _destfile, _thumbfile) {

			$h = $("<a></a>").addClass('thumbnail').attr('href', _destfile).attr('target', '_blank').appendTo($container);
			$("<img></img>").attr('src', _thumbfile).attr('border', 0).appendTo($h);
						
			$container.addClass('success');
			$container.parents('form').first().children('input[id="imgurl"]').first().val(_destfile);
						
		},
		
		clean_image_preview_block: function($btn) {
			
			if ( typeof $btn == 'undefined' || $btn.length <= 0 ) {
				console.log('remove image preview block undefined');
				return false;
			}
			
			$btn.siblings('.thumbnail').first().children().remove();
			$btn.parent('.image-preview-block').first().addClass('hidden');
			$f = $btn.parents('form').first();
			$f.children('input[name="imgurl"]').first().val('');
			$f.siblings('a.upload-photo').first().removeClass('hidden');
			
		},

		upload: function($href) {
			
			$frm_upload_photo = $('#frm_upload_photo').first();
			if ( $frm_upload_photo.length > 0 ){
				
				if ( $frm_upload_photo.find('input[name="watermark"]:checked').length <= 0 ) {
					$.fn.switch_dialog(0, '請選擇浮水印選項');
					return false;
				}
				
				if ( $frm_upload_photo.find('input[type="file"]').first().val() == '' ) {
					$.fn.switch_dialog(0, '請選擇要上傳的圖片檔案');
					return false;
				}
				
				$frm_comment = $href.siblings('form.frm_comment').first();
				$d = $frm_comment.find('div.image-preview-block').first();
				if ( $d.length <= 0 ) {
					console.log('image-preview-block is not exists!');
					return false;
				}
				
				$d.removeClass('hidden');
				$tb = $d.children('.thumbnail').first().removeClass('failure');
				$tb.children().remove();
				
				$.fn.close_dialog('dialog');
				$('#member-overlay').remove();

				var _data = new FormData($frm_upload_photo[0]);

				$.ajax({
					url: '/ajax/talk/upload.php',
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
						var _site = $(data).find('site').first().text();
						var _filename = $(data).find('filename').first().text();
						
						$tb.siblings('a.remove').removeClass('hidden');

						if ( parseInt(_code, 10) == 1 ) {
							$frm_upload_photo.children('input[name="imgurl"]').first().val(_filename);
							$.fn.comment.process_photo($tb, $frm_upload_photo.serialize());
						}
						else {
							$tb.addClass('failure');
							$('<span></span>').html(_msg).appendTo($tb);
						}

						$href.addClass('hidden');
						
				    }
				});

				
			}
			else {
				$.fn.destroy_all_dialog();
			}

		},
		
		process_photo: function($container, _data){
						
			$.ajax({
				url: 'http://timg.eprice.com.tw/common/swfupload/process.json.php',
			    data: _data,
				async: true,
			    type: 'post',
				dataType: 'jsonp',
			    success: function(jdata){
					/*
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					var _imgurl = $(data).find('imgurl').first().text();
					*/
					var _code = jdata.code;
					var _msg = jdata.msg;
					var _destfile = jdata.destfile;
					var _thumbfile = jdata.thumbfile;
					
					if ( parseInt(_code, 10) == 1 ) {
						$.fn.comment.show_image_preview_block($container, _destfile, _thumbfile);
					}
					else {
						$container.addClass('failure');
						$('<span></span>').html(_msg).appendTo($container);
					}
			    }
			});
			
		},
		
		update_most_reply: function(_data_obj) {
			
			// 更新主文內容
			var _data = 'lib=' + _data_obj.lib + '&prod_id=' + _data_obj.prod_id;
			$.ajax({
				url: 'http://timg.eprice.com.tw/supertool/tw/update_most_reply.json.php',
				type: 'GET',
				async: false,
				dataType: 'jsonp',
				data: _data,
				success: function (jdata) {
					console.log('update_most_reply success');
				}
			});
			
		},
		
		move_attachment: function($ucb, _data_obj) {
			
			var _data = $.fn.convert_obj_to_query_str(_data_obj);
			
			$.ajax({
				url: 'http://timg.eprice.com.tw/common/swfupload/move.json.php',
				data: _data,
				type: 'post',
				async: false,
				dataType: 'jsonp',
				success: function (jdata) {
					var _code = jdata.code;
					var _msg = jdata.msg;
					var _content = jdata.content;
					
					//console.log(_msg);
					_code = parseInt(_code, 10);
					if ( _code == 1 ) {
						_data_obj.content = _content;
						if ( _data_obj.action = 'reply' ) {
							if ( _data_obj.level == '2' ) {
								$.Messages.show({
									account: _data_obj.account,
									action: 'article_reply',
									timestamp: _data_obj.timestamp,
								});
								/*
								// 回覆此樓成功
								var setting = {
									id: 'dialog_message',
									title: '',
									html: "<div class=\"align-center\">" + _msg + "</div>",
									width: 300,
									overlay: false,
									close_btn: false,
									autoFadeOut: true,
									fadeOut: 1000,
									closeDelay: 1000
								};
				
								$.fn.replace_dialog(setting);
								*/
								$.fn.comment.show_new_comment($ucb, _data_obj);
							}
							else {
								location.href = '/' + _data_obj.lib + '/talk/' + _data_obj.prod_id + '/' + _data_obj.par_id + '/1/m/' + _data_obj.tid + '/#' + _data_obj.timestamp;
								return false;
							}
						}
						else {
							$.fn.comment.refresh_new_comment($ucb, _data_obj);
						}
					}
					else {
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">搬移圖片失敗: " + _msg + "</div>",
							width: 300,
							btn_text: '確認',
							btn_click: function() { 
								$.fn.destroy_all_dialog();
							}
						};
												
						$.fn.replace_dialog(setting);						
					}
				}
			});			
			
		},
		
		refresh_new_comment: function($ucb, _data_obj) {
			var _html = $.fn.comment.encodeHTML(_data_obj.content);
			$frm.siblings('div.comment').html(_html).removeClass('hidden');
			$frm.siblings('span.esc-alt').remove();
			$frm.siblings('em').removeClass('hidden');
			$frm.remove();
		},
		
		show_new_comment: function($ucb, _data_obj) {
			// $ucb means div.user-comment-block
			
			$ucb.find('textarea').first().val('回應').addClass('empty').prop('disabled', false);
	
			$.fn.comment.clean_image_preview_block($ucb.find('a.remove').first());

			$parent = $ucb.parents('ul.comment-list').first();
			
			if ( $parent.length > 0 ) {
				// 第二層回文
				$lp = $parent.children('li.post').first();
				$li = $('<li></li>')
					  .addClass(_data_obj.status)
					  .css('opacity', 0)
					  .insertBefore($lp);
					  
				$.fn.create_comment_block($li, _data_obj);
				
				$li.animate({ opacity: 1}, 200, function(){ 
					//$(this).refresh_post_time(_data_obj.timestamp); 
				});

				$lp.addClass('hidden').css('opacity', 1);
			}
			/*
			else {				
				// 新回應要接在 more 之後，這樣才便利使用者讀取
				$dd = $('<dd></dd>').addClass('enabled').css('opacity', 0).appendTo('dl.comment-list');
				$.fn.create_comment_block($dd, _data_obj);
						
				$ul = $('<ul></ul>').addClass('comment-list').appendTo($dd);
				$('<div></div>').addClass('clear').appendTo($dd);
				$li = $('<li></li>').addClass('post').addClass('hidden').appendTo($ul);
		
				$panel = $('dl.comment-list > dt').children().clone();
				$panel.find('input.r-id').first().val(_data_obj.tid);
				$panel.find('textarea').first().css('height', 'auto').focus().val('');
				$panel.appendTo($li);
				
				$dd.animate({ opacity: 1 }, 200, function(){ $(this).refresh_post_time(_data_obj.timestamp); });						
				$ucb.parents('dt').first().fadeTo('fast', 1);
			}
			*/
		
		},
		
		reply: function($frm) {

			var _c = $('textarea', $frm).first().val();
			if ( _c.length <= 0 || _c == '回應' ) {

				var setting = {
					id: 'dialog_message',
					title: '',
					html: "<div class=\"align-center\">請填寫回應內容</div>",
					width: 300,
					btn_text: '確認',				
					btn_click: function() { 
						$.fn.destroy_all_dialog();
					}
				};

				$.fn.show_dialog(setting);

				return false;
			}
			
			$ucb = $frm.parents('div.user-comment-block').first();
			$container = $frm.parents('ul.comment-list').first();
			if ( $container.length <= 0 ) {
				$container = $frm.parents('.comment-block').first();
				if ( $container.length <= 0 ) {
					$container = null;
				}
			}
			else {
				// 內文回應
				$container = $container.find('li.post').first();
			}
			
			var _data = $frm.serialize();
			
			$.ajax({
				url: '/ajax/talk/reply.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				beforeSend: function(){
					if ( $ucb != null ) {
						$ucb.animate({ opacity: 0.5}, 200, function(){
								$ucb.find('a.submit').addClass('hidden');
								$ucb.find('a.upload-photo').addClass('hidden');
								$ucb.find('a.adv-comment').addClass('hidden');
								$ucb.find('textarea').first().prop('disabled', true);
								$('<span></span>').addClass('loading').appendTo($ucb);
							});
					}
				},
				complete: function(){
					if ( $ucb != null ) {
						$ucb.animate({ opacity: 1}, 200, function(){
							$ucb.find('a.submit').removeClass('hidden');
							$ucb.find('a.upload-photo').removeClass('hidden');
							$ucb.find('.loading').remove();
						});
					}
				},
				success: function (data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();				
					if ( _code == 1 ) {
					
						// 更新介面
						$comment = $(data).find('comment').first();
						var _data_obj = [];
						$comment.children().each(function(){
							_data_obj[this.tagName] = $(this).text();
						});
						
						// 搬移圖片
						if ( _data_obj.attachment != '' ) {
							setTimeout(function(){
											$.fn.comment.update_most_reply(_data_obj);
										}, 100);
							$.fn.comment.move_attachment($ucb, _data_obj);							
						}
						else if ( _data_obj.level == '2' ) {

							setTimeout(function(){
											$.fn.comment.update_most_reply(_data_obj);
										}, 100);

							// 回覆此樓成功
							/*
							var setting = {
								id: 'dialog_message',
								title: '',
								html: "<div class=\"align-center\">" + _msg + "</div>",
								width: 300,
								overlay: false,
								close_btn: false,
								autoFadeOut: true,
								fadeOut: 1000,
								closeDelay: 1000
							};
				
							$.fn.replace_dialog(setting);
							*/
							$.Messages.show({
								account: _data_obj.account,
								action: 'article_reply',
								timestamp: _data_obj.timestamp,
							});
							
							$.fn.comment.show_new_comment($ucb, _data_obj);
						}
						else {
							setTimeout(function(){
											$.fn.comment.update_most_reply(_data_obj);
											location.href = '/' + _data_obj.lib + '/talk/' + _data_obj.prod_id + '/' + _data_obj.par_id + '/1/m/' + _data_obj.tid + '/#' + _data_obj.timestamp;
										}, 100);

							return false;
						}
					
					}
					else {
						//alert(_msg);
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "</div>",
							width: 300,
							btn_text: '確認',
							btn_click: function() { 
								$.fn.destroy_all_dialog();
							}
						};
				
						$.fn.replace_dialog(setting);					
	
						if ( $container != null ) {
							$container.animate({ opacity: 1 }, 200);
						}

						if ( $ucb != null ) {
							$ucb.animate({ opacity: 1}, 200, function(){
								$ucb.find('a.submit').removeClass('hidden');
								$ucb.find('a.upload-photo').removeClass('hidden');
								$ucb.find('a.adv-comment').removeClass('hidden');
								$ucb.find('textarea').first().prop('disabled', false);
								$ucb.find('.loading').remove();
							});
						}

					}

				}
			});
			

		}

	};
	
	$(document).on('click', 'div.user-comment-block a.upload-photo', function(e){
		
		e.preventDefault();
		
		if ( $(this).hasClass('login-first') ) {
			return true;
		}
		
		$href = $(this);
		$frm_comment = $href.siblings('form.frm_comment').first();
		var _data = $frm_comment.serialize();

		var _options = {
			url: '/ajax/talk/tpl/photo.tpl.php',
			type: 'post',
			dataType: 'html',
			data: _data,
			success: function(data) {
				var setting = {
					id: 'dialog',
					title: '',
					html: data,
					width: 460,
					close_by_overlay: false,
					btn_text: '上傳',
					btn_click: function() { 
						$.fn.comment.upload($href);
					}
				};
				
				$.fn.show_dialog(setting);
			}
		};
		
		$.ajax(_options);
		
	});
	
	$(document).on('click', 'div.image-preview-block a.remove', function(e){
		e.preventDefault();
		
		$.fn.comment.clean_image_preview_block($(this));		
	});
		

});
