import Component from '../../views/component';

import FooterTemplate from '../../../templates/partials/footer.hbs';

class Footer extends Component {
    async render() {
        return await (FooterTemplate());
    }
}

export default Footer;
