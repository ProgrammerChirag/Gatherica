@isTest
private class Gatherica_LoginControllerTest {

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
		String encryptedResult = Gatherica_LoginController.doLogin('testuser', 'testpassword', 'Contact');

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
		String encryptedResult = Gatherica_LoginController.doLogin('testaccount', 'testpassword', 'Account');

		// Verify the encryptedResult is not null or empty
		System.assertNotEquals(null, encryptedResult, 'Login failed for Account');
	}

	@isTest
	static void testDoLoginWithInvalidUserType() {
		try {
			// Call the doLogin method with an invalid user type
			String encryptedResult = Gatherica_LoginController.doLogin('testuser', 'testpassword', 'InvalidType');
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('Something Went Wrong !!InvalidType', e.getMessage());
		}
	}

	@isTest
	static void testDoLoginWithIncorrectCredentials() {
		try {
			// Call the doLogin method with incorrect credentials for Contact
			String encryptedResult = Gatherica_LoginController.doLogin('invaliduser', 'invalidpassword', 'Contact');
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('provided cred are incorrect please check again and validate Thanks !!', e.getMessage());
		}

		try {
			// Call the doLogin method with incorrect credentials for Account
			String encryptedResult = Gatherica_LoginController.doLogin('invalidaccount', 'invalidpassword', 'Account');
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('provided cred are incorrect please check again and validate Thanks !!', e.getMessage());
		}
	}

	@isTest
	static void testDoLoginWithNoResults() {
		try {
			// Call the doLogin method with non-existing credentials for Contact
			String encryptedResult1 = Gatherica_LoginController.doLogin('nonexistinguser', 'nonexistingpassword', 'Contact');
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('provided cred are incorrect please check again and validate Thanks !!', e.getMessage());
		}

		try {
			// Call the doLogin method with non-existing credentials for Account
			String encryptedResult2 = Gatherica_LoginController.doLogin('nonexistingaccount', 'nonexistingpassword', 'Account');
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('provided cred are incorrect please check again and validate Thanks !!', e.getMessage());
		}
	}

	@isTest
	static void testDoLoginWithUnexpectedUserType() {
		try {
			// Call the doLogin method with unexpected (null) userType
			String encryptedResult = Gatherica_LoginController.doLogin('testuser', 'testpassword', null);
			System.assert(false, 'Expected an exception to be thrown');
		} catch (Gatherica_Exception e) {
			System.assertEquals('Something Went Wrong !!null', e.getMessage());
		}
	}
}