$(document).ready(function() {

	$('.js-table-slider').each(function() {
		$(this).on('init', function () {
			$(this).closest('.type-page__table-wrap').next().find('.js-table-slider-dots').empty();
			$(this).find('.slick-prev').prependTo($(this).closest('.type-page__table-wrap').next().find('.js-table-slider-dots'));
			$(this).find('.slick-dots').appendTo($(this).closest('.type-page__table-wrap').next().find('.js-table-slider-dots'));
			$(this).find('.slick-next').appendTo($(this).closest('.type-page__table-wrap').next().find('.js-table-slider-dots'));
		});
		$(this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
			fade: false,
			autoplay: false,
			swipe: false,
			speed: 250,
			touchThreshold: 100,
		});
	});
	$('.js-table-mob').each(function () {
		$(this).swipe({
			swipeLeft:function() {
				$(this).find('.js-table-slider').slick('slickNext');
			},
			swipeRight:function() {
				$(this).find('.js-table-slider').slick('slickPrev');
			},
			threshold: 75,
		});
	});

})