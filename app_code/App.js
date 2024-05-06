import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import React, { useEffect, useState } from "react";
import { Alert, Platform, View } from "react-native";
import {
	initStripe,
	useStripe,
	usePlatformPay,
} from "@stripe/stripe-react-native";

export default function App() {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [wallet, setWallet] = useState(false);
	const [deviceType, setDeviceType] = useState(null);
	const [walletUrl, setWalletUrl] = useState(
		"https://betaorigindemo.stripedemos.com/wallet?wallet=false"
	);

	useEffect(() => {
		initStripe({
			publishableKey:
				"pk_test_51Me6XAHdJokNZ98tzjQti0Ln3JNqvf8fqnAJ2VPm9oRzmgWEvjnUOZPubjpmSPVGE7bzAQSi5XDOCQkdh9imQit6001p6Hlk04",
			merchantIdentifier: "merchant.stripedemos.com.energydemo",
		});
	}, []);

	const { isPlatformPaySupported, confirmPlatformPayPayment } =
		usePlatformPay();

	//check if platformpayments are supported and return result in an alert screen
	const checkPlatformPay = async () => {
		const result = await isPlatformPaySupported();
		if (result === true) {
			setWalletUrl("https://betaorigindemo.stripedemos.com/wallet?wallet=true");
		} else {
			setWalletUrl(
				"https://betaorigindemo.stripedemos.com/wallet?wallet=false"
			);
		}

		// Alert.alert(`Wallet Enabled?: ${wallet ? "Yes" : "No"}, url: ${walletUrl}`);
	};

	// Handle the message posted from the webview

	const onMessage = async (event) => {
		const message = JSON.parse(event.nativeEvent.data);
		if (message.action === "gpay_payment") {
			// Initialize the wallet
			const { error } = await confirmPlatformPayPayment(message.clientSecret, {
				googlePay: {
					testEnv: true,
					merchantName: "Power Co",
					merchantCountryCode: "AU",
					currencyCode: "AUD",
				},
			});
			if (error) {
				Alert.alert(`Error code: ${error.code}`, error.message);
			} else {
				Alert.alert("Success", "The payment was confirmed successfully");
			}
		}

		if (message.action === "make_payment") {
			// Initialize the payment sheet
			const { error } = await initPaymentSheet({
				applePay: {
					merchantCountryCode: "AU",
					enabled: true,
				},
				merchantDisplayName: "Power Co",
				paymentIntentClientSecret: message.clientSecret,
				returnURL: "https://betaorigindemo.stripedemos.com/success",
				googlePay: {
					merchantCountryCode: "AU",
					testEnv: true, // use test environment
				},

				defaultBillingDetails: {
					name: "James Tomlinson",
					email: "james@customer.com",
					phone: "+61499652416",
				},
			});
			if (!error) {
				const { error } = await presentPaymentSheet();
				if (error) {
					Alert.alert(`Error code: ${error.code}`, error.message);
				} else {
					Alert.alert("Success", "The payment was confirmed successfully");
				}
			}
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<StatusBar style="auto" />
			<WebView
				source={{
					uri: walletUrl,
				}}
				style={{ flex: 1 }}
				onMessage={onMessage}
				javaScriptEnabled={true}
				originWhitelist={["*"]}
				onLoadStart={() => checkPlatformPay()}
			/>
		</View>
	);
}
