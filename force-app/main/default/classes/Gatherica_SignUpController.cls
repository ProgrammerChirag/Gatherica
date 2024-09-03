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

public class Gatherica_SignUpController {

	@AuraEnabled
	public static LoginWrapper createNewGathericaUser(String fullName, String userName, String confirmedPassword, String password, String emailAddress, String dateOfBirth, String city) {
		LoginWrapper lw ;

		// this check is if any value is blank and passwords are mismatching..
		if (String.isNotBlank(fullName) && String.isNotBlank(userName) && String.isNotBlank(confirmedPassword) && String.isNotBlank(password)
			&& String.isNotBlank(emailAddress) && String.isNotBlank(dateOfBirth) && String.isNotBlank(city) && password.equalsIgnoreCase(confirmedPassword)) {
				// now we need to check if this user already exists or not in our database..
				if(!checkForExistingUserInDB(emailAddress, password)) {
					/**
					*   As we are here means user does not exist. so now we need to register this user with provided details.
					*   Now we will run a future method to INSERT a new record and it will send an email to user who tried to logged in
					**/
					createNewGathericaUserAsync(fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city);
					lw = new LoginWrapper( username, fullName, '60');
				}
		}
		return lw;
	}

	/**
	*   this method will check if provided email user already exist or not.
	**/
	private static Boolean checkForExistingUserInDB(String emailAddress, String userPass) {
		List<Contact> gathericaUserList = [SELECT ID FROM Contact WHERE email=:emailAddress AND password__c =: userPass];
		if(!gathericaUserList.isEmpty() && gathericaUserList.size() == 1) {
			// user found we just need to throw an error from here that this user already exist pls try login with credentials..
			throw new Gatherica_Exception('this user already exist please try login with credentials !!');
		}
		return false;
	}

	@future
	private static void createNewGathericaUserAsync(String fullName, String userName, String confirmedPassword, String password, String emailAddress, String dateOfBirth, String city) {
		INSERT new Contact (
			lastName = fullName,
			contact_user_name__c = username,
			email= emailAddress,
			password__c = password,
			city__c = city,
			Birthdate = Date.valueOf(dateOfBirth)
		);
	}
}