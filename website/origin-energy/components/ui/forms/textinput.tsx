import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function TextInput({
	id,
	value,
	label,
	placeholder,
	error,
	setValue,
}: {
	id: string;
	value?: string;
	label: string;
	placeholder: string;
	error?: string;
	setValue: (value: string) => void;
}) {
	const peacefulClass =
		"block w-full pl-4 rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-paleblurple";
	const errorClass =
		"block w-full pl-4 rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6  pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500";
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					type="text"
					name={id}
					id={id}
					className={error ? errorClass : peacefulClass}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? `${id}-error` : id}
				/>
				{error && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{error && (
				<p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
					Not a valid email address.
				</p>
			)}
		</div>
	);
}
