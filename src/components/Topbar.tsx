import Link from "next/link";
import { H4 } from "@/components/Typography";
import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getServerSession } from "next-auth";
import UserButton from "./UserButton";
import {} from "next/navigation";
import { ReactNode } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HamburgerIcon } from "@/assets/misc";

interface TopbarProps {
	hide?: {
		logo?: boolean;
		links?: boolean;
		loginRegister?: boolean;
		themeToggle?: boolean;
		leftSection?: boolean;
		rightSection?: boolean;
		userbutton?: boolean;
	};
	children?: ReactNode;
	links?:{ label: string; path: string }[]
}

async function Topbar({ hide, children,links }: TopbarProps) {
	const session = await getServerSession();

	const applyLinksAuthFilter = () => {
		const filterLabelKeys: string[] = ["Dashboard", "Profile"];
		links = links?.filter((link) => !filterLabelKeys.includes(link.label));
	};

	if (!session) applyLinksAuthFilter();

	return (
		<div className="flex h-12 items-center justify-between p-2 gap-2">
			{!hide?.leftSection && (
				<div className="flex gap-2 px-0 md:px-4 items-center">
					{/* logo */}
					{!hide?.links && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="grid md:hidden">
								<Button variant={"outline"}>
									<HamburgerIcon className="stroke-ws-primary-700 dark:stroke-white" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{links?.map((link, i) => (
									<DropdownMenuItem key={i}>
										<Link href={link.path}>
											{link.label}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					{!hide?.logo && (
						<Link href={"/"}>
							<H4>WebStat</H4>
						</Link>
					)}
					{/* links */}
					{!hide?.links && (
						<ul className="hidden md:flex gap-1 items-center px-0 md:px-4">
							{links?.map((link, i) => {
								return (
									<Link key={i} href={link.path}>
										<Button
											variant={"link"}
											size={"sm"}
											className="px-1"
										>
											{link.label}
										</Button>
									</Link>
								);
							})}
						</ul>
					)}
				</div>
			)}
			{children}
			{!hide?.rightSection && (
				<div className="flex gap-2 items-center">
					{/* Login/Register Button */}
					{!hide?.loginRegister && !session && (
						<Link href="/authenticate">
							<Button variant={"base"} className="pt-0.5">
								Login/Register
							</Button>
						</Link>
					)}
					{/* user button */}
					{!hide?.userbutton && session && <UserButton />}
					{/* theme toggle */}
					{!hide?.themeToggle && <ThemeToggle />}
				</div>
			)}
		</div>
	);
}

export default Topbar;
