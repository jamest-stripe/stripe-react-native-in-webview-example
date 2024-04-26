import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import {
	initStripe,
	useStripe,
	PaymentSheet,
} from "@stripe/stripe-react-native";

export default function App() {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	useEffect(() => {
		initStripe({
			publishableKey:
				"pk_test_51Me6XAHdJokNZ98tzjQti0Ln3JNqvf8fqnAJ2VPm9oRzmgWEvjnUOZPubjpmSPVGE7bzAQSi5XDOCQkdh9imQit6001p6Hlk04",
		});
	}, []);

	const onMessage = async (event) => {
		const message = JSON.parse(event.nativeEvent.data);

		if (message.action === "make_payment") {
			// Initialize the payment sheet
			const { error } = await initPaymentSheet({
				applePay: {
					merchantCountryCode: "AU",
				},

				merchantDisplayName: "Power Co",
				paymentIntentClientSecret: message.clientSecret,
				returnURL: "https://betaorigindemo.stripedemos.com/success",
				googlePay: {
					merchantCountryCode: "AU",
					testEnv: true, // use test environment
				},
				applePay: true,
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
			<WebView
				source={{ uri: "https://betaorigindemo.stripedemos.com" }}
				style={{ flex: 1 }}
				// enableApplePay={true}
				onMessage={onMessage}
			/>
			<StatusBar style="auto" />
		</View>
	);
}
