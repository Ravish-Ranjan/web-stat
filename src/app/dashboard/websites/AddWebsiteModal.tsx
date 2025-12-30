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
import { addWebsite } from "./actions";
import { Loader2Icon } from "@/assets/sonner";
import { toast } from "sonner";

const initialState: {
	message: string;
	descriptioon?: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
} = {
	message: "",
	success: false,
};

interface AddWebsiteModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function AddWebsiteModal({ open = false, setOpen }: AddWebsiteModalProps) {
	const [form, setForm] = useState<{
		url: string;
		name?: string;
		description?: string;
	}>({ url: "", name: "", description: "" });
	const [state, formAction, isPending] = useActionState(
		addWebsite,
		initialState
	);
	const formRef = useRef<HTMLFormElement>(null);

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
					<CardTitle>Add new website</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent>
					<form
						id="add-website-form"
						action={formAction}
						ref={formRef}
						className="grid gap-2"
					>
						<button
							type="submit"
							className="hidden"
							aria-hidden="true"
						/>
						<Label className="grid ">
							Url *
							<Input
								required
								name="url"
								type="url"
								placeholder="Enter website's Url"
								value={form.url}
								autoComplete="off"
								onChange={(e) => {
									setForm({ ...form, url: e.target.value });
								}}
							/>
						</Label>
						<Label className="grid ">
							Name
							<Input
								name="name"
								type="text"
								placeholder="Enter website's name"
								value={form.name}
								autoComplete="off"
								onChange={(e) => {
									setForm({ ...form, name: e.target.value });
								}}
							/>
						</Label>
						<Label className="grid ">
							Description
							<Input
								name="description"
								type="text"
								placeholder="Enter website's description"
								value={form.description}
								autoComplete="off"
								onChange={(e) => {
									setForm({
										...form,
										description: e.target.value,
									});
								}}
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
						form="add-website-form"
						disabled={isPending}
						variant={"primary"}
						onClick={() => formRef.current?.requestSubmit()}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Add Website"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default AddWebsiteModal;
