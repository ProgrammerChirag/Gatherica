/*
* this class is a controller for login functionality of users from gatherica application
*/
public with Sharing class LoginController {

	@AuraEnabled
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
				lw = new LoginWrapper(
					username,
					'provided cred are incorrect please check again and validate Thanks !!'
				);
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
				lw = new LoginWrapper(
					username,
					'provided cred are incorrect please check again and validate Thanks !!'
				);
			}
		} else {
				lw = new LoginWrapper(
					username,
					'Something Went Wrong !!'
				);
		}

		return EncodingUtil.base64Encode(EncryptionDecryptionHandler.getEncryptedValue(JSON.serialize(lw)));
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


	Class LoginWrapper {

		private String username {get; set;}
		private String name {get; set;}
		private String sessionTimeOut {get; set;}
		private String error {get; set;}

		public LoginWrapper (String username, String name, String sessionTimeOut) {
			this.username = username;
			this.name = name;
			this.sessionTimeOut = sessionTimeOut;
		}

		public LoginWrapper (String username, String error) {
			this.username = username;
			this.error = error;
		}
	}
}