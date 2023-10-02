import { useState } from "react";

const useSignInUser = () => {
	const [token, setToken] = useState<string>("");

	const signInUser = async (token: string) => {
		setToken(token);
	};

	return { signInUser };
};

export default useSignInUser;
