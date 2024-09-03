@isTest
private class Gatherica_EncodeHandlerTest {

	@isTest
	static void testEncryptionAndDecryption() {
		// Generate and insert a mock Gatherica_Security_key__c record for encryption key
		String encryptionKey = Gatherica_EncodeHandler.createAndReturnEncryptionKey('Test Key');

		// Test encryption
		String jsonData = '{"field1": "value1", "field2": "value2"}';
		Blob encryptedData = Gatherica_EncodeHandler.getEncryptedValue(jsonData);
		System.assertNotEquals(null, encryptedData, 'Encryption failed');

		// Test decryption
		String decryptedString = Gatherica_EncodeHandler.getDecryptedValue(encryptedData);
		System.assertEquals(jsonData, decryptedString, 'Decryption failed');
	}

	// Additional test methods can be added to cover edge cases, error handling, etc.
}