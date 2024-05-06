"use client";
import { DemoAccounts } from "@/lib/demoaccounts";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { use, useEffect, useState } from "react";
import CheckoutForm from "../checkout/components/checkoutform";
import { useSearchParams } from "next/navigation";
import CheckoutContainer from "../checkout/components/checkoutcontainer";
import SectionHeader from "@/components/ui/sectionheader";
declare global {
	interface Window {
		ReactNativeWebView: any;
		walletFromApp: any;
		deviceTypeFromApp: any;
	}
}

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
);

export default function Wallets() {
	//Wallet result from RN
	const [wallet, setWallet] = useState("No wallet data");
	const [os, setOs] = useState("No OS data");
	const urlWallet = useSearchParams().get("wallet");

	//Trigger the wallet payment

	const gPay = async () => {
		console.log("gPay");
		const response = await fetch("/api/payments/createintent", {
			method: "POST",
			body: JSON.stringify({
				amount: 37448,
				currency: "aud",
				metadata: { gPay: true },
			}),
		});
		const { client_secret: clientSecret } = await response.json();
		console.log(clientSecret);
		const message = JSON.stringify({
			action: "gpay_payment",
			clientSecret: clientSecret,
		});
		console.log(clientSecret);
		window.ReactNativeWebView.postMessage(message);
	};

	return (
		<main className="bg-gray-100 h-screen">
			<div className="flex flex-col w-full max-w-xl m-auto">
				<h1 className="text-2xl text-center mt-8 font-semibold">Wallet Demo</h1>
				{DemoAccounts.map((i) => {
					return (
						<div className="bg-white rounded-sm px-8 py-4 mt-8" key={i.account}>
							<div className="flex">
								<div>
									<div className="text-[#ffc72c]">{i.icon}</div>
								</div>
								<div className="ml-4 flex flex-col gap-4 grow">
									<div className="font-semibold">{i.name}</div>
									<div className="text-gray-500 text-lg">{i.address}</div>
									<div className="text-gray-500 text-sm">
										Account no: {i.account}
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-4 mt-8">
								<div className="flex justify-between border-[#fa4616] rounded-lg border-2 px-4 py-6">
									<div className="font-gray-600">Total balance</div>
									<div className="text-2xl font-semibold">${i.amount}</div>
								</div>

								{/* <button
									className="bg-[#fa4616] text-white rounded-md py-2"
									onClick={rnPay}
								>
									Pay
								</button> */}
								<SectionHeader className="px-1.5">Payment</SectionHeader>
								<button
									className="bg-[#fa4616] text-white rounded-md py-2 mb-4"
									onClick={gPay}
									hidden={urlWallet !== "true"}
								>
									Wallet Payment
								</button>
							</div>
							<CheckoutContainer amount={i.amount} />
						</div>
					);
				})}
			</div>
		</main>
	);
}
