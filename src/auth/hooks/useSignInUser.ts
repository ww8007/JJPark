import { useRouter } from "expo-router";
import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { getUser } from "../../user/db/user";
import auth from "@react-native-firebase/auth";

const useSignInUser = () => {
	const router = useRouter();
	const { user, setUser } = useAuthContext();

	const signInUser = async () => {
		if (!user) {
			const dbUser = await getUser(auth().currentUser?.uid || "");
			if (!dbUser) {
				router.push("/register");
				return;
			}
			if (dbUser) setUser(dbUser);
			if (dbUser.level === "ADMIN") {
				router.push("/admin");
				return;
			}
			if (dbUser.carNum && dbUser.role) router.push("/");
			else if (!dbUser.carNum && !dbUser.role) router.push("/register");
			console.log("dbUser", dbUser);
		}
	};

	return { signInUser };
};

export default useSignInUser;
