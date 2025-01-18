/**
*	GathericaErrorUtils for getting errors as per requirements.
**/
public class GathericaErrorUtils {

	final static Map<String, String> errorMap = new Map<String, String> {
		'ERR_INVALID_CRED' => 'provided cred are incorrect please check again and validate Thanks !!',
		'ERR_USER_EXIST_EMAIL' => 'user already exist provided Email!',
		'ERR_USER_EXIST_USERNME' => 'user already exist provided username!',
		'ERR_USER_EXIST_GENERIC' => 'this user already exist please try again with different username or email!!',
		'ERR_FORM_DETAILS_MISSING' => 'please fill all details !',
		'ERR_SOMETHING_WENT_WRONG' => 'Something Went Wrong !!',
		'ERR_EVENT_DATE' => 'Oops failed to fetch event date, we are Trying To fix, thanks for your patience.',
		'ERR_FETCH_EVENT' => 'Currently We are Facing some Server Issue Please try after sometime :( '
	};

	public static String getError(String errorKey) {
		Set<String> keySet = errorMap.keySet();
		if(String.isNotBlank(errorKey) && keySet.contains(errorKey)) {
			return errorMap.get(errorKey);
		}
		return 'Internal Server Error.';
	}
}