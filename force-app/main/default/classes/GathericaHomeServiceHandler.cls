/**
* @File Name : GathericaHomeServiceHandler.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : September 6, 2024
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | September 6, 2024 |   | Initial Version
**/

public class GathericaHomeServiceHandler {

	Public static List<EventWrapper> getEventList(Integer recordCount, String username) {
		List<EventWrapper> eventWrapperList = new List<EventWrapper>();
		Set<String> subscribedEventList = new Set<String> ();
		List<Gatherica_Event__c> gathericaEventList = GathericaHomeSelector.getEventList(recordCount);
		if(String.isNotBlank(username)) {
			// get all subscribed events by this username
			subscribedEventList = GathericaHomeSelector.getSubscribedEventList(username);
		}
		for(Gatherica_Event__c eventRecord : gathericaEventList) {
			eventWrapperList.add (
				new EventWrapper (
					String.valueOf(eventRecord.Id),
					eventRecord.name,
					eventRecord.Description__c,
					String.valueOf(eventRecord.Event_Date__c),
					eventRecord.Event_Publisher__r.Name,
					eventRecord.Event_Category__c,
					100,
					subscribedEventList.contains(eventRecord.Id),
					eventRecord.Event_Status__c
				)
			);
		}
		return eventWrapperList;
	}
}