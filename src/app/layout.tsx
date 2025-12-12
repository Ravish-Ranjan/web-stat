import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";

export const metadata: Metadata = {
	title: "Web Stats",
	description: "Website to check status of you websites",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
					<div className="bg-ws-accent-500 dark:bg-ws-base-700 min-h-dvh w-full">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
