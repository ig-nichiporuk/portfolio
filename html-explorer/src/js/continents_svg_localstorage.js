;(function(window, document) {
	'use strict';

	/* ну да прямой урл а по другому js не хотел делать GET и получить этот файл - можно толькое если в шаблоны бросить */
	var file = 'img/continents-sprite.html',
	revision = 7;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function() {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function() {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev-continents') == revision) {
		data = localStorage.getItem('inlineSVGdata-continents');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata-continents', data);
					localStorage.setItem('inlineSVGrev-continents', revision);
				}
			}
		}
		request.send();
	} catch (e) {}

}(window, document));
