import type { Metadata } from "next";
import "@/app/globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import ToastConfigured from "@/components/ToastConfigured";

export const metadata: Metadata = {
	title: "WebStats",
	description: "Website to check status of you websites",
	icons: "/assets/icons/logo.svg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-dvh">
				<ThemeProvider>
					<div className="bg-ws-accent-500 dark:bg-ws-base-700 min-h-dvh w-full">
						{children}
					</div>
					<ToastConfigured />
				</ThemeProvider>
			</body>
		</html>
	);
}
