/* window 重新整理的時候要重新判定 side-tool 的位置 */
if ( typeof $(window).resize != 'undefined' ) {
	$(window).bind('resize', function(e){
		if ( typeof $.fn.reposition != 'undefined' ) {
			$.fn.reposition();
		}
		else {
			setTimeout("$(window).resize();", 1000);
		}
				
		$ov = $('#member-overlay');
		if ( $ov.length > 0 ) {
			var $w = $(window);
			var _h = Math.max($w.height(), $('body').innerHeight());
			$ov.css('width', Math.max(1200, $w.width(), screen.width, $(document).width(), $('body').innerWidth()))
			.css('height', _h);
			/*
			$d = $('.ui-dialog');
			$d.css('top', Math.max(10, ( Math.min($w.height(), screen.height) / 2 ) - ($d.outerHeight(true) / 2)) )
			.css('left', ( Math.min($w.width(), screen.width) / 2 ) - ($d.outerWidth(true) / 2) );			
			*/
		}		
		
		/*
		if ( $('#menu-overlay').length > 0 ) {
			$('#menu-overlay').trigger('click');
		}
		*/
	});
}

$(window)
.bind('scroll', function(e) {
	
	$st = $('#side-tool');
	if ( $st.length > 0 ) {
		$btn = $st.children('a.back-2-top').first();
		if ( $btn.length > 0 ) {
			if ( $(window).scrollTop() > 50 ) {
				$btn.stop().animate({ opacity: 1 }, 100);
			}
			else {
				$btn.stop().animate({ opacity: 0 }, 100);
			}

			if ( typeof $.fn.reposition != 'undefined' ) {
				$.fn.reposition();
			}
			else {
				setTimeout("$(window).trigger('scroll');", 1000);
			}
		}
	}

	var _top = $(window).scrollTop();
	if ( _top > 0 ) {
		//$('#body-header .header-bottom').addClass('fixed').removeClass('hidden');
		$('#body-header').addClass('fixed');
		$('div.ad-1200x629').addClass('crazy-to-top');
		//$('.ad-couplet-left, .ad-couplet-right').addClass('fixed-couplet');
	}
	else {
		//$('#body-header .header-bottom').removeClass('fixed').addClass('hidden');
		$('#body-header').removeClass('fixed');
		$('div.ad-1200x629').removeClass('crazy-to-top');
		//$('.ad-couplet-left, .ad-couplet-right').removeClass('fixed-couplet');
	}

	var _left = parseInt($(window).scrollLeft(), 10);
	var $bc = $('.body-content').first();
	if ( $bc.length > 0 ) {
		var _l = parseInt($bc.offset().left, 10);
		if ( !isNaN(_left) && !isNaN(_l) && _left > _l ) {		
			var _ml = 0 - _left + _l;
			$('#body-header').css('margin-left', _ml);
		}
	}

	if ( $('.side-menu').length > 0 ) {
		var _needFixed = true;
		var _menuHeight = $('.side-menu').first().outerHeight(true);
		var _contentHeight = 0;
		if (  $('.body-content > .content').length > 0 ) {
			_contentHeight = $('.body-content > .content').first().outerHeight(true);
		}
		else if ( $('.body-content > .basic-info').length > 0 ) {
			_contentHeight = $('.body-content > .basic-info').first().outerHeight(true);
			_contentHeight += $('.body-content > .main-block').first().outerHeight(true);
		}
		
		$adSidebar = $('.ad-160x600-g').first();
		if ( $adSidebar.length > 0 && _menuHeight < _contentHeight ) {
			
			var _offsetTopThreshold = 76;
			var _offsetBottomThreshold = 30;
		
			var _sbTop = $adSidebar.offset().top;
			var _sbHeight = $adSidebar.outerHeight(true);
		
			if ( $adSidebar.hasClass('fixed') ) {
				_sbTop = $adSidebar.data('top');
			}
			else {			
				$adSidebar.data('top', _sbTop);
			}
		
			$bf = $('#body-footer').first();
			if ( $bf.length > 0 ) {
				var _bfTop = $bf.offset().top;

				if ( _top + _sbHeight > _bfTop - _offsetTopThreshold ) {
					$adSidebar.css('top', ( _bfTop - _top - _offsetBottomThreshold - _sbHeight ) + 'px');
				}
				else if ( _top >= _sbTop - _offsetTopThreshold ) {
					$adSidebar.addClass('fixed')
							  .css('top', _offsetTopThreshold + 'px');
				}
				else {
					$adSidebar.removeClass('fixed')
							  .css('top', '0px');
				}
			}
			else {
				if ( _top >= _sbTop - _offsetTopThreshold ) {
					$adSidebar.addClass('fixed')
							  .css('top', _offsetTopThreshold + 'px');
				}
				else {
					$adSidebar.removeClass('fixed')
							  .css('top', '0px');
				}
			}
		}
	}
	
	/*
	if ( $('.sticky-ad-outer > .sticky-ad.ad-970x90-g').length > 0 ) {
		$ad = $('.sticky-ad.ad-970x90-g').first();
		if ( _top > 76 ) {
			$ad.addClass('fixed');
		}
		else {
			$ad.removeClass('fixed');
		}
	}
	*/

	if ( typeof $.fb != 'undefined' ) {
		$('li.news > iframe.fblike[data-url]').each(function(index, element) {
			$.fb.like.onscroll($(this));
		});
	}
	
})
.load(function(){

	if ( /\/m\/[0-9]+\/?/.test(window.location.href) ) {
		var _url = window.location.href;
		var _id = _url.replace(/.+\/m\/([0-9]+)\/?/, "$1");
		var _top = $('a[name="' + _id + '"]').first().offset().top;
		$.fn.scroll_page_to_target(_top);
	}	

	if ( /\#review/.test(window.location.hash) ) {
		$('.page-tab-list a[data-page="review"]').trigger('click');

		var _top = $('.page-tab-list').first().offset().top;
		$.fn.scroll_page_to_target(_top);
	}
	
	if ( $(window).height() >= $(document).height() ) {
		/*
		var _bc_height = $('.body-content').first().outerHeight(true);
		var _w_height = $(window).height();
		var _bf_height = $('#body-footer').first().outerHeight(true);
		if ( _w_height - _bc_height - _bf_height > 0 ) {
			$('#body-footer').css('position', 'fixed').css('bottom', 0).css('left', 0);
		}
		*/
		
		/*
		console.log();
		console.log($(window).height());
		console.log($(document).height());
		$bf = $('#body-footer');
		/*
		$bf.css('position', 'absolute')
		   .css('top', '100%')
		   .css('left', '50%')
		   .css('width', $(window).width())
		   .css('margin-top', 0 - $bf.height())
		   .css('margin-left', 0 - $bf.width() / 2);
		*/
	}

});


$(function(){

	$.dialog = ( typeof $.dialog == 'undefined' )? {} : $.dialog;

	$.dialog.getDefaultSetting = function() {
		var setting = {
			id: 'dialog_message',
			title: '',
			html: 'setting is missing',
			width: 300,
			buttons: [
				{
					'text': '確定',
					'click': function(e) {
						e.preventDefault();
						$.dialog.destroy_all_dialog();
					}
				}
			]
		};
		
		return setting;
	};
	
	$.hint = {
		show: function(e, _class, _text){
			$d = $('.hint').filter('.' + _class);
			if ( $d.length <= 0 ) {
				$d = $('<div></div>')
				.addClass('hint')
				.appendTo($('body'));
			}

			var _left = Math.max( 10, Math.min( $(document).width(), $(document).scrollLeft() + e.clientX + 6 ) );
			var _top = Math.max(10, $(document).scrollTop() + e.clientY - $d.outerHeight());
						
			$d.text(_text)
			  .addClass(_class)
			  .css('opacity', 0)
			  .css('left', _left)
			  .css('top', _top);
			  
			if ( $d.attr('animate') == '1' ) {
				$d.stop(true, true);
			}

			$d.attr('animate', '1')
			  .removeClass('hidden')
			  .animate({ 'opacity' : 100 }, 1000, function() { 
			  	$(this).attr('animate', '0'); 
			  });
		},
		hide: function(_class) {
			$d = $('.hint').filter('.' + _class);
			if ( $d.attr('animate') == '1' ) {
				$d.stop(true, true);
			}
				
			$d.attr('animate', '0')
			  .addClass('hidden');
		}
	};

	$.fn.scroll_page_to_target = function(t){
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		$body.animate({ scrollTop: Math.max(0, t - 100) }, 200);
	};

	$.fn.show_event_banner = function(){

		$b = $('.event-banner').first();
		if ( $b.length <= 0 ) {
			$b = $('<div></div>')
		 		 .addClass('event-banner')
				  .append($('<a></a>')
				  		  .attr('href', '//www.eprice.com.tw/ad/redir.html?id=8921')
						  .addClass('event')
						  .attr('target', '_blank'));
		}
		else {
			$b.fadeIn(300);
		}
		
		$bc = $('.body-content').first();
		if ( $bc.length <= 0 ) {
			$bc = $('.align-center').first();
		}
		if ( $bc.length > 0 ) {
			$bc.append($b);
		}
		
	};
	
	$.dialog.show_dialog = function(setting) {
		console.log('show_dialog funciton is called...');
		$.dialog.replace_dialog(setting);
	};
	$.fn.show_dialog = $.dialog.show_dialog;
	
	$.dialog.replace_dialog = function(setting) {

		if ( typeof setting == 'undefined' ) {
			setting = {
				id: 'dialog_message',
				title: '',
				html: 'setting is missing',
				width: 300,
				buttons: [
					{
						text: '確定',
						click: function(e) {
							e.preventDefault();
							$.dialog.destroy_all_dialog();
						}
					}
				]				
			};
		}
		
		if ( typeof setting.close_by_overlay == 'undefined' ) {
			setting.close_by_overlay = true;
		}

		if ( typeof setting.close_btn == 'undefined' ) {
			setting.close_btn = true;
		}

		if ( typeof setting.height == 'undefined' ) {
			setting.height = 'auto';
		}
		
		if ( typeof setting.overlay == 'undefined' ) {
			setting.overlay = true;
		}

		if ( typeof setting.autoFadeOut == 'undefined' ) {
			setting.autoFadeOut = false;
		}
		
		if ( typeof setting.fadeOut == 'undefined' ) {
			setting.fadeOut = 0;
		}

		if ( typeof setting.parentElement == 'undefined' ) {
			setting.parentElement = document;
		}

		
		$dialog = $('#' + setting.id);
		if ( $dialog.length <= 0 ) {
			$dialog = $("<div />")
			.attr('id', setting.id);			
		}
				
		if ( typeof(setting['class']) != 'undefined' ) {
			$dialog.addClass(setting['class']);
		}
		
		if ( typeof setting.buttons == 'undefined' && typeof(setting.btn_text) != 'undefined' ) {
			setting.buttons = [
				{
					text: setting.btn_text,
					click: setting.btn_click
				}
			];
		}
		
		$dialog.html(setting.html);
		
		$dialog.dialog({
			title: setting.title,
			width: setting.width,
			height: setting.height,				
			resizable: false,
			draggable: false,
			closeOnEscape: false,				
			buttons: setting.buttons,
			create: function(e, ui) {				
				if ( setting.parentElement == document ) {
					$('body').addClass('dialog-showing')
							 .data('position', $(window).scrollTop());
				}				
			},
			show: { 
				effect: "fade",
				duration: 300
			},
			beforeClose: function(e, ui) {
				$('body').removeClass('dialog-showing');
			},
			open: function(e, ui) {
				$(this).parent().find('button').each(function(i,b){
					$(b).attr('tabindex', -1);
				});
			}			
		})
		.bind('dialogclose', function(event, ui) { 
			if ( $('.ui-dialog').length <= 1 ) {
				$('#member-overlay').fadeOut(100, function(){ 
					$('#member-overlay').remove(); 
				});
			}
		});

		if ( setting.close_btn == false ) {
			var $bar = $dialog.siblings('.ui-dialog-titlebar');
			if ( $bar.length > 0 ) {
				$bar.find('.ui-dialog-titlebar-close').addClass('hidden');
			}
		}
		
		
		if ( typeof setting.parentElement != 'undefined' ) {
			if ( setting.parentElement == document ) {
				$dialog.parents('.ui-dialog:first').appendTo($('body'));
			}
			else {
				$dialog.parents('.ui-dialog:first').appendTo(setting.parentElement);
			}			
		}
		else {
			$dialog.parents('.ui-dialog:first').appendTo($('body'));
		}

		if ( setting.overlay == true ) {
			$.fn.create_member_overlay(setting);
		}
		
		if ( setting.autoFadeOut == true ) {
			setTimeout(function(){

				$dialog.dialog( "option", "hide", { 
					effect: "fadeOut",
					duration: setting.fadeOut,
					delay: setting.closeDelay
				})
				.dialog("close");
				
			}, 100);
		}
		
	};	
	$.fn.replace_dialog = $.dialog.replace_dialog;
	
	$.dialog.close_dialog = function(_id) {
		$dialog = $('#' + _id);
		if ( $dialog.length > 0 ) {
			$dialog.dialog('close');
		}
	};
	$.fn.close_dialog = $.dialog.close_dialog;

	$.dialog.destroy_dialog = function(_id) {
		$dialog = $('#' + _id);
		if ( $dialog.length > 0 ) {
			$dialog.dialog('close').dialog("destroy").remove();
		}
		
		$d = $('#dialog');
		$dm = $('#dialog_message');
		if ( $d.length <= 0 && $dm.length <= 0 ) {
			$('#member-overlay').fadeOut(200, function(){ $('#member-overlay').remove(); });
		}
	};
	
	$.fn.destroy_dialog = $.dialog.destroy_dialog;

	$.dialog.destroy_all_dialog = function() {
		$('.ui-dialog').each(function(index, element) {
			$(this).children('.ui-dialog-content').first().dialog('close').dialog('destroy').remove();
        });
		$('#member-overlay').fadeOut(200, function(){ $('#member-overlay').remove(); });
	};
	
	$.fn.destroy_all_dialog = $.dialog.destroy_all_dialog;
		
	$.fn.switch_dialog = function(_code, _msg) {

		$.fn.close_dialog('dialog'); 

		var setting = {
			id: 'dialog_message',
			title: '',
			html: "<div class=\"align-center\">" + _msg + "</div>",
			width: 300
		};
		
		if ( parseInt(_code, 10) == 1 ) {
			setting.buttons= [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$.fn.destroy_all_dialog();
					}
				}
			];
		}
		else {
			setting.buttons= [
				{
					text: "確定",
					click: function(e) {
						e.preventDefault();
						$dialog = $('#dialog');
						if ( $dialog.length > 0 ) {
							$dialog.dialog('open');
							$.fn.destroy_dialog('dialog_message');
						}
					}
				}
			];
			
		}
		
		$.fn.replace_dialog(setting);

	};

	$.dialog.show_alert_dialog = function(_msg){
				
		if ( typeof $.fn.replace_dialog != 'undefined' ) {
			var setting = {
				id: 'dialog_message',
				title: '',
				html: "<div class=\"align-center\">" + _msg + "</div>",
				width: 360,
				close_btn: false,
				buttons: [{
					text: '確定',
					click: function(e){
						e.preventDefault();
						$.fn.destroy_all_dialog();
					}
				}]
			};

			$.fn.replace_dialog(setting);
		}
		else {
			setTimeout(function(){
				$.dialog.show_alert_dialog(_msg);
			}, 1000);
		}
		
		
	};
	$.fn.show_alert_dialog = $.dialog.show_alert_dialog;
		
	$.fn.create_member_overlay = function(setting){

		if ( typeof setting == 'undefined' ) {
			var setting = {
			};
		}
		
		if ( typeof setting.close_by_overlay == 'undefined' ) {
			setting.close_by_overlay = true;
		}
		
		if ( typeof setting.parentElement == 'undefined' ) {
			setting.parentElement = document;
		}

		if ( $('#member-overlay').length <= 0 ) {	
			$w = $(window);
			var _h = Math.max($w.height(), $('body').innerHeight());
			var _w = Math.max($w.width(), screen.width, $(document).width(), $('body').innerWidth());
			if ( setting.parentElement != document ) {
				_w = setting.parentElement.innerWidth();
				_h = setting.parentElement.innerHeight();
			}
			$overlay = $("<div></div>")
			.attr('id', 'member-overlay')
			.addClass('overlay')
			.css('zIndex', 1001)
			.css('width', _w)
			.css('height', _h)
			.appendTo((setting.parentElement == document)? $('body') : setting.parentElement);

			 if ( setting.close_by_overlay == true ) {
				$overlay.bind('click', function(){
					$.fn.destroy_all_dialog();
				})
			 }
			 
			 $overlay.fadeIn(1000);
		}
		
	};
	
	$.fn.reposition = function(_duration) {

		if ( isNaN(parseInt(_duration, 10)) ) {
			_duration = 0;
		}
		
		$bc = $('div.body-content').first();
		$bh = $('#body-header').first();
		$bf = $('#body-footer').first();
		
		if ( $bf.length > 0 ) {
			
			if ( $(document).height() < $(window).height() ) {
				
				// 重新判斷 footer 是否過高
				var _top = $(window).height() - $bf.outerHeight(true);
				var _bc_top = parseInt($bc.css('margin-top'), 10);

				// 如果 footer 的 top 比 window 的 height 還低，就重新定位填滿			
				$bc.css('min-height', _top - _bc_top );
			}
			
		}

		// 重新定位
		$st = $('#side-tool').first();
		if ( $st.length > 0 ) {
			$list = $('ul.compare-list', $st).first();
			if ( $list.length <= 0 ) {
				$list = $('ul.intro-func-list', $st).first();
			}
			
			if ( $list.length > 0 ) {
				
				if ( $list.children().length > 2 ) {
					$('.ad-couplet-right').animate({ opacity: 0 }, 300, function(){
						$(this).css('opacity', 1).addClass('hidden');
					});
					
					$list.removeClass('hidden').animate({ opacity: 1 }, 300, function(){
						$.sidetool.position(false, _duration);
					});
					/*
					$.sidetool.position(true, _duration);
					*/
				}
				else if ( false == $list.hasClass('hidden') ) {
					$list.animate({ opacity: 0 }, 300, function(){
						$(this).addClass('hidden');
						$('.ad-couplet-right').css('opacity', 0).removeClass('hidden').animate({ opacity: 1 }, 300);
						$.sidetool.position(true, _duration);
					});
				}
				else {
					$.sidetool.position(true, _duration);
				}

			}
			else {
				$.sidetool.position(true, _duration);
			}

		}
		
	};
	
	$.sidetool = {
		
		position: function(_top_only, _duration) {
			
			$bc = $('div.body-content').first();
			$bh = $('#body-header').first();
			$bf = $('#body-footer').first();
			$st = $('#side-tool').first();
		
			var _sctop = $(window).scrollTop();
			var _bf_offset = $bf.offset();
			var _bc_offset = $bc.offset();
			if ( typeof(_bf_offset) == 'undefined' ) {
				console.log('bf.offset() is null -> ' + $bf);
				return false;
			}

			if ( typeof(_bc_offset) == 'undefined' ) {
				console.log('bc.offset() is null -> ' + $bc);
				return false;
			}

			// 如果 $bf.offset().top - $(window).scrollTop() - $(window).height() < threshold 表示到頁尾
			var _left = Math.max(0, Math.min($(window).width() - $st.width() - 20, $bc.offset().left + 1205));
			//console.log(_left);
			if ( $bf.offset().top - _sctop - $(window).height() < 12 ) {
				if ( _top_only ) {
					_top = $bf.offset().top - _sctop - $st.outerHeight(true) - 6;
				}
				else {
					var _footer_top = $bf.offset().top - _sctop;
					var _st_height = Math.max(0, parseInt($st.css('top'), 10)) + $st.outerHeight(true);
					if ( _st_height > _footer_top ) {
						_top = _footer_top - $st.outerHeight(true) - 30;
					}
					else {
						_top = parseInt($st.css('top'), 10);
					}
				}
			}
			else if ( _top_only ) {
				_top = $(window).height()  - $st.outerHeight(true) - 30;
			}
			else {
				_top = $(window).height()/2;
				//_top -= Math.max( $bh.height() + 10, $st.height() / 2, 0 );
				_top = Math.max(250, _top - Math.max($bh.height(), $st.height() / 2, 0) );
			}
				
			if ( _top < $bh.height() + 2 ) {
				_top = $bh.height() + 2;
			}
				
			// 判斷 _top + _height 是否低於 footer 的 top 
			$st.css('left', _left).animate({ 'top': _top }, _duration);
		}
	};


	/* 瀏覽紀錄 */
	$.fn.load_browsed_news = function() {

		if ( $('.browsed-news-list .v-list').length <= 0 ) {
			return false;
		}
		
		var _data = 'type=news';

		$.ajax({
			url: '/ajax/news/browsed.get.php',
			type: 'post',
			dataType: 'xml',
			async: true,
			data: _data,
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			},
			success: function(data) {
				var _code = $(data).find('code').first().text();
				var _msg = $(data).find('msg').first().text();

				$record_ary = $(data).find('record');
				$container = $('.browsed-news-list > .v-list').first();
				$.each($record_ary, function(index, element) {
					if ( index >= 5 ) { return false; }

					var _lib = $(element).find('lib').first().text();
					var _title = $(element).find('title').first().text();
					var _html_title = $(element).find('html_title').first().text();
					var _url = $(element).find('url').first().text();
											
					$('<li></li>').addClass('normal')
								  .addClass(_lib)
								  .append($('<a></a>').addClass('title')
								  			 		  .prop('title', _html_title)
													  .prop('href', _url)
													  .prop('target', '_blank')
													  .html(_title) )
								  .appendTo($container);									  
                });
				
				if ( $record_ary.length > 0 ) {
					$container.parent().removeClass('hidden');
				}
				
			}
		});
	};

	/* 2015.06.17 新增 */
	$('.site-search input[type="text"]').bind('focus', function(e){
		$(this).removeClass('blur');
	})
	.bind('blur', function(e){
		if ( $(this).val().length <= 0 ) {
			$(this).addClass('blur');
		}
	});

	$('.side-menu .show-other-manu-list').bind('click', function(e){
		e.preventDefault();
		$l = $(this).siblings('.other-manu-list').first();
		if ( $(this).hasClass('expand') ) {
			$l.slideUp(300);
			$(this).removeClass('expand').removeClass('selected');
		}
		else {
			$l.css('display', 'none').removeClass('hidden').slideDown(300);
			$(this).addClass('expand').addClass('selected');
		}
	});

	$('a[data-url]').each(function(index, element) {
        $(this).attr('href', $(this).attr('data-url')).removeAttr('data-url');
    });

	// Loading HTML5 AD
	$('iframe[data-src]').each(function(index, element) {
        $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
    });

	$('*[data-mouse-event]').each(function(index, element) {
		if ( $(element).data('mouse-event') == '1' ) {
			$(element).bind('mouseenter', function(e){
				$(this).removeClass('normal').addClass('selected');
			})
			.bind('mouseleave', function(e){
				$(this).removeClass('selected').addClass('normal');
			});
		}
		$(element).removeAttr('data-mouse-event');
    });
	

	$(document).on('click', '#body-header a.side-menu-btn', function(e){
		e.preventDefault();
		$w = $(window);
		$bh = $('#body-header').first();
		$bf = $('#body-footer').first();
		$bc = $('.body-content').first();
		
		if ( $(this).hasClass('collapse') ) {
			$m = $('.side-menu-m').first();
			$bh.animate({ 'left' : 0, 'width' : '100%' }, 300);
			if ( $bc.css('position') == 'fixed' ) {
				$bc.animate({ 'left' : 0, 'width' : '100%' }, 300, function(e){ $(this).css('width', '').css('left', ''); });
			}
			else {
				$bc.animate({ 'margin-left' : 0, 'width' : '100%' }, 300, function(e){ $(this).css('width', '').css('margin-left', ''); });
			}
			$bf.animate({ 'margin-left' : 0, 'width' : '100%' }, 300, function(e){ $(this).css('width', '').css('margin-left', ''); });
			$m.animate({ 'opacity' : 0, 'left' : 0 - $m.outerWidth(true) }, 300, function(e){ $(this).css('display', 'none'); });
			$(this).removeClass('collapse').addClass('expand');

			if ( $('#menu-overlay').length > 0 ) {
				$('#menu-overlay').remove();
			}
		}
		else {
			$m = $('.side-menu-m').first();
			if ( !$m.hasClass('side-menu') ) {
				if ( $('.side-menu').length > 0 ) {
					$m = $('.side-menu').first().clone(true, true);
					if ( $bc.length > 0 ) {
						$m.insertBefore($bc);
					}
					else {
						$m.insertAfter($bh);
					}
				}
				else {
					$m = $('<div></div>').addClass('side-menu').insertBefore($('.body-content').first().children().first());
					$m.append($('<div></div>').addClass('clear'));
				}
			
				$m.addClass('side-menu-m');
			}
		
			if ( $m.find('ul.dropdownlist').length <= 0 ) {
				$bh.find('ul.dropdownlist').first().clone(true, true).insertBefore($m.children().first());
			}
		
			if ( $m.find('.member-area').length <= 0 ) {
				$ma = $('#member-area').clone(true, true).removeAttr('id').insertAfter($m.children().first());
				$li = $ma.children('li.logout, li.login');
				$li.appendTo($ma);
			}
		
			var _mw = $m.outerWidth(true);
			$m.css('left', 0 - _mw).css('display', 'block').animate({ 'opacity' : 1, 'left' : 0 }, 300);
		
			$bh.animate({ 'left' : _mw, 'width' : $bh.width() - _mw }, 300);
			if ( $bc.css('position') == 'fixed' ) {
				$bc.animate({ 'left' : _mw, 'width' : $bh.width() - _mw }, 300);
			}
			else {
				$bc.animate({ 'margin-left' : _mw, 'width' : $bh.width() - _mw }, 300);
			}
			$bf.animate({ 'margin-left' : _mw, 'width' : $bf.width() - _mw }, 300);
		
		
			$(this).removeClass('expand').addClass('collapse');
			$w.scrollTop(0);
		
			if ( $('#menu-overlay').length <= 0 ) {
				console.log($bc.scrollTop());
				var _h = Math.max($w.height(), $('body').innerHeight(), $w.innerHeight());

				$overlay = $("<div></div>")
				.attr('id', 'menu-overlay')
				.addClass('overlay')
				.css('zIndex', 1001)
				.appendTo($('body'));

				$overlay.bind('click', function(){
					//$('#body-header a.side-menu-btn').trigger('click');
				})
				.fadeIn(1000);
			}
		}
		
	});

	
	$(document).on('click', 'a.ui-dialog-titlebar-close', function(e){
		e.preventDefault();

		$p = $(this).parents('.ui-widget-header').first();
		$dialog = $p.siblings('.ui-dialog-content').first();
		
		var _id = $dialog.attr('id');
		$dialog.dialog('close').dialog('destroy').remove();
		
		if ( _id == 'dialog') {
			$('#dialog_message').dialog('close').dialog('destroy').remove();
		}
		else {
			$('#dialog').dialog('close').dialog('destroy').remove();
		}
		
		$('#member-overlay').fadeOut(200, function(){ $('#member-overlay').remove(); });
		
	});
	/*
	$('.select-layout').bind('click', function(e){
		e.preventDefault();
		
		var _val = $(this).data('value');
		var _txt = $(this).text();
		var _html = '';
		var _data = 'choice=' + _val;
		$.ajax({
			url: '/ajax/member/new-layout-choice.set.php',
			type: 'post',
			dataType: 'xml',
			async: false,
			data: _data,
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			},
			success: function(data) {
				var _code = $(data).find('code').first().text();
				var _msg = $(data).find('msg').first().text();
				location.reload(true);
			}
		});
		
	});	
	*/
	
	$.fn.close_crazy_ad = function(){		
		$('div.ad-1200x629').addClass('hidden');
		$('div.ad-970x250').removeClass('hidden');
		
		$ul = $('#news-screen').find('.tab-list').first();
		$ul.children('li:first').find('a').click();
	};
	
	$.fn.check_google_ad_block = function(){
		var _all_checked = true;
		//console.log('check_google_ad_block');
		$('.ad-970x250-g').each(function(idx, elm){
			if ( $(elm).hasClass('shown-checked') ) {
				return true;
			}
			
			_all_checked = false;			
			if ( $(elm).find('iframe').length > 0 ) {
				$(elm).addClass('shown-checked');
				$container = $('[id^="google_ads_iframe_"]');
				if ( $container.length > 0 ) {
					//console.log($container.attr('id'));
					var _height = parseInt($container.css('height'), 10);
					//console.log(_height);
					if ( !isNaN(_height) && _height != 250 ) {
						/* 因為 iframe 會複製 container 的 top 資料，所以要將 top 位置對半分攤 */
						$container
						.css('top', '40px')
						.css('position', 'relative');
					}
				}					
			}
		});
		
		if ( _all_checked == false ) {
			setTimeout(function(){
				$.fn.check_google_ad_block();
			}, 800);
		}
	};

	setTimeout(function(){
		$.fn.check_google_ad_block();
	}, 1000);
	
	$.fn.load_browsed_news();
		
	$.fn.reposition();
	
});

// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
	if ( e.data == 'close-crazy-ad' ) {
		$.fn.close_crazy_ad();
	}
},false);