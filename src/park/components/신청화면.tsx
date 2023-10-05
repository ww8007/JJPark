import { useCallback, useState } from "react";
import { View, StyleSheet, TouchableHighlight, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../common/ui/Text";
import BottomFixedButton from "../../common/ui/BottomFixedButton";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SelectButton from "../../common/ui/SelectButton";
import { useRouter } from "expo-router";
import { STATUS, updateUser } from "../../user/db/user";
import CardGradient from "../../common/ui/CardGradient";
import LeftAndRightItem from "../../common/ui/LeftAndRightItem";
import useAuthContext from "../../auth/hooks/useAuthContext";
import { sendToAdmin } from "../../notification/db/notification";
import dayjs from "dayjs";

interface 신청화면Props {
	onNext: () => void;
}

const 신청화면 = ({ onNext }: 신청화면Props) => {
	const { user, setUser } = useAuthContext();
	const [selected, setSelected] = useState(false);

	const router = useRouter();

	const onClickSetting = () => {
		router.push("/setting");
	};

	const setSelect = useCallback(() => {
		setSelected(true);
	}, []);

	const unsetSelect = useCallback(() => {
		setSelected(false);
	}, []);

	const onClickSubmit = async () => {
		if (!user) return;
		const updatedUser = await updateUser(user.uid, {
			time: selected ? 5 : 3,
			status: STATUS.PENDING,
			updatedAt: dayjs().unix()
		});
		await sendToAdmin(
			user.uid,
			`${user.name}님이 ${selected ? 5 : 3}시간을 신청하셨습니다`
		);
		setUser(updatedUser);
		onNext();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='dark-content' />
			<View style={styles.headerWrapper}>
				<Text style={styles.headerText} bold>
					주차 신청하기
				</Text>
				<TouchableHighlight
					onPress={onClickSetting}
					underlayColor={Colors.light.background}
				>
					<Ionicons
						name='settings-sharp'
						size={30}
						color={Colors.light.grey600}
					/>
				</TouchableHighlight>
			</View>
			<CardGradient
				height={60}
				withHeader={{
					headerText: "신청 정보",
					headerColor: Colors.light.lightPrimary
				}}
			>
				<View style={styles.contentWrapper}>
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='신청인' />
						<LeftAndRightItem.Right text={user?.name ?? ""} />
					</LeftAndRightItem>
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='차량 번호' />
						<LeftAndRightItem.Right text={user?.carNum ?? ""} />
					</LeftAndRightItem>
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='소속' />
						<LeftAndRightItem.Right text={user?.role ?? ""} />
					</LeftAndRightItem>
					<View>
						<LeftAndRightItem>
							<LeftAndRightItem.Left text='신청 시간' />
						</LeftAndRightItem>
						<SelectButton
							firstText='3시간'
							secondText='5시간'
							isSelect={selected}
							setSelect={setSelect}
							unsetSelect={unsetSelect}
						/>
					</View>
				</View>
				<View style={styles.iconTextWrapper}>
					<Entypo name='warning' size={16} color={Colors.light.yellow} />
					<Text fontSize={14} color='black'>
						추가 신청의 경우 별도 문의 바랍니다.
					</Text>
				</View>
			</CardGradient>
			<BottomFixedButton onPress={onClickSubmit}>
				<Text style={styles.submitText} bold>
					신청하기
				</Text>
			</BottomFixedButton>
		</SafeAreaView>
	);
};

export default 신청화면;

const styles = StyleSheet.create({
	headerWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 20,
		paddingBottom: "20%"
	},
	headerText: {
		fontSize: 24,
		color: Colors.light.black,
		textAlign: "center"
	},
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	contentWrapper: {
		gap: 20,
		padding: 20
	},
	iconTextWrapper: {
		flexDirection: "row",
		gap: 10,
		paddingLeft: 20,
		justifyContent: "center"
	},
	submitText: {
		fontSize: 16,
		color: Colors.light.white
	}
});
