import Component from '../../views/component';

import Auth from '../../models/auth';

import AuthorizationTemplate from '../../../templates/pages/authorization.hbs';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Auth();
	}

	async getData(email, password) {
		try {
			return await this.model.getData(email, password);
		} catch {
			throw new Error('Невозможно отправить запрос!');
		}
	}

	render() {
		return (AuthorizationTemplate());
	}

	afterRender() {
		this.setActions();
	}

	setActions() {
		const authForm = document.getElementById('authorization-form'),
			authFormInputs = authForm.getElementsByTagName('input'),
			messangeError = authForm.getElementsByClassName('errorAuthJs')[0];

		authForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			let email = authFormInputs.email.value.trim(),
				password = authFormInputs.password.value.trim();

			const user = await this.getData(email, password);

			if (user['error-email']) {
				authFormInputs.email.classList.add('error');

				messangeError.classList.remove('hidden');
				messangeError.innerText = user['error-email'];
			} else if (user['error-password']) {
				authFormInputs.password.classList.add('error');

				messangeError.classList.remove('hidden');
				messangeError.innerText = user['error-password'];
			} else {
				localStorage.setItem('user', JSON.stringify(user));

				location.hash = '#/orders';
			}
		});

		authForm.addEventListener('keyup', (e) => {
			const target = e.target;

			if ((target.id == 'email' || target.id == 'password') && e.keyCode !== 13) {
				if (target.value != '') {
					target.classList.remove('error');
					messangeError.classList.add('hidden');
					messangeError.innerText = '';
				}
			}
		});
	}
}

export default Authorization;
