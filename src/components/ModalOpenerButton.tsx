"use client";
import Button from "@/components/ui/button";
import { Dispatch, ReactNode, SetStateAction } from "react";

function ModalOpenerButton({
	children,
	setOpen,
}: {
	children: ReactNode;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	return <Button variant={"primary"} onClick={() => setOpen(true)}>{children}</Button>;
}

export default ModalOpenerButton;
