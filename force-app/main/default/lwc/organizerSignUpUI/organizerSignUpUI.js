import { LightningElement, track } from 'lwc';

export default class OrganizerSignUpUI extends LightningElement {
	@track name = '';
	@track signUpUsername = '';
	@track signUpPassword = '';
	@track confirmPassword = '';
	@track email = '';
	@track idCard = '';
	@track addressProof = '';
	@track pinCode = '';
	@track phoneNumber = '';
	@track companyName = '';

	handleNameChange(event) {
		this.name = event.target.value;
	}

	handleSignUpUsernameChange(event) {
		this.signUpUsername = event.target.value;
	}

	handleSignUpPasswordChange(event) {
		this.signUpPassword = event.target.value;
	}

	handleConfirmPasswordChange(event) {
		this.confirmPassword = event.target.value;
	}

	handleEmailChange(event) {
		this.email = event.target.value;
	}

	handleIdCardChange(event) {
		this.idCard = event.target.value;
	}

	handleAddressProofChange(event) {
		this.addressProof = event.target.value;
	}

	handlePinCodeChange(event) {
		this.pinCode = event.target.value;
	}

	handlePhoneNumberChange(event) {
		this.phoneNumber = event.target.value;
	}

	handleCompanyNameChange(event) {
		this.companyName = event.target.value;
	}

	handleSignUp() {
		// Handle sign-up logic here
		console.log('Sign Up attempt:', this.name, this.signUpUsername, this.signUpPassword, this.confirmPassword, this.email, this.idCard, this.addressProof, this.pinCode, this.phoneNumber, this.companyName);
	}

	navigateToLogin(event) {
		window.location.href = '?admin=old';
	}
}