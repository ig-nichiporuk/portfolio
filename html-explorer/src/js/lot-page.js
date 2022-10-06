$(document).ready(function() {
	if($('body').hasClass('touch')){
		check_device = true
	}
	else {
		check_device = false
	}
	$('.js-lot-zoom').jqPhotoSwipe({
		loop: true,
		closeEl:true,
		captionEl: true,
		fullscreenEl: true,
		zoomEl: false,
		shareEl: false,
		counterEl: true,
		arrowEl: true,
		preloadFirstSlide: true,
		closeOnScroll: false,
		preload: [1, 2],
		allowPanToNext: true,  // разрешает свайп даже при увеличенной картинке
		maxSpreadZoom: 3, // максимальное увеличение картинки
	});

	/*$('.js-lot-zoom').lightGallery({
		speed: 200,
		preload: 3,
		swipeThreshold: 10,
		enableDrag:false,
		thumbnail: false,
		autoplayControls: false,
		hash: false,
		share: false,
		rotate:false,
		download: false,
		zoom: false,
		actualSize: false,
		controls: check_device ? false : true,
	});*/

	/*$('.js-lot-slider').on('breakpoint init', function () {
		$('.js-lot-slider-controls').empty();
		$('.slick-prev').prependTo('.js-lot-slider-controls');
		$('.slick-dots').appendTo('.js-lot-slider-controls');
		$('.slick-next').appendTo('.js-lot-slider-controls');
	});*/
	$('.js-lot-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: check_device ? false : true,
		dots: false,
		fade: false,
		autoplay: false,
		swipe: check_device ? true : false,
		speed: 300,
		touchThreshold: 100,
		asNavFor: '.js-lot-slider-nav',
	});


	$('.js-lot-slider-nav').slick({
		slidesToShow: 3,
		asNavFor: '.js-lot-slider',
		dots: false,
		arrows: false,
		focusOnSelect: true,
		infinite: true,
		centerMode: true,
		centerPadding: '45px',
		swipe: false,
		speed: 300,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					centerPadding: '37px',
				}
			},
			{
				breakpoint: 360,
				settings: {
					centerPadding: '30px',
					// slidesToShow: 1,
				}
			}
		]
	});
})