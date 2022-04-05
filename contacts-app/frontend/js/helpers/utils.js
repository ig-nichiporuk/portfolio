import ModalAlertTemplate from '../../templates/pages/modals/modalAlert.hbs';

import Preloader from '../../templates/pages/preloader/preloader.hbs';

const body = document.body;

export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action] = url.split('/');

    return request;
};

export const generateID = () => {
	return Math.random().toString(36).substr(2, 10);
};

export const showL = () => {
	body.insertAdjacentHTML('afterbegin', '<div class="preloader__bg preloaderBgJs"></div>');

	body.insertAdjacentHTML('afterbegin', Preloader());
};

export const hideL = () => {
	const pleloaderBg = body.getElementsByClassName('preloaderBgJs')[0],
		pleloader = body.getElementsByClassName('preloaderJs')[0];

	pleloaderBg.remove();
	pleloader.remove();
};

export const openModal = id => {
	const modal = document.getElementById(id),
		winScrollTop = window.scrollY,
		winHeight = document.documentElement.clientHeight,
		docHeight = document.documentElement.scrollHeight;

	body.insertAdjacentHTML('afterbegin', '<div class="overlay js-overlay"></div>');

	modal.classList.add('open');

	let modalHeight = modal.clientHeight,
		modalTop = modalHeight > winHeight ? winScrollTop + 50 : winScrollTop + (winHeight - modalHeight) / 2;

	body.classList.add('modal-open', 'overlay-open');

	if (modalTop + modalHeight + 300 > docHeight) {
		modalTop = docHeight - modalHeight - 300;
		window.scrollTo({
			top: modalTop - 50,
			behavior: 'smooth'
		});
	}
	modal.style.cssText = `top : ${modalTop}px`;
};

export const closeModal = () => {
	const modal = body.querySelectorAll('.js-modal.open'),
		overlay = body.getElementsByClassName('js-overlay')[0];

	if (overlay) overlay.remove();

	modal.forEach(activeModal => activeModal.classList.remove('open'));
	body.classList.remove('modal-open',  'overlay-open',  'js-scroll-lock');
};

export const showInfoModal = (id, type, content) => {
	closeModal();

	const modal = document.getElementById(id);

	switch (type) {
		case 'alert':
			modal.innerHTML = ModalAlertTemplate(content);
			break;
	}

	openModal(id);
};

export const btnsValidation = e => {
	const target = e.target;

	switch (target.id) {
		case 'birthday':
		case 'year':
		case 'postcode':
		case 'year-min':
		case 'year-max':
			(!/\d/.test(e.key) && e.keyCode !== 13) && e.preventDefault();

			break;
		case 'surname':
		case 'name':
		case 'patronymic':
		case 'company':
		case 'country':
		case 'city':
		case 'street':
			if (!/[a-zа-яё\s-]/i.test(e.key) || /[\^_]/.test(e.key)) {
				e.preventDefault();
			}

			break;
		case 'house':
		case 'apartment':
			if (!/[a-zа-яё\d/]/i.test(e.key) || /[\^_]/.test(e.key)) {
				e.preventDefault();
			}

			break;
		case 'phone':
			(!/\d/.test(e.key) && e.keyCode !== 13) && e.preventDefault();

			!/^\+\d+$/.test(target.value) && (target.value = '+');

			break;
		case 'site':
			if (!/[a-z\d-_.]/.test(e.key) || /[\^]/.test(e.key)) {
				e.preventDefault();
			}

			break;
		case 'email':
			if (!/[a-z\d-_.@]/.test(e.key) || /[\^]/.test(e.key)) {
				e.preventDefault();
			}

			break;
	}
};

export const formatData = str => {
	let updateStr = '';

	for (let word of str.split(/(\s|-|\.)+/)) {
		word && (updateStr += (word[0].toUpperCase() + word.slice(1)));
	}

	return updateStr;
};
