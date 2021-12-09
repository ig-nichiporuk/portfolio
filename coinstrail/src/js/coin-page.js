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

	$('.js-coin-info-tab').on('click', function () {
		if(!$(this).hasClass('active')){
			$('.js-coin-info-block').addClass('hidden');
			$('.js-coin-info-tab').removeClass('active');
			$(this).addClass('active');
			$('.js-coin-info-content').find("div[data-block='" + $(this).attr('data-info') +"-block']").removeClass('hidden');
		}
	});
	$('.js-specification-title').on('click', function () {
		if($(this).hasClass('open')){
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().slideUp(200, 'linear');
		}
		else {
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().slideUp(200, 'linear');
			$(this).addClass('open');
			$(this).addClass('open').next().slideDown(200, 'linear');
		}
	});
	$(window).resize(function() {
		if($(window).width() > 1299) {
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().removeAttr('style');
		}
	});

})