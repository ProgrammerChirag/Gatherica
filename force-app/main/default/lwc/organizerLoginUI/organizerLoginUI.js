import { LightningElement, track } from 'lwc';
import doLogin from '@salesforce/apex/Gatherica_LoginController.doLogin';

export default class OrganizerLoginUI extends LightningElement {
	@track username = '';
	@track password = '';
	errorMessage = '';
	showPassword = false;

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;

		// Get the password input field
		const passwordField = this.template.querySelector('[data-target-id="passwordbox"]');
		if (passwordField) {
			passwordField.type = this.showPassword ? 'text' : 'password';
		}
	}

	get passwordInputType() {
		return this.showPassword ? 'text' : 'password';
	}

	get toggleIconClass() {
		return this.showPassword ? 'utility:hide' : 'utility:preview';
	}

	get toggleIconAlternativeText() {
		return this.showPassword ? 'Hide password' : 'Show password';
	}

	handleUsernameChange(event) {
		this.username = event.target.value;
	}

	handlePasswordChange(event) {
		this.password = event.target.value;
	}

	handleLoginUserRedirection(event) {
		window.location.href = '?user=old';
	}

	handleLogin() {
		const wrapperCall = {
			username: this.username,
			password: this.password,
			userType: 'Account'
		};
		console.log('OUTPUT : ',JSON.stringify(wrapperCall));
		doLogin(wrapperCall)
			.then(result => {
				console.log('OUTPUT : ', 'login success :)');
				console.log('OUTPUT : ', result);
				// Redirect or handle successful login
				// window.location.href = '/some/success/page';
			})
			.catch(error => {
				this.errorMessage = error.body?.message || 'An error occurred.';

				// Display error message in the password input field
				const passwordField = this.template.querySelector('[data-target-id="passwordbox"]');
				if (passwordField) {
					passwordField.setCustomValidity(this.errorMessage);
					passwordField.reportValidity();
				}

				console.error('Login error: ', this.errorMessage);
			});
	}

	navigateToSignUp(event) {
		window.location.href = '?admin=new';
	}
}