import { MaterialIcons } from "@expo/vector-icons";
import appleAuth, {
	AppleButton
} from "@invertase/react-native-apple-authentication";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, View } from "react-native";
import useGetAppleAuth from "../auth/hooks/useGetAppleAuth";
import Button from "../common/ui/Button";
import GoggleLogo from "../common/ui/GoggleLogo";
import { Text } from "../common/ui/Text";
import Colors from "../constants/Colors";
import useGetGoogleAuth from "../auth/hooks/useGetGoogleAuth";

export default function ModalScreen() {
	const { onClickGoogleLogin } = useGetGoogleAuth();
	const { signInWithApple } = useGetAppleAuth();
	const router = useRouter();

	const onClickEmailLogin = () => {
		router.push("/email/login");
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image
					source={require("../assets/images/icon.png")}
					style={{ width: 200, height: 200, borderRadius: 10 }}
				/>
			</View>
			<View style={styles.buttonWrapper}>
				{appleAuth.isSupported && (
					<AppleButton
						buttonStyle={AppleButton.Style.WHITE}
						buttonType={AppleButton.Type.SIGN_IN}
						style={{
							width: "100%",
							height: 50
						}}
						onPress={signInWithApple}
					/>
				)}
				<Button onPress={onClickGoogleLogin} viewStyle={styles.blueButtonStyle}>
					<GoggleLogo />
					<Text bold style={{ fontSize: 18 }}>
						Google로 로그인
					</Text>
				</Button>
				<Button onPress={onClickEmailLogin} viewStyle={styles.greenButtonStyle}>
					<MaterialIcons name='email' size={24} color='white' />
					<Text bold style={{ fontSize: 18 }}>
						Email로 로그인
					</Text>
				</Button>
			</View>
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
}

const styles = StyleSheet.create({
	logoText: {
		fontSize: 70,
		alignSelf: "center"
	},
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		paddingHorizontal: 10
	},
	imageWrapper: {
		height: "30%",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	buttonWrapper: {
		rowGap: 20,
		padding: 30
	},
	flexRow: {
		flex: 1
	},
	googleBtn: {
		flexGrow: 0,
		flexShrink: 0,
		borderRadius: 2,
		backgroundColor: Colors.light.lightPrimary
	},
	blueButtonStyle: {
		backgroundColor: Colors.light.lightPrimary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexGrow: 1,
		borderRadius: 5,
		columnGap: 5
	},
	greenButtonStyle: {
		backgroundColor: Colors.light.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexGrow: 1,
		borderRadius: 5,
		columnGap: 5
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%"
	}
});
