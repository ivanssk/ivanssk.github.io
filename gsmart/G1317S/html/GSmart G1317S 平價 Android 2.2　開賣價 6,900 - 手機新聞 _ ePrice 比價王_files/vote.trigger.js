$(function(){

	$.fn.vote = {
		
		loading: function() {

			$d = $('div.news-vote').first();
			if ( $d.length <= 0 ) {
				return false;
			}
			
			$ul = $('ul.option-list', $d).first();
			if ( $ul.length <= 0 ) {
				return false;
			}

			$v = $('.vote-panel', $d).first();
			if ( $v.length > 0 ) {
				$btn = $('input.submit', $v).first();
				$('<img></img>').addClass('loading')
								.addClass('hidden')
								.attr('src', "http://gcp-img.eprice.com.tw/img/tw/ajax-loader.gif")
								.attr('border', '0')
								.insertAfter($btn);
			}
			
			$ul.find('li > .score-bar > .bar').each(function(index, element) {
                $(this).animate({ width: parseInt($(this).attr('data-value'), 10) }, 2000);
            });			
		},
		
		refresh: function(data) {

			$d = $('div.news-vote').first();
			if ( $d.length <= 0 ) {
				return false;
			}
			
			$ul = $('ul.option-list', $d).first();
			if ( $ul.length <= 0 ) {
				return false;
			}
						
			$(data).find('option').each(function(index, element) {
				var _id = $(this).find('id').first().text();
				var _width = $(this).find('width').first().text();
				var _score = $(this).find('score').first().text();
				var _percent = $(this).find('percent').first().text();
							
				$li = $('li.option').filter('[data-value="' + _id + '"]').first();
				$li.find('.bar').attr('data-value', _width).animate({ width: parseInt(_width, 10) }, 2000);
				$li.find('.score').attr('data-value', _score).text(_score);
				$li.find('.percent').attr('data-value', _percent).text('(' + _percent + '%)');
							
			});
			
		}		
		
	};
	

	$frm_vote = $('#frm_vote').first();
	$frm_vote.validate({ 
					
		onkeyup: false,
		onfocusout: false,
		onclick: false,

		messages: {			
			opt: {
				required: '請選擇要投給哪個選項'
			},
			passcode: {
				required: '請填上認證碼'
			}					
		},

		showErrors: function(errorMap, errorList) {
			if ( errorList.length > 0 ) {
				$.fn.show_alert_dialog(errorList[0].message);
			}
		},
					
		submitHandler: function(form) {
			
			$('.passcode, .submit', $frm_vote).addClass('hidden');
			$('.loading', $frm_vote).removeClass('hidden');
			
			var _data = $frm_vote.serialize();

			$.ajax({
				url: '/ajax/polling/vote.php',
				type: 'post',
				dataType: 'xml',
				async: true,
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					_code = parseInt(_code, 10);
					
					$('.passcode, .submit', $frm_vote).removeClass('hidden');
					$('.loading', $frm_vote).addClass('hidden');

					if ( _code == 1 ) {
						
						// 投票成功
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "<br /><br /></div>",
							width: 300,
							overlay: false,
							close_btn: false,
							autoFadeOut: true,
							fadeOut: 1000,
							closeDelay: 1000
						};
				
						$.fn.replace_dialog(setting);
						
						$('a.refresh-passcode').trigger('click');
						$.fn.vote.refresh(data);
						$frm_vote[0].reset();
					}
					else if ( _code == 2 ) {
						window.location.reload();
					}
					else {
						var setting = {
							id: 'dialog_message',
							title: '',
							html: "<div class=\"align-center\">" + _msg + "</div>",
							width: 300,
							btn_text: '確定',
							btn_click: function(){
								$.fn.destroy_all_dialog();
							}
						};

						$.fn.replace_dialog(setting);
					}
				}
			});
			
		}
		
	});

	$('input.submit', $frm_vote).bind('click', function(e){
		e.preventDefault();
		$frm_vote.submit();
	});


	
	$('ul.option-list > li > label').bind('click', function(e){
		e.preventDefault();
		$(this).siblings('input').first().click();
	});
	
	$('a.refresh-passcode').bind('click', function(e){
		e.preventDefault();
		$(this).children('img').attr('src', '/polling/passcode.vote.php?' + $.now());
	});	

	$('#pmanu', $frm_vote).bind('change', function(e){
		e.preventDefault();
		$s = $('#pprod_id', $frm_vote).first();
		if ( $s.length > 0 ) {
			
			$s.children('option').remove();
			
			var _data = 'lib=mobile&manu=' + $(this).val() + '&category=mobile';			
			$.ajax({
				url: '/ajax/polling/get_prod_of_manu.php',
				type: 'post',
				dataType: 'xml',
				async: true,
				data: _data,
				success: function(data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					_code = parseInt(_code, 10);
					
					if ( _code == 1 ) {
						$(data).find('prod').each(function(index, element) {
                            $s.append("<option value=\"" + $(element).attr('id') + "\">" + $(element).first().text() + "</option>");
                        });
					}
					
				}
			});
			
		}
	});

	$.fn.vote.loading();

});