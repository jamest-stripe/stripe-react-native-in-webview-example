"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, Fragment } from "react";
import { ChevronRightIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { capitalize } from "@/lib/utils";
import SettingsProvider from "@/components/providers/settings";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [hideNav, setHideNav] = useState(false);

	const toggle = () => {
		console.log("toggle");
		setHideNav(!hideNav);
	};

	return (
		<html lang="en" className="light">
			<head>
				<script async src="https://js.stripe.com/v3/"></script>
			</head>

			<body className={`${inter.className} bg-white`}>
				{hideNav && (
					<Bars3Icon
						className="fixed top-7 left-5 text-black cursor-pointer w-10 h-10 font-bold hover:drop-shadow-md z-10"
						onClick={toggle}
					/>
				)}
				{!hideNav && <Navbar toggle={toggle} />}
				<SettingsProvider>{children}</SettingsProvider>
			</body>
		</html>
	);
}

export function Breadcrumb({ path }: { path: string[] }) {
	const prevPage = path[path.length - 1];
	return (
		<Link href={`/${path.join("/")}`}>
			<div className="hover:text-gray-600">{capitalize(prevPage)}</div>
		</Link>
	);
}

export function Navbar({ toggle }: { toggle: () => void }) {
	const path = usePathname().split("/");
	const breadcrumbs = path.slice(1, -1);
	return (
		<nav className="h-24 border-b border-b-gray">
			<div className="flex items-center justify-between max-w-7xl m-auto py-2 px-4 2xl:px-0 h-full">
				<div className="h-full flex gap-8 items-center">
					{/* <Link href="/">
						<Image
							src="/g210.png"
							width={70}
							height={70}
							alt="Origin Energy Logo"
						/>
					</Link> */}
					<div className="flex items-center gap-2 text-gray-500">
						{breadcrumbs.map((segment, i) => (
							<Fragment key={segment}>
								<Breadcrumb path={breadcrumbs.slice(0, i + 1)} />
								{i !== breadcrumbs.length - 1 && (
									<ChevronRightIcon className="h-5 w-5" />
								)}
							</Fragment>
						))}
					</div>
				</div>
				<div className="flex items-center gap-8"></div>
			</div>
		</nav>
	);
}
