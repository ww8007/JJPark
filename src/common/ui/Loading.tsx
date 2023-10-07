import React from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import LogoImage from "../../../assets/images/splash.png";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='light-content' />
			<View style={styles.container}>
				<Image style={styles.img} source={LogoImage} />
			</View>
		</SafeAreaView>
	);
};

export default Loading;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.splash,
		zIndex: 10
	},
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.light.splash
	},
	img: {
		width: "100%",
		height: "100%"
	}
});
