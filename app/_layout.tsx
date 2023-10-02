import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
	createNavigationContainerRef
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import useSettingFont from "../src/common/hooks/useFonts";
import { AuthProvider } from "../src/auth/context/AuthContext";
import { useEffect } from "react";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from "expo-router";

interface NavigationParams {
	index: undefined;
	login: undefined;
}

export const navigationRef = createNavigationContainerRef<NavigationParams>();

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "/login"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { loaded } = useSettingFont();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<AuthProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name='login' options={{ headerShown: false }} />
					<Stack.Screen name='email' options={{ animation: "flip" }} />
					<Stack.Screen name='register' options={{ animation: "flip" }} />
					<Stack.Screen name='setting' options={{ animation: "flip" }} />
				</Stack>
			</ThemeProvider>
		</AuthProvider>
	);
}
