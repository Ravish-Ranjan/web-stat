import Topbar from "@/components/Topbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadata } from "../layout";
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
	const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
	return (
		<>
			{/* topbar */}
			<Topbar links={[{ label: "Dashboard", path: "/dashboard" }]} />
			{/* main page */}
			<div className="w-full grid place-items-center">
				{/* use island */}
				<section className="p-6 grid place-items-center md:flex gap-6 justify-center md:justify-start items-center rounded-2xl bg-ws-accent-200 dark:bg-ws-base-500 w-11/12 max-w-4xl shadow-2xl">
					<div className="relative grid">
						<UserAvatar
							size={150}
							className={clsx(
								"outline-4 outline-offset-4 size-37.5 text-3xl",
								dbUser?.isVerified
									? "outline-green-500"
									: "outline-ws-primary-500"
							)}
						/>
						{dbUser?.isVerified ? (
							<VerifiedIcon className="size-8 absolute bottom-1 right-1" />
						) : (
							<NotVerifiedIcons className="size-8 absolute bottom-1 right-1" />
						)}
					</div>
					<div className="grid w-full justify-items-center md:justify-items-start">
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
					<VerifyEmailButton user={dbUser} />
				</section>
				{/* user management section */}
				<main>
					{/* TODO : update user section */}
					{/* TODO : delete user button */}
				</main>
			</div>
		</>
	);
}

export default page;
