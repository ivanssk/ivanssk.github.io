$(function(){
	// ga('send', 'event', Category, Action, Label, Value)
	$('.mwc-week-block .product-list-block a').bind('click', function(e){
		ga('send', 'event', 'mwc-block', '最新產品', $(this).attr('title'), 1);
	});

  	$('.mwc-week-block .latest-news-block a').bind('click', function(e){
		ga('send', 'event', 'mwc-block', '精選報導', $(this).attr('title'), 1);
	});

});