import Topbar from "@/components/Topbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadata } from "../layout";
import Link from "next/link";
import Button from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import clsx from "clsx";
import { authOptions } from "@/lib/auth";
import { NotVerifiedIcons, VerifiedIcon } from "@/assets/avatarIcons";
import { H3, Small } from "@/components/Typography";
import prisma from "@/lib/prisma";
import VerifyEmailButton from "./VerifyEmailButton";

metadata.title = "Profile | WebStat";

async function page() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/authenticate");
	}
	const user = session.user;
	user.isVerified = false;
	const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
	return (
		<>
			{/* topbar */}
			<Topbar hide={{ links: true }}>
				<div className="mr-auto">
					<Link href={"/dashboard"}>
						<Button variant={"link"} size={"sm"} className="px-1">
							Dashboard
						</Button>
					</Link>
					<Link href={"/"}>
						<Button variant={"link"} size={"sm"} className="px-1">
							Homepage
						</Button>
					</Link>
				</div>
			</Topbar>
			{/* main page */}
			<div className="w-full grid place-items-center">
				{/* use island */}
				<section className="p-6 flex gap-6 justify-start items-center rounded-2xl bg-ws-accent-200 dark:bg-ws-base-500 w-4xl max-w-11/12 shadow-2xl">
					<div className="relative ">
						<UserAvatar
							size={150}
							className={clsx(
								"outline-4 outline-offset-4",
								user.isVerified
									? "outline-green-500"
									: "outline-ws-primary-500"
							)}
						/>
						{user.isVerified ? (
							<VerifiedIcon className="size-8 absolute bottom-1 right-1" />
						) : (
							<NotVerifiedIcons className="size-8 absolute bottom-1 right-1" />
						)}
					</div>
					<div className="grid">
						<H3>{user.name || user.email}</H3>
						<Small className="flex gap-1 items-center text-md">
							Email :
							<span className="px-0.5 text-gray-700 dark:text-gray-400">
								{user.email}
							</span>
						</Small>
						<Small className="flex gap-1 items-center text-md">
							Member Since :
							<span className="px-0.5 text-gray-700 dark:text-gray-400">
								{dbUser?.createdAt.toDateString()}
							</span>
						</Small>
					</div>
					<VerifyEmailButton user={user} />
				</section>
				{/* user management section */}
				<main></main>
			</div>
		</>
	);
}

export default page;
