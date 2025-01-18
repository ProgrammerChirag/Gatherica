/**
* @File Name : GathericaHomeSelector.cls
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

public class GathericaHomeSelector {

	public static Set<String> getSubscribedEventList(String username) {
		Set<String> subscribedEventList = new Set<String>();
		for(gatherica_event_Users__c user : [Select Gatherica_Event__r.Id from gatherica_event_Users__c where gatherica_User__r.contact_user_name__c =: username]) {
			subscribedEventList.add(user.Gatherica_Event__r.Id);
		}
		return subscribedEventList;
	}

	Public static List<Gatherica_Event__c> getEventList(Integer recordCountLimit){
		return [
				SELECT Id, Completed__c, Contact_Email__c, Name,
				Description__c, Event_Category__c, Event_Date__c, 
				Event_Publisher__r.Name, Event_Status__c, External_Website_URL__c, 
				Price__c FROM Gatherica_Event__c WHERE Event_Date__c != NULL LIMIT :recordCountLimit
			];
	}
}