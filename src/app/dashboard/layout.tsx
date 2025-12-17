import ToastConfigured from "@/components/ToastConfigured";
import Topbar from "@/components/Topbar";
import { H3 } from "@/components/Typography";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import UserButton from "@/components/UserButton";
import ThemeProvider from "@/context/ThemeProvider";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { metadata } from "../layout";

metadata.title = "Dashboard | WebStats"

const sidebarItems: {
	groupLabel: string;
	links: {
		linkLabel: string;
		linkPath: string;
	}[];
}[] = [
	{
		groupLabel: "Go To",
		links: [
			{ linkLabel: "Homepage", linkPath: "/" },
			{ linkLabel: "Profile", linkPath: "/profile" },
		],
	},
	{
		groupLabel: "Monitoring",
		links: [
			{ linkLabel: "Overview", linkPath: "/dashboard" },
			{ linkLabel: "Websites", linkPath: "/dashboard/websites" },
			{ linkLabel: "Incidents", linkPath: "/dashboard/incidents" },
		],
	},
	{
		groupLabel: "Analytics",
		links: [
			{ linkLabel: "Uptime History", linkPath: "/dashboard/uptime" },
			{
				linkLabel: "Response Time",
				linkPath: "/dashboard/performance",
			},
		],
	},
];

function DashboardSidebar() {
	return (
		<Sidebar variant="floating">
			<SidebarHeader className="flex flex-row justify-start items-center gap-2">
				<Image
					src={"/assets/icons/logo.svg"}
					alt="logo"
					height={36}
					width={36}
				/>
				<H3>WebStat</H3>
			</SidebarHeader>
			<SidebarContent>
				{sidebarItems.map((group) => {
					return (
						<SidebarGroup key={`${group.groupLabel}-group`}>
							<SidebarGroupLabel>
								{group.groupLabel}
							</SidebarGroupLabel>
							<SidebarGroupContent className="bg-ws-accent-200 dark:bg-ws-base-400/30 rounded-lg">
								<SidebarMenu>
									{group.links.map((link) => {
										return (
											<SidebarMenuItem
												key={`${link.linkLabel}-${group.groupLabel}-link`}
											>
												<SidebarMenuButton asChild>
													<Link href={link.linkPath}>
														{link.linkLabel}
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					);
				})}
			</SidebarContent>
			<SidebarFooter>
				<UserButton
					className="flex-row-reverse justify-start gap-2 h-12"
					hide={{ dashboard: true, profile: true }}
					textClass="text-md"
					avatarClass="size-12 text-lg"
					avatarSize={32}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	if (!session) redirect("/authenticate");
	return (
		<ThemeProvider>
			<div className="bg-ws-accent-500 dark:bg-ws-base-700 min-h-dvh w-full">
				<SidebarProvider>
					<DashboardSidebar />
					<main className="w-full">
						<Topbar
							hide={{
								links: true,
								leftSection: true,
								userbutton: true,
							}}
						>
							<SidebarTrigger
								className="mr-auto h-full"
								variant={"outline"}
								size={"lg"}
							/>
						</Topbar>
						{children}
					</main>
				</SidebarProvider>
			</div>
			<ToastConfigured />
		</ThemeProvider>
	);
}
