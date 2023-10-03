import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";
import Colors from "../../constants/Colors";

interface LeftAndRightItemProps {
	children: ReactNode;
}

const LeftAndRightItem = ({ children }: LeftAndRightItemProps) => {
	return <View style={styles.leftAndRightWrapper}>{children}</View>;
};

export default LeftAndRightItem;

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
	}
});
