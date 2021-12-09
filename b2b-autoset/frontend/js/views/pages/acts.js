import {closeModal, showInfoModal, checkUser, hideL, showL} from '../../helpers/utils';

import Component from '../../views/component';

import ActsTemplate from '../../../templates/pages/acts.hbs';


import Acts from '../../models/acts';
import ActsTableTemplate from '../../../templates/pages/acts/actsTable.hbs';


class OrdersList extends Component {
	constructor() {
		super();

		this.model = new Acts();
	}

	async getData() {
		try {
			return await this.model.getActsList(checkUser().token);
		} catch {
			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить список актов!'
			});
		}
	}

	async getActsNum(num, token) {
		try {
			return await this.model.getActsNum(num, token);
		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить акт по номеру!'
			});

			num.value = '';
		}

	}

	async removeActs(num, token) {
		return await this.model.removeAct(num, token);
	}

	async render(acts) {
		const request = this.request,
			auth = checkUser();

		return ActsTemplate({acts, request, auth});
	}

	async afterRender() {
		super.afterRender();
		await this.setActions();
	}

	async setActions() {
		const tableActs = document.getElementsByClassName('actsTableBodyJs')[0],
			actsForm = document.getElementById('actsForm'),
			inputActs = actsForm.getElementsByTagName('input')[0],
			actsData = await this.getData();

		actsForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			showL();

			if (inputActs.value.trim()) {
				const auth = checkUser(),
					acts = await this.getActsNum(inputActs.value, checkUser().token);

				if (acts && acts.length) {
					tableActs.innerHTML = ActsTableTemplate({acts, auth});

					hideL();
				} else {
					hideL();

					showInfoModal('alert-modal', 'alert', {
						title : 'Ошибка!',
						message : 'Не удалось получить акт по номеру!'
					});
				}
			} else {
				const auth = checkUser(),
					acts = await this.getData();

				tableActs.innerHTML = ActsTableTemplate({acts, auth});

				hideL();
			}
		});


		tableActs.addEventListener('click', (e) => {
			const target = e.target,
				taskRow = target.closest('.actsRowJs');

			if (target.closest('.removeActsJs')) {
				event.preventDefault();

				const href = target.closest('.removeActsJs').getAttribute('href'),
					actRowCode = taskRow.dataset.code;

				showInfoModal(href, 'remove-act', {
					actCode : actRowCode
				});

				document.body.addEventListener('click', async(e) => {
					const target = e.target;

					if (target.closest('.removeActsFromDBJs')) {

						const acts = actsData.filter(act => act.code_1c !== actRowCode);

						await this.removeActs(actRowCode, checkUser().token);

						tableActs.innerHTML = ActsTableTemplate({acts});

						closeModal();
					}
				});
			}

		});
	}
}

export default OrdersList;
