export default function PaymentAmountInput({
	id,
	value,
	currency,
	setValue,
	setCurrency,
	currencyOptions,
	labelFormat,
	transform,
}: {
	id: string;
	value: number;
	currency: string;
	setValue: (amount: number) => void;
	setCurrency: (currency: string) => void;
	currencyOptions: string[];
	labelFormat?: "uppercase" | "capitalize" | "lowercase";
	transform?: (value: number) => number;
}) {
	function formatOutput(input: string) {
		switch (labelFormat) {
			case "uppercase":
				return input.toUpperCase();
			case "capitalize":
				return input.charAt(0).toUpperCase() + input.slice(1);
			case "lowercase":
				return input.toLowerCase();
			default:
				return input;
		}
	}

	const setWithTransform = (value: number) => {
		if (transform) {
			setValue(transform(value));
		} else {
			setValue(value);
		}
	};

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				Price
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				{/* Placeholder for prefix */}
				<input
					type="number"
					name={id}
					id={id}
					className="block w-min rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					value={value}
					onChange={(e) => setWithTransform(e.target.valueAsNumber)}
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<label htmlFor="currency" className="sr-only">
						Currency
					</label>
					{currencyOptions.length > 1 ? (
						<select
							id="currency"
							name="currency"
							value={currency}
							className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
							onChange={(e) => setCurrency(e.target.value)}
						>
							{currencyOptions.map((c) => (
								<option key={c} value={c}>
									{formatOutput(c)}
								</option>
							))}
						</select>
					) : (
						<div className="h-full flex items-center rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm">
							{<div>{formatOutput(currency)}</div>}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
