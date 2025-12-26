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
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useActionState,
	useEffect,
	useRef,
	useState,
} from "react";
import { deleteWebsite } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Small } from "@/components/Typography";

const initialState: {
	message: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
} = {
	message: "",
	success: false,
};

interface DeleteWebsiteModalProps {
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	websiteId: string;
	url: ReactNode;
}

function DeleteWebsiteModal({
	open = false,
	setOpen,
	websiteId,
	url,
}: DeleteWebsiteModalProps) {
	const [text, setText] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(
		deleteWebsite.bind(null, websiteId),
		initialState
	);

	useEffect(() => {
		if (state.message) {
			if (state.success) {
				toast.success(state.message);
				formRef.current?.reset();
				setOpen(false);
			} else {
				toast.error(state.message);
				if (state.errors) {
					Object.entries(state.errors).forEach(
						([field, messages]) => {
							if (messages && messages.length > 0) {
								toast.error(messages[0], {
									id: field,
								});
							}
						}
					);
				}
			}
		}
	}, [state, setOpen]);
	return (
		<ModalWrapper open={open}>
			<Card className="w-sm sm:w-md">
				<CardHeader className="flex justify-between items-center">
					<CardTitle>Delete website</CardTitle>
					<Button size={"icon"} onClick={() => setOpen(false)}>
						<Close />
					</Button>
				</CardHeader>
				<CardContent>
					<form
						action={formAction}
						id="delete-website-form"
						ref={formRef}
					>
						<Label className="grid">
							<Small className="flex gap-2">URL : {url}</Small>
							<span>
								Enter &quot;
								<span className="text-red-500">
									Delete this website
								</span>
								&quot; below *
							</span>
							<Input
								type="text"
								name="text"
								placeholder="Enter text given above"
								required
								value={text}
								onChange={(e) => setText(e.target.value)}
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
						form="delete-website-form"
						disabled={isPending || text !== "Delete this website"}
						variant={"primary"}
						className="w-max"
					>
						{isPending ? (
							<Loader2Icon className="animate-spin" />
						) : (
							"Delete Website"
						)}
					</Button>
				</CardFooter>
			</Card>
		</ModalWrapper>
	);
}

export default DeleteWebsiteModal;
