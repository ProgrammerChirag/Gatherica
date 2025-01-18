/**
* @File Name : Gatherica_SignUpController.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : August 16, 2024
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | August 16, 2024 |   | Initial Version
**/

public without sharing class Gatherica_SignUpController {

	@AuraEnabled
	public static String createNewGathericaUser(String fullName, String userName, String confirmedPassword, String password, String emailAddress, String dateOfBirth, String city) {
		LoginWrapper lw ;

		// this check is if any value is blank and passwords are mismatching..
		if (String.isNotBlank(fullName) && String.isNotBlank(userName) && String.isNotBlank(confirmedPassword) && String.isNotBlank(password)
			&& String.isNotBlank(emailAddress) && String.isNotBlank(dateOfBirth) && String.isNotBlank(city) && password.equalsIgnoreCase(confirmedPassword)) {
				// now we need to check if this user already exists or not in our database..
				if(!checkForExistingUserInDB(userName, emailAddress)) {
					/**
					*	As we are here means user does not exist. so now we need to register this user with provided details.
					*	Now we will run a future method to INSERT a new record and it will send an email to user who tried to logged in
					**/
					if(createNewGathericaUserAsync(fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city)) {
						lw = new LoginWrapper( username, fullName, '60');
					} else {
						throw new Gatherica_Exception(GathericaErrorUtils.getError(NULL));
					}
				}
		} else {
			throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_FORM_DETAILS_MISSING'));
		}
		return EncodingUtil.base64Encode(Gatherica_EncodeHandler.getEncryptedValue(JSON.serialize(lw)));
	}

	/**
	*   this method will check if provided email user already exist or not.
	**/
	private static Boolean checkForExistingUserInDB(String userName, String userEmail) {
		List<Contact> gathericaUserList = [SELECT ID, contact_user_name__c, email FROM Contact WHERE contact_user_name__c=:userName OR email =:userEmail ORDER BY Createddate DESC LIMIT 1];
		if(!gathericaUserList.isEmpty() && gathericaUserList.size() > 0) {
			if(gathericaUserList[0].contact_user_name__c.equals(userName)) {
				throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_USER_EXIST_USERNME'));
			} else if(gathericaUserList[0].email.equals(userEmail)) {
				throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_USER_EXIST_EMAIL'));
			}
			// throwing generic error
			throw new Gatherica_Exception(GathericaErrorUtils.getError('ERR_USER_EXIST_GENERIC'));
		}
		return false;
	}


	private static Boolean createNewGathericaUserAsync(String fullName, String userName, String confirmedPassword, String password, String emailAddress, String dateOfBirth, String city) {
		try {
			INSERT new Contact (
				lastName = fullName,
				contact_user_name__c = username,
				email= emailAddress,
				password__c = password,
				city__c = city,
				Birthdate = Date.valueOf(dateOfBirth)
			);
		} catch (System.DMLException e) {
			throw new Gatherica_Exception(e.getMessage());
		}
		return true;
	}

	
}