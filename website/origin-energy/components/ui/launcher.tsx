"use client";
import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import {
	InformationCircleIcon,
	ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { ModalOverlay } from "./slideover";

const LinkGrid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mb-32 grid lg:mb-0 lg:grid-cols-3 lg:text-left auto-rows-fr justify-between gap-8 mt-8 min-h-[300px] items-stretch w-full max-w-7xl">
			{children}
		</div>
	);
};

const LinkTile = ({
	children,
	href,
	external,
	onClick,
	info,
}: {
	children: React.ReactNode;
	href: string;
	external?: boolean;
	onClick?: () => void;
	info?: JSX.Element | string;
}) => {
	const [helpMode, setHelpMode] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const handleKeyboard = ({
		repeat,
		metaKey,
		ctrlKey,
		key,
	}: {
		repeat: boolean;
		metaKey: boolean;
		ctrlKey: boolean;
		key: string;
	}) => {
		if (repeat) return;
		if ((metaKey || ctrlKey) && key === "i") {
			setHelpMode(!helpMode);
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyboard);
		return () => document.removeEventListener("keydown", handleKeyboard);
	});

	return (
		<div
			onClick={onClick}
			className="z-1 bg-white relative hover:scale-[101%] hover:drop-shadow-lg transition-all ease-in-out duration-100 rounded-md border border-gray-200"
		>
			{helpMode && info && (
				<InformationCircleIcon
					className="absolute -top-8 right-0 h-6 w-6 text-gray-500 cursor-pointer"
					onClick={() => setShowModal(true)}
				/>
			)}
			{external && (
				<ArrowTopRightOnSquareIcon className="absolute top-1 right-1 h-6 w-6 text-gray-500 cursor-pointer z-10" />
			)}
			<div
				className="bg-white overflow-hidden rounded-md h-full text-left
                before:absolute before:bottom-0 before:start-0 before:h-[70%] before:w-[70%] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] before:-z-50
                after:absolute after:bottom-0 after:start-0 after:h-[60%] after:w-[70%] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-paleblurple after:blur-2xl after:content-[''] after:-z-50
            "
			>
				<Link href={href} target={external ? "_blank" : ""}>
					<div>{children}</div>
				</Link>
			</div>
			<ModalOverlay open={showModal} setOpen={setShowModal}>
				<div className="w-screen max-w-2xl prose">{info}</div>
			</ModalOverlay>
		</div>
	);
};

export function Preview({
	src,
	style,
}: {
	src: StaticImageData;
	style?: React.CSSProperties;
}) {
	return (
		<div className="relative w-full overflow-hidden h-64 border-b border-paleblurple">
			<Image
				src={src}
				alt={`Preview for ${src}`}
				fill={true}
				sizes="33vw"
				style={
					style || {
						objectFit: "cover",
						objectPosition: "top center",
						imageRendering: "pixelated",
					}
				}
				priority
			/>
		</div>
	);
}

export function Icon({ src }: { src: string }) {
	return (
		<div className="flex w-full overflow-hidden justify-around h-64 border-b border-paleblurple">
			<Image
				src={src}
				alt={`Preview for ${src}`}
				width={100}
				height={100}
				quality={100}
			/>
		</div>
	);
}

export function Section({ children }: { children: React.ReactNode }) {
	return <div className="p-4">{children}</div>;
}

export function Heading({ children }: { children: React.ReactNode }) {
	return <div className="font-bold text-lg">{children}</div>;
}

export function Description({ children }: { children: React.ReactNode }) {
	return <div className="text-gray-500">{children}</div>;
}

export { LinkGrid, LinkTile };
