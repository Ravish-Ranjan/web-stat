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
import { deleteUser } from "@/app/profile/actions";
import { toast } from "sonner";
import { Small } from "@/components/Typography";

interface DeleteUserModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState: {
	message: string;
	success: boolean;
	description?: string;
	errors?: Record<string, string[]> | undefined;
} = {
	message: "",
	success: false,
};

function DeleteUserModal({ open = false, setOpen }: DeleteUserModalProps) {
	const [text, setText] = useState("");
	const [hardDelete, setHardDelete] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(
		deleteUser,
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
					<CardTitle>Delete My Account</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent>
					<form
						ref={formRef}
						className="grid gap-2"
						id="delete-user-form"
						action={formAction}
					>
						<button
							type="submit"
							className="hidden"
							aria-hidden="true"
							disabled={isPending || text !== "delete my account"}
						/>
						<Label className="grid">
							<Small className="flex items-center">
								Enter &quot;
								<span className="text-red-500">
									delete my account
								</span>
								&quot; below
							</Small>
							<Input
								name="text"
								type="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Enter text given above"
								required
								autoComplete="off"
							/>
						</Label>
						<Label>
							<Input
								type="checkbox"
								name="hard-delete"
								className="size-4 accent-ws-primary-500"
								checked={hardDelete}
								onChange={() => setHardDelete((prev) => !prev)}
							/>
							<Small>
								Permanently delete all data (Hard Delete)
							</Small>
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
						form="delete-website-form"
						disabled={isPending || text !== "delete my account"}
						variant={"primary"}
						className="w-max"
						onClick={() => formRef.current?.requestSubmit()}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Delete Account"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default DeleteUserModal;
