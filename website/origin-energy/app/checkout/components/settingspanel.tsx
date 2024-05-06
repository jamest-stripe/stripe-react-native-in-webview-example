import ElementsTab from "./elementstab";
import PaymentsTab from "./paymenttab";
import TabList from "@/components/ui/forms/tablist";
import SlideOver from "@/components/ui/slideover";
import Toggle from "@/components/ui/forms/toggle";
import { useState, useEffect } from "react";
import { useSettings } from "@/components/providers/settings";
import {
	StripePaymentElementOptions,
	StripeAddressElementOptions,
	StripeExpressCheckoutElementOptions,
} from "@stripe/stripe-js";

export default function SettingsPanel({
	showSettings,
	setShowSettings,
	addressElementOptions,
	paymentElementOptions,
	expressCheckoutOptions,
}: {
	showSettings: boolean;
	setShowSettings: (val: boolean) => void;
	addressElementOptions: StripeAddressElementOptions;
	paymentElementOptions: StripePaymentElementOptions;
	expressCheckoutOptions: StripeExpressCheckoutElementOptions;
}) {
	const [settingsTab, setSettingsTab] = useState("elements");
	const { state, dispatch } = useSettings();
	const {
		adblock,
		elements: { showBorders },
	} = state;

	const handleKeyboard = ({
		repeat,
		metaKey,
		ctrlKey,
		key,
	}: {
		repeat: boolean;
		metaKey: boolean;
		ctrlKey: boolean;
		key: string;
	}) => {
		if (repeat) return;
		if ((metaKey || ctrlKey) && key === "b") {
			dispatch({
				elements: {
					showBorders: !showBorders,
				},
			});
		}
		if ((metaKey || ctrlKey) && key === "i") {
			setShowSettings(!showSettings);
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyboard);
		return () => document.removeEventListener("keydown", handleKeyboard);
	});

	return (
		<SlideOver open={showSettings} setOpen={setShowSettings} title="Settings">
			<TabList
				tab={settingsTab}
				setTab={setSettingsTab}
				options={["elements", "payment"]}
			/>

			{settingsTab === "elements" && (
				<ElementsTab
					addressElementOptions={addressElementOptions}
					paymentElementOptions={paymentElementOptions}
					expressCheckoutOptions={expressCheckoutOptions}
				/>
			)}
			{settingsTab === "payment" && <PaymentsTab />}
			<div className="pb-8 mt-auto">
				<Toggle
					label="Show Element borders"
					enabled={showBorders}
					setEnabled={() =>
						dispatch({
							elements: { showBorders: !showBorders },
						})
					}
				/>
			</div>
		</SlideOver>
	);
}
