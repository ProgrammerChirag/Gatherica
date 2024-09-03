/*
* gatherica encrption and decryption handler...
*/

public class Gatherica_EncodeHandler {

	public static String getDecryptedValue(Blob encryptedText) {
		String result = NULL;
		Blob key = EncodingUtil.base64Decode(getEncryptionKey128Bit());
		Blob decrypted = Crypto.decrypt('AES128', key, key, encryptedText);
		result = decrypted.toString();
		return result;
	}

	public static Blob getEncryptedValue(String jsonData) {
		Blob key = EncodingUtil.base64Decode(getEncryptionKey128Bit());
		Blob data = Blob.valueOf(jsonData);
		Blob encrypted = Crypto.encrypt('AES128', key, key, data);
		return encrypted;
	}

	@testVisible
	private static String getEncryptionKey128Bit() {
		List<Gatherica_Security_key__c> gathericaSecurityKeyRecords = [SELECT Id, encrypted_text__c FROM Gatherica_Security_key__c WHERE Name = 'gatherica user login token key 128 bit' LIMIT 1];
		return !gathericaSecurityKeyRecords.isEmpty() ? gathericaSecurityKeyRecords[0].encrypted_text__c :createAndReturnEncryptionKey('gatherica user login token key 128 bit');
	}

	@testVisible
	private static String createAndReturnEncryptionKey(String recordUName) {
		Blob aesKey = Crypto.generateAesKey(128); // Generate AES key as a BLOB
		String encryptedText = EncodingUtil.base64Encode(aesKey); // Convert BLOB to Base64-encoded string
		INSERT new Gatherica_Security_key__c(Name = recordUName, encrypted_text__c = encryptedText);
		return encryptedText;
	}

}