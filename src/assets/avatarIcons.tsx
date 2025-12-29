import { SVGProps } from "react";

export function VerifiedIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="#888888"
				className="fill-green-500"
				d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12z"
			/>
		</svg>
	);
}

export function NotVerifiedIcons(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="#888888"
				className="fill-ws-primary-500"
				d="m12 22l-.25-3h-.25q-3.55 0-6.025-2.475T3 10.5t2.475-6.025T11.5 2q1.775 0 3.313.662t2.7 1.825t1.824 2.7T20 10.5q0 1.875-.612 3.6t-1.676 3.2t-2.525 2.675T12 22m-.525-6.025q.425 0 .725-.3t.3-.725t-.3-.725t-.725-.3t-.725.3t-.3.725t.3.725t.725.3M10.75 12.8h1.5q0-.75.15-1.05t.95-1.1q.45-.45.75-.975t.3-1.125q0-1.275-.862-1.913T11.5 6q-1.1 0-1.85.613T8.6 8.1l1.4.55q.125-.425.475-.837T11.5 7.4t1.013.375t.337.825q0 .425-.25.763t-.6.687q-.875.75-1.062 1.188T10.75 12.8"
			/>
		</svg>
	);
}
