import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import useSignInUser from "./useSignInUser";

GoogleSignin.configure({
	webClientId: Constants.expoConfig?.extra?.expoClientId || ""
});

const useGetGoogleAuth = () => {
	const { signInUser } = useSignInUser();

	const onClickGoogleLogin = async () => {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth()
			.signInWithCredential(googleCredential)
			.then(async () => {
				signInUser();
				await analytics().logLogin({
					method: "google"
				});
			});
	};

	return { onClickGoogleLogin };
};

export default useGetGoogleAuth;
