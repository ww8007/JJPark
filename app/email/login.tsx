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
import { SafeAreaView } from "react-native-safe-area-context";
import EmailAndPassword from "../../src/auth/ui/EmailAndPassword";
import BottomFixedButton from "../../src/common/ui/BottomFixedButton";
import Header from "../../src/common/ui/Header";
import Colors from "../../src/constants/Colors";
import useEmailStore from "../../src/auth/store/email";
import useSignInUser from "../../src/auth/hooks/useSignInUser";
import { Text } from "../../src/common/ui/Text";

const login = () => {
	const router = useRouter();

	const { email, password, initialize } = useEmailStore();

	const onPressRegister = () => {
		router.push("/email/register");
	};

	const onPressReset = () => {
		router.push("/email/reset");
	};

	const { signInUser } = useSignInUser();

	const onPressLogin = () => {
		if (!email) {
			Alert.alert("이메일을 입력해주세요.");
			return;
		}
		if (!password) {
			Alert.alert("비밀번호를 입력해주세요.");
			return;
		}
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				res.user?.getIdToken().then((token) => {
					signInUser(token);
				});
				initialize();
				router.push("/");
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					Alert.alert("가입되지 않은 이메일입니다.");
				}
				if (error.code === "auth/wrong-password") {
					Alert.alert("비밀번호가 틀렸습니다.");
				}
				if (error.code === "auth/invalid-email") {
					Alert.alert("유효하지 않은 이메일입니다.");
				}
				console.error(error);
			});
	};

	const onClickBackButton = () => {
		initialize();
	};

	return (
		<>
			<StatusBar barStyle='light-content' />
			<SafeAreaView style={styles.safeArea}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<Header showBackButton backButtonCallback={onClickBackButton} />
					<View style={styles.imageWrapper}>
						<Image
							source={require("../../assets/images/icon.png")}
							style={{ width: 200, height: 200, borderRadius: 10 }}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<EmailAndPassword />
						<View style={styles.registerTextWrapper}>
							<Text onPress={onPressRegister} style={styles.registerText}>
								회원가입 하기
							</Text>
						</View>
						<View style={styles.resetTextWrapper}>
							<Text onPress={onPressReset} style={styles.registerText}>
								비밀번호 재설정
							</Text>
						</View>
					</View>
					<BottomFixedButton onPress={onPressLogin}>
						<Text bold color='white'>
							로그인
						</Text>
					</BottomFixedButton>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</>
	);
};

export default login;

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
	resetTextWrapper: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "90%",
		marginTop: 20
	},
	registerText: {
		fontSize: 12,
		color: Colors.light.lightPrimary,
		backgroundColor: Colors.light.background
	}
});
