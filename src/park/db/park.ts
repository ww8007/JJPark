import firestore from "@react-native-firebase/firestore";
import { User } from "../../user/db/user";

const db = firestore();

export const getParkList = async () => {
	try {
		const querySnapshot = await db
			.collection("users")
			.where("status", "==", "PENDING")
			.get();

		return querySnapshot.docs
			.map((doc) => doc.data())
			.sort((a, b) => {
				if (a.createdAt > b.createdAt) return -1;
				if (a.createdAt < b.createdAt) return 1;
				return 0;
			}) as User[];
	} catch (error) {
		throw error;
	}
};
