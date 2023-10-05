import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { updateFcmToken } from "../db/notification";
import { getUser } from "../../user/db/user";
import useAuthContext from "../../auth/hooks/useAuthContext";

const useNotification = () => {
	const { user, setUser: authSetUser } = useAuthContext();

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
		if (!user) return;
		messaging()
			.getToken()
			.then((token) => {
				if (user?.fcmToken === token) return;
				updateFcmToken(user.uid, token);
			});
	}, [user]);

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			if (remoteMessage.notification?.title === "신청이 처리되었습니다") {
				const updatedUser = await getUser(user?.uid || "");
				authSetUser(updatedUser);
			}
		});

		return unsubscribe;
	}, [user]);

	return { requestUserPermission };
};

export default useNotification;
