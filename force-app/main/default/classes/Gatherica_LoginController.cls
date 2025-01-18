/*
* this class is a controller for login functionality of users from gatherica application
*/
public without Sharing class Gatherica_LoginController {

	@AuraEnabled (cacheable  = true)
	public static String doLogin(String username, String password, String userType) {
		LoginWrapper lw ;
		if(String.isNotEmpty(userType) && userType.equalsIgnoreCase('Contact')) {
			Contact contact = getContactInfo(username, password);
			if(contact != NULL) {
				lw = new LoginWrapper(
					contact.contact_user_name__c,
					contact.name,
					'60'
				);
			} else {
				throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_INVALID_CRED'));
			}
		} else if (String.isNotEmpty(userType) && userType.equalsIgnoreCase('Account')) {
			Account acc = getAccInfo(username, password);
			if(acc != NULL) {
				lw = new LoginWrapper(
					acc.Account_User_Name__c,
					acc.name,
					'60'
				);
			} else {
				throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_INVALID_CRED'));
			}
		} else {
			throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_SOMETHING_WENT_WRONG') + userType);
		}

		return EncodingUtil.base64Encode(Gatherica_EncodeHandler.getEncryptedValue(JSON.serialize(lw)));
	}


	// getting event subscriber information stored...
	private static Contact getContactInfo(String username, String password) {
		List<Contact> contacts = [SELECT id, name, contact_user_name__c	 , Password__c FROM Contact where contact_user_name__c	 =:username AND password__c =:password ORDER BY createddate desc LIMIT 1];
		return !contacts.isEmpty() ? contacts[0] : NULL;
	}


	// getting event publisher information stored....
	private static Account getAccInfo (String username, String password) {
		List<Account> accounts = [SELECT id, name, Account_User_Name__c, Password__c FROM Account where Account_User_Name__c =:username AND password__c =:password ORDER BY createddate desc LIMIT 1];
		return !accounts.isEmpty() ? accounts[0] : NULL;
	}

}