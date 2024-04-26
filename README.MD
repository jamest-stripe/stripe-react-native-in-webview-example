# React Native WebView ApplePay Payment App

To run the app please install the depedencies and start Expo.

1. npm i
2. npx expo start

Stripe's implementation of ApplePay via Payment Element and Express Checkout Element does work within React Native WebView. To enable ApplePay access the WebView component must include the `EnableApplePay` option set to `true`, however this results in a trade-off in the disabling of JS injection into the WebView.

This approach uses a `PostMessage` event to trigger a hand off to Stripe's React Native SDK, to initalise a payment form that renders both express checkout elements e.g. Apple Pay/GooglePay and payment methods that require entry e.g. card, AU BECS, WeChat Pay, etc.

A compiled Andriod demo is included within the `app_artifacts` folder. To test using an iOS device you will need to compile using EAS Build to generate a signed ad-hoc app.

```
eas build --profile preview  --platform ios
```
