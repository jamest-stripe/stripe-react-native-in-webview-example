export default function NumberInput({
	id,
	value,
	label,
	suffix,
	prefix,
	setValue,
	transform,
}: {
	id: string;
	value: number;
	label: string;
	suffix?: string;
	prefix?: string;
	setValue: (value: number) => void;
	transform?: (value: number) => number;
}) {
	const setWithTransform = (value: number) => {
		if (transform) {
			setValue(transform(value));
		} else {
			setValue(value);
		}
	};
	return (
		<div className="flex justify-between items-center gap-4 mt-2">
			<label
				htmlFor={id}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="relative rounded-md shadow-sm">
				{prefix && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span className="text-gray-500 sm:text-sm">{prefix}</span>
					</div>
				)}
				<input
					type="number"
					name={id}
					id={id}
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					value={value}
					onChange={(e) => setWithTransform(e.target.valueAsNumber)}
					aria-describedby={`${id}-input`}
				/>
				{suffix && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span className="text-gray-500 sm:text-sm" id={`${id}-suffix`}>
							{suffix}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
