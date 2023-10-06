import { Stack } from "expo-router";
import React from "react";

const RootLayoutNav = () => {
	return (
		<Stack screenOptions={{ headerShown: false, animation: "none" }}>
			<Stack.Screen name='login' />
			<Stack.Screen
				name='registerEmail'
				options={{
					animation: "flip"
				}}
			/>
			<Stack.Screen name='reset' />
		</Stack>
	);
};

export default RootLayoutNav;
