import GasIcon from "@/components/ui/icons/gasicon";
import ElectricityIcon from "@/components/ui/icons/electricityicon";
import { ReactNode } from "react";
export type Account = {
	account: string;
	name: string;
	amount: number;
	icon: string | ReactNode;
	due: string;
	period: string;
	address: string;
};

const DemoAccounts: Array<Account> = [
	{
		name: "Electricity",
		amount: 374.48,
		due: "11 Aug 2023",
		period: "29 Apr 2023 to 28 Jul 2023 (91 days)",
		address: "123 George STREET, SYDNEY NSW 2000",
		account: "123456789",
		icon: <ElectricityIcon />,
	},
];

export { DemoAccounts };
