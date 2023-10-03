import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../src/common/ui/Text";
import Header from "../src/common/ui/Header";
import { TextInput } from "../src/common/ui/Input";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import BottomFixedButton from "../src/common/ui/BottomFixedButton";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { STATUS, addUser } from "../src/user/db/user";

const register = () => {
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		carNum: ""
	});

	const onChangeName = (text: string) => {
		setRegisterInfo({ ...registerInfo, name: text });
	};

	const onChangeCarNum = (text: string) => {
		setRegisterInfo({ ...registerInfo, carNum: text });
	};

	const isAllFilled = Boolean(registerInfo.name && registerInfo.carNum);

	const onClickRegister = async () => {
		if (!isAllFilled) {
			Alert.alert("모든 정보를 입력해주세요");
		}
		// 차량 번호에서 공백 제거
		const carNum = registerInfo.carNum.replace(/\s/g, "");
		addUser({
			carNum,
			name: registerInfo.name,
			createdAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
			uid: auth().currentUser?.uid ?? "",
			status: STATUS.NONE,
			fcmToken: "",
			time: 0
		});
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='dark-content' />
			<Header title='차량정보 등록' />
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
			</View>
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
		flex: 0.4,
		backgroundColor: "white",
		alignContent: "flex-start"
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
		flex: 1,
		backgroundColor: "white",
		padding: 20,
		gap: 20
	}
});
