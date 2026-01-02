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

interface UpdateUserModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function UpdateUserModal({ open = false, setOpen }: UpdateUserModalProps) {
	return (
		<ModalWrapper open={open}>
			<Card className="w-sm sm:w-md">
				<CardHeader className="flex justify-between items-center">
					<CardTitle>Update My Information</CardTitle>
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

export default UpdateUserModal;
