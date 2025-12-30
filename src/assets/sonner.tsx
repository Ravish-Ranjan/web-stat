import { SVGProps } from "react";

export function CircleCheckIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<g
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="m9 12l2 2l4-4" />
			</g>
		</svg>
	);
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<g
				fill="none"
				stroke="#888888"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M12 16v-4m0-4h.01" />
			</g>
		</svg>
	);
}

export function OctagonXIcon(props: SVGProps<SVGSVGElement>) {
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
				d="m15 9l-6 6m-6.414 1.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586zM9 9l6 6"
			/>
		</svg>
	);
}

export function TriangleAlertIcon(props: SVGProps<SVGSVGElement>) {
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
				d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"
			/>
		</svg>
	);
}

export function Loader2Icon(props: SVGProps<SVGSVGElement>) {
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
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M21 12a9 9 0 1 1-6.219-8.56"
			/>
		</svg>
	);
}
