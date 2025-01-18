import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ErrorPage extends NavigationMixin(LightningElement) {

	navigateToHome(event) {
		window.location.href = '/gatherica/?ux=home';
	}
}