import { useEffect, useState } from "react";
import useAuthContext from "../../../auth/hooks/useAuthContext";
import { User } from "../../../user/db/user";
import { getParkList } from "../../../park/db/park";
import { useRouter } from "expo-router";
import useParkStore from "../../../park/store/park";
import firestore from "@react-native-firebase/firestore";

const db = firestore();

const useAdmin = () => {
	// FIRST RENDER
	const { user } = useAuthContext();
	const router = useRouter();

	// SERVER
	const [parkUserList, setParkUserList] = useState<User[]>([]);
	useEffect(() => {
		(async () => {
			if (!user) return;
			const userList = await getParkList();
			setParkUserList(userList);
		})();
	}, [user]);

	// SUBSCRIPTION
	useEffect(() => {
		if (!user) return;
		const unsubscribe = db
			.collection("users")
			.where("status", "==", "PENDING")
			.onSnapshot((querySnapshot) => {
				const userList = querySnapshot.docs
					.map((doc) => doc.data())
					.sort((a, b) => {
						if (a.createdAt > b.createdAt) return -1;
						if (a.createdAt < b.createdAt) return 1;
						return 0;
					}) as User[];
				setParkUserList(userList);
			});

		return () => unsubscribe();
	}, [user]);

	// REFRESH
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		const userList = await getParkList();
		setParkUserList(userList);
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};

	// INTERACTION
	// 1. 어드민 유저 > 주차 아이템 선택
	const { setUser } = useParkStore();
	const onClickParkItem = (item: User) => {
		setUser(item);
		router.push("/admin/modal");
	};

	return {
		parkUserList,
		refreshing,
		onRefresh,
		onClickParkItem
	};
};

export default useAdmin;
