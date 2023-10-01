import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "../../common/ui/Input";
import useEmailStore from "../store/email";
import Colors from "../../constants/Colors";

interface Props {
	withPassword?: boolean;
}

const EmailAndPassword = ({ withPassword = true }: Props) => {
	const { email, password, setEmail, setPassword } = useEmailStore();
	return (
		<View style={styles.inputWrapper}>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder='이메일'
				autoCapitalize='none'
				keyboardType='email-address'
				style={styles.input}
			/>
			{!!withPassword && (
				<TextInput
					value={password}
					onChangeText={setPassword}
					placeholder='비밀번호'
					secureTextEntry
					style={styles.input}
				/>
			)}
		</View>
	);
};

export default EmailAndPassword;

const styles = StyleSheet.create({
	inputWrapper: {
		rowGap: 30,
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	input: {
		width: "90%",
		color: Colors.light.black
	}
});
