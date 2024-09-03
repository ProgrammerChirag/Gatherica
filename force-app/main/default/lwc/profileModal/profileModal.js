import { LightningElement, track, api } from 'lwc';
import getUserDetails from '@salesforce/apex/GathericaHomeController.getUserDetails';

export default class ProfileModal extends LightningElement {
	@track isModalOpen = false;
	@track userName = '';
	@track userEmail = '';
	@track userPhone = '';

	@api userLoginAuth;

	connectedCallback() {
		this.isModalOpen = true;
		this.init();
	}

	init() {
		getUserDetails({ encryptedUserInfo: this.userLoginAuth })
			.then(result => {
				if (result && result.length > 0) {
					const userDetails = result[0];
					this.userName = userDetails.name || '';
					this.userEmail = userDetails.email || '';
					this.userPhone = userDetails.phone || '';
				}
			})
			.catch(error => {
				console.error('Error fetching user details:', JSON.stringify(error));
			});
	}


	// Close the modal
	closeModal() {
		this.isModalOpen = false;
		this.dispatchEvent(new CustomEvent('profileclosed'));
	}

	// Handle input changes
	handleInputChange(event) {
		const field = event.target.dataset.id;
		if (field === 'name') {
			this.userName = event.target.value;
		} else if (field === 'email') {
			this.userEmail = event.target.value;
		} else if (field === 'phone') {
			this.userPhone = event.target.value;
		}
	}

	// Handle save action
	handleSave() {
		// Logic to save user information can be added here
		console.log('User Info Saved:', this.userName, this.userEmail, this.userPhone);
		this.closeModal();
	}
}