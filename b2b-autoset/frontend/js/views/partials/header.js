import {checkUser} from '../../helpers/utils';

import Component from '../../views/component';
import HeaderTemplate from '../../../templates/partials/header.hbs';

class Header extends Component {
    async render() {
		const request = this.request,
			auth = checkUser();
        return await (HeaderTemplate({auth, request}));
    }
	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const headerTop = document.getElementsByClassName('headerMainJs')[0],
			logOutBtn = document.getElementsByClassName('logOutJs')[0];

		if (logOutBtn) {
			logOutBtn.addEventListener('click', (e) => {
				e.preventDefault();

				location.hash = '#/';

				localStorage.clear();
			});
		}

		window.onscroll = () => {
			window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
		};
	}
}

export default Header;
