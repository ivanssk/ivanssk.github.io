$(function(){
	$('img[data-original]:gt(0)').lazyload({ effect : "fadeIn", threshold : 1000 });
	$img_first = $('img[data-original]').first();
	$img_first.attr('src', $img_first.attr('data-original'));
});