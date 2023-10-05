import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors, { ColorsType } from "../../constants/Colors";
import { Text } from "./Text";

interface TouchableOpacityProps {
	first: {
		text: string;
		onPress: () => void;
		color?: ColorsType;
	};
	second: {
		text: string;
		onPress: () => void;
		color?: ColorsType;
	};
}

const BottomFixedTwoButton = ({ first, second }: TouchableOpacityProps) => {
	return (
		<View style={styles.bottomFixedWrapper}>
			<TouchableOpacity
				style={[
					styles.firstFixedButton,
					{ backgroundColor: Colors.light[first.color ?? "grey700"] }
				]}
				onPress={first.onPress}
			>
				<View>
					<Text bold fontSize={16} color='white'>
						{first.text}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.secondFixedButton,
					{ backgroundColor: Colors.light[second.color ?? "grey700"] }
				]}
				onPress={second.onPress}
			>
				<View>
					<Text bold fontSize={16} color='white'>
						{second.text}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default BottomFixedTwoButton;

const styles = StyleSheet.create({
	bottomFixedWrapper: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.light.background
	},
	firstFixedButton: {
		position: "absolute",
		bottom: 100,
		width: "42.5%",
		left: "5%",
		height: 50,
		justifyContent: "center",
		justifySelf: "center",
		alignItems: "center",
		borderRadius: 10
	},
	secondFixedButton: {
		position: "absolute",
		bottom: 100,
		width: "42.5%",
		right: "5%",
		height: 50,
		justifyContent: "center",
		justifySelf: "center",
		alignItems: "center",
		borderRadius: 10
	},

	disabled: {
		backgroundColor: Colors.light.grey600
	}
});
