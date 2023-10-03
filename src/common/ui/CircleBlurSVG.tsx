import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, LinearGradient, Stop } from "react-native-svg";
import { BlurView } from "@react-native-community/blur";
import Colors from "../../constants/Colors";

type CircleProps = {
	width?: number;
	height?: number;
	blurAmount?: number;
	circleColor?: string;
};

const CircleSVG: React.FC<CircleProps> = ({
	width = 228,
	height = 228,
	blurAmount = 6,
	circleColor = Colors.light.primary
}) => {
	return (
		<View style={styles.container}>
			<Svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{ marginTop: 20, marginLeft: 20 }}
				fill='none'
				preserveAspectRatio='none' // 이 속성을 추가
			>
				<Circle
					cx={width / 2}
					cy={height / 2}
					r={Math.min(width, height) / 2}
					fill='url(#paint0_linear_17_317)'
				/>
				<LinearGradient
					id='paint0_linear_17_317'
					x1={width / 2}
					y1={0}
					x2={width / 2}
					y2={height}
					gradientUnits='userSpaceOnUse'
				>
					<Stop stopColor={circleColor} />
					<Stop offset='1' stopColor='#FFF2C4' stopOpacity='0' />
				</LinearGradient>
			</Svg>
			<BlurView
				style={[styles.absolute, { width: width + 40, height: height + 40 }]}
				blurType='light'
				blurAmount={blurAmount}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: Colors.light.background
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default CircleSVG;
