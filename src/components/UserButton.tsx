import { getServerSession } from "next-auth";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Small } from "./Typography";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DashboardIcon, ProfileIcon } from "@/assets/misc";
import clsx from "clsx";
import prisma from "@/lib/prisma";

async function UserButton({
	className,
	hide,
	variant,
	textClass,
	avatarClass,
	avatarSize,
}: {
	className?: string;
	textClass?: string;
	avatarClass?: string;
	avatarSize?: number;
	hide?: { dashboard?: boolean; profile?: boolean; logout?: boolean };
	variant?:
		| "base"
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "primary"
		| "ghost"
		| null
		| undefined;
}) {
	const sesssion = await getServerSession();
	if (!sesssion) return <></>;

	const getAvatarName = (name: string) => {
		const parts = name.split(" ");
		if (parts.length == 1) return `${parts[0].substring(0, 2)}`;
		if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
		return "U";
	};
	const dbUser = await prisma.user.findFirst({
		where: { id: sesssion.user.id },
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={variant || "outline"}
					className={clsx("px-2 flex gap-1 items-center", className)}
				>
					{sesssion.user.image ? (
						<Image
							alt=""
							src={sesssion?.user.image}
							height={avatarSize || 28}
							width={avatarSize || 28}
							className="rounded-full"
						/>
					) : (
						<Avatar className={clsx("size-7", avatarClass)}>
							<AvatarFallback className="bg-ws-secondary-400 dark:bg-ws-secondary-600 text-white">
								{getAvatarName(
									dbUser?.name
										? dbUser?.name
										: dbUser?.email || ""
								)}
							</AvatarFallback>
						</Avatar>
					)}
					<Small className={clsx("hidden sm:flex",textClass)}>
						{dbUser?.name
							? dbUser?.name
									?.split(" ")
									.splice(0, 2)
									.join(" ")
							: dbUser?.email.substring(0, 15) +
							  ((dbUser?.email.length ?? 0) > 15
									? "..."
									: "")}
					</Small>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full">
				{!hide?.dashboard && (
					<DropdownMenuItem>
						<Link
							href={"/dashboard"}
							className="w-full flex items-center gap-1"
						>
							<DashboardIcon className="size-5" />
							Dashboard
						</Link>
					</DropdownMenuItem>
				)}
				{!hide?.profile && (
					<DropdownMenuItem>
						<Link
							href={"/profile"}
							className="w-full flex items-center gap-1"
						>
							<ProfileIcon className="size-5" />
							Profile
						</Link>
					</DropdownMenuItem>
				)}
				{(!hide?.dashboard || !hide.profile) && !hide?.logout && (
					<DropdownMenuSeparator />
				)}
				{!hide?.logout && (
					<DropdownMenuItem>
						<SignOutButton />
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserButton;
