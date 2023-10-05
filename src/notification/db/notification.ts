import firestore from "@react-native-firebase/firestore";
import { STATUS, updateUser } from "../../user/db/user";

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

type UserMessage = "신청이 승인되었습니다" | "신청이 거절되었습니다";

export const sendToUser = async (uid: string, message: UserMessage) => {
	try {
		await db.collection("userNotification").add({
			uid,
			createdAt: firestore.FieldValue.serverTimestamp(),
			content: message
		});
		const user = updateUser(uid, {
			status:
				message === "신청이 승인되었습니다" ? STATUS.APPROVED : STATUS.REJECTED
		});
	} catch (error) {
		throw error;
	}
};
