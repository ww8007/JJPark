import {
	FlatList,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";
import Colors from "../../src/constants/Colors";
import { Text } from "../../src/common/ui/Text";
import ParkItem from "../../src/park/ui/ParkItem";
import useAdmin from "../../src/admin/service/hooks/useAdmin";
import { FontAwesome } from "@expo/vector-icons";

const index = () => {
	const { parkUserList, onClickParkItem, refreshing, onRefresh } = useAdmin();

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.headerWrapper}>
				<Text style={styles.headerText} bold>
					신청 내역
				</Text>
				<TouchableHighlight
					onPress={onRefresh}
					underlayColor={Colors.light.background}
				>
					<FontAwesome name='refresh' size={30} color={Colors.light.grey600} />
				</TouchableHighlight>
			</View>

			<View style={styles.container}>
				<FlatList
					data={parkUserList}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => (
						<ParkItem
							key={item.uid}
							data={item}
							onPress={() => onClickParkItem(item)}
						/>
					)}
					keyExtractor={(item) => item.uid}
				/>
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	headerWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 20,
		paddingBottom: "5%"
	},
	headerText: {
		fontSize: 24,
		color: Colors.light.black,
		textAlign: "center"
	},
	container: {
		flex: 1,
		padding: 20,
		gap: 20
	}
});
