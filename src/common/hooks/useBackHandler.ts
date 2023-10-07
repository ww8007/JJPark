import { useCallback, useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";

export const useBackHandler = (handleBackAction?: () => boolean) => {
	const [exitApp, setExitApp] = useState(false);

	const defaultHandler = useCallback(() => {
		if (!exitApp) {
			ToastAndroid.show("한 번 더 누르면 종료됩니다.", ToastAndroid.SHORT);
			setExitApp(true);
			setTimeout(() => {
				setExitApp(false);
			}, 2000);
			console.log("exit");
			return true;
		} else {
			console.log("exit");
			BackHandler.exitApp();
			return false;
		}
	}, [exitApp]);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackAction ?? defaultHandler
		);

		return () => backHandler.remove();
	}, [defaultHandler, handleBackAction]);
};
