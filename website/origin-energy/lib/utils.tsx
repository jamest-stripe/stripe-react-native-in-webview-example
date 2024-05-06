export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function prettyPrintJson(
	json: object,
	indent: number = 2,
	depth: number = 1
): string {
	if (json) {
		const keys = Object.keys(json);
		const array = Array.isArray(json);
		return (
			(array ? `[\n` : `{\n`) +
			keys
				.map((key) => {
					const value = json[key as keyof typeof json];
					if (value && !isEmpty(value))
						return (
							" ".repeat(indent * depth) +
							(array
								? ""
								: (key[0] === "." ? `"` : "") +
								  `${key}` +
								  (key[0] === "." ? `": ` : ": ")) +
							(typeof value === "object"
								? prettyPrintJson(value, indent, depth + 1)
								: `"${value}",\n`)
						);
				})
				.join("") +
			" ".repeat(indent * (depth - 1)) +
			(Array.isArray(json) ? `]` : `}`) +
			(depth > 1 ? "\n" : "")
		);
	} else {
		return "";
	}
}

function isEmpty(obj: object): boolean {
	let empty = true;
	if (obj && typeof obj === "object") {
		const keys = Object.keys(obj);
		empty = keys.every((key) => {
			const value = obj[key as keyof typeof obj];
			if (typeof value === "object") {
				return isEmpty(value);
			} else if (!value) {
				return false;
			}
		});
	} else {
		empty = obj ? false : true;
	}
	return empty;
}

export function capitalize(name: string) {
	if (name === "rfa") return "RFA";
	else return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getHostname() {
	const env = process.env.NODE_ENV;
	if (env === "development" || !env) {
		return "http://localhost:3000";
	} else {
		return process.env.NEXT_PUBLIC_HOSTNAME;
	}
}
