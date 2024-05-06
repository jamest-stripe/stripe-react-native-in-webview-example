import Link from "next/link";
import PaymentAmountInput from "@/components/ui/forms/paymentamountinput";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Toggle from "@/components/ui/forms/toggle";
import SectionHeader from "@/components/ui/sectionheader";
import TextInput from "@/components/ui/forms/textinput";
import NumberInput from "@/components/ui/forms/numberinput";
import CodeBlock from "@/components/ui/codeblock";
import { useSettings } from "@/components/providers/settings";
import { prettyPrintJson } from "@/lib/utils";
import { FormEvent } from "react";

export default function PaymentsTab() {
	const { state, dispatch } = useSettings();
	const { payment, customer } = state;

	const getCustomerSession = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/customers/createsession", {
			method: "POST",
			body: JSON.stringify({ customer: customer.id }),
		});
		const session = await response.json();
		dispatch({
			customer: {
				session: session.client_secret,
			},
		});
	};

	return (
		<div>
			<Link
				href="https://dashboard.stripe.com/test/settings/payment_methods"
				target="_blank"
				className="flex items-center self-start text-blurple underline hover:text-indigo-700 gap-1"
			>
				<div>Manage payment methods</div>
				<ArrowTopRightOnSquareIcon className="h-5 w-5" />
			</Link>
			<div className="w-fit">
				<PaymentAmountInput
					id="paymentAmount"
					value={payment.amount / 100}
					setValue={(value) =>
						dispatch({
							payment: {
								amount: value,
							},
						})
					}
					currency={payment.currency}
					setCurrency={(value) =>
						dispatch({
							payment: {
								currency: value,
							},
						})
					}
					currencyOptions={["aud", "sgd", "eur", "gbp", "usd"]}
					labelFormat="uppercase"
					transform={(value) => value * 100}
				/>
			</div>
			{/* <Toggle
				label="Use customer"
				enabled={customer.enabled}
				setEnabled={(value) =>
					dispatch({
						customer: {
							enabled: value,
						},
					})
				}
			/> */}
			{/* {customer.enabled && (
				<form className="flex items-end gap-3" onSubmit={getCustomerSession}>
					<TextInput
						id="customerId"
						label={"Customer ID"}
						placeholder={"cus_NN2CVrgh5vtfnq"}
						value={customer.id}
						setValue={(value) =>
							dispatch({
								customer: {
									id: value,
								},
							})
						}
					/>
					<button
						className="bg-blurple text-white rounded-md py-1.5 px-4 hover:drop-shadow-md hover:text-gray-100"
						type="submit"
					>
						Retrieve
					</button>
				</form>
			)} */}
			<Toggle
				label="Surcharge"
				enabled={payment.surcharge}
				setEnabled={(value) =>
					dispatch({
						payment: {
							surcharge: value,
						},
					})
				}
			/>
			{payment.surcharge && (
				<div className="w-fit">
					<NumberInput
						id="visaSurcharge"
						label="Visa"
						value={payment.visaSurcharge}
						setValue={(value) =>
							dispatch({
								payment: {
									visaSurcharge: value,
								},
							})
						}
						suffix="%"
					/>
					<NumberInput
						id="mcSurcharge"
						label="Mastercard"
						value={payment.mcSurcharge}
						setValue={(value) =>
							dispatch({
								payment: {
									mcSurcharge: value,
								},
							})
						}
						suffix="%"
					/>
					<NumberInput
						id="amexSurcharge"
						label="Amex"
						value={payment.amexSurcharge}
						setValue={(value) =>
							dispatch({
								payment: {
									amexSurcharge: value,
								},
							})
						}
						suffix="%"
					/>
				</div>
			)}
			{payment.paymentMethod && (
				<>
					<SectionHeader>Current Payment Method</SectionHeader>
					<CodeBlock language="javascript">
						{prettyPrintJson(payment.paymentMethod)}
					</CodeBlock>
				</>
			)}
		</div>
	);
}
