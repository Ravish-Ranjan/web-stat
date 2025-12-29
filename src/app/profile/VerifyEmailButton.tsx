"use client";

import { Loader2Icon } from "@/assets/sonner";
import Button from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface VerifyEmailButtonProps {
	user: {
		id: string;
		isVerified: boolean;
	} & {
		name?: string | null | undefined;
		email?: string | null | undefined;
		image?: string | null | undefined;
	};
}

function VerifyEmailButton({ user }: VerifyEmailButtonProps) {
	const [pending, setPending] = useState(false);

	const handleSendVerifyEmailMail = async () => {
		setPending(true);
		try {
			const res = await fetch("/api/verifyemail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user.id }),
			});
			const data = await res.json();

			if (!res.ok) {
				toast.error(
					data.error || "Error sending email verification mail"
				);
				return;
			}

			toast.success(
				data.message ||
					"Verification mail sent successfully to your email-id"
			);
		} catch {
			toast.error("An error occured. Please try again.");
		} finally {
			setPending(false);
		}
	};
	return (
		<>
			{!user.isVerified && (
				<Button
					variant={"primary"}
					className="ml-auto"
					disabled={pending}
					onClick={handleSendVerifyEmailMail}
				>
					{pending ? (
						<Loader2Icon className="animate-spin" />
					) : (
						"Verify your email"
					)}
				</Button>
			)}
		</>
	);
}

export default VerifyEmailButton;
