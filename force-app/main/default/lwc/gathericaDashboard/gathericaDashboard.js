import { LightningElement, track, api } from 'lwc';
import { eventList, tabConfigList } from './eventData';

export default class GathericaDashboard extends LightningElement {
	@track events = [];
	@track filteredEvents = [];
	@track isSubscribedActive = false;
	@track isNewActive = true;
	@track loading = false;
	@track showRecommendations = true;
	@track showExploreMore = true;
	@api userLoginAuth ;
	filterCriteria = {
		name: '',
		date: ''
	};
	showSpinner;
	tabConfig = tabConfigList;
	showProfileModal = false;

	handleProfileClicked(event) {
		this.showProfileModal = true;
	}

	handleProfileClosed(event) {
		this.showProfileModal = false;
	}

	getActiveTabFilterCriteria() {
		const filterCriteria = this.tabConfig.find(element => element.selected === true);
		return filterCriteria;
	}

	compareEventAttributeWithFilterAttribute(eventAttribute, filterAttribute) {
		// this means if event attribute is not provided this means event cannot be filtered
		if(eventAttribute === null || eventAttribute === undefined)
			return false;
		
		// if filterAttribute is null this means this values does not metter
		if(filterAttribute === 'null') {
			return true;
		} else if(filterAttribute === eventAttribute) {
			return true;
		}
		return false;
	}

	matchFilter(filterCriteria, eventWorkItem) {
		let result = null;
		let subscribedFiltred = this.compareEventAttributeWithFilterAttribute (eventWorkItem['subscribed'], filterCriteria['subscribed']);
		let startFilterted = this.compareEventAttributeWithFilterAttribute (eventWorkItem['started'], filterCriteria['started']);
		let finishFiltered = this.compareEventAttributeWithFilterAttribute (eventWorkItem['finished'], filterCriteria['finished']);;
		if (Object.keys(filterCriteria) != undefined && filterCriteria['subscribed'] != undefined && filterCriteria['started'] != undefined && filterCriteria['finished'] != undefined) {
			if (subscribedFiltred === true && startFilterted === true && finishFiltered === true) {
				result = eventWorkItem;
			} else result = null;
		}
		return result;
	}

	onTabClicked(event) {
		this.loading = true;
		const eventId = event.currentTarget.dataset.id;

		// Update tab active states
		this.tabConfig = this.tabConfig.map(currentItem => {
			if (currentItem.dataId === eventId) {
				currentItem.CSS = 'tab active';
				currentItem.selected = true;
				if (eventId.includes('Upcoming Events')) {
					this.isNewActive = true;
					this.isSubscribedActive = false;
				} else if (eventId.includes('My History') || eventId.includes('Ongoing Event') || eventId.includes('Expired Events')) {
					this.isNewActive = false;
					this.isSubscribedActive = true;
				}
			} else {
				currentItem.CSS = 'tab';
				currentItem.selected = false;
			}
			return currentItem;
		});

		// After updating the tabConfig, re-apply filters
		this.applyFilters();

		// Simulate loading delay (if required)
		setTimeout(() => {
			this.loading = false;
		}, 2000); // 2 seconds delay
	}

	aiRecommendationHandler(event) {
		if (this.showRecommendations === true) {
			let targetId = event.target.dataset.targetId;
			let target = this.template.querySelector(`[data-id="${targetId}"]`);
			target.init();
		} else {
			this.showRecommendations = true;
		}
	}

	hideSpinner() {
		this.showSpinner = false;
	}

	get isLoading() {
		return this.loading;
	}

	get showFilters() {
		return !this.loading;
	}

	get showEvents() {
		return !this.loading;
	}

	get showSubscribedEvents() {
		return this.isSubscribedActive && !this.loading;
	}

	connectedCallback() {
		this.showSpinner = true;
		setTimeout(() => {
			this.hideSpinner();
		}, 2000);
		this.loadEvents();
	}

	loadEvents() {
		this.applyFilters();
	}

	handleFilterChange(event) {
		const filterType = event.target.dataset.filter;
		this.filterCriteria[filterType] = event.target.value;
		this.applyFilters();
	}

	isFilterMatchingWithTabConfig(eventDetail, activeTab, name, date) {
		let uiFilter = (!name || eventDetail.name.toLowerCase().includes(name.toLowerCase())) && (!date || eventDetail.date === date);
		let tabFilteredEvent = this.matchFilter(activeTab.filter, eventDetail);
		if(uiFilter === true && tabFilteredEvent != undefined && tabFilteredEvent != null) {
			return tabFilteredEvent;
		} 
		return null;
	}

	applyFilters() {
		let activeTab = this.getActiveTabFilterCriteria();
		this.events = eventList;
		const { name, date } = this.filterCriteria;
		this.filteredEvents = this.events.filter(event => this.isFilterMatchingWithTabConfig(event, activeTab, name, date));
	}

	hideRecommendations(event) {
		this.showRecommendations = false;
	}

	handleExploreMore(event) {
		this.showExploreMore = false;
		this.showRecommendations = false;
	}
}