import { PaymentMethod } from "@stripe/stripe-js";

export type appleThemeOptions = "black" | "white" | "white-outline";
export type googleThemeOptions = "black" | "white";
export type appleButtonOptions =
	| "add-money"
	| "book"
	| "buy"
	| "check-out"
	| "continue"
	| "contribute"
	| "donate"
	| "order"
	| "plain"
	| "reload"
	| "rent"
	| "subscribe"
	| "support"
	| "tip"
	| "top-up";
export type googleButtonOptions =
	| "book"
	| "buy"
	| "checkout"
	| "donate"
	| "order"
	| "pay"
	| "plain"
	| "subscribe";
export type walletShowOptions = "always" | "auto" | "never";
export type overflowOptions = "auto" | "never";

export type SettingsState = {
	showPanel: boolean;
	elements: {
		theme: string;
		paymentElement: {
			enabled: boolean;
			layout: "accordion" | "tabs";
			showRadios: boolean;
			defaultCollapsed: boolean;
			spacedAccordionItems: boolean;
		};
		linkAuthenticationElement: {
			enabled: boolean;
		};
		expressCheckoutElement: {
			enabled: boolean;
			overflow: "auto" | "never";
			maxColumns: number;
			maxRows: number;
			applePay: {
				show: walletShowOptions;
				buttonType: appleButtonOptions;
				theme: appleThemeOptions;
			};
			googlePay: {
				show: walletShowOptions;
				buttonType: googleButtonOptions;
				theme: googleThemeOptions;
			};
		};
		addressElement: {
			enabled: boolean;
			useContacts: boolean;
			addressMode: "shipping" | "billing";
			collectPhone: boolean;
		};
		showBorders: boolean;
	};
	payment: {
		currency: string;
		amount: number;
		adjustedAmount: number;
		surcharge: boolean;
		paymentMethod?: PaymentMethod;
		visaSurcharge: number;
		mcSurcharge: number;
		amexSurcharge: number;
	};
	customer: {
		enabled: boolean;
		id?: string;
		session?: string;
	};
	adblock: boolean;
};

export type SettingsStateUpdate = {
	showPanel?: boolean;
	elements?: {
		theme?: string;
		paymentElement?: {
			enabled?: boolean;
			layout?: "accordion" | "tabs";
			showRadios?: boolean;
			defaultCollapsed?: boolean;
			spacedAccordionItems?: boolean;
		};
		linkAuthenticationElement?: {
			enabled?: boolean;
		};
		expressCheckoutElement?: {
			enabled?: boolean;
			overflow?: "auto" | "never";
			maxColumns?: number;
			maxRows?: number;
			applePay?: {
				show?: walletShowOptions;
				buttonType?: appleButtonOptions;
				theme?: appleThemeOptions;
			};
			googlePay?: {
				show?: walletShowOptions;
				buttonType?: googleButtonOptions;
				theme?: googleThemeOptions;
			};
		};
		addressElement?: {
			enabled?: boolean;
			useContacts?: boolean;
			addressMode?: "shipping" | "billing";
			collectPhone?: boolean;
		};
		showBorders?: boolean;
	};
	payment?: {
		currency?: string;
		amount?: number;
		adjustedAmount?: number;
		surcharge?: boolean;
		paymentMethod?: PaymentMethod;
		visaSurcharge?: number;
		mcSurcharge?: number;
		amexSurcharge?: number;
	};
	customer?: {
		enabled?: boolean;
		id?: string;
		session?: string;
	};
	adblock?: boolean;
};

export type Dispatch = (update: SettingsStateUpdate) => void;
