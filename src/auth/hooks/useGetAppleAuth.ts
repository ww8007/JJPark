import appleAuth from "@invertase/react-native-apple-authentication";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";

import useSignInUser from "./useSignInUser";
import useUserStore from "../store/user";

const useGetAppleAuth = () => {
	const { signInUser } = useSignInUser();
	const { setName } = useUserStore();

	const signInWithApple = async () => {
		// Start the sign-in request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.REFRESH,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
		});

		// Ensure Apple returned a user identityToken
		if (!appleAuthRequestResponse.identityToken) {
			throw new Error("Apple Sign-In failed - no identify token returned");
		}

		// Create a Firebase credential from the response
		const { identityToken, nonce, fullName } = appleAuthRequestResponse;
		const appleCredential = auth.AppleAuthProvider.credential(
			identityToken,
			nonce
		);

		if (fullName?.givenName && fullName?.familyName) {
			setName(`${fullName?.givenName}${fullName?.familyName}`);
		}

		// Sign the user in with the credential
		return auth()
			.signInWithCredential(appleCredential)
			.then(async () => {
				signInUser();
			})
			.catch((err) => {
				analytics().logEvent("apple_sign_in_failed", {
					error: err
				});
			});
	};

	return { signInWithApple };
};

export default useGetAppleAuth;
