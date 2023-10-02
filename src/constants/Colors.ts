const Colors = {
	light: {
		text: "#fff",
		background: "#ffffff",
		primary: "#5D5FEF",
		lightPrimary: "#7678E1",
		buttonGreen: "#7678E1",
		white: "#ffffff",
		black: "#161617",
		grey200: "#EEEEEE",
		grey400: "#BDBDBD",
		grey600: "#757575",
		grey700: "#616161",
		grey800: "#424242",
		grey900: "#212121",
		darkBlack: "#161514",
		darkGrey: "#2A2A2A",
		yellow: "#FFC107"
	}
};

export default Colors;
export type ColorsType = keyof typeof Colors.light;
