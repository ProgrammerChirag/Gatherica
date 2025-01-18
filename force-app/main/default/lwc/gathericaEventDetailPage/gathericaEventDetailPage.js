import { LightningElement } from 'lwc';
export default class GathericaEventDetailPage extends LightningElement {
    userLoggedIN = false;
    userLoginAuth;
    connectedCallback() {
        this.initUserState();
    }
    showSpinner = true;

    initUserState() {

        // check if url has login parameter or not....
        let uriMap = this.getQueryParamsAsMap();
        if (this.checkForUserLogin()) {
            // if this is true means user is logged in.
            if (!this.checkEventDetailPage(uriMap)) {
                // this means user is is not correct URL
                window.location.href = '/gatherica?user=old';
            } else {
                // this means user is on correct url and logged in
                this.userLoggedIN = true;
            }
        } else {
            /* this means user is not logged in now we need to check
            * if user is already on login page or not if yes then
            * we don't need redirect otherwise user should be on login page
            */
            if (!this.checkLoginPageURI(uriMap)) {
                window.location.href = '/gatherica?user=old';
            }
        }
    }

    changeInitState (event) {
		this.showSpinner = false;
	}

	checkForUserLogin() {
		let isUserLoggedIn = false;
		this.userLoginAuth = this.getAuthCookie();
		if (this.userLoginAuth != null && this.userLoginAuth != 'NULL'
			&& this.userLoginAuth != undefined && this.userLoginAuth.length > 0) {
			isUserLoggedIn = true;
		} else {
			isUserLoggedIn = false;
		}
		return isUserLoggedIn;
	}

	checkEventDetailPage(uriMap) {
		return (uriMap.get('eventid') != undefined && uriMap.get('eventid') != null && uriMap.get('eventid').length === 18 ) 
	}

	checkLoginPageURI(uriMap) {
		return (uriMap.get('user') != null || uriMap.get('admin') != null);
	}

	getQueryParamsAsMap() {
		const params = new URLSearchParams(window.location.search);
		const paramMap = new Map();

		for (const [key, value] of params.entries()) {
			paramMap.set(key, value);
		}

		return paramMap;
	}

	setAuthCookie(value, path = '/', secure = false, httpOnly = false) {
		let expires = "";
		const date = new Date();
		date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
		let cookieString = `auth=${encodeURIComponent(value)}${expires}; path=${path}`;
		if (secure) {
			cookieString += "; Secure";
		}
		if (httpOnly) {
			cookieString += "; HttpOnly";
		}
		document.cookie = cookieString;
	}

	getAuthCookie() {
		const cookieName = 'auth=';
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookies = decodedCookie.split(';');

		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			if (cookie.indexOf(cookieName) === 0) {
				return cookie.substring(cookieName.length, cookie.length);
			}
		}

		// Return null if the 'auth' cookie is not found
		return null;
	}
}