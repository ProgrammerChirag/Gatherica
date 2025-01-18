public without sharing class GathericaHomeController {

	@AuraEnabled(cacheable=true)
	public static List<EventWrapper> getEventList(Integer recordCount, String username) {
		if(recordCount > 0) 
			return GathericaHomeServiceHandler.getEventList(recordCount, username);
		throw new Gatherica_Exception (GathericaErrorUtils.getError('ERR_FETCH_EVENT'));
		
	}

	@AuraEnabled(cacheable = true)
	public static List<UserWrapper> getUserDetails(String encryptedUserInfo) {
		// Validate input and throw exception if necessary
		if (String.isBlank(encryptedUserInfo)) {
			throw new Gatherica_Exception('Session appears to be logged out. Please try logging in again.');
		}

		// Decrypt the input and parse the JSON
		String decryptedValue = Gatherica_EncodeHandler.getDecryptedValue(EncodingUtil.base64Decode(encryptedUserInfo));
		Map<String, String> userInfoMap = parseJsonToMap(decryptedValue);

		// Validate parsed JSON map
		if (userInfoMap == null || !userInfoMap.containsKey('username') || String.isBlank(userInfoMap.get('username'))) {
			throw new Gatherica_Exception('No username found or internal server error. Please raise a helpdesk ticket.');
		}

		// Fetch user information based on the username
		String username = userInfoMap.get('username');
		Contact gathericaUser = fetchGathericaUserInfo(username);

		// If user is not found, throw an exception
		if (gathericaUser == null) {
			throw new Gatherica_Exception('No user found');
		}

		// Create and return the user info list
		List<UserWrapper> userinfoList = new List<UserWrapper>{new UserWrapper(gathericaUser.Name, gathericaUser.Contact_User_Name__c, gathericaUser.Email, gathericaUser.Phone, NULL)};
		return userinfoList;
	}

	// Parses a JSON string into a Map<String, String>
	private static Map<String, String> parseJsonToMap(String jsonString) {
		if (String.isBlank(jsonString)) {
			return null;
		}

		Map<String, Object> tempMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
		Map<String, String> resultMap = new Map<String, String>();

		for (String key : tempMap.keySet()) {
			resultMap.put(key, String.valueOf(tempMap.get(key)));
		}

		return resultMap;
	}

	private static Contact fetchGathericaUserInfo(String username) {
		List<Contact> contacts = [
			SELECT Id, Name, Email, Phone, Contact_User_Name__c
			FROM Contact
			WHERE Contact_User_Name__c = :username
			ORDER BY CreatedDate DESC
			LIMIT 1
		];
		return !contacts.isEmpty() ? contacts[0] : NULL;
	}

}