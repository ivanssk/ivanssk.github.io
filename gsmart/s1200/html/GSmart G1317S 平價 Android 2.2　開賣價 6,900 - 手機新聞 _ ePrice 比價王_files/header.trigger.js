$(function(){
	/*
	$(document).bind("mousemove", function(e){
		$.gv.pageX = e.pageX;
		$.gv.pageY = e.pageY;
	})
	.bind('mouseleave', function(e){
		$.gv.pageX = 0;
		$.gv.pageY = 0;
	});
	*/
	$.fn.create_overlay = function(){
		$overlay = $('#header-overlay');
		if ( $overlay.length <= 0 ) {
			$overlay = $("<div></div>")
			.attr('id', 'header-overlay')
			.addClass('overlay')
			.addClass('hidden')
			.css('width', $('body').innerWidth())
			.css('height', Math.max($(window).height(), $('body').innerHeight()))
			.css('z-index', 1020)
			.appendTo($('body'))
			.bind('click', function(){
				$('#body-header ul.dropdownlist').find('a.btn').removeClass('selected');
				$('.information-list').removeClass('normal').addClass('hidden');
				$(this).remove();
			})
			.bind('mouseenter mouseover mouseleave', function(){
				$('#body-header ul.dropdownlist').find('a.btn').removeClass('selected');
				$('.information-list').removeClass('normal').addClass('hidden');
				$(this).remove();		
			});
		}
		else {
			$overlay = $overlay.first();
		}
				
		return $overlay;
	}
	
	
	$.fn.refresh_price_width = function(){
		var _width = 0;
		$(this).find('ul.price-list > li > em > span.price').each(function(index, element) {
			_width = Math.max($(this).width(), _width);
        });
		
		$(this).find('ul.price-list > li > em > span.price').each(function(index, element) {	
            if ( $(this).width() < _width ) {
				var __w = _width - $(this).width();
				$(this).hasClass('coming')? __w-=1 : null;
				$(this).css('margin-right', __w);
			}
        });
		
		var _width = 0;
		$(this).find('ul.price-list > li > em').each(function(index, element) {			
            if ( $(this).width() > _width ) {
				_width = $(this).width();
			}
        });
		_width += 1;
		$(this).find('ul.price-list').css('width', _width);
	}

	$('#body-header ul.dropdownlist li a.btn').bind('mouseenter', function(e){
		$(this).removeClass('normal').addClass('selected');
	})
	.bind('mouseleave', function(e){
		$(this).removeClass('selected').addClass('normal');
	});
	
	
	/* 導覽列 */
	$('#navi > li.normal').bind('click mouseover', function(e){
		
		if ( e.type == 'mouseover' && $.gv.isMobileDevice === true ) {
			return false;
		}
		
		if ( e.type == 'click' && $(this).hasClass('selected') === true ) {
			return true;
		}
		
		e.preventDefault();
		

		$(this).siblings('li.selected').removeClass('selected').addClass('normal');
		$(this).removeClass('normal').addClass('selected');
		$(this).find('div.dropdownlist').removeClass('hidden');
	})
	.bind('mouseleave', function(){	
		$(this).find('div.dropdownlist').addClass('hidden');
		$(this).removeClass('selected').addClass('normal');
		$('body').removeClass('stop-scrolling');
	});
/*
$('#elem').bind('DOMMouseScroll', function(e){
     if(e.originalEvent.detail > 0) {
         //scroll down
         console.log('Down');
     }else {
         //scroll up
         console.log('Up');
     }

     //prevent page fom scrolling
     return false;
 });

 //IE, Opera, Safari
 $('#elem').bind('mousewheel', function(e){
     if(e.originalEvent.wheelDelta < 0) {
         //scroll down
         console.log('Down');
     }else {
         //scroll up
         console.log('Up');
     }

     //prevent page fom scrolling
     return false;
 });
*/	
	$('li > div.dropdownlist')
	.bind('mousewheel DOMMouseScroll', function(e){
		var _st = $(this).scrollTop();
		var _isAtBottom = false;
		var _isAtTop = false;
		if ( _st + $(this).height() >= $(this).children('ul').first().height() - 4 ) {
			_isAtBottom = true;			
		}
		else if ( _st <= 4 ) {
			_isAtTop = true;
		}
		
		if ( e.type == 'DOMMouseScroll' ) {
			// FF
			if(e.originalEvent.detail > 0) {
		         //scroll down
				if ( _isAtBottom == true ) {
				   	e.preventDefault();
				    e.stopPropagation();
				}
			}
			else if ( _isAtTop == true ) {
				//scroll up
			   	e.preventDefault();
			    e.stopPropagation();				
			}
		}
		else {
			// IE, Opera, Safari
			if( e.originalEvent.wheelDelta < 0 ) {
				//scroll down
				if ( _isAtBottom == true ) {
				   	e.preventDefault();
				    e.stopPropagation();
				}
			}
			else if ( _isAtTop == true ) {
				//scroll up
		   		e.preventDefault();
			    e.stopPropagation();
			}
		}
	});
			

	/* 橘框 */
	if ( typeof $(document).on != 'undefined' ) {
		$(document).on('mouseenter', 'li[data-mouse-event="1"]', function(e){
			$(this).addClass('selected');
		})
		.on('mouseleave', 'li[data-mouse-event="1"]', function(e){
			$(this).removeClass('selected');
		});
	}
	else {
		$(document).on('mouseenter', 'li[data-mouse-event="1"]', function(e){
			$(this).addClass('selected');
		})
		.on('mouseleave', 'li[data-mouse-event="1"]', function(e){
			$(this).removeClass('selected');
		});		
	}
	
	/* GA */
	$('#navi a[data-url], #body-footer a[data-url], #latest-comment a[data-url]').each(function(index, element) {
        $(this).attr('href', $(this).attr('data-url')).removeAttr('data-url');
    });
	
	$('#news-box ul.fblike-list > li:gt(0), #funky-box ul.fblike-list > li:gt(0), #nb-box ul.fblike-list > li:gt(0)').not('li.sepline').bind('mouseenter', function(){
		$(this).removeClass('normal').addClass('selected');
	})
	.bind('mouseleave', function(){
		$(this).removeClass('selected').addClass('normal');
    });
	
	/*
	$('.information-list').each(function(index, element) {
        $(this).removeClass('hidden');
		$(this).refresh_price_width();
		$(this).addClass('hidden');
    });
	*/
	$('#hot-manu-block ul.tab-list li a').bind('click', function(e){
		e.preventDefault();
		var _id = $(this).attr('data-value');
		$u = $(this).parents('ul').first();
		if ( $u.length > 0 ) {
			$u.find('a').removeClass('on').addClass('off');
			$(this).removeClass('off').addClass('on');
			
			$u.siblings('.hot-manu-list:not(.hidden)').addClass('hidden');
			$u.siblings('table.' + _id).removeClass('hidden');
		}
	});
	
	$('#hot-manu-block table.hot-manu-list td').bind('mouseenter', function(){
		$(this).addClass('selected');
	})
	.bind('mouseleave', function(){
		$(this).removeClass('selected');
	});
	
	
	/* 新版 SUBMENU 開始 */
	$('.submenu-block .hot-forum-list a.more').bind('click', function(e){
		e.preventDefault();
		var _data = 'lib=' + $(this).attr('data-lib');
		$.ajax({
			url: '/ajax/talk/tpl/forum-list.tpl.php',
			type: 'post',
			dataType: 'html',
			data: _data,
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
			},
			success: function (data) {
				var setting = {
					id: 'dialog_message',
					title: '',
					html: data,
					width: 980,
					close_btn: false,
					buttons: []
				};
				$.fn.replace_dialog(setting);				
			}
		});
	});
	
	/* 新版 SUBMENU 結束 */
	
	$('#body-footer a.bug').bind('click', function(e){
		if ( $(this).hasClass('login-first') ) {
			e.preventDefault();
			return true;
		}
	});
	

	$.fn.check_pmbox = function(){
		
		$.ajax({
			url: '/ajax/member/pm/check.php',
			type: 'post',
			dataType: 'xml',
			data: null,
			success: function (data) {
				var _code = $(data).find('code').first().text();
				var _msg = $(data).find('msg').first().text();
				var _total = $(data).find('total').first().text();
				
				$ul = $('#member-area');
				$href = $ul.find('a.pm').first();
				if ( _code == 1 ) {
					if ( $href.length > 0 ) {
						if ( _total > 0 ) {
							$href.text('');
							$('<span></span>').appendTo($href);
							$href.append(_total);
						}
						else {
							$href.parent('li').remove();
						}
					}
					else if ( _total > 0 ) {
						$li = $("<li></li>").appendTo($ul);
						$href = $("<a></a>").addClass('pm').attr('href', '/member/pm/?type=in').appendTo($li);
						$('<span></span>').appendTo($href);
						$href.append(_total);
					}
				}
				else if ( $href.length > 0 ) {
					$href.parent('li').remove();
				}
				
				setTimeout("$.fn.check_pmbox();", 60000);
			}
		});

	};
	
	
	/* 預先停止重新整理導致的 mouseenter 觸發 */

	$('#side-tool > a.back-2-top').bind('click', function(e){		
		e.preventDefault();
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		var $btn = $(this);
		$body.animate({ scrollTop: 0 }, 200, function(){
			$btn.css('opacity', 0);			
		});
	});
	
	$('#side-tool > .share-icon-fb').bind('click', function(e){
		e.preventDefault();
		var $url = $('meta[property="og:url"]').first();
		var $title = $('meta[property="og:title"]').first();		
		
		var url = '', title = '';
		if ( $url.length > 0 ) {
			url = $url.attr('content');
		}		
		if ( $title.length > 0 ) {
			title = $title.attr('content');
		}
		/*
		var shareToFBCallback = function(response) {
			if ( $.gv.viewer != '' ) {
				$.Bonus.insert({
					account: $.gv.viewer,
					action: 'article-share',
					url: url
				});
			}
		};
		*/
		FB.ui({				
			method: 'feed',
			link: url
		}, function(response){
			if ( $.gv.viewer != '' ) {
				//shareToFBCallback(response);
			}
		});
	});

	/*
	$.fn.delay_trigger = function(){
		$.gv.delay_trigger = false;
	};
	
	setTimeout("$.fn.delay_trigger();", 1000);
	*/
	
	(function(){
		var $url = $('meta[property="og:url"]').first();
		var $title = $('meta[property="og:title"]').first();		
		if ( $url.length > 0 && $title.length > 0 ) {
			$('#side-tool > .share-icon-fb').removeClass('hidden');
		}
	})();
		
	window.fbAsyncInit = function() {
    	FB.init({
      		appId      : '1205386399519232',
      		xfbml      : true,
      		version    : 'v2.10'
    	});
    	FB.AppEvents.logPageView();
  	};

  	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.8";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
});
