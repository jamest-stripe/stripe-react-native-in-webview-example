import SectionHeader from "@/components/ui/sectionheader";
import { Select, SelectObject } from "@/components/ui/forms/select";
import Toggle from "@/components/ui/forms/toggle";
import NumberInput from "@/components/ui/forms/numberinput";
import CodeBlock from "@/components/ui/codeblock";
import TabList from "@/components/ui/forms/tablist";
import { layouts, themes } from "@/lib/checkout";
import { useSettings } from "@/components/providers/settings";
import { prettyPrintJson } from "@/lib/utils";
import {
	StripePaymentElementOptions,
	StripeAddressElementOptions,
	StripeExpressCheckoutElementOptions,
} from "@stripe/stripe-js";

export default function ElementsTab({
	addressElementOptions,
	paymentElementOptions,
	expressCheckoutOptions,
}: {
	addressElementOptions: StripeAddressElementOptions;
	paymentElementOptions: StripePaymentElementOptions;
	expressCheckoutOptions: StripeExpressCheckoutElementOptions;
}) {
	const { state, dispatch } = useSettings();
	const { elements, payment } = state;
	const {
		paymentElement,
		addressElement,
		expressCheckoutElement,
		linkAuthenticationElement,
		theme,
	} = elements;

	const appleThemeOptions = ["black", "white", "white-outline"];
	const googleThemeOptions = ["black", "white"];
	const appleButtonOptions = [
		"add-money",
		"book",
		"buy",
		"check-out",
		"continue",
		"contribute",
		"donate",
		"order",
		"plain",
		"reload",
		"rent",
		"subscribe",
		"support",
		"tip",
		"top-up",
	];
	const googleButtonOptions = [
		"book",
		"buy",
		"checkout",
		"donate",
		"order",
		"pay",
		"plain",
		"subscribe",
	];
	const walletShowOptions = ["always", "auto", "never"];
	const overflowOptions = ["auto", "never"];

	const appearanceString =
		"const appearance = " + prettyPrintJson(themes[theme].output);
	const elementsOptionsString =
		`const elementsOptions = {\n` +
		`  mode: "payment",\n` +
		`  currency: "aud",\n` +
		`  amount: ${payment.adjustedAmount},\n` +
		`  appearance,\n` +
		`}`;
	const paymentElementOptionsString =
		"const paymentElementOptions = " + prettyPrintJson(paymentElementOptions);

	const expressCheckoutOptionsString =
		"const expressCheckoutOptions = " + prettyPrintJson(expressCheckoutOptions);
	const addressElementOptionsString =
		"const addressElementOptions = " + prettyPrintJson(addressElementOptions);

	const reloadExpressCheckout = async (setter: (val: string) => void) => {
		dispatch({ elements: { expressCheckoutElement: { enabled: false } } });
		await setter();
		dispatch({ elements: { expressCheckoutElement: { enabled: true } } });
	};

	const handleAddressReload = async (toggle: (val: boolean) => void) => {
		dispatch({ elements: { addressElement: { enabled: false } } });
		await toggle();
		dispatch({ elements: { addressElement: { enabled: true } } });
	};

	const reloadPaymentElement = async (toggle: (val: boolean) => void) => {
		dispatch({ elements: { paymentElement: { enabled: false } } });
		await toggle();
		dispatch({ elements: { paymentElement: { enabled: true } } });
	};

	return (
		<>
			<div className="flex flex-col">
				<SectionHeader>Look and feel</SectionHeader>
				<div className="flex justify-between flex-grow gap-4">
					<SelectObject
						list={layouts}
						selected={paymentElement.layout}
						setSelected={(val: any) =>
							dispatch({
								elements: {
									paymentElement: {
										layout: val,
									},
								},
							})
						}
						label="Layout"
					/>
					<SelectObject
						list={themes}
						selected={theme}
						setSelected={(val: any) =>
							dispatch({
								elements: {
									theme: val,
								},
							})
						}
						label="Theme"
					/>
				</div>
				<div>
					<Toggle
						enabled={paymentElement.defaultCollapsed}
						setEnabled={(value) =>
							reloadPaymentElement(() =>
								dispatch({
									elements: {
										paymentElement: {
											defaultCollapsed: value,
										},
									},
								})
							)
						}
						label={"Collapsed"}
					/>
					{paymentElement.layout === "accordion" && (
						<>
							<Toggle
								enabled={paymentElement.showRadios}
								setEnabled={(value) =>
									dispatch({
										elements: {
											paymentElement: {
												showRadios: value,
											},
										},
									})
								}
								label={"Show radio buttons"}
							/>
							<Toggle
								enabled={elements.paymentElement.spacedAccordionItems}
								setEnabled={(value) =>
									dispatch({
										elements: {
											paymentElement: {
												spacedAccordionItems: value,
											},
										},
									})
								}
								label={"Spaced accordion items"}
							/>
						</>
					)}
				</div>
			</div>
			<div>
				<SectionHeader>Additional Elements</SectionHeader>
				<Toggle
					enabled={linkAuthenticationElement.enabled}
					setEnabled={(value) =>
						dispatch({
							elements: {
								linkAuthenticationElement: {
									enabled: value,
								},
							},
						})
					}
					disabled={state.customer.enabled}
					label={"Link Authentication Element"}
				/>
				<Toggle
					enabled={expressCheckoutElement.enabled}
					setEnabled={(value) =>
						dispatch({
							elements: {
								expressCheckoutElement: {
									enabled: value,
								},
							},
						})
					}
					label={"Express Checkout Element"}
				/>
				{expressCheckoutElement.enabled && (
					<div className="ml-2">
						<SectionHeader>Express Checkout Element options</SectionHeader>
						<div className="ml-2">
							<SectionHeader>Apple Pay Button Options</SectionHeader>
							<div className="flex justify-between gap-2">
								<Select
									label="Theme"
									selected={expressCheckoutElement.applePay.theme}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														applePay: {
															theme: value as any,
														},
													},
												},
											})
										)
									}
									list={appleThemeOptions}
								/>
								<Select
									label="Type"
									selected={expressCheckoutElement.applePay.buttonType}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														applePay: {
															buttonType: value as any,
														},
													},
												},
											})
										)
									}
									list={appleButtonOptions}
								/>
								<Select
									label="Show"
									selected={expressCheckoutElement.applePay.show}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														applePay: {
															show: value as any,
														},
													},
												},
											})
										)
									}
									list={walletShowOptions}
								/>
							</div>
						</div>
						<div className="ml-2">
							<SectionHeader>Google Pay Button Options</SectionHeader>
							<div className="flex justify-between gap-2">
								<Select
									label="Theme"
									selected={expressCheckoutElement.googlePay.theme}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														googlePay: {
															theme: value as any,
														},
													},
												},
											})
										)
									}
									list={googleThemeOptions}
								/>
								<Select
									label="Type"
									selected={expressCheckoutElement.googlePay.buttonType}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														googlePay: {
															buttonType: value as any,
														},
													},
												},
											})
										)
									}
									list={googleButtonOptions}
								/>
								<Select
									label="Show"
									selected={expressCheckoutElement.googlePay.show}
									setSelected={(value) =>
										reloadExpressCheckout(() =>
											dispatch({
												elements: {
													expressCheckoutElement: {
														googlePay: {
															show: value as any,
														},
													},
												},
											})
										)
									}
									list={walletShowOptions}
								/>
							</div>
						</div>
						<div className="ml-2">
							<SectionHeader>Layout options</SectionHeader>
							<div className="flex justify-between gap-2">
								<Select
									label="Overflow"
									selected={expressCheckoutElement.overflow}
									setSelected={(value) =>
										dispatch({
											elements: {
												expressCheckoutElement: {
													overflow: value as any,
												},
											},
										})
									}
									list={overflowOptions}
								/>
								<NumberInput
									id="maxCols"
									label="Max columns"
									value={expressCheckoutElement.maxColumns}
									setValue={(value) =>
										dispatch({
											elements: {
												expressCheckoutElement: {
													maxColumns: value as number,
												},
											},
										})
									}
								/>
								<NumberInput
									id="maxRows"
									label="Max rows"
									value={expressCheckoutElement.maxRows}
									setValue={(value) =>
										dispatch({
											elements: {
												expressCheckoutElement: {
													maxRows: value as number,
												},
											},
										})
									}
								/>
							</div>
						</div>
					</div>
				)}
				<Toggle
					enabled={addressElement.enabled}
					setEnabled={(value) =>
						dispatch({
							elements: {
								addressElement: {
									enabled: value,
								},
							},
						})
					}
					label={"Address Element"}
				/>
				{addressElement.enabled && (
					<div className="ml-2">
						<SectionHeader>Address Element options</SectionHeader>
						<TabList
							options={["shipping", "billing"]}
							tab={addressElement.addressMode}
							setTab={(value: string) =>
								handleAddressReload(() =>
									dispatch({
										elements: {
											addressElement: {
												addressMode: value as any,
											},
										},
									})
								)
							}
							suffix="mode"
						/>
						<Toggle
							enabled={addressElement.useContacts}
							setEnabled={(value) =>
								handleAddressReload(() =>
									dispatch({
										elements: {
											addressElement: {
												useContacts: value,
											},
										},
									})
								)
							}
							label={"Pre-fill Contacts"}
						/>
						<Toggle
							enabled={addressElement.collectPhone}
							setEnabled={(value) =>
								dispatch({
									elements: {
										addressElement: {
											collectPhone: value,
										},
									},
								})
							}
							label={"Collect phone number"}
						/>
					</div>
				)}
			</div>
			<div>
				<CodeBlock language="javascript">
					{`${appearanceString}\n\n${elementsOptionsString}\n\n${paymentElementOptionsString}${
						expressCheckoutElement.enabled
							? "\n\n" + expressCheckoutOptionsString
							: ""
					}${
						addressElement.enabled ? "\n\n" + addressElementOptionsString : ""
					}`}
				</CodeBlock>
			</div>
		</>
	);
}
