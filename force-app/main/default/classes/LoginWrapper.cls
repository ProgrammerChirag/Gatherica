/**
* @File Name : LoginWrapper.cls
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

public Class LoginWrapper {

		@AuraEnabled public String username {get; set;}
		@AuraEnabled public String name {get; set;}
		@AuraEnabled public String sessionTimeOut {get; set;}

		public LoginWrapper (String username, String name, String sessionTimeOut) {
			this.username = username;
			this.name = name;
			this.sessionTimeOut = sessionTimeOut;
		}
	}