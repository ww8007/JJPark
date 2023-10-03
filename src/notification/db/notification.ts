import firestore from "@react-native-firebase/firestore";

const db = firestore();

export const updateFcmToken = async (uid: string, fcmToken: string) => {
	try {
		await db.collection("users").doc(uid).update({ fcmToken });
	} catch (error) {
		throw error;
	}
};

export const sendToAdmin = async (uid: string, message: string) => {
	try {
		await db.collection("adminNotification").add({
			uid,
			createdAt: firestore.FieldValue.serverTimestamp(),
			content: message
		});
	} catch (error) {
		throw error;
	}
};
