"use client";
import { SessionProvider } from "next-auth/react";
import Verifier from "./Verifier";

function page() {
	return (
		<SessionProvider>
			<Verifier />
		</SessionProvider>
	);
}

export default page;
