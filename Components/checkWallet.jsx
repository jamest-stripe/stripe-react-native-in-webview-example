import WebView from "react-native-webview";
import {
	initStripe,
	useStripe,
	usePlatformPay,
} from "@stripe/stripe-react-native";
export default function CheckWallet() {
	const checkPlatformPay = async () => {
		const result = await usePlatformPay();
		if (result === true) {
			return (
				<WebView
					source={{
						uri: "https://jamest-origin.tunnel.stripe.me/wallet?wallet=true",
					}}
					style={{ flex: 1 }}
					onMessage={onMessage}
					javaScriptEnabled={true}
					originWhitelist={["*"]}
					onLoadStart={() => checkPlatformPay()}
				/>
			);
		} else {
			return (
				<WebView
					source={{
						uri: "https://jamest-origin.tunnel.stripe.me/wallet?wallet=false",
					}}
					style={{ flex: 1 }}
					onMessage={onMessage}
					javaScriptEnabled={true}
					originWhitelist={["*"]}
					onLoadStart={() => checkPlatformPay()}
				/>
			);
		}

		Alert.alert(`Wallet Enabled?: ${wallet ? "Yes" : "No"}, url: ${walletUrl}`);
	};
}
