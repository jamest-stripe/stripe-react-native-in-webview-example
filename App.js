import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<WebView
				source={{ uri: "https://origindemo.stripedemos.com" }}
				style={{ flex: 1 }}
				enableApplePay={true}
			/>
			<StatusBar style="auto" />
		</View>
	);
}
