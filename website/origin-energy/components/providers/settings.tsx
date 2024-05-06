import { SettingsState, SettingsStateUpdate, Dispatch } from "./types";
import { createContext, useContext, useReducer } from "react";

export const initialState: SettingsState = {
	showPanel: false,
	elements: {
		theme: "stripe",
		paymentElement: {
			enabled: true,
			layout: "accordion" as const,
			showRadios: true,
			defaultCollapsed: false,
			spacedAccordionItems: false,
		},
		linkAuthenticationElement: {
			enabled: false,
		},
		expressCheckoutElement: {
			enabled: false,
			overflow: "auto" as const,
			maxColumns: 0,
			maxRows: 0,
			applePay: {
				show: "auto",
				theme: "black",
				buttonType: "plain",
			},
			googlePay: {
				show: "auto",
				theme: "black",
				buttonType: "pay",
			},
		},
		addressElement: {
			enabled: false,
			useContacts: false,
			addressMode: "shipping" as const,
			collectPhone: true,
		},
		showBorders: false,
	},
	payment: {
		currency: "aud",
		amount: 3499,
		adjustedAmount: 3499,
		surcharge: true,
		visaSurcharge: 1.5,
		mcSurcharge: 1.5,
		amexSurcharge: 2.5,
	},
	customer: {
		enabled: false,
	},
	adblock: true,
};

const SettingsContext = createContext<
	| {
			state: SettingsState;
			dispatch: Dispatch;
			showPanel: (val: boolean) => void;
	  }
	| undefined
>(undefined);

function deepMerge(...objs: any[]) {
	function getType(obj: any) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	function mergeObj(clone: any, obj: any) {
		for (let [key, value] of Object.entries(obj)) {
			let type = getType(value);
			if (
				clone[key] !== undefined &&
				getType(clone[key]) === type &&
				["array", "object"].includes(type)
			) {
				clone[key] = deepMerge(clone[key], value);
			} else {
				clone[key] = structuredClone(value);
			}
		}
	}

	let clone = structuredClone(objs.shift());
	for (let obj of objs) {
		let type = getType(obj);
		if (getType(clone) !== type) {
			clone = structuredClone(obj);
			continue;
		}
		if (type === "array") {
			clone = [...clone, ...structuredClone(obj)];
		} else if (type === "object") {
			mergeObj(clone, obj);
		} else {
			clone = obj;
		}
	}
	return clone;
}

function settingsReducer(state: SettingsState, update: SettingsStateUpdate) {
	const newState = deepMerge(state, update);
	return newState as SettingsState;
}

export function useSettings() {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}
	return context;
}

export default function SettingsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const showPanel = (val: boolean) => dispatch({ showPanel: val });
	const value = { state, dispatch, showPanel };
	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
}
