import { SVGProps } from "react";

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m15 18l-6-6l6-6"
			/>
		</svg>
	);
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m9 18l6-6l-6-6"
			/>
		</svg>
	);
}

export function ChevronFirstIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m17 18l-6-6l6-6M7 6v12"
			/>
		</svg>
	);
}

export function ChevronLastIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m7 18l6-6l-6-6m10 0v12"
			/>
		</svg>
	);
}
