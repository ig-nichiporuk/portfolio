$(document).ready(function () {
	$('.js-slider-offers').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		fade: false,
		autoplay: false,
		swipe: false,
		speed: 250,
		touchThreshold: 100,
		infinite: false,
	});
	$('.js-slider-experts').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		fade: false,
		autoplay: false,
		swipe: false,
		speed: 250,
		touchThreshold: 100,
	});
	$('.js-slider-expert-on-roads').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		fade: false,
		autoplay: false,
		swipe: false,
		speed: 250,
		touchThreshold: 100,
	});
	$('.js-slider-banners').slick({
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
