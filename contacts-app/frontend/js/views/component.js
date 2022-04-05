import {parseRequestURL, openModal, closeModal} from '../helpers/utils';

class Component {
    constructor() {
        this.request = parseRequestURL();
    }

    async getData() {
        return;
    }

	afterRender() {
		document.body.onclick = () => {
			const target = event.target;

			if (target.closest('.modalOpenJs')) {
				event.preventDefault();

				let href = target.closest('.modalOpenJs').getAttribute('href');

				closeModal();
				openModal(href);
			}

			if (target.classList.contains('js-modal-close') || target.classList.contains('js-overlay')) {
				closeModal();
			}
		};

		window.addEventListener('unload', () => {
			localStorage.removeItem('showContactsCount');
			localStorage.removeItem('options');
			localStorage.removeItem('optionsArr');
			localStorage.removeItem('currentPage');
		});
	}
}

export default Component;
