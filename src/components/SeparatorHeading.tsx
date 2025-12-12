import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Small } from "./Typography";
import clsx from "clsx";

interface SeparatorHeadingProps {
	children: ReactNode;
	className?: string;
}
function SeparatorHeading({ children, className }: SeparatorHeadingProps) {
	return (
		<div className="relative grid place-items-center mb-2">
			<Separator />
			<Small
				className={clsx(
					"absolute top-1/2 left-1/2 -translate-1/2 bg-inherit p-1",
					className
				)}
			>
				{children}
			</Small>
		</div>
	);
}

export default SeparatorHeading;
