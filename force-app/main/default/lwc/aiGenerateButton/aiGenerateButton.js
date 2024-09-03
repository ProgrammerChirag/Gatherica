import { LightningElement, track } from 'lwc';

export default class AiGenerateButton extends LightningElement {

	@track showMessage = false;

	handleClick() {
		this.showMessage = true;

		// Hide the message after 3 seconds
		setTimeout(() => {
			this.showMessage = false;
		}, 3000); // 3000 milliseconds = 3 seconds


		// Create and dispatch the custom 'startai' event
		const event = new CustomEvent('startai', {
			bubbles: true,   // Allows the event to bubble up to parent components
			composed: true   // Allows the event to cross shadow DOM boundaries
		});

		this.dispatchEvent(event);
	}
}