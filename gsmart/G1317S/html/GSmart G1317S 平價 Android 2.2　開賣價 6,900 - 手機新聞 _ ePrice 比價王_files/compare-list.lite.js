$(function(){

	$.my_compare_list = {

		add: function(_lib, _prod_id) {
			var _data = 'lib=' + _lib + '&prod_id=' + _prod_id;
			var _options = {
				url: '/ajax/compare/' + _lib + '/add.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					
					if ( _code == '1' ) {
						$element = $(data).find('element').first();
						var _data_obj = [];
						$element.children().each(function(){
							_data_obj[this.tagName] = $(this).text();
						});

						$comparelist = $('#side-tool > ul.compare-list');
						if ( $comparelist.length > 0 ) {
							
							$toolbar = $comparelist.children('li:last');
							$li = $.my_compare_list.create_element(_data_obj);
							$li.insertBefore($toolbar);

							if ( $comparelist.hasClass('hidden') ) {
								$.fn.reposition(500);
							}
							else {
								var _h = $li.find('a.img').first().outerHeight(true);
								$li.css('height', 1).animate({ height: _h }, 1000, function(){
									$.fn.reposition(500);
								});
							}
								
						}
						else {
							$iflst = $('#side-tool > ul.intro-func-list');
							if ( $iflst.length > 0 ) {
								$.my_compare_list.load_from_cookie(_lib);
							}
						}

					}
					else {
						var setting = {
							id: 'dialog_message',
							width: 320,
							html: "<div class=\"align-center\">" + _msg + "</div>",
							close_by_overlay: false,
							close_btn: false,
							buttons: [
								{
									text: '確定',
									click: function(e){										
										$('a.compare').filter('[data-value="' + _prod_id + '"]').each(function(index, element) {
											$(this).text('加入比拼');
											$(this).removeClass('enabled').addClass('disabled');
										});
										
										$.fn.destroy_all_dialog();
									}
								}
							]
						};
						
						$.fn.replace_dialog(setting);
						
						//alert(_msg);
					}
				}
			};
		
			$.ajax(_options);
		},

		remove: function(_lib, _prod_id) {
			var _data = 'lib=' + _lib + '&prod_id=' + _prod_id;
			var _options = {
				url: '/ajax/compare/' + _lib + '/delete.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					
					if ( _code == '1' ) {
												
						$comparelist = $('#side-tool > ul.compare-list');
						if ( $comparelist.length > 0 ) {
							$comparelist.children('li').each(function(){
								$href = $(this).find('a.img');
								if ( $href && $href.attr('data-value') == _prod_id ) {
									$href.animate({ opacity: 0 }, 1000, function(){});
									$(this).slideToggle(800, function(){ 
										$(this).remove(); 
										$.fn.reposition(500);
									});
								}
							});
						}
						else {
							$iflst = $('#side-tool > ul.intro-func-list');
							if ( $iflst.length > 0 ) {
								$.my_compare_list.load_from_cookie(_lib);
							}
						}
						
					}
					else {
						alert(_msg);
					}
				}
			};
		
			$.ajax(_options);
		},
		
		load_from_cookie: function(_lib) {
			var _data = 'lib=' + _lib;
			$.ajax({
				url: '/ajax/compare/' + _lib + '/load_from_cookie.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					
					if ( _code == '1' ) {
						$comparelist = $('#side-tool > ul.compare-list');
						if ( $comparelist.length > 0 ) {
							$comparelist.children('li').not('.label').not('.toolbar').remove();
							
							$toolbar = $comparelist.children('li.toolbar');
							
							$element = $(data).find('element');
							$element.each(function(){							
								var _data_obj = [];
								$(this).children().each(function(){
									_data_obj[this.tagName] = $(this).text();
								});
										 
								$li = $.my_compare_list.create_element(_data_obj);							
								$li.insertBefore($toolbar);
							});
						
							if ( typeof $.fn.reposition != 'undefined' ) {
								$.fn.reposition(500);
							}
							else {
								setTimeout("$.fn.reposition(500)", 2000);
							}
						}
						else {
							$iflst = $('#side-tool > ul.intro-func-list');
							if ( $iflst.length > 0 ) {
								$li = $iflst.children('li:last');
								var _count = $(data).find('element').length;
								if ( _count > 0 ) {
									$li.removeClass('hidden')
									.find('.count').first().text(_count);
									$li = $li.prev('li').first();
									$li.removeClass('last-one');
								}
								else {
									$li.hasClass('hidden')? null : $li.addClass('hidden');
									$li = $li.prev('li').first();
									$li.hasClass('last-one')? null : $li.addClass('last-one');
								}
							}

							if ( typeof $.fn.reposition != 'undefined' ) {
								$.fn.reposition(500);
							}
							else {
								setTimeout("$.fn.reposition(500)", 2000);
							}
						}
					}
					else {
						alert(_msg);
					}
				}
			});
		
		},
		
		clean: function(_lib) {
			var _data = 'lib=' + _lib;
			var _options = {
				url: '/ajax/compare/' + _lib + '/clean.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					
					if ( _code == '1' ) {
						
						$comparelist = $('#side-tool > ul.compare-list');						
						$comparelist.find('a.img').each(function(){
														
							$(this).delay(300).animate({ opacity: 0 }, 300, function(){
								$(this).parent().slideToggle(500, function(){
									$(this).remove();
									
									if ( $comparelist.children('li').length <= 2 ) {
										$comparelist.animate({ opacity: 0 }, 300, function(){
											$.fn.reposition(500);
										});
									}
									
								});
							});

							var _prod_id = $(this).attr('data-value');
														
							$('a.compare').each(function() {
								if ( $(this).attr('data-value') == _prod_id ) {
									$(this).text('加入比拼');
									$(this).removeClass('enabled');
								}
                            });

						});
					}
					else {
						alert(_msg);
					}
				}
			};
		
			$.ajax(_options);			
		},
		
		switch_compare_btn: function(_lib) {
			
			var _data = 'lib=' + _lib;
			var _options = {
				url: '/ajax/compare/' + _lib + '/load_from_cookie.php',
				type: 'post',
				dataType: 'xml',
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					
					if ( _code == '1' ) {
						$element = $(data).find('element');
						$element.each(function(){				
							var _data_obj = [];
							$(this).children().each(function(){
								_data_obj[this.tagName] = $(this).text();
							});
							
							$('a.compare').each(function(index, element) {
								if ( $(this).attr('data-value') == _data_obj.prod_id ) {
									$(this).text('取消比拼');
									$(this).addClass('enabled');
								}
                            });
							
						});						
						
					}
					else {
						alert(_msg);
					}
				}
			};
		
			$.ajax(_options);			
		},
		
		create_element: function(data_obj) {		
			$li = $("<li></li>");
			$img = $("<img></img>")
				   .attr('src', data_obj.imgurl)
				   .attr('alt', data_obj.manu + ' ' + data_obj.name)
				   .attr('title', data_obj.manu + ' ' + data_obj.name)
				   .attr('border', 0)
				   .css('height', 70);
				   
			$href = $("<a></a>")
					.addClass('img')
					.attr('href', data_obj.url)
					.attr('data-value', data_obj.prod_id)
					.attr('title', data_obj.manu + ' ' + data_obj.name)
					.append($img)
					.appendTo($li);
				
			return $li;		
		}
		
		
	};

	/* 讀入比拼資料 */
	$.fn.loading_compare_list = function(){
		if ( $.my_compare_list && $.fn.CUR_LIB ) {
			$.my_compare_list.load_from_cookie($.fn.CUR_LIB);
		}
		else {
			setTimeout("$.fn.loading_compare_list();", 1000);
		}
	}

	$.fn.loading_compare_list();
	
	$('#side-tool > ul.compare-list > li.toolbar > a.clean-all').bind('click', function(e){
		e.preventDefault();

		var setting = {
			id: 'dialog_message',
			html: "<div class=\"align-center\">確定要清除比拼清單嗎?</div>",
			width: 320,
			buttons: [
					{
						text: "是",
						click: function(e) {							
							$.my_compare_list.clean($.fn.CUR_LIB);
							$.fn.destroy_all_dialog();
						}
					},
					{
						text: "否",
						click: function(e) {							
							$.fn.destroy_all_dialog();
						}
					}
			]
		};
		
		$.fn.replace_dialog(setting);
		
	});
		
});
