$(function(){
	
	/* 2015.06.02 新增 */
	$('#news-manu-search .manu-search').bind('click', function(e){
		e.preventDefault();
		var _m = $('#smanu').val();

		var $p = $('#sprod_id').first();
		
		if ( parseInt(_m, 10) == 0 ) {
			$.fn.show_alert_dialog("請選擇廠牌");
			return false;
		}
		
		if ( parseInt($p.val(), 10) == 0 ) {
			var _u = '/news';
			_u += ( _m == 0 )? '' : '/' + _m;
			_u += '/all/1/';

			location.href = _u;
			return false;
		}
		
		$p = $p.children(':selected').first();
		var _u = '/' + $p.data('lib') + '/review/c01-p' + $p.val() + '-' + $p.data('nameurl') + '/';
		
		location.href = _u;
		
	});

	$('#smanu').bind('change', function(e){
		$m = $(this);
		$p = $('#sprod_id').first();
		$p.find('option').remove();
		
		if ( parseInt($m.val(), 10) == 0 ) {
			$p.append("<option value=\"0\" data-lib=\"\">型號不拘</option>");
			return false;
		}
		
		var _data = 'type=' + $m.val();		
		$.ajax({
			url: '/ajax/news/get_name_of_manu.php',
			type: 'post',
			dataType: 'xml',
			data: _data,
				timeout: 5000,
				success: function (data) {
					var _code = $(data).find('code').first().text();
					var _msg = $(data).find('msg').first().text();
					if ( _code == '1' ) {
						$(data).find('prod').each(function(index, element) {
							var _prod_id = $(element).find('prod_id').first().text();
							var _lib = $(element).find('lib').first().text();
							var _name = $(element).find('name').first().text();
							var _nameurl = $(element).find('nameurl').first().text();
                	        $p.append("<option value=\"" + _prod_id + "\" data-lib=\"" + _lib + "\" data-nameurl=\"" + _nameurl + "\">" + _name + "</option>");
                    	});
					}
				}
		});
		
	});
	
	
});
