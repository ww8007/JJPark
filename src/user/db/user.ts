import firestore from "@react-native-firebase/firestore";
import "dayjs/locale/ko";

import dayjs from "dayjs";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
dayjs.locale("ko");

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
	createdAt: number;
	updatedAt: number;
	uid: string;
	status: STATUS;
	fcmToken: string;
	time: 0 | 3 | 5;
	role: string;
}

export interface Admin {
	fcmToken: string;
}

export const defaultUser: User = {
	name: "",
	carNum: "",
	createdAt: dayjs().unix(),
	updatedAt: dayjs().unix(),
	uid: "",
	status: STATUS.NONE,
	fcmToken: "",
	time: 3,
	role: "무소속"
};

export const addUser = async (user: User) => {
	try {
		await db.collection("users").doc(user.uid).set(user);
		const newUser = await getUser(user.uid);
		return newUser;
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
		const updatedUser = await getUser(uid);
		return updatedUser;
	} catch (error) {
		throw error;
	}
};

export const isAdmin = async (uid: string) => {
	try {
		const user = await db.collection("admins").doc(uid).get();
		return user.exists;
	} catch (error) {
		throw error;
	}
};

export const addAdmin = async (uid: string, fcmToken: string) => {
	try {
		await db.collection("admins").doc(uid).set({ fcmToken });
	} catch (error) {
		throw error;
	}
};
