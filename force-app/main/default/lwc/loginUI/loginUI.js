import { LightningElement, track } from 'lwc';
import doLogin from '@salesforce/apex/Gatherica_LoginController.doLogin';

export default class LoginUI extends LightningElement {
	@track username = '';
	@track password = '';
	errorMessage = '';
	showPassword = false;
	showSpinner = true;
	userAuthToken = null;

	connectedCallback() {
		this.showSpinner = false;
	}

	handleUsernameChange(event) {
		this.username = event.target.value;
	}

	get greetingMessage() {
		return this.showSpinner ? 'please wait...' : 'Welcome Back!';
	}

	handlePasswordChange(event) {
		this.password = event.target.value;
	}

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

	handleLogin() {
		this.showSpinner = true;
		const wrapperCall = {
			'username': this.username,
			'password': this.password,
			'userType': 'Contact'
		};
		doLogin(wrapperCall).then(result => {
			if (result != null) {
				this.userAuthToken = result;
			} else {
				this.userAuthToken = 'NULL';
			}
			this.setUserAuthTokenAndRedirectToDashboard();
		}).catch(error => {
			this.showSpinner = false;
			if (!this.showSpinner) {
				this.errorMessage = error.body?.message || 'An error occurred.';
				// Display error message in the password input field
				const passwordField = this.template.querySelector('[data-target-id="passwordbox"]');
				if (passwordField) {
					passwordField.setCustomValidity(this.errorMessage);
					passwordField.reportValidity();
				}
				console.error('Login error: ', this.errorMessage);
				this.userAuthToken = 'NULL';
			}
		});
	}

	setUserAuthTokenAndRedirectToDashboard() {
		if (this.userAuthToken != null && this.userAuthToken.length > 0 && this.userAuthToken != 'NULL') {
			// show user is authenticated Successfully Message.
			// set userAuthToken as cookie
			let cookieDocumented = this.setAuthCookie(this.userAuthToken);
			// page redirection to home page..
			if (cookieDocumented)
				window.location.href = '?ux=home';
		} else {
			// show user is failed to authenticad Message.
		}
	}



	setAuthCookie(value, path = '/', secure = false, httpOnly = false) {
		let expires = "";
		const date = new Date();
		date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
		let cookieString = `auth=${encodeURIComponent(value)}${expires}; path=${path}`;
		if (secure) {
			cookieString += "; Secure";
		}
		if (httpOnly) {
			cookieString += "; HttpOnly";
		}
		document.cookie = cookieString;
		return true;
	}

	navigateToSignUp(event) {
		window.location.href = '?user=new';
	}

	eventLoginPageRedirection(event) {
		window.location.href = '?admin=old';
	}
}