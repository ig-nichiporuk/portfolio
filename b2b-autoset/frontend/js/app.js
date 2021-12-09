import '../styles/main';

import {parseRequestURL, checkUser, showL, hideL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import Error404 from './views/pages/error404';


import Authorization from './views/pages/authorization';
import Orders from './views/pages/orders';
import Order from './views/pages/order';
import Acts from './views/pages/acts';

const Routes = {
    // '/': About,
    /* '/': Authorization,*/
    '/orders': Orders,
    '/order/:id': Order,
    '/acts': Acts
};

async function router() {
	const headerContainer = document.getElementsByTagName('header')[0],
		contentContainer = document.getElementsByTagName('main')[0],
		footerContainer = document.getElementsByTagName('footer')[0],
		header = new Header(),
		footer = new Footer(),
		authorization = checkUser();

	showL();

	headerContainer.innerHTML = await header.render();
	header.afterRender();

	const request = parseRequestURL(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`;

	let page;

	if (request.resource) {
		if (authorization) {
			page = Routes[parsedURL] ? new Routes[parsedURL]() : page = new Error404();

			const data = await page.getData(),
				html = await page.render(data);
			contentContainer.innerHTML = html;



			page.afterRender();
		} else {
			location.hash = '#/';
		}
	} else if (authorization) {
		location.hash = '#/orders';

	} else {
		page = new Authorization();

		const html = page.render();
		contentContainer.innerHTML = html;

		page.afterRender();
	}

	footerContainer.innerHTML = await footer.render();

	hideL();
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);
