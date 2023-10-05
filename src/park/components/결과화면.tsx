import React from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View
} from "react-native";
import Colors from "../../constants/Colors";
import CircleBlurSVG from "../../common/ui/CircleBlurSVG";
import CardGradient from "../../common/ui/CardGradient";
import BottomFixedButton from "../../common/ui/BottomFixedButton";
import LeftAndRightItem from "../../common/ui/LeftAndRightItem";
import { STATUS, updateUser } from "../../user/db/user";
import { Text } from "../../common/ui/Text";
import useAuthContext from "../../auth/hooks/useAuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { MD2Colors } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const CIRCLE_COLOR: Record<STATUS, string> = {
	[STATUS.APPROVED]: MD2Colors.green300,
	[STATUS.PENDING]: "#f9d054",
	[STATUS.REJECTED]: MD2Colors.red300,
	[STATUS.NONE]: MD2Colors.green500
};

interface 결과화면Props {
	onPrev: () => void;
}

const 결과화면 = ({ onPrev }: 결과화면Props) => {
	const { user } = useAuthContext();

	const onClickCancel = async () => {
		if (!user) return;
		await updateUser(user.uid, {
			time: 0,
			status: STATUS.NONE
		});
		onPrev();
	};

	const resultContent = (result: STATUS) => {
		if (result === STATUS.APPROVED) {
			return (
				<View style={styles.iconTextWrapper}>
					<FontAwesome
						name='check-circle'
						size={24}
						color={MD2Colors.green500}
					/>
					<Text fontSize={14} color='black'>
						신청이 승인되었습니다
					</Text>
				</View>
			);
		}
		if (result === STATUS.PENDING) {
			return (
				<View style={styles.iconTextWrapper}>
					<ActivityIndicator size='small' color={MD2Colors.yellow800} />
					<Text fontSize={14} color='black'>
						신청이 접수되었으며, 승인 대기중입니다
					</Text>
				</View>
			);
		}
		if (result === STATUS.REJECTED) {
			return (
				<View style={styles.iconTextWrapper}>
					<AntDesign name='closecircle' size={24} color={MD2Colors.red300} />
					<Text fontSize={14} color='black'>
						신청이 거절되었습니다
					</Text>
				</View>
			);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle='dark-content' />
			<View style={styles.contentWrapper}>
				{/** 배경 */}
				<View style={styles.firstBlurCircle}>
					<CircleBlurSVG
						width={300}
						height={300}
						circleColor={CIRCLE_COLOR[user?.status ?? STATUS.NONE]}
					/>
				</View>
				<View style={styles.secondBlurCircle}>
					<CircleBlurSVG
						width={400}
						height={400}
						circleColor={CIRCLE_COLOR[user?.status ?? STATUS.NONE]}
					/>
				</View>
				<View style={styles.thirdBlurCircle}>
					<CircleBlurSVG
						width={600}
						height={600}
						circleColor={CIRCLE_COLOR[user?.status ?? STATUS.NONE]}
					/>
				</View>
				{/** 결과 카드 */}
				<View style={styles.gradientWrapper}>
					<CardGradient
						height={45}
						blurAmount={50}
						withHeader={{
							headerColor: CIRCLE_COLOR[user?.status ?? STATUS.NONE],
							headerText:
								user?.status === STATUS.APPROVED
									? "승인"
									: user?.status === STATUS.REJECTED
									? "거절"
									: "대기중"
						}}
					>
						<View style={styles.gradientContent}>
							<LeftAndRightItem>
								<LeftAndRightItem.Left text='신청인' />
								<LeftAndRightItem.Right text={user?.name ?? ""} />
							</LeftAndRightItem>
							<LeftAndRightItem>
								<LeftAndRightItem.Left text='차량번호' />
								<LeftAndRightItem.Right text={user?.carNum ?? ""} />
							</LeftAndRightItem>
							<LeftAndRightItem>
								<LeftAndRightItem.Left text='소속' />
								<LeftAndRightItem.Right text={user?.role ?? ""} />
							</LeftAndRightItem>
							<LeftAndRightItem>
								<LeftAndRightItem.Left text='신청시간' />
								<LeftAndRightItem.Right text={`${user?.time ?? 3} 시간`} />
							</LeftAndRightItem>
							{resultContent(user?.status ?? STATUS.NONE)}
						</View>
					</CardGradient>
				</View>
			</View>
			<BottomFixedButton
				buttonColor={CIRCLE_COLOR[user?.status ?? STATUS.NONE]}
				onPress={onClickCancel}
			>
				취소하기
			</BottomFixedButton>
		</SafeAreaView>
	);
};

export default 결과화면;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	contentWrapper: {
		flex: 1,
		backgroundColor: Colors.light.background
	},

	firstBlurCircle: {
		position: "absolute",
		top: 100,
		left: -200
	},
	secondBlurCircle: {
		position: "absolute",
		top: 0,
		left: 200
	},
	thirdBlurCircle: {
		position: "absolute",
		top: "50%",
		left: 0
	},

	gradientWrapper: {
		top: "20%",
		height: "100%",
		width: "100%"
	},
	gradientContent: {
		display: "flex",
		gap: 20,
		padding: 20
	},

	iconTextWrapper: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center"
	}
});
