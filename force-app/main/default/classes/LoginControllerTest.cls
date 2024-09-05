/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 09-05-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
@isTest
private class LoginControllerTest {

	@isTest
	static void testDoLoginWithContact() {
		// Create a test Contact record
		Contact testContact = new Contact(
			FirstName = 'John',
			LastName = 'Doe',
			contact_user_name__c = 'testuser',
			Password__c = 'testpassword',
			City__c = 'testCity'
		);
		insert testContact;

		// Call the doLogin method with Contact credentials
		String encryptedResult = LoginController.doLogin('testuser', 'testpassword', 'Contact');

		// Verify the encryptedResult is not null or empty
		System.assertNotEquals(null, encryptedResult, 'Login failed for Contact');
	}

	@isTest
	static void testDoLoginWithAccount() {
		// Create a test Account record
		Account testAccount = new Account(
			Name = 'Test Account',
			Account_User_Name__c = 'testaccount',
			Password__c = 'testpassword'
		);
		insert testAccount;

		// Call the doLogin method with Account credentials
		String encryptedResult = LoginController.doLogin('testaccount', 'testpassword', 'Account');

		// Verify the encryptedResult is not null or empty
		System.assertNotEquals(null, encryptedResult, 'Login failed for Account');
	}

	@isTest
	static void testDoLoginWithInvalidUserType() {
		// Call the doLogin method with an invalid user type
		String encryptedResult = LoginController.doLogin('testuser', 'testpassword', 'InvalidType');

		// Verify the encryptedResult is not null or empty
		System.assertNotEquals(null, encryptedResult, 'Invalid user type handling failed');
	}

	@isTest
	static void testDoLoginWithIncorrectCredentials() {
		// Call the doLogin method with incorrect credentials for Contact
		String encryptedResult1 = LoginController.doLogin('invaliduser', 'invalidpassword', 'Contact');

		// Verify the encryptedResult1 is not null or empty
		System.assertNotEquals(null, encryptedResult1, 'Incorrect credentials handling failed for Contact');

		// Call the doLogin method with incorrect credentials for Account
		String encryptedResult2 = LoginController.doLogin('invalidaccount', 'invalidpassword', 'Account');

		// Verify the encryptedResult2 is not null or empty
		System.assertNotEquals(null, encryptedResult2, 'Incorrect credentials handling failed for Account');
	}

	@isTest
	static void testDoLoginWithNoResults() {
		// Call the doLogin method with non-existing credentials for Contact
		String encryptedResult1 = LoginController.doLogin('nonexistinguser', 'nonexistingpassword', 'Contact');

		// Verify the encryptedResult1 is not null or empty
		System.assertNotEquals(null, encryptedResult1, 'No results handling failed for Contact');

		// Call the doLogin method with non-existing credentials for Account
		String encryptedResult2 = LoginController.doLogin('nonexistingaccount', 'nonexistingpassword', 'Account');

		// Verify the encryptedResult2 is not null or empty
		System.assertNotEquals(null, encryptedResult2, 'No results handling failed for Account');
	}

	@isTest
	static void testDoLoginWithUnexpectedUserType() {
		// Call the doLogin method with unexpected (null) userType
		String encryptedResult = LoginController.doLogin('testuser', 'testpassword', null);

		// Verify the encryptedResult is not null or empty
		System.assertNotEquals(null, encryptedResult, 'Unexpected user type handling failed');
	}

	// Additional test methods can be added to cover more scenarios and edge cases
}