"use client";
import { themes } from "@/lib/checkout";
import CheckoutContainer from "./components/checkoutcontainer";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import PaymentSummary from "./components/paymentsummary";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSettings } from "@/components/providers/settings";
import { DemoAccounts } from "@/lib/demoaccounts";
import React, { Suspense } from "react";
declare global {
	interface Window {
		ReactNativeWebView: any;
	}
}
export default function Checkout() {
	const { state, showPanel } = useSettings();
	const { elements } = state;
	const searchParams = useSearchParams();
	const account = searchParams.get("account");
	const accountDetail = DemoAccounts.find((i) => i.account === account);

	return (
		<main
			className={`h-screen relative z-0 ${themes[elements.theme].className}`}
		>
			{/* <button
				className="absolute top-5 right-5 text-gray-500 dark:text-white z-10"
				onClick={() => showPanel(true)}
			>
				<Cog8ToothIcon className="h-10 w-10" />
			</button> */}
			<div className="max-w-7xl m-auto mt-8">
				<div className="flex flex-col md:flex-row dark:text-white">
					<div className="md:w-1/2 p-4 md:border-r-2">
						<div className="max-w-xs m-auto text-md text-gray-600 flex flex-col h-full">
							<h2 className="text-lg font-semibold">Payment details</h2>
							<div className="bg-white rounded-sm py-4 mt-8">
								<div className="flex">
									<div>
										<div className="text-[#FFC72C]">{accountDetail?.icon}</div>
									</div>
									<div className="ml-4 flex flex-col gap-4 grow">
										<div className="font-semibold">{accountDetail?.name}</div>
										<div className="text-gray-500 text-lg">
											{accountDetail?.address}
										</div>
										<div className="text-gray-500 text-sm">
											Account no: {accountDetail?.account}
										</div>
									</div>
								</div>
							</div>
							<div className="mt-8">
								<PaymentSummary />
							</div>
						</div>
					</div>
					<div className="flex-auto p-4">
						<CheckoutContainer amount={accountDetail?.amount} />
					</div>
				</div>
			</div>
		</main>
	);
}
