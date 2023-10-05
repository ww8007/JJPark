require("dotenv").config();

export default {
	expo: {
		name: "JJPark",
		slug: "JJPark",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff"
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.ww8007.JJPark"
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff"
			},
			package: "com.ww8007.JJPark"
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png"
		},
		plugins: ["expo-router", "@react-native-google-signin/google-signin"],
		experiments: {
			typedRoutes: true
		},
		extra: {
			router: {
				origin: false
			},
			eas: {
				projectId: "0a1eb3cf-06e3-40f8-8871-9f7230816f2e"
			},
			expoClientId: process.env.CLIENT_ID
		}
	}
};
