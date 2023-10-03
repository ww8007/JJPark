import React, { FC, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "./Text";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { MD2Colors } from "react-native-paper";
interface Props {
	firstText: string;
	secondText: string;
	isSelect: boolean;
	setSelect: () => void;
	unsetSelect: () => void;
}

const SelectButton: FC<Props> = ({
	firstText,
	secondText,
	isSelect,
	setSelect,
	unsetSelect
}) => {
	const translateX = useSharedValue(0);
	const isInitialMount = useRef(true);
	const deviceWidth = Dimensions.get("window").width;
	const buttonWidth = deviceWidth / 2 - 20 - 20;

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		if (!isSelect) {
			translateX.value = withSpring(0, {
				damping: 99
			});
		} else {
			translateX.value = withSpring(buttonWidth, {
				damping: 99
			});
		}
	}, [isSelect]);

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Animated.View
					style={[
						styles.animatedLabel,
						{
							transform: [{ translateX }]
						}
					]}
				/>
				<TouchableOpacity style={styles.button} onPress={unsetSelect}>
					<Text
						style={[
							styles.text,
							{
								color: isSelect ? Colors.light.black : Colors.light.white
							}
						]}
						bold
					>
						{firstText}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={setSelect}>
					<Text
						style={[
							styles.text,
							{
								color: isSelect ? Colors.light.white : Colors.light.black
							}
						]}
						bold
					>
						{secondText}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SelectButton;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: 10
	},
	innerContainer: {
		flexDirection: "row",
		width: "100%",
		height: 40,
		borderRadius: 7,
		backgroundColor: MD2Colors.white,
		position: "relative",
		overflow: "hidden"
	},
	animatedLabel: {
		position: "absolute",
		width: "50%",
		height: 40,
		backgroundColor: Colors.light.lightPrimary,
		borderRadius: 7
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 8888
	},
	text: {
		fontSize: 16,
		zIndex: 9999
	}
});
