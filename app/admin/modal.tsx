import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../../src/constants/Colors";
import { Text } from "../../src/common/ui/Text";
import CardGradient from "../../src/common/ui/CardGradient";
import LeftAndRightItem from "../../src/common/ui/LeftAndRightItem";
import useParkStore from "../../src/park/store/park";
import BottomFixedTwoButton from "../../src/common/ui/BottomFixedTwoButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { sendToUser } from "../../src/notification/db/notification";

const modal = () => {
	const { user } = useParkStore();
	const router = useRouter();

	const onClickSetting = () => {
		router.back();
	};

	const onClickAccept = () => {
		sendToUser(user?.uid ?? "", "신청이 승인되었습니다");
		router.back();
	};

	const onClickReject = () => {
		sendToUser(user?.uid ?? "", "신청이 거절되었습니다");
		router.back();
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<Text style={styles.headerText} bold>
					주차 신청하기
				</Text>
				<TouchableOpacity onPress={onClickSetting}>
					<Ionicons name='close' size={30} color={Colors.light.grey600} />
				</TouchableOpacity>
			</View>
			<CardGradient
				height={42}
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
							<LeftAndRightItem.Right>
								<View
									style={[
										styles.timeButton,
										{
											backgroundColor:
												user.time === 3
													? Colors.light.pastelBlue
													: Colors.light.lightPrimary
										}
									]}
								>
									<Text color='white' bold fontSize={12}>
										{`${user?.time} 시간`}
									</Text>
								</View>
							</LeftAndRightItem.Right>
						</LeftAndRightItem>
					</View>
				</View>
			</CardGradient>
			<BottomFixedTwoButton
				first={{
					text: "거절하기",
					onPress: onClickReject,
					color: "grey700"
				}}
				second={{
					text: "승인하기",
					onPress: onClickAccept,
					color: "lightPrimary"
				}}
			/>
		</View>
	);
};

export default modal;

const styles = StyleSheet.create({
	headerWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 40,
		paddingBottom: "30%"
	},
	headerText: {
		fontSize: 24,
		color: Colors.light.black,
		textAlign: "center"
	},
	container: {
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
	timeButton: {
		backgroundColor: Colors.light.pastelBlue,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5
	}
});
