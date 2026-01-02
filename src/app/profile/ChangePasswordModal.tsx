"use client";

import { Close } from "@/assets/misc";
import ModalWrapper from "@/components/ModalWrapper";
import Button from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";

interface ChangePasswordModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function ChangePasswordModal({
	open = false,
	setOpen,
}: ChangePasswordModalProps) {
	return (
		<ModalWrapper open={open}>
			<Card className="w-sm sm:w-md">
				<CardHeader className="flex justify-between items-center">
					<CardTitle>Change Password</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter className="flex gap-2"></CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default ChangePasswordModal;
