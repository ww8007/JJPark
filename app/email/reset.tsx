import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	View
} from "react-native";
import EmailAndPassword from "../../src/auth/ui/EmailAndPassword";
import BottomFixedButton from "../../src/common/ui/BottomFixedButton";
import Header from "../../src/common/ui/Header";
import Colors from "../../src/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import useEmailStore from "../../src/auth/store/email";
import { Text } from "../../src/common/ui/Text";

const reset = () => {
	const router = useRouter();

	const { email } = useEmailStore();

	const onPressLogin = () => {
		if (!email) {
			Alert.alert("이메일을 입력해주세요.");
			return;
		}
		auth()
			.sendPasswordResetEmail(email)
			.then((res) => {
				Alert.alert("이메일이 전송되었습니다.");
				router.push("/email/login");
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					Alert.alert("가입되지 않은 이메일입니다.");
				}
				if (error.code === "auth/invalid-email") {
					Alert.alert("유효하지 않은 이메일입니다.");
				}
				console.error(error);
			});
	};

	return (
		<>
			<StatusBar barStyle='light-content' />
			<SafeAreaView style={styles.safeArea}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<Header showBackButton />
					<View style={styles.imageWrapper}>
						<Image
							source={require("../../assets/images/icon.png")}
							style={{ width: 200, height: 200, borderRadius: 10 }}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<EmailAndPassword withPassword={false} />
					</View>
					<BottomFixedButton onPress={onPressLogin}>
						<Text fontSize={16} color='white' bold>
							재설정 이메일 보내기
						</Text>
					</BottomFixedButton>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</>
	);
};

export default reset;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	container: {
		flex: 1
	},
	imageWrapper: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	inputWrapper: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	registerTextWrapper: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "90%",
		marginTop: 30
	},
	registerText: {
		fontSize: 12,
		color: Colors.light.lightPrimary
	}
});
