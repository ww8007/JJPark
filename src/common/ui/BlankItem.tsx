import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Text } from "./Text";

interface BlankItemProps {
	refreshing: boolean;
	onRefresh: () => void;
}

const BlankItem = ({ refreshing, onRefresh }: BlankItemProps) => {
	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			contentContainerStyle={styles.container}
		>
			<Ionicons name='mail' size={40} color={Colors.light.lightPrimary} />
			<Text color='black' bold>
				신청 내역이 없습니다
			</Text>
		</ScrollView>
	);
};

export default BlankItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10
	}
});
