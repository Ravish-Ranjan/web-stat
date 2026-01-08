"use client";

import { Close } from "@/assets/misc";
import { Loader2Icon } from "@/assets/sonner";
import ModalWrapper from "@/components/ModalWrapper";
import Button from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dispatch,
	SetStateAction,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { updateName } from "@/app/profile/actions";
import { toast } from "sonner";

const initialState: {
	message: string;
	success: boolean;
	description?: string;
	errors?: Record<string, string[]> | undefined;
} = {
	message: "",
	success: false,
};

interface UpdateNameModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	oldName?: string | null;
}

function UpdateNameModal({
	open = false,
	setOpen,
	oldName,
}: UpdateNameModalProps) {
	const [name, setName] = useState(oldName || "");
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(
		updateName,
		initialState
	);

	useEffect(() => {
		if (state.message) {
			if (state.success) {
				toast.success(
					state.message,
					state.description ? { description: state.description } : {}
				);
				formRef.current?.reset();
				setOpen(false);
			} else {
				toast.error(
					state.message,
					state.description ? { description: state.description } : {}
				);
				if (state.errors) {
					Object.entries(state.errors).forEach(
						([field, messages]) => {
							if (messages && messages.length > 0) {
								toast.error(messages[0], {
									id: field,
									description: state.description ?? "",
								});
							}
						}
					);
				}
			}
		}
	}, [
		setOpen,
		state.errors,
		state.message,
		state.success,
		state.description,
	]);
	return (
		<ModalWrapper open={open}>
			<Card className="w-sm sm:w-md">
				<CardHeader className="flex justify-between items-center">
					<CardTitle>Update name</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent>
					<form
						id="update-name-form"
						action={formAction}
						ref={formRef}
						className="grid"
					>
						<Label className="grid">
							Name
							<Input
								name="name"
								type="text"
								placeholder="Change your name"
								autoComplete="off"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Label>
					</form>
				</CardContent>
				<CardFooter className="flex gap-2">
					<Button
						onClick={() => setOpen(false)}
						variant={"destructive"}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="update-name-form"
						disabled={isPending}
						variant={"primary"}
						className="w-max"
						onClick={() => formRef.current?.requestSubmit()}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Update Name"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default UpdateNameModal;
