import React, { ReactNode, useCallback } from "react";
import { View, StyleSheet, TouchableHighlight, Switch } from "react-native";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../common/ui/Text";
import BottomFixedButton from "../common/ui/BottomFixedButton";
import Colors from "../constants/Colors";
import { Ionicons as SettingIcon } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SelectButton from "../common/ui/SelectButton";

const 신청화면 = () => {
	const [selected, setSelected] = React.useState(false);
	const [추가신청_필요, set추가신청_필요] = React.useState(false);

	const onChange추가신청_필요 = () => {
		set추가신청_필요((previousState) => !previousState);
	};

	const setSelect = useCallback(() => {
		setSelected(true);
	}, []);

	const unsetSelect = useCallback(() => {
		setSelected(false);
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.headerWrapper}>
				<Text style={styles.headerText} bold>
					주차 신청하기
				</Text>
				<TouchableHighlight
					onPress={() => console.log("setting")}
					underlayColor={Colors.light.background}
				>
					<SettingIcon
						name='settings-sharp'
						size={30}
						color={Colors.light.grey600}
					/>
				</TouchableHighlight>
			</View>
			<GradientView>
				<View style={styles.contentWrapper}>
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='신청인' />
						<LeftAndRightItem.Right text='신청인' />
					</LeftAndRightItem>
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='차량 번호' />
						<LeftAndRightItem.Right text='신청인' />
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
					<LeftAndRightItem>
						<LeftAndRightItem.Left text='추가신청 필요' />
						<LeftAndRightItem.Right>
							<Switch
								trackColor={{
									false: Colors.light.lightPrimary,
									true: Colors.light.lightPrimary
								}}
								thumbColor={
									추가신청_필요 ? Colors.light.grey200 : Colors.light.grey200
								}
								ios_backgroundColor={Colors.light.grey400}
								onValueChange={onChange추가신청_필요}
								value={추가신청_필요}
							/>
						</LeftAndRightItem.Right>
					</LeftAndRightItem>
				</View>
				<View style={styles.iconTextWrapper}>
					<Entypo name='warning' size={16} color={Colors.light.yellow} />
					<Text style={styles.descriptionText}>
						추가 신청의 경우 별도 문의 바랍니다.
					</Text>
				</View>
			</GradientView>
			<BottomFixedButton>
				<Text style={styles.submitText} bold>
					신청하기
				</Text>
			</BottomFixedButton>
		</SafeAreaView>
	);
};

export default 신청화면;

interface GradientProps {
	children: ReactNode;
}

const GradientView = ({ children }: GradientProps) => {
	return (
		<View style={styles.gradientWrapper}>
			<BlurView
				style={styles.gradientContainer}
				blurType='light'
				blurAmount={6}
			>
				<LinearGradient
					colors={["rgba(193, 194, 255, 0.70)", "rgba(255, 255, 255, 0.07)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradient}
				>
					{children}
				</LinearGradient>
			</BlurView>
		</View>
	);
};

interface LeftAndRightItemProps {
	children: ReactNode;
}

const LeftAndRightItem = ({ children }: LeftAndRightItemProps) => {
	return <View style={styles.leftAndRightWrapper}>{children}</View>;
};

const Left = ({ text }: { text: ReactNode }) => {
	return (
		<Text bold style={styles.leftText}>
			{text}
		</Text>
	);
};

const Right = ({
	text,
	children
}: {
	text?: ReactNode;
	children?: ReactNode;
}) => {
	if (text) {
		return <Text style={styles.rightText}>{text}</Text>;
	} else {
		return <View>{children}</View>;
	}
};

LeftAndRightItem.Left = Left;
LeftAndRightItem.Right = Right;

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
	gradientWrapper: {
		height: "60%",
		width: "100%",
		padding: 20
	},
	gradientContainer: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
		borderColor: Colors.light.black,
		overflow: "hidden"
	},
	gradient: {
		flex: 1,
		borderRadius: 12,
		borderColor: Colors.light.grey200,
		// borderWidth: 1,
		borderWidth: 1,
		padding: 30
	},
	contentWrapper: {
		gap: 25
	},
	leftAndRightWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20
	},
	leftText: {
		fontSize: 18,
		color: Colors.light.black
	},
	rightText: {
		fontSize: 14,
		color: Colors.light.black
	},
	iconTextWrapper: {
		flexDirection: "row",
		gap: 10,
		marginTop: 10
	},
	descriptionText: {
		fontSize: 14,
		color: Colors.light.black
	},
	submitText: {
		fontSize: 16,
		color: Colors.light.white
	}
});
