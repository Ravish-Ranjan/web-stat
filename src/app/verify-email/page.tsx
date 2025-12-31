"use client";
import { SessionProvider } from "next-auth/react";
import Verifier from "./Verifier";
import { metadata } from "../layout";

metadata.title = "Verify Email | WebStat"

function page() {
	return (
		<SessionProvider>
			<Verifier />
		</SessionProvider>
	);
}

export default page;
