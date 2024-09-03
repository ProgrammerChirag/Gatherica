import { LightningElement, track } from 'lwc';
//import signUp from '@salesforce/apex/SignUpController.signUp'; // Import your Apex method

export default class SignUpUI extends LightningElement {
	@track name = '';
	@track username = '';
	@track password = '';
	@track confirmPassword = '';
	@track email = '';
	@track dob = '';
	@track city = '';

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

	handleSignup() {
		if (this.password !== this.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Create a wrapper object
		const userData = {
			name: this.name,
			username: this.username,
			password: this.password,
			email: this.email,
			dob: this.dob,
			city: this.city
		};

		// Call the Apex method
		/*signUp({ userData })
			.then(result => {
				console.log('Sign Up Success:', result);
				// Handle successful sign-up (e.g., redirect, show a message)
			})
			.catch(error => {
				console.error('Sign Up Error:', error);
				// Handle error (e.g., show an error message)
			});*/
	}
}