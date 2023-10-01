import React, { useRef } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Easing,
	Dimensions
} from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "./Text";

interface Props {
	firstText: string;
	secondText: string;
	isSelect: boolean;
	setSelect: () => void;
	unsetSelect: () => void;
}

const SelectButton: React.FC<Props> = ({
	firstText,
	secondText,
	isSelect,
	setSelect,
	unsetSelect
}) => {
	const translateX = new Animated.Value(0);
	const isInitialMount = useRef(true);
	const deviceWidth = Dimensions.get("window").width;
	const buttonWidth = deviceWidth / 2 - 30 - 20;

	React.useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		if (!isSelect) {
			translateX.setValue(buttonWidth);
			Animated.timing(translateX, {
				toValue: 0,
				duration: 300,
				easing: Easing.inOut(Easing.ease),
				useNativeDriver: true
			}).start();
		} else {
			Animated.timing(translateX, {
				toValue: buttonWidth,
				duration: 300,
				easing: Easing.inOut(Easing.ease),
				useNativeDriver: true
			}).start();
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
		backgroundColor: Colors.light.white,
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
