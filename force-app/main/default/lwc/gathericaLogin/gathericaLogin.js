import { LightningElement } from 'lwc';

export default class GathericaLogin extends LightningElement {
	showLoginUI = false;
	showSignUpUI = false;
	showOrganizerSignUpUI = false;
	showOrganizerLoginUI = false;

	connectedCallback() {
		const uriMap = this.getQueryParamsAsMap();
		const userPageValue = uriMap.get('user');
		const adminPageValue = uriMap.get('admin');

		if (userPageValue) {
			this.updateUI(userPageValue === 'new', userPageValue === 'old', false);
		} else if (adminPageValue) {
			this.updateUI(adminPageValue === 'new', adminPageValue === 'old', true);
		}
	}

	updateUI(isNew, isOld, isAdmin) {
		this.showLoginUI = isOld && !isAdmin;
		this.showSignUpUI = isNew && !isAdmin;
		this.showOrganizerSignUpUI = isNew && isAdmin;
		this.showOrganizerLoginUI = isOld && isAdmin;
	}

	getQueryParamsAsMap() {
		return new Map([...new URLSearchParams(window.location.search).entries()]);
	}
}