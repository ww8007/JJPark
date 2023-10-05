import React from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import Header from "../../src/common/ui/Header";
import Colors from "../../src/constants/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Text } from "../../src/common/ui/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
	const router = useRouter();

	const onClick_내정보수정 = () => {
		router.push("/setting/profile");
	};

	const onClick_로그아웃 = () => {
		Alert.alert("로그아웃", "정말로 로그아웃을 하시겠습니까?", [
			{
				text: "취소",
				onPress: () => {}
			},
			{
				text: "확인",
				onPress: () => auth().signOut()
			}
		]);
	};

	const onClick_회원탈퇴 = () => {
		Alert.alert("회원탈퇴", "정말로 회원탈퇴를 하시겠습니까?", [
			{
				text: "취소",
				onPress: () => {}
			},
			{
				text: "확인",
				onPress: () => {
					auth().currentUser?.delete();
					router.push("/login");
				}
			}
		]);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='dark-content' />
			<Header showBackButton title='설정' />
			<View style={styles.contentWrapper}>
				<ArrowTextItem text='내 정보 수정' onPress={onClick_내정보수정} />
				<ArrowTextItem text='로그아웃' onPress={onClick_로그아웃} />
				<ArrowTextItem text='회원탈퇴' onPress={onClick_회원탈퇴} />
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	contentWrapper: {
		flex: 1,
		gap: 20
	}
});

interface ArrowTextItemProps {
	text: string;
	onPress: () => void;
}

const ArrowTextItem = ({ text, onPress }: ArrowTextItemProps) => {
	return (
		<TouchableHighlight onPress={onPress} underlayColor={Colors.light.grey700}>
			<View style={arrowStyles.arrowTextItemWrapper}>
				<Text style={arrowStyles.arrowTextItem}>{text}</Text>
				<MaterialIcons name='keyboard-arrow-right' size={24} color='black' />
			</View>
		</TouchableHighlight>
	);
};

const arrowStyles = StyleSheet.create({
	arrowTextItemWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: Colors.light.grey200
	},
	arrowTextItem: {
		fontSize: 16,
		color: Colors.light.black
	}
});
