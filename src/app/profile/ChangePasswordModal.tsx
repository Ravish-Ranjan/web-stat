"use client";

import { Eye, EyeClosed } from "@/assets/inputicons";
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
import { toast } from "sonner";
import { changePassword } from "@/app/profile/actions";

interface ChangePasswordModalProps {
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

function ChangePasswordModal({
	open = false,
	setOpen,
}: ChangePasswordModalProps) {
	const [form, setForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [passwordVisible, setPasswordVisible] = useState({
		currentPassword: false,
		newPassword: false,
	});
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(
		changePassword,
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
					<CardTitle>Change Password</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent>
					<form
						id="change-password-form"
						ref={formRef}
						action={formAction}
						className="grid gap-2"
					>
						<Label className="grid">
							Current Password *
							<div className="flex gap-1">
								<Input
									type={
										passwordVisible.currentPassword
											? "text"
											: "password"
									}
									required
									placeholder="Enter your password"
									value={form.currentPassword}
									className="text-sm md:text-md"
									name="current-password"
									autoComplete="current-password"
									onChange={(e) =>
										setForm({
											...form,
											currentPassword: e.target.value,
										})
									}
								/>
								<Button
									variant={"outline"}
									onClick={() =>
										setPasswordVisible((prev) => ({
											...passwordVisible,
											currentPassword:
												!prev.currentPassword,
										}))
									}
									type="button"
								>
									{passwordVisible.currentPassword ? (
										<Eye />
									) : (
										<EyeClosed />
									)}
								</Button>
							</div>
						</Label>
						<Label className="grid">
							New Password *
							<div className="flex gap-1">
								<Input
									type={
										passwordVisible.newPassword
											? "text"
											: "password"
									}
									required
									placeholder="Enter your password"
									value={form.newPassword}
									className="text-sm md:text-md"
									name="new-password"
									autoComplete="new-password"
									onChange={(e) =>
										setForm({
											...form,
											newPassword: e.target.value,
										})
									}
								/>
								<Button
									variant={"outline"}
									onClick={() =>
										setPasswordVisible((prev) => ({
											...passwordVisible,
											newPassword: !prev.newPassword,
										}))
									}
									type="button"
								>
									{passwordVisible.newPassword ? (
										<Eye />
									) : (
										<EyeClosed />
									)}
								</Button>
							</div>
						</Label>
						<Label className="grid">
							Re-enter Password *
							<Input
								type={"text"}
								required
								placeholder="Re-enter your password"
								value={form.confirmPassword}
								className="text-sm md:text-md"
								name="confirm-password"
								autoComplete="new-password"
								onChange={(e) =>
									setForm({
										...form,
										confirmPassword: e.target.value,
									})
								}
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
						form="change-password-form"
						disabled={isPending}
						variant={"primary"}
						className="w-max"
						onClick={() => formRef.current?.requestSubmit()}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Change Password"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default ChangePasswordModal;
