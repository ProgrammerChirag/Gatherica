public without sharing Class UserWrapper {
	@AuraEnabled public String name {get; set;}
	@AuraEnabled public String username {get; set;}
	@AuraEnabled public String email {get; set;}
	@AuraEnabled public String phone {get; set;}
	@AuraEnabled public String errorMessage {get; set;}

	public UserWrapper(String name, String username, String email, String phone, String errorMessage) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.phone = phone;
		this.errorMessage = errorMessage;
	}
}