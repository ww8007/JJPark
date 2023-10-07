import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useReducer
} from "react";
import { User, defaultUser, getUser, isAdmin } from "../../user/db/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ActionMapType<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export type AuthStateType = {
	isInitialized: boolean;
	user: User | null;
};

export type Auth0ContextType = {
	isInitialized: boolean;
	user: User | null;
	logout: () => void;
	setUser: (user: User) => void;
};

enum Types {
	INITIAL = "INITIAL",
	UPDATE = "UPDATE",
	LOGOUT = "LOGOUT"
}

type Payload = {
	[Types.INITIAL]: {
		user: User;
	};
	[Types.UPDATE]: {
		user: User;
	};
	[Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
	isInitialized: false,
	user: null
};

const reducer = (state: AuthStateType, action: ActionsType) => {
	if (action.type === Types.INITIAL) {
		return {
			isInitialized: true,
			user: action.payload.user
		};
	}
	if (action.type === Types.UPDATE) {
		return {
			...state,
			user: action.payload.user
		};
	}
	if (action.type === Types.LOGOUT) {
		return {
			...state,
			isAuthenticated: false,
			user: null
		};
	}
	return state;
};

const storeUser = async (user: User) => {
	try {
		if (!user.uid) return;
		const serializedUser = JSON.stringify(user);
		await AsyncStorage.setItem("user", serializedUser);
	} catch (error) {
		console.error("Failed to save user.", error);
	}
};

const loadUser = async (): Promise<User | null> => {
	try {
		const serializedUser = await AsyncStorage.getItem("user");
		if (serializedUser === null) return null;
		return JSON.parse(serializedUser);
	} catch (error) {
		console.error("Failed to load user.", error);
		return null;
	}
};

const removeUser = async () => {
	try {
		await AsyncStorage.removeItem("user");
	} catch (error) {
		console.error("Failed to remove user.", error);
	}
};

export const AuthContext = createContext<Auth0ContextType | null>(null);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			const storedUser = await loadUser();
			if (storedUser) {
				dispatch({
					type: Types.INITIAL,
					payload: { user: storedUser }
				});
			} else {
				router.push("/login");
			}
		})();
	}, []);

	// LOGOUT
	const logout = useCallback(() => {
		auth().signOut();
		dispatch({
			type: Types.LOGOUT
		});
		removeUser();
		router.push("/login");
	}, []);

	// SET USER
	const setUser = useCallback(
		(newUser: User) => {
			if (!deepEqual(state.user as TestObject, newUser as TestObject)) {
				dispatch({
					type: Types.UPDATE,
					payload: { user: newUser }
				});
				storeUser(newUser); // 여기에서 AsyncStorage 업데이트
			}
		},
		[state.user]
	);

	const memoizedValue = useMemo(
		() => ({
			isInitialized: state.isInitialized,
			user: state.user,
			logout,
			setUser
		}),
		[state.isInitialized, state.user, setUser, logout]
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}

interface TestObject {
	[key: string]: any;
}

function deepEqual(obj1: TestObject, obj2: TestObject) {
	if (obj1 === obj2) {
		return true;
	}

	if (
		typeof obj1 !== "object" ||
		obj1 === null ||
		typeof obj2 !== "object" ||
		obj2 === null
	) {
		return false;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
}
