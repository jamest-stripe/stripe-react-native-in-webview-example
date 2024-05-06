"use client";
import { useEffect, useState } from "react";
import {
	StripePaymentElementOptions,
	StripeExpressCheckoutElementConfirmEvent,
	StripeAddressElementOptions,
	StripeExpressCheckoutElementOptions,
	StripePaymentElementChangeEvent,
	PaymentMethod,
	PaymentRequest,
} from "@stripe/stripe-js";
import {
	PaymentElement,
	LinkAuthenticationElement,
	ExpressCheckoutElement,
	AddressElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import SectionHeader from "@/components/ui/sectionheader";
import { getHostname, capitalize } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/components/providers/settings";

declare global {
	interface Window {
		ReactNativeWebView: any;
	}
}

export default function CheckoutForm({
	addressElementOptions,
	paymentElementOptions,
	expressCheckoutOptions,
}: {
	addressElementOptions: StripeAddressElementOptions;
	paymentElementOptions: StripePaymentElementOptions;
	expressCheckoutOptions: StripeExpressCheckoutElementOptions;
}) {
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	const [loading, setLoading] = useState(false);

	const stripe = useStripe();
	const elements = useElements();
	const { state, dispatch } = useSettings();
	const {
		paymentElement,
		linkAuthenticationElement,
		addressElement,
		expressCheckoutElement,
		showBorders,
	} = state.elements;
	const { payment } = state;

	const onSubmit = async (
		e: React.FormEvent | StripeExpressCheckoutElementConfirmEvent
	) => {
		if ("preventDefault" in e) {
			e.preventDefault();
		}

		if (!stripe || !elements) {
			return;
		}

		setLoading(true);

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/payments/createintent", {
				method: "POST",
				body: JSON.stringify({
					amount: payment.surcharge ? payment.adjustedAmount : payment.amount,
					currency: payment.currency,
				}),
			});
			if (response.status !== 200) {
				throw response.statusText;
			}
			const { client_secret: clientSecret } = await response.json();
			const { error } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `https://origindemo.stripedemos.com/checkout/success`,
				},
				redirect: "if_required",
			});

			if (error) {
				setErrorMessage(error.message);
				setLoading(false);
			} else {
				setSuccessMessage("Payment successful");
				setErrorMessage("");
			}
		} catch (error: any) {
			setErrorMessage(error.message);
			setLoading(false);
			return;
		}
		setLoading(false);
	};

	const handleChange = async (event: StripePaymentElementChangeEvent) => {
		if (elements && stripe && event.complete) {
			elements.submit();
			const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
				elements,
			});
			if (error) {
				console.log(error);
				return;
			}
			dispatch({
				payment: {
					paymentMethod: pm,
				},
			});
			const surchargePct = getSurcharge(pm);
			const adjusted = Math.round(payment.amount * (1 + surchargePct / 100));
			dispatch({
				payment: {
					adjustedAmount: adjusted,
				},
			});
		}
	};

	const getSurcharge = (pm: PaymentMethod) => {
		if (state.payment.surcharge && pm?.card) {
			switch (pm.card?.brand) {
				case "visa":
					return payment.visaSurcharge;
				case "mastercard":
					return payment.mcSurcharge;
				case "amex":
					return payment.amexSurcharge;
				default:
					return 0;
			}
		} else {
			return 0;
		}
	};

	const borderStyle = `p-1 border-2 transition-all ease-in box-content ${
		showBorders
			? "border-2 rounded-md border-dashed border-blurple"
			: "border-transparent"
	}`;

	return (
		<form className="max-w-md m-auto h-full flex flex-col">
			{successMessage && (
				<div className="bg-green-200 text-green-800 p-3 mb-3 text-center font-semibold">
					{successMessage}
				</div>
			)}
			{expressCheckoutElement.enabled && (
				<div className="mb-4">
					<SectionHeader className="px-1.5">Express Checkout</SectionHeader>
					<div className={borderStyle}>
						<ExpressCheckoutElement
							options={expressCheckoutOptions}
							onConfirm={onSubmit}
						/>
					</div>
				</div>
			)}
			{linkAuthenticationElement.enabled && (
				<div className={borderStyle}>
					<LinkAuthenticationElement />
				</div>
			)}
			{addressElement.enabled && (
				<div>
					<SectionHeader className="px-1.5">Shipping details</SectionHeader>
					<div className={borderStyle}>
						<AddressElement options={addressElementOptions} />
					</div>
				</div>
			)}
			<div className="mb-4">
				{payment.surcharge && payment.paymentMethod?.card?.brand && (
					<div className="mt-4 px-4 py-2 bg-amber-100 flex items-center gap-2">
						<ExclamationCircleIcon className="w-10 h-10 text-amber-800" />

						<div>
							<p>
								Please note that a surcharge of{" "}
								{getSurcharge(payment.paymentMethod)}% applies when paying by{" "}
								{capitalize(payment.paymentMethod.card?.brand)}.
							</p>
							<p>
								Your final payment amount will be{" "}
								<b>${payment.adjustedAmount / 100}</b>
							</p>
						</div>
					</div>
				)}
				{/* <SectionHeader className="px-1.5">Payment</SectionHeader> */}
				{paymentElement.enabled && (
					<div className={borderStyle}>
						<PaymentElement
							options={paymentElementOptions}
							onChange={handleChange}
						/>
					</div>
				)}
			</div>
			{errorMessage && (
				<div className="bg-red-200 text-red-600 p-3 mb-3 text-center font-semibold">
					{errorMessage}
				</div>
			)}
			{!successMessage && (
				<div className="px-1.5 mt-auto">
					<button
						//className="p-3 w-full relative rounded-md center text-lg font-semibold text-white disabled:bg-gray-200 disabled:text-gray-500 bg-[#EC0000] hover:text-gray-100 hover:drop-shadow-md"
						className="bg-[#fa4616] text-white rounded-md py-2 w-full"
						onClick={onSubmit}
						disabled={loading}
					>
						Pay
						{loading && <Spinner />}
					</button>
				</div>
			)}
		</form>
	);
}
