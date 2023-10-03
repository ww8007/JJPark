import type { ComponentProps } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "./Text";

type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>;
export type TouchableViewProps = TouchableOpacityProps & {
	viewStyle?: StyleProp<ViewStyle>;
	buttonColor?: string;
};
const BottomFixedButton = ({
	children,
	viewStyle,
	buttonColor = Colors.light.lightPrimary,
	...touchableProps
}: TouchableViewProps) => {
	return (
		<View style={styles.bottomFixedWrapper}>
			<TouchableOpacity
				style={[
					styles.bottomFixedButton,
					{ backgroundColor: buttonColor },
					touchableProps.disabled && styles.disabled
				]}
				{...touchableProps}
			>
				<View style={[viewStyle]}>
					<Text bold fontSize={16} color='white'>
						{children}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default BottomFixedButton;

const styles = StyleSheet.create({
	bottomFixedWrapper: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.light.background
	},
	bottomFixedButton: {
		position: "absolute",
		bottom: 50,
		width: "90%",
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
