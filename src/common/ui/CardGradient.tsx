import { BlurView } from "@react-native-community/blur";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Text";

interface GradientProps {
	height?: number;
	blurAmount?: number;
	withHeader?: {
		headerText: string;
		headerColor: string;
	} | null;
	gradientColors?: string;
	children: ReactNode;
}

const CardGradient = ({
	height = 60,
	blurAmount = 6,
	withHeader = null,
	gradientColors = "rgba(193, 194, 255, 0.70)",
	children
}: GradientProps) => {
	return (
		<View style={[styles.gradientWrapper, { height: `${height}%` }]}>
			<BlurView
				style={styles.gradientContainer}
				blurType='light'
				blurAmount={blurAmount}
			>
				<LinearGradient
					colors={[gradientColors, "rgba(255, 255, 255, 0.07)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradient}
				>
					{withHeader && (
						<View
							style={[
								styles.header,
								{ backgroundColor: withHeader.headerColor }
							]}
						>
							<MaterialIcons
								name='circle'
								size={12}
								color={Colors.light.background}
							/>
							<Text
								color='white'
								bold
								style={{
									textShadowColor: "rgba(0, 0, 0, 0.2)",
									textShadowOffset: { width: -2, height: 2 },
									textShadowRadius: 10
								}}
							>
								{withHeader.headerText}
							</Text>
						</View>
					)}
					{children}
				</LinearGradient>
			</BlurView>
		</View>
	);
};

export default CardGradient;

const styles = StyleSheet.create({
	gradientWrapper: {
		width: "100%",
		padding: 20,
		borderRadius: 12
	},
	gradientContainer: {
		width: "100%",
		height: "100%",
		borderRadius: 12
	},
	gradient: {
		flex: 1,
		borderRadius: 12,
		borderColor: Colors.light.grey200,
		borderWidth: 1
	},
	contentWrapper: {
		gap: 25
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 0,
		height: 40,
		alignItems: "center",
		backgroundColor: Colors.light.lightPrimary,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	}
});
