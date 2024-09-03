import { LightningElement, api, track } from 'lwc';

export default class GathericaTab extends LightningElement {
	@api activeTab = 'subscribed'; // Default active tab

	get tabClass() {
		return (tabName) => {
			return tabName === this.activeTab ? 'tab active' : 'tab';
		};
	}

	handleClick(event) {
		const selectedTab = event.target.dataset.tab;
		this.dispatchEvent(new CustomEvent('tabchange', {
			detail: { tab: selectedTab }
		}));
	}
}