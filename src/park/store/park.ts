import { create } from "zustand";
import { User, defaultUser } from "../../user/db/user";

interface ParkStore {
	user: User;
	setUser: (user: User) => void;
	haveToRefresh: boolean;
	setHaveToRefresh: (haveToRefresh: boolean) => void;
}

const useParkStore = create<ParkStore>((set) => ({
	user: defaultUser,
	setUser: (user: User) => set({ user }),
	haveToRefresh: false,
	setHaveToRefresh: (haveToRefresh: boolean) => set({ haveToRefresh })
}));

export default useParkStore;
