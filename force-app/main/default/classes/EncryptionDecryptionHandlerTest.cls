/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 07-14-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
@isTest
private class EncryptionDecryptionHandlerTest {

	@isTest
	static void testEncryptionAndDecryption() {
		// Generate and insert a mock Gatherica_Security_key__c record for encryption key
		String encryptionKey = EncryptionDecryptionHandler.createAndReturnEncryptionKey('Test Key');

		// Test encryption
		String jsonData = '{"field1": "value1", "field2": "value2"}';
		Blob encryptedData = EncryptionDecryptionHandler.getEncryptedValue(jsonData);
		System.assertNotEquals(null, encryptedData, 'Encryption failed');

		// Test decryption
		String decryptedString = EncryptionDecryptionHandler.getDecryptedValue(encryptedData);
		System.assertEquals(jsonData, decryptedString, 'Decryption failed');
	}

	// Additional test methods can be added to cover edge cases, error handling, etc.
}