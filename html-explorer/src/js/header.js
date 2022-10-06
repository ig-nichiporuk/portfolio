$(document).ready(function() {
	$('.js-finder-input').on('keyup', function() {
		if($(this).val().length >= 1) {
			$(this).closest('.js-finder-wrap').addClass('open');
			$(this).closest('.js-finder-wrap').next('.js-finder-body').slideDown(200, 'linear');
		}
		else {
			$('.js-finder-body').slideUp(0);
			$('.js-finder-wrap').removeClass('open');
		}
	});


	$('.js-finder-input').focusin(function () {
		close_finder_body();
	});

	$('.js-finder-clean').on('click', function () {
		close_finder_body();
	});

	$(document).mousedown(function(e){
		if(!$('.js-catalog-menu').is(e.target)
			&& $('.js-catalog-menu').has(e.target).length === 0
			&& $('.js-catalog-menu').hasClass('open')) {
			close_catalog_menu();
			enableScroll();
		}
		if(!$('.js-finder-wrap').is(e.target) && !$('.js-finder-body').is(e.target)
			&& $('.js-finder-wrap').has(e.target).length === 0
			&& $('.js-finder-body').has(e.target).length === 0){
			close_finder_body();
			$('.js-finder-animate-block').removeClass('open');
		}
		e.stopPropagation();
	});


	$('.touch .js-catalog-menu-btn').on('click', function(e) {
		e.preventDefault();

		if($(this).hasClass('open')){
			close_catalog_menu();
			enableScroll();
		}
		else {
			$(this).addClass('open');
			$('.js-catalog-menu').addClass('open');
			$('.js-catalog').removeClass('close').addClass('open');
			if($(window).width() < 960) {
				$('body').addClass('menu-open');
				if ($('.js-catalog-menu').hasClass('open')) {
					disableScroll();
				}
			}
		}
	});

	$('.no-touch .js-catalog-menu-btn').hover(function (){
		close_dropdown();
		close_finder_body();
		if(!$(this).hasClass('open') && !$(this).hasClass('mouseenter')){
			$(this).addClass('open');
			$('.js-catalog-menu').addClass('open');
			$('.js-catalog').removeClass('close').addClass('open');
		}

		$(this).addClass('mouseenter');
	});
	$('.js-countries-wrap a, .js-continents-wrap a').on('click', function () {
		close_catalog_menu();
		enableScroll();
		$('.js-catalog-menu-btn').removeClass('mouseenter');
	});
	$('.js-catalog-menu').mouseleave(function (){
		close_catalog_menu();
		enableScroll();
		$('.js-catalog-menu-btn').removeClass('mouseenter');
	});


	$('.js-country-btn').on('click', function() {
		$('.js-countries-list').removeClass('open');
		$('.js-countries-sublist').addClass('open');
	});


	$('.js-catalog-back').on('click', function() {
		$('.js-countries-list').addClass('open');
		$('.js-countries-sublist').removeClass('open');
	});


	$('.js-catalog-back-countries').on('click', function () {
		$('.js-countries-list, .js-countries-wrap').removeClass('open');
	});


	$('.js-continent-btn').on('click', function() {
		$('.js-continent-btn').removeClass('active');
		$(this).addClass('active');
		$('.js-countries-wrap').addClass('open');
		$('.js-countries-list').addClass('open');
		$('.js-countries-sublist').removeClass('open');
	});


	$('.js-finder-open-input').on('click', function() {
		if($(this).hasClass('active')){
			enableScroll();
			close_finder_body();
			$('.js-finder-open-input').removeClass('active');
			$('.js-finder-animate-block').removeClass('open');
			$('body').removeClass('overlay-open mob-finder-open');
		}
		else {
			// $('.js-finder-open-input').addClass('active');
			setTimeout(function () {
				$('.js-finder-input').focus();
			}, 300);
			if($(window).width() < 960) {
				$('.js-finder-open-input').addClass('active');
				$('.js-toolbar-content').removeClass('open');
				$('.js-toolbar-block').addClass('hidden');
				$('.js-toolbar-btn').removeClass('active');
				$('.js-finder-animate-block').addClass('open');
				$('body').addClass('overlay-open mob-finder-open');
				close_finder_body();
				disableScroll();
			}
		}
	});

	$('.js-finder-animate-close, .js-finder-body a').on('click', function () {
		enableScroll();
		close_finder_body();
		$('.js-finder-open-input').removeClass('active');
		$('.js-finder-animate-block').removeClass('open');
		$('body').removeClass('overlay-open mob-finder-open');
	});


	function mob_control() {
		if($(window).width() > 959) {
			$('.js-countries-list').addClass('open');
			$('.js-countries-sublist').removeClass('open');
			if ($('.js-catalog-menu').hasClass('open')) {
				$('body').removeClass('menu-open');
				enableScroll();
			}
		}
		else {
			if (!$('body').hasClass('menu-open')) {
				close_catalog_menu();
			}
			$('.js-countries-list').removeClass('open');
		}
		if($(window).width() > 959 && $('.js-finder-animate-block').hasClass('open')) {
			$('.js-finder-animate-block').removeClass('open');
			$('body').removeClass('overlay-open mob-finder-open');
			enableScroll();
		}
	}


	mob_control();


	$( window ).resize(function() {
		mob_control();
	});
	$('.js-select-mob-menu').on('change', function () {
		$(this).prev('.js-select-mob-val').text($(this).find('option:selected').val())
	})


})
