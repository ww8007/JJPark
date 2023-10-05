import { Stack } from "expo-router";
import React from "react";

const RootLayoutNav = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen
				name='modal'
				options={{
					presentation: "modal",
					headerShown: false
				}}
			/>
		</Stack>
	);
};

export default RootLayoutNav;
