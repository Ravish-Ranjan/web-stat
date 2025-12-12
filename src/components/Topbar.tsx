import Link from "next/link";
import { H4 } from "@/components/Typography";
import Button from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getServerSession } from "next-auth";
import UserButton from "./UserButton";
import {} from "next/navigation";

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
}

async function Topbar({ hide }: TopbarProps) {
	const session = await getServerSession();

	let links: { label: string; path: string }[] = [
		{ label: "Dashboard", path: "/dashboard" },
		{ label: "Profile", path: "/profile" },
	];

	const applyLinksAuthFilter = () => {
		const filterLabelKeys: string[] = ["Dashboard", "Profile"];
		links = links.filter((link) => !filterLabelKeys.includes(link.label));
	};

	if (!session) applyLinksAuthFilter();

	return (
		<div className="flex h-10 items-center justify-between p-2 gap-2">
			{!hide?.leftSection && (
				<div className="flex gap-2 px-4">
					{/* logo */}
					{!hide?.logo && (
						<Link href={"/"}>
							<H4>Web Stat</H4>
						</Link>
					)}
					{/* links */}
					{!hide?.links && (
						<ul className="flex gap-1 items-center px-0 md:px-4">
							{links.map((link, i) => {
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
			{!hide?.rightSection && (
				<div className="flex gap-2">
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
