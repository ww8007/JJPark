import auth from "@react-native-firebase/auth";
import React from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailAndPassword from "../../src/auth/ui/EmailAndPassword";
import BottomFixedButton from "../../src/common/ui/BottomFixedButton";
import Header from "../../src/common/ui/Header";
import Colors from "../../src/constants/Colors";
import useEmailStore from "../../src/auth/store/email";
import useSignInUser from "../../src/auth/hooks/useSignInUser";
import { useRouter } from "expo-router";

const register = () => {
	const router = useRouter();
	const { email, password } = useEmailStore();

	const { signInUser } = useSignInUser();

	const onPressRegister = () => {
		if (!email) {
			Alert.alert("이메일을 입력해주세요.");
			return;
		}
		if (!password) {
			Alert.alert("비밀번호를 입력해주세요.");
			return;
		}
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async () => {
				router.push("/login");
				Alert.alert("회원가입이 완료되었습니다.");
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					Alert.alert("이미 사용중인 이메일입니다.");
				}
				if (error.code === "auth/invalid-email") {
					Alert.alert("유효하지 않은 이메일입니다.");
				}
				if (error.code === "auth/weak-password") {
					Alert.alert("비밀번호는 6자리 이상이어야 합니다.");
				}
				console.error(error);
			});
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='light-content' />
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
					<EmailAndPassword />
				</View>
				<BottomFixedButton onPress={onPressRegister}>
					<Text style={{ fontFamily: "NanumSquareBold", fontSize: 16 }}>
						회원가입
					</Text>
				</BottomFixedButton>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default register;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	container: {
		flex: 1,
		backgroundColor: Colors.light.background
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
