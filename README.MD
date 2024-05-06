# React Native WebView Wallet Payment App

- Detects if wallet is set-up on phone using RN SDK [https://stripe.dev/stripe-react-native/api-reference/index.html#isPlatformPaySupported](https://stripe.dev/stripe-react-native/api-reference/index.html#isPlatformPaySupported)
- Passes the result to the WebView to render a wallet button within the web-based payment experience
- Allows customers to pay using card via the web-based Payment Element
- If wallet is selected, hands off to the RN SDK to process the payment and return result [https://stripe.dev/stripe-react-native/api-reference/index.html#confirmPlatformPayPayment](https://stripe.dev/stripe-react-native/api-reference/index.html#confirmPlatformPayPayment)
- Also lists PayPal within the web-based payment method as a method (you will need to handle the input event per our guide here - [https://docs.stripe.com/payments/external-payment-methods](https://docs.stripe.com/payments/external-payment-methods))

To run the app please install the depedencies and start Expo.

```
cd app_code
npm i
npx expo start
```

A fully compiled and built Android version of the application is included within the `app_artifacts` folder.

The website code is included within the `website` directory. To set-up and run the site:

```
cp .env.local .env
//update with your Stripe Keys

cd website
yarn
yarn dev
```
