import { useSettings } from "@/components/providers/settings";

export default function PaymentSummary() {
	const { state } = useSettings();
	const { payment } = state;
	return (
		<div>
			<div className="flex justify-between pb-4 px-4">
				<div>Balance due</div>
				<div className="">${payment.amount / 100}</div>
			</div>
			{payment.surcharge && payment.paymentMethod && (
				<div className="border-b border-gray-200 flex justify-between pb-4 px-4">
					<div>Card surcharge</div>
					<div className="">
						${(payment.adjustedAmount - payment.amount) / 100}
					</div>
				</div>
			)}
			<div className="flex justify-between py-4 px-4 font-semibold text-lg light:text-gray-900 border-2 border-primary rounded-lg">
				<div>Total</div>
				<div>
					$
					{payment.surcharge
						? payment.adjustedAmount / 100
						: payment.amount / 100}{" "}
					{payment.currency.toUpperCase()}
				</div>
			</div>
		</div>
	);
}
