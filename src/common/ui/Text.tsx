import type { ComponentProps, FC } from "react";
import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import Colors, { ColorsType } from "../../constants/Colors";
export type TextProps = {
	bold?: boolean;
	fontSize?: number;
	color?: ColorsType;
} & ComponentProps<typeof RNText>;

export const Text: FC<TextProps> = ({
	bold = false,
	fontSize,
	style,
	color = "black",
	...props
}) => {
	return (
		<RNText
			style={[
				styles.text,
				{
					color: Colors.light[color],
					fontFamily: bold ? "NanumSquareBold" : "NanumSquareRound",
					fontSize: fontSize
				},
				style
			]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	underline: { textDecorationLine: "underline" },
	text: {
		fontFamily: "NanumSquareRound",
		color: Colors.light.white
	}
});
