import firestore from "@react-native-firebase/firestore";

const db = firestore();

export const updateFcmToken = async (uid: string, fcmToken: string) => {
	try {
		await db.collection("users").doc(uid).update({ fcmToken });
	} catch (error) {
		throw error;
	}
};
