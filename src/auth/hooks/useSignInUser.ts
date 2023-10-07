import { useRouter } from "expo-router";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignInUser = () => {
	const router = useRouter();
	const { user } = useAuthContext();

	const signInUser = async () => {
		if (!user) router.push("/register");
		if (!user) return;
		if (user.carNum && user.role) router.push("/");
	};

	return { signInUser };
};

export default useSignInUser;
