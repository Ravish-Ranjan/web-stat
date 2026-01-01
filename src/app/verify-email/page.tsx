"use client";
import { SessionProvider } from "next-auth/react";
import Verifier from "./Verifier";
import { Suspense } from "react";

function page() {
	return (
		<SessionProvider>
			<Suspense fallback={<div>Loading verification...</div>}>
				<Verifier />
			</Suspense>
		</SessionProvider>
	);
}

export default page;
