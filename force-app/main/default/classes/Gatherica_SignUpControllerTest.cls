@IsTest
private class Gatherica_SignUpControllerTest {

    @TestSetup
    static void setupTestData() {
        // Insert a sample existing contact to test the duplicate user scenario
        Contact existingContact = new Contact(
            LastName = 'Existing User',
            Contact_User_Name__c = 'existinguser123',
            Email = 'existinguser@example.com',
            Password__c = 'password123',
            City__c = 'Existing City',
            Birthdate = Date.newInstance(1990, 1, 1)
        );
        insert existingContact;
    }

    @IsTest
    static void testCreateNewGathericaUser_Success() {
        // Arrange
        String fullName = 'John Doe';
        String userName = 'johndoe123';
        String password = 'password123';
        String confirmedPassword = 'password123';
        String emailAddress = 'johndoe@example.com';
        String dateOfBirth = '1990-01-01';
        String city = 'New York';
        
        // Act
        LoginWrapper result;
        Test.startTest();
        result = Gatherica_SignUpController.createNewGathericaUser(
            fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city
        );
        Test.stopTest();
        
        // Assert
        System.assertNotEquals(null, result, 'Expected a valid LoginWrapper to be returned');
        
        // Check if the new user was created in the database
        Contact createdUser = [SELECT Id, Email, Contact_User_Name__c FROM Contact WHERE Email = :emailAddress LIMIT 1];
        System.assertEquals('johndoe123', createdUser.Contact_User_Name__c, 'Expected username to match');
        System.assertEquals('johndoe@example.com', createdUser.Email, 'Expected email to match');
    }
    
    @IsTest
    static void testCreateNewGathericaUser_MissingFields() {
        // Arrange
        String fullName = 'John Doe';
        String userName = ''; // Missing username
        String password = 'password123';
        String confirmedPassword = 'password123';
        String emailAddress = 'johndoe@example.com';
        String dateOfBirth = '1990-01-01';
        String city = 'New York';
        
        // Act
        Test.startTest();
        LoginWrapper result = Gatherica_SignUpController.createNewGathericaUser(
            fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city
        );
        Test.stopTest();
        
        // Assert
        System.assertEquals(null, result, 'Expected result to be null due to missing username');
    }
    
    @IsTest
    static void testCreateNewGathericaUser_PasswordMismatch() {
        // Arrange
        String fullName = 'John Doe';
        String userName = 'johndoe123';
        String password = 'password123';
        String confirmedPassword = 'password321'; // Mismatching password
        String emailAddress = 'johndoe@example.com';
        String dateOfBirth = '1990-01-01';
        String city = 'New York';
        
        // Act
        Test.startTest();
        LoginWrapper result = Gatherica_SignUpController.createNewGathericaUser(
            fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city
        );
        Test.stopTest();
        
        // Assert
        System.assertEquals(null, result, 'Expected result to be null due to password mismatch');
    }
    
    @IsTest
    static void testCreateNewGathericaUser_DuplicateUser() {
        // Arrange
        String fullName = 'John Doe';
        String userName = 'newuser123';
        String password = 'password123';
        String confirmedPassword = 'password123';
        String emailAddress = 'existinguser@example.com'; // Duplicate email
        String dateOfBirth = '1990-01-01';
        String city = 'New York';
        
        // Act & Assert
        Test.startTest();
        try {
            Gatherica_SignUpController.createNewGathericaUser(
                fullName, userName, confirmedPassword, password, emailAddress, dateOfBirth, city
            );
            System.assert(false, 'Expected an exception due to duplicate user');
        } catch (Gatherica_Exception e) {
            System.assertEquals('this user already exist please try login with credentials !!', e.getMessage(), 'Expected duplicate user exception');
        }
        Test.stopTest();
    }
}