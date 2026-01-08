"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/ui/button";

function SignOutButton() {
	return (
		<Button
			variant={"destructive"}
            className="w-full"
            size={"sm"}
			onClick={() => signOut({ callbackUrl: "/authenticate" })}
		>
			Logout
		</Button>
	);
}

export default SignOutButton;
