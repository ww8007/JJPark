import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StatusBar, StyleSheet, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
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
		carNum: ""
	});
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		carNum: ""
	});

	// fireStore에서 데이터 가져오기
	useEffect(() => {
		(async () => {
			const uid = auth().currentUser?.uid ?? "";
			const user = await getUser(uid);
			if (user) {
				setRegisterInfo({
					name: user.name,
					carNum: user.carNum
				});
				setInitialData({
					name: user.name,
					carNum: user.carNum
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

	const isAllFilled = Boolean(registerInfo.name && registerInfo.carNum);
	const isSameBefore = Boolean(
		registerInfo.name === initialData.name &&
			registerInfo.carNum === initialData.carNum
	);

	const onClickRegister = async () => {
		if (!isAllFilled) {
			Alert.alert("모든 정보를 입력해주세요");
		}
		// 차량 번호에서 공백 제거
		const carNum = registerInfo.carNum.replace(/\s/g, "");
		const uid = auth().currentUser?.uid ?? "";
		const updatedUser = await updateUser(uid, {
			carNum,
			updatedAt: firestore.FieldValue.serverTimestamp(),
			name: registerInfo.name
		});
		setUser(updatedUser);
		router.back();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='dark-content' />
			<Header showBackButton title='내 정보 수정' />
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
					title='차량번호 (11가 1111)'
					placeholder='차량번호를 입력해주세요'
				/>
			</View>
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
