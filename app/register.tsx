import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../src/common/ui/Text";
import Header from "../src/common/ui/Header";
import { TextInput } from "../src/common/ui/Input";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	View
} from "react-native";
import BottomFixedButton from "../src/common/ui/BottomFixedButton";
import auth from "@react-native-firebase/auth";
import { STATUS, addUser } from "../src/user/db/user";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import useAuthContext from "../src/auth/hooks/useAuthContext";
import useUserStore from "../src/auth/store/user";

const register = () => {
	const { setUser } = useAuthContext();
	const { name } = useUserStore();
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		carNum: "",
		role: ""
	});

	useEffect(() => {
		if (name) setRegisterInfo({ ...registerInfo, name });
	}, [name]);

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

	const router = useRouter();

	const onClickRegister = async () => {
		if (!isAllFilled) {
			Alert.alert("모든 정보를 입력해주세요");
		}
		// 차량 번호에서 공백 제거
		const carNum = registerInfo.carNum.replace(/\s/g, "");
		const user = await addUser({
			carNum,
			name: registerInfo.name,
			createdAt: dayjs().unix(),
			updatedAt: dayjs().unix(),
			uid: auth().currentUser?.uid ?? "",
			status: STATUS.NONE,
			fcmToken: "",
			time: 0,
			role: registerInfo.role,
			level: "USER"
		});
		setUser(user);

		router.push("/");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header title='차량정보 등록' />
			<StatusBar barStyle='dark-content' />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.safeArea}
			>
				<View style={styles.container}>
					<TitleAndInput
						value={registerInfo.name}
						onChange={onChangeName}
						title='이름'
						placeholder='이름을 입력해주세요'
					/>
					<TitleAndInput
						value={registerInfo.carNum}
						onChange={onChangeCarNum}
						title='차량번호'
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
			<BottomFixedButton disabled={!isAllFilled} onPress={onClickRegister}>
				등록하기
			</BottomFixedButton>
		</SafeAreaView>
	);
};

export default register;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "space-around"
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
