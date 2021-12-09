import ModalAlertTemplate from '../../templates/pages/modals/modalAlert.hbs';
import ModalRemoveActTemplate from '../../templates/pages/modals/modalRemoveAct.hbs';
import ModalRemoveTaskTemplate from '../../templates/pages/modals/modalRemoveTask.hbs';
import ModalSaveChangesTemplate from '../../templates/pages/modals/modalSaveChanges.hbs';
import ModalEditDataTemplate from '../../templates/pages/modals/modalEditData.hbs';
import ModalTasksWithPriceTemplate from '../../templates/pages/modals/modalServicesWithPrice.hbs';
import ModalTasksTemplate from '../../templates/pages/modals/modalServicesTitle.hbs';


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

export const openDropdown = (elem, duration) => {
	const dropdownBody = elem.nextElementSibling;

	elem.classList.add('open');
	dropdownBody.classList.add('open');
	dropdownBody.style.height = 'auto';

	let originHeight = `${dropdownBody.clientHeight}px`;

	dropdownBody.style.cssText = `height : 0px; transition-duration : ${duration / 1000}s`;
	setTimeout( () => dropdownBody.style.height = originHeight, 0);
};

export const closeDropdown = (elem, duration) => {
	elem.forEach((activeDropdownBtn) => {
		activeDropdownBtn.classList.remove('open');
		activeDropdownBtn.nextElementSibling.style.height = '0';
		setTimeout( () => activeDropdownBtn.nextElementSibling.classList.remove('open'), duration);
	});
};

export const openModal = (id) => {
	const modal = document.getElementById(id),
		winScrollTop = window.scrollY,
		winHeight = document.documentElement.clientHeight,
		docHeight = document.documentElement.scrollHeight;

	body.insertAdjacentHTML('afterbegin', '<div class="overlay overlayJs"></div>');

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
	const modal = body.querySelectorAll('.modalJs.open'),
		overlay = body.getElementsByClassName('overlayJs')[0];

	if (overlay) overlay.remove();

	modal.forEach((activeModal) => activeModal.classList.remove('open'));
	body.classList.remove('modal-open',  'overlay-open',  'js-scroll-lock');

	resetAllInput();
};

export const showInfoModal = (id, type, content) => {
	closeModal();

	const modal = document.getElementById(id);

	switch (type) {
		case 'alert':
			modal.innerHTML = ModalAlertTemplate(content);
			break;

		case 'remove-act':
			modal.innerHTML = ModalRemoveActTemplate(content);
			break;

		case 'remove-task':
			modal.innerHTML = ModalRemoveTaskTemplate(content);
			break;

		case 'change-service':
			modal.innerHTML = ModalSaveChangesTemplate(content);
			break;

		case 'edit-data':
			modal.innerHTML = ModalEditDataTemplate(content);
			break;

		case 'services-prices':
			modal.innerHTML = ModalTasksWithPriceTemplate(content);
			break;

		case 'services-list':
			modal.innerHTML = ModalTasksTemplate(content);
			break;
	}

	openModal(id);
};


export const formatOrders = (data) => {
	return data.map(order => {
		let {id, code_1c, type, code, fio, car, reg_number, sum, status_id, login, unp, created_at, closed_at} = order,
			surname = fio.split(' ')[0][0].toUpperCase() + fio.split(' ')[0].slice(1),
			name = fio.split(' ')[1] ? `${fio.split(' ')[1][0].toUpperCase()}.` : '',
			patronymic = fio.split(' ')[2] ? `${fio.split(' ')[2][0].toUpperCase()}.` : '';

		fio = [surname, `${name}${patronymic}`].join(' ');

		status_id = status_id == 1 ? 'Новый' : status_id == 2 ? 'Отменен' : 'Выполнен';

		created_at = created_at.split(' ')[0].split('-').reverse().join('.');

		closed_at = closed_at ? closed_at.split(' ')[0].split('-').reverse().join('.') : '—';

		const formatOrder = {id, code_1c, type, code, fio, car, reg_number, sum, status_id, login, unp, created_at, closed_at};

		return formatOrder;
	});
};

export const checkUser = () => {
	const userInLS = localStorage.getItem('user'),
		userInSS = sessionStorage.getItem('user');
	if (userInLS || userInSS) {
		return JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
	}
};


const resetAllInput = () => {
	const inputsChecked = body.querySelectorAll('input:checked');

	for (let input of inputsChecked) {
		input.checked = false;
	}
};
