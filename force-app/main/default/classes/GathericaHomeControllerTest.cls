@IsTest
private class GathericaHomeControllerTest {
    
    @TestSetup
    static void setupTestData() {
        // Insert a sample Contact record
        Contact testContact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Email = 'johndoe@example.com',
            Phone = '1234567890',
            Contact_User_Name__c = 'johndoe123',
            City__c = 'testCity'
        );
        insert testContact;
    }
    
    @IsTest
    static void testGetUserDetails_Success() {
        // Arrange
        String username = 'johndoe123';
        String jsonString = '{"username": "' + username + '"}';
        String encryptedUserInfo = EncodingUtil.base64Encode(Gatherica_EncodeHandler.getEncryptedValue(jsonString));
        
        // Act
        Test.startTest();
        List<UserWrapper> result = GathericaHomeController.getUserDetails(encryptedUserInfo);
        Test.stopTest();
        
        // Assert
        System.assertEquals(1, result.size(), 'Expected exactly one user wrapper in the result');
        UserWrapper userWrapper = result[0];
        System.assertEquals('John Doe', userWrapper.name, 'Expected user name to match');
        System.assertEquals('johndoe123', userWrapper.username, 'Expected username to match');
        System.assertEquals('johndoe@example.com', userWrapper.email, 'Expected email to match');
        System.assertEquals('1234567890', userWrapper.phone, 'Expected phone number to match');
    }
    
    @IsTest
    static void testGetUserDetails_InvalidEncryptedInfo() {
        // Arrange
        String invalidEncryptedUserInfo = '';

        // Act & Assert
        try {
            GathericaHomeController.getUserDetails(invalidEncryptedUserInfo);
            System.assert(false, 'Exception was expected due to invalid encrypted info.');
        } catch (Gatherica_Exception e) {
            System.assertEquals('Session appears to be logged out. Please try logging in again.', e.getMessage(), 'Expected exception message mismatch');
        }
    }
    
    @IsTest
    static void testGetUserDetails_NoUserFound() {
        // Arrange
        String username = 'nonexistentuser';
        String jsonString = '{"username": "' + username + '"}';
        String encryptedUserInfo = EncodingUtil.base64Encode(Gatherica_EncodeHandler.getEncryptedValue(jsonString));

        // Act & Assert
        try {
            GathericaHomeController.getUserDetails(encryptedUserInfo);
            System.assert(false, 'Exception was expected for no user found.');
        } catch (Gatherica_Exception e) {
            System.assertEquals('No user found', e.getMessage(), 'Expected exception message mismatch');
        }
    }
    
    @IsTest
    static void testGetUserDetails_EmptyJson() {
        // Arrange
        String emptyJsonString = '{}';
        String encryptedUserInfo = EncodingUtil.base64Encode(Gatherica_EncodeHandler.getEncryptedValue(emptyJsonString));

        // Act & Assert
        try {
            GathericaHomeController.getUserDetails(encryptedUserInfo);
            System.assert(false, 'Exception was expected due to missing username.');
        } catch (Gatherica_Exception e) {
            System.assertEquals('No username found or internal server error. Please raise a helpdesk ticket.', e.getMessage(), 'Expected exception message mismatch');
        }
    }
}