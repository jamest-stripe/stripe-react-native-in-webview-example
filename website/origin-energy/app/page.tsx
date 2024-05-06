"use client";
import { DemoAccounts } from "@/lib/demoaccounts";
declare global {
	interface Window {
		ReactNativeWebView: any;
	}
}

export default function Home() {
	const rnPay = async () => {
		console.log("rnPay");
		const response = await fetch("/api/payments/createintent", {
			method: "POST",
			body: JSON.stringify({
				amount: 37448,
				currency: "aud",
				metadata: { rnPay: true },
			}),
		});
		const { client_secret: clientSecret } = await response.json();
		console.log(clientSecret);
		const message = JSON.stringify({
			action: "make_payment",
			clientSecret: clientSecret,
		});
		console.log(clientSecret);
		window.ReactNativeWebView.postMessage(message);
	};

	return (
		<main className="bg-gray-100 h-screen">
			<div className="flex flex-col w-full max-w-xl m-auto">
				<h1 className="text-2xl text-center mt-8 font-semibold">Your plans</h1>
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
								<button
									className="bg-[#fa4616] text-white rounded-md py-2"
									onClick={rnPay}
								>
									Pay
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
}
