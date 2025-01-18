import { LightningElement, api } from 'lwc';

export default class HeaderSection extends LightningElement {

	@api userLoginAuth

	expandSearchBox() {
		this.template.querySelector('.search-box').classList.add('expanded');
	}

	collapseSearchBox() {
		this.template.querySelector('.search-box').classList.remove('expanded');
	}

	handleProfileClicked(event) {
		this.dispatchEvent(new CustomEvent('profileclicked'));
	}

	handleBellClick(event) {
		this.dispatchEvent(new CustomEvent('shownotificationbar'));
	}
}