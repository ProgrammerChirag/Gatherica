import { LightningElement, track } from 'lwc';
import createNewGathericaUser from '@salesforce/apex/Gatherica_SignUpController.createNewGathericaUser'; // Import your Apex method

export default class SignUpUI extends LightningElement {
	@track name = '';
	@track username = '';
	@track password = '';
	@track confirmPassword = '';
	@track email = '';
	@track dob = '';
	@track city = '';
	@track showSpinner = false;
	@track userAuthToken = '';
	@track dataTargetId = 'username';

	handleNameChange(event) {
		this.name = event.target.value;
	}

	handleUsernameChange(event) {
		this.username = event.target.value;
	}

	handlePasswordChange(event) {
		this.password = event.target.value;
	}

	handleConfirmPasswordChange(event) {
		this.confirmPassword = event.target.value;
	}

	handleEmailChange(event) {
		this.email = event.target.value;
	}

	handleDobChange(event) {
		this.dob = event.target.value;
	}

	handleCityChange(event) {
		this.city = event.target.value;
	}

	handleLoginPageRedirection(event) {
		window.location.href = '?user=old';
	}

	handleEventRedirectionToAdminSignup(event) {
		window.location.href = '?admin=new';
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

	handleSignup(event) {
		this.showSpinner = true;
		if (this.password !== this.confirmPassword) {
			alert('Passwords do not match!');
		} else {
			// Create a wrapper object
			const userData = {
				fullName: this.name,
				userName: this.username,
				confirmedPassword: this.confirmPassword,
				password: this.password,
				emailAddress: this.email,
				dateOfBirth: this.dob,
				city: this.city
			};

			// Call the Apex method
			createNewGathericaUser(userData)
				.then(result => {
					console.log('Sign Up Success:', result);
					this.userAuthToken = result;
					this.setUserAuthTokenAndRedirectToDashboard();
				})
				.catch(error => {
					// Handle error (e.g., show an error message)
					this.showSpinner = false;
					if (!this.showSpinner) {
						this.errorMessage = error.body?.message || 'An error occurred.';
						this.setTargetID();
						// Display error message in the password input field
						const passwordField = this.template.querySelector(`[data-target-id=${this.dataTargetId}]`);
						if (passwordField) {
							passwordField.setCustomValidity(this.errorMessage);
							passwordField.reportValidity();
						}
						this.userAuthToken = 'NULL';
					}
				});
		}
	}

	setTargetID() {
		if (this.errorMessage.includes('Email')) {
			this.dataTargetId = 'email';
		} else if (this.errorMessage.includes('username')) {
			this.dataTargetId = 'username';
		} else if (this.errorMessage.includes('name')) {
			this.dataTargetId = 'name';
		} else if (this.errorMessage.includes('city')) {
			this.dataTargetId = 'city';
		} else if (this.errorMessage.includes('password')) {
			this.dataTargetId = 'password';
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
}