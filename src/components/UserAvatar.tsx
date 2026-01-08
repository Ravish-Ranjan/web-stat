"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import clsx from "clsx";

const getAvatarName = (name: string) => {
	const parts = name.split(" ");
	if (parts.length == 1) return `${parts[0].substring(0, 2)}`;
	if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
	return "U";
};

async function UserAvatar({
	className,
	size,
}: {
	className?: string;
	size: number;
}) {
	const session = await getServerSession(authOptions);
	return (
		<>
			{session?.user.image ? (
				<Image
					alt=""
					src={session?.user.image}
					height={size}
					width={size}
					className={clsx("rounded-full", className)}
				/>
			) : (
				<Avatar className={clsx("size-7", className)}>
					<AvatarFallback className="bg-ws-secondary-400 dark:bg-ws-secondary-600 text-white">
						{getAvatarName(
							session?.user.name
								? session?.user.name
								: session?.user.email || ""
						)}
					</AvatarFallback>
				</Avatar>
			)}
		</>
	);
}

export default UserAvatar;
