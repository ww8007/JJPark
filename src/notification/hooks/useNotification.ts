import messaging from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { updateFcmToken } from "../db/notification";
import auth from "@react-native-firebase/auth";
import { User, getUser } from "../../user/db/user";

const useNotification = () => {
	const currentUser = auth().currentUser;
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			if (!currentUser) return;
			const user = await getUser(currentUser.uid);
			setUser(user);
		})();
	}, [currentUser]);

	const requestUserPermission = async () => {
		if (Platform.OS === "android") {
			PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
			);
		}
		const authStatus = await messaging().requestPermission({
			providesAppNotificationSettings: true
		});
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (!enabled) {
			console.log("알림 권한을 허용해주세요.");
		}
	};

	useEffect(() => {
		if (!currentUser) return;
		messaging()
			.getToken()
			.then((token) => {
				if (user?.fcmToken === token) return;
				updateFcmToken(currentUser.uid, token);
			});
	}, [currentUser]);

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);

	return { requestUserPermission };
};

export default useNotification;
