import { LightningElement, track, api } from 'lwc';
//import getRecommendedEvents from '@salesforce/apex/EventRecommendationController.getRecommendedEvents';

export default class GathericaRecommendationsPanel extends LightningElement {
	@track events = [];
	@track error;
	@track showSpinner = true;

	connectedCallback() {
		this.events = [
			{
				Id: '1',
				Name: 'Tech Conference 2024',
				Description: 'Join us for an insightful conference on the latest in technology.',
				EventDate: '2024-09-15'
			},
			{
				Id: '2',
				Name: 'Art & Culture Festival',
				Description: 'Experience the richness of art and culture at our annual festival.',
				EventDate: '2024-10-01'
			},
			{
				Id: '3',
				Name: 'Health & Wellness Expo',
				Description: 'Discover new ways to stay healthy and fit at our wellness expo.',
				EventDate: '2024-11-20'
			}
		];
		this.showSpinner = true;
		setTimeout(() => {
			this.hideSpinner();
		}, 2000); // 2 seconds delay
	}

	@api init() {
		this.showSpinner = true;
		setTimeout(() => {
			this.hideSpinner();
		}, 2000); // 2 seconds delay
	}

	hideSpinner() {
		this.showSpinner = false;
	}

	// @wire(getRecommendedEvents)
	// wiredEvents({ error, data }) {
	//     if (data) {
	//         this.events = data;
	//     } else if (error) {
	//         this.error = error;
	//         this.events = [];
	//     }
	// }

	handleCancel(event) {
		this.dispatchEvent(new CustomEvent('cancelclicked'));
	}

	handleViewEvent(event) {
		const eventId = event.target.dataset.id;
		// Implement the logic to navigate to the event details page
		// Example: this[NavigationMixin.Navigate]({ type: 'standard__recordPage', attributes: { recordId: eventId, objectApiName: 'Event__c', actionName: 'view' } });
	}
}