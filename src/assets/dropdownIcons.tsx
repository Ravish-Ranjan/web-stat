import { SVGProps } from "react";

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
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
				d="M20 6L9 17l-5-5"
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

export function CircleIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}
