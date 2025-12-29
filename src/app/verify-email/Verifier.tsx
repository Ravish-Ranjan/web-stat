import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Verifier() {
	const router = useRouter();
	const params = useSearchParams();
	const { data: session, status } = useSession();
	const [pending, setPending] = useState(true);

	const token = params.get("token");
	const email = params.get("email");

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				setPending(true);
				const res = await fetch("/api/verifyemail", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token, email }),
				});
				const data = await res.json();
				if (!res.ok) {
					toast.error(data.error || "Error verifying mail");
					router.push("/profile");
					return;
				}
				toast.success(data.message || "Email verified successfuly");
				router.push("/dashboard");
			} catch {
				toast.error("An error occured. Please try again.");
			} finally {
				setPending(false);
			}
		};
		if (session?.user.email !== email) {
			toast.error("Unauthorized");
			router.push("/profile");
			return;
		}
		verifyEmail();
	}, [email, token, router, session?.user.email]);

	if (status === "unauthenticated") {
		router.push("/authenticate");
		return;
	}
	if (status === "loading" || pending) {
		<div>Loading...</div>;
	}

	return <></>;
}
export default Verifier;
