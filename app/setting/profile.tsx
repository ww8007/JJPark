import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	View
} from "react-native";
import auth from "@react-native-firebase/auth";
import Header from "../../src/common/ui/Header";
import BottomFixedButton from "../../src/common/ui/BottomFixedButton";
import { Text } from "../../src/common/ui/Text";
import { TextInput } from "../../src/common/ui/Input";
import { getUser, updateUser } from "../../src/user/db/user";
import { useRouter } from "expo-router";
import useAuthContext from "../../src/auth/hooks/useAuthContext";

const profile = () => {
	const router = useRouter();
	const { setUser } = useAuthContext();
	const [initialData, setInitialData] = useState({
		name: "",
		carNum: "",
		role: ""
	});
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		carNum: "",
		role: ""
	});

	// fireStore에서 데이터 가져오기
	useEffect(() => {
		(async () => {
			const uid = auth().currentUser?.uid ?? "";
			const user = await getUser(uid);
			if (user) {
				setRegisterInfo({
					name: user.name,
					carNum: user.carNum,
					role: user.role
				});
				setInitialData({
					name: user.name,
					carNum: user.carNum,
					role: user.role
				});
			}
		})();
	}, []);

	const onChangeName = (text: string) => {
		setRegisterInfo({ ...registerInfo, name: text });
	};

	const onChangeCarNum = (text: string) => {
		setRegisterInfo({ ...registerInfo, carNum: text });
	};

	const onChangeRole = (text: string) => {
		setRegisterInfo({ ...registerInfo, role: text });
	};

	const isAllFilled = Boolean(
		registerInfo.name && registerInfo.carNum && registerInfo.role
	);
	const isSameBefore = Boolean(
		registerInfo.name === initialData.name &&
			registerInfo.carNum === initialData.carNum &&
			registerInfo.role === initialData.role
	);

	const onClickRegister = async () => {
		if (!isAllFilled) {
			Alert.alert("모든 정보를 입력해주세요");
		}
		// 차량 번호에서 공백 제거
		const carNum = registerInfo.carNum.replace(/\s/g, "");
		const uid = auth().currentUser?.uid ?? "";
		const updatedUser = await updateUser(uid, {
			carNum: carNum,
			name: registerInfo.name,
			role: registerInfo.role
		});
		setUser(updatedUser);
		router.back();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header showBackButton title='내 정보 수정' />
			<StatusBar barStyle='dark-content' />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.safeArea}
			>
				<View style={{ flex: 1, justifyContent: "space-around" }}>
					<TitleAndInput
						value={registerInfo.name}
						onChange={onChangeName}
						title='이름'
						placeholder='이름을 입력해주세요'
					/>
					<TitleAndInput
						value={registerInfo.carNum}
						onChange={onChangeCarNum}
						title='차량번호 (11가 1111)'
						placeholder='차량번호를 입력해주세요'
					/>
					<TitleAndInput
						value={registerInfo.role}
						onChange={onChangeRole}
						title='소속'
						placeholder='소속을 입력해주세요'
					/>
					<View style={styles.blankView} />
				</View>
			</KeyboardAvoidingView>
			<BottomFixedButton
				disabled={!isAllFilled || isSameBefore}
				onPress={onClickRegister}
			>
				수정하기
			</BottomFixedButton>
		</SafeAreaView>
	);
};

export default profile;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	blankView: {
		flex: 1
	}
});

interface TileAndInputProps {
	title: string;
	placeholder: string;
	value: string;
	onChange: (text: string) => void;
}

const TitleAndInput = ({
	title,
	placeholder,
	value,
	onChange
}: TileAndInputProps) => {
	return (
		<View style={titleAndInputStyles.container}>
			<Text bold fontSize={16}>
				{title}
			</Text>
			<TextInput
				placeholder={placeholder}
				onChangeText={onChange}
				value={value}
			/>
		</View>
	);
};

const titleAndInputStyles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 20,
		gap: 20,
		height: 120
	}
});
