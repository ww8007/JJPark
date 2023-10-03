import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useReducer
} from "react";
import { User, getUser } from "../../user/db/user";
import useNotification from "../../notification/hooks/useNotification";

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

export type AuthUserType = User | null;

export type AuthStateType = {
	isInitialized: boolean;
	user: AuthUserType;
};

export type Auth0ContextType = {
	isInitialized: boolean;
	user: AuthUserType | null;
	logout: () => void;
	setUser: (user: AuthUserType) => void;
};

enum Types {
	INITIAL = "INITIAL",
	LOGOUT = "LOGOUT"
}

type Payload = {
	[Types.INITIAL]: {
		user: AuthUserType;
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
	if (action.type === Types.LOGOUT) {
		return {
			...state,
			isAuthenticated: false,
			user: null
		};
	}
	return state;
};

export const AuthContext = createContext<Auth0ContextType | null>(null);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialState);
	const { requestUserPermission } = useNotification();

	useEffect(() => {
		auth().onAuthStateChanged(async (user) => {
			if (!user) router.push("/login");
			requestUserPermission();
			if (user) {
				const userInDB = await getUser(user.uid);
				dispatch({
					type: Types.INITIAL,
					payload: {
						user: userInDB
					}
				});
				if (!userInDB) {
					router.push("/register");
				} else {
					router.push("/");
				}
			}
		});
	}, [auth()]);

	const initialize = useCallback(async () => {
		try {
			auth().onAuthStateChanged(async (user) => {
				if (user) {
					const userInDB = await getUser(user.uid);
					dispatch({
						type: Types.INITIAL,
						payload: {
							user: userInDB
						}
					});
				}
			});
		} catch (error) {
			console.error(error);
			dispatch({
				type: Types.INITIAL,
				payload: {
					user: null
				}
			});
		}
	}, [auth]);

	// LOGOUT
	const logout = useCallback(() => {
		auth().signOut();
		dispatch({
			type: Types.LOGOUT
		});
	}, []);

	// SET USER
	const setUser = useCallback(
		(user: AuthUserType) => {
			dispatch({
				type: Types.INITIAL,
				payload: {
					user
				}
			});
		},
		[dispatch]
	);

	const memoizedValue = useMemo(
		() => ({
			isInitialized: state.isInitialized,
			user: state.user,
			logout,
			setUser
		}),
		[state.isInitialized, state.user, logout]
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}
