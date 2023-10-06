import {
	FlatList,
	RefreshControl,
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";
import Colors from "../../src/constants/Colors";
import { Text } from "../../src/common/ui/Text";
import ParkItem from "../../src/park/ui/ParkItem";
import useAdmin from "../../src/admin/service/hooks/useAdmin";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BlankItem from "../../src/common/ui/BlankItem";

const index = () => {
	const { parkUserList, onClickParkItem, refreshing, onRefresh } = useAdmin();

	const router = useRouter();

	const onClickSetting = () => {
		router.push("/setting");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.headerWrapper}>
				<Text style={styles.headerText} bold>
					신청 내역
				</Text>
				<View style={styles.iconWrapper}>
					<TouchableHighlight
						onPress={onClickSetting}
						underlayColor={Colors.light.background}
					>
						<Ionicons
							name='settings-sharp'
							size={24}
							color={Colors.light.grey600}
						/>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={onRefresh}
						underlayColor={Colors.light.background}
					>
						<FontAwesome
							name='refresh'
							size={24}
							color={Colors.light.grey600}
						/>
					</TouchableHighlight>
				</View>
			</View>
			{!parkUserList.length && (
				<BlankItem refreshing={refreshing} onRefresh={onRefresh} />
			)}
			{!!parkUserList.length && (
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
			)}
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.light.background
	},
	iconWrapper: {
		flexDirection: "row",
		gap: 20
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
