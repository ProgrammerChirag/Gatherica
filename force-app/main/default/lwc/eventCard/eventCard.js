import { LightningElement, api } from 'lwc';

export default class EventCard extends LightningElement {
	@api events = [];
	@api action;
	@api subscrptionEnabled;

	connectedCallback() {}

	get showSubsriberButton() {
		return this.subscrptionEnabled !== undefined ? this.subscrptionEnabled : false;
	}

	get isSubscribeAction() {
		return this.action === 'subscribe';
	}

	get processedEvents() {
		return this.events.map(event => ({
			...event,
			eventTypeClass: this.getEventTypeClass(event.type),
			expectedAttendance: this.getExpectedAttendance(event.expectedAttendance)
		}));
	}

	getEventTypeClass(type) {
		switch (type) {
			case 'education':
				return 'badge badge-education';
			case 'health':
				return 'badge badge-conference';
			case 'workshop':
				return 'badge badge-workshop';
			case 'networking':
				return 'badge badge-networking';
			default:
				return 'badge badge-default';
		}
	}

	getExpectedAttendance(attendance) {
		return attendance ? attendance : 'N/A';
	}

	handleAction(event) {
		const eventId = event.target.dataset.id;
		if (this.isSubscribeAction) {
			console.log('Subscribe to event with ID:', eventId);
		} else {
			console.log('Unsubscribe from event with ID:', eventId);
		}
	}
}