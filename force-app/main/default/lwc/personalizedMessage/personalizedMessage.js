import { LightningElement, api, track } from 'lwc';

export default class PersonalizedMessage extends LightningElement {
	@track userName = 'chirag juneja'; // Default to an empty string

	@api
	setUserName(name) {
		this.userName = name;
	}
}