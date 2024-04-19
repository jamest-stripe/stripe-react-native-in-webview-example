# React Native WebView ApplePay Payment App

To run the app please install the depedencies and start Expo.

1. npm i
2. npx expo start

Stripe's implementation of ApplePay via Payment Element and Express Checkout Element does work within React Native WebView. To enable ApplePay access the WebView component must include the `EnableApplePay` option set to `true`:

> <WebView

    			source={{ uri: "https://stripedemos.com" }}
    			style={{ flex: 1 }}
    			enableApplePay={true}
    		/>`

(https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#enableapplepay).

## GooglePay Note

It is worth highlighting that rendering a GooglePay button is (at present) a little more involved as you need to utilise Android Custom Tabs to enable trusted access to Google Pay (https://developer.chrome.com/docs/android/custom-tabs), there are a couple of RN libraries that enable this e.g. https://github.com/droibit/react-native-custom-tabs. Though it is worth highlighting that the Payment Element does enable autofill from Google Wallet when card is selected.
