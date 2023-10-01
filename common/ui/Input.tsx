import type { ComponentProps, ForwardRefRenderFunction } from "react";
import React, { forwardRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export type TextInputProps = ComponentProps<typeof RNTextInput>;

const _TextInput: ForwardRefRenderFunction<RNTextInput, TextInputProps> = (
	{ style, ...props },
	ref
) => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<RNTextInput
			ref={ref}
			style={[
				{
					color: Colors.light.white,
					borderColor: Colors.light.grey400,
					backgroundColor: Colors.light.white
				},
				styles.textInput,
				style
			]}
			placeholderTextColor={Colors.light.grey600}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			{...props}
		/>
	);
};
export const TextInput = forwardRef(_TextInput);
const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 16,
		fontFamily: "NanumSquareRound"
	}
});
