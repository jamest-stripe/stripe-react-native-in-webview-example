import {
	loadStripe,
	StripeElementsOptions,
	StripePaymentElementOptions,
	StripeExpressCheckoutElementOptions,
	Appearance,
	ContactOption,
	StripeAddressElementOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { themes } from "@/lib/checkout";
import CheckoutForm from "./checkoutform";
import SettingsPanel from "./settingspanel";
import { useSettings } from "@/components/providers/settings";
import { useEffect } from "react";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "",
	{
		// betas: [
		// 	"elements_saved_payment_methods_beta_1",
		// 	"elements_spm_sfu_off_session_override_beta_1",
		// ],
	}
);

export default function CheckoutContainer({ amount }: { amount?: number }) {
	const { state, showPanel, dispatch } = useSettings();
	const { elements, payment, customer } = state;
	const { paymentElement, addressElement, expressCheckoutElement, theme } =
		elements;

	useEffect(() => {
		if (amount) {
			dispatch({
				payment: {
					amount: amount * 100,
					adjustedAmount: amount * 100,
				},
			});
		}
	}, [amount, dispatch]);

	const elementsOptions: StripeElementsOptions = {
		mode: "payment",
		currency: payment.currency,
		amount: payment.amount,
		paymentMethodCreation: "manual",
		paymentMethodTypes: ["card", "payto", "link", "wechat_pay", "alipay"],
		externalPaymentMethodTypes: ["external_paypal"],
		appearance: themes[theme].output as Appearance,
		...(customer.session && { customerSessionClientSecret: customer.session }),
	};

	const paymentElementOptions: StripePaymentElementOptions = {
		layout: {
			type: state.elements.paymentElement.layout,
			defaultCollapsed: paymentElement.defaultCollapsed,
			...(paymentElement.layout === "accordion" && {
				radios: paymentElement.showRadios,
				spacedAccordionItems: paymentElement.spacedAccordionItems,
			}),
		},
	};

	const sampleContact: ContactOption = {
		name: "Jenny Rosen",
		address: {
			line1: "1 Sussex Street",
			city: "Barangaroo",
			state: "New South Wales",
			postal_code: "2000",
			country: "AU",
		},
	};

	const addressElementOptions: StripeAddressElementOptions = {
		mode: state.elements.addressElement.addressMode as "shipping" | "billing",
		fields: {
			phone: addressElement.collectPhone ? "always" : "never",
		},
		contacts: addressElement.useContacts ? [sampleContact] : undefined,
	};

	const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
		buttonTheme: {
			applePay: expressCheckoutElement.applePay.theme,
			googlePay: expressCheckoutElement.googlePay.theme,
		},
		buttonType: {
			applePay: expressCheckoutElement.applePay.buttonType,
			googlePay: expressCheckoutElement.googlePay.buttonType,
		},
		layout: {
			maxColumns: expressCheckoutElement.maxColumns,
			maxRows: expressCheckoutElement.maxRows,
			overflow: expressCheckoutElement.overflow,
		},
		wallets: {
			applePay: expressCheckoutElement.applePay.show,
			googlePay: expressCheckoutElement.googlePay.show,
		},
	};

	return (
		<Elements stripe={stripePromise} options={elementsOptions}>
			<CheckoutForm
				addressElementOptions={addressElementOptions}
				paymentElementOptions={paymentElementOptions}
				expressCheckoutOptions={expressCheckoutOptions}
			/>
			<SettingsPanel
				showSettings={state.showPanel}
				setShowSettings={showPanel}
				addressElementOptions={addressElementOptions}
				paymentElementOptions={paymentElementOptions}
				expressCheckoutOptions={expressCheckoutOptions}
			/>
		</Elements>
	);
}
