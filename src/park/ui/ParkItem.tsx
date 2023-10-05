import React from "react";
import {
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	View
} from "react-native";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { Text } from "../../common/ui/Text";
import { User } from "../../user/db/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface ParkItemProps {
	data: User;
	onPress: () => void;
}

const ParkItem = ({ data, onPress }: ParkItemProps) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={styles.leftLine}></View>
			<View style={styles.nameAndButtonWrapper}>
				<Text fontSize={16} bold style={styles.nameText}>
					{data.name}
				</Text>
				<View style={styles.buttonWrapper}>
					<View
						style={[
							styles.timeButton,
							{
								backgroundColor:
									data.time === 3
										? Colors.light.pastelBlue
										: Colors.light.lightPrimary
							}
						]}
					>
						<Text color='white' bold fontSize={12}>
							{`${data.time} 시간`}
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.timeAndRightWrapper}>
				<Text fontSize={12} style={styles.timeText}>
					{dayjs().to(dayjs.unix(data.updatedAt))}
				</Text>
				<TouchableHighlight style={styles.rightIcon}>
					<Entypo name='chevron-small-right' size={24} color='black' />
				</TouchableHighlight>
			</View>
		</TouchableOpacity>
	);
};

export default ParkItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.grey200,
		borderRadius: 10,
		height: 52,
		width: "100%",
		alignContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 20
	},
	leftLine: {
		width: 6,
		height: "100%",
		backgroundColor: Colors.light.lightPrimary,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10
	},
	nameAndButtonWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		height: "100%",

		gap: 20
	},
	nameText: {
		marginLeft: 20
	},
	buttonWrapper: {
		flexDirection: "row",
		gap: 10
	},
	timeButton: {
		backgroundColor: Colors.light.pastelBlue,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5
	},
	timeAndRightWrapper: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 10
	},
	timeText: {
		marginLeft: 10
	},
	rightIcon: {
		marginRight: 10
	}
});
