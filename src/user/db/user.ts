import firestore from "@react-native-firebase/firestore";

const db = firestore();

export enum STATUS {
	NONE = "NONE",
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED"
}

export interface User {
	name: string;
	carNum: string;
	createdAt: unknown;
	updatedAt: unknown;
	uid: string;
	status: STATUS;
}

export const addUser = async (user: User) => {
	try {
		await db.collection("users").doc(user.uid).set(user);
	} catch (error) {
		throw error;
	}
};

export const getUser = async (uid: string) => {
	try {
		const user = await db.collection("users").doc(uid).get();
		return user.data() as User;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (uid: string, user: Partial<User>) => {
	try {
		await db.collection("users").doc(uid).update(user);
	} catch (error) {
		throw error;
	}
};
