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
} from "react";
import { editWebsite } from "./actions";
import { Loader2Icon } from "@/assets/sonner";
import { toast } from "sonner";
import StyledUrl from "@/components/StyledUrl";
import { Small } from "@/components/Typography";

const initialState: {
	message: string;
	success: boolean;
	description?: string;
	errors?: Record<string, string[]> | undefined;
} = {
	message: "",
	success: false,
};

interface EditWebsiteModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	websiteData: WebsiteType;
}

function EditWebsiteModal({
	open = false,
	setOpen,
	websiteData,
}: EditWebsiteModalProps) {
	const [state, formAction, isPending] = useActionState(
		editWebsite.bind(null, websiteData.id),
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
		state.message,
		state.errors,
		state.success,
		state.description,
	]);

	return (
		<ModalWrapper open={open}>
			<Card className="w-sm sm:w-md">
				<CardHeader className="flex justify-between items-center">
					<CardTitle>Edit website</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Small className="flex gap-2">
						URL :{" "}
						<StyledUrl url={websiteData.url} showIcon={false} />
					</Small>
					<form
						id="edit-website-form"
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
							Name
							<Input
								name="name"
								type="text"
								placeholder="Edit website's name"
								defaultValue={websiteData.name}
								autoComplete="off"
							/>
						</Label>
						<Label className="grid ">
							Description
							<Input
								name="description"
								type="text"
								placeholder="Edit website's description"
								defaultValue={websiteData.description}
								autoComplete="off"
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
						form="edit-website-form"
						disabled={isPending}
						variant={"primary"}
						onClick={() => formRef.current?.requestSubmit()}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Edit Website"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default EditWebsiteModal;
