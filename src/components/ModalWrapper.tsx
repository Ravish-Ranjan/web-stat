import clsx from "clsx";
import { ReactNode } from "react";

interface ModalWrapperProps {
	children: ReactNode;
	open: boolean;
}

function ModalWrapper({ open, children }: ModalWrapperProps) {
	return (
		<div
			className={clsx(
				"absolute h-full w-full top-0 left-0 place-items-center z-50 bg-black/50",
				open ? "grid" : "hidden"
			)}
			aria-modal="true"
			role="dialog"
		>
			{children}
		</div>
	);
}

export default ModalWrapper;
