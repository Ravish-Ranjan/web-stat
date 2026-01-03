import Topbar from "@/components/Topbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadata } from "../layout";
import UserAvatar from "@/components/UserAvatar";
import clsx from "clsx";
import { authOptions } from "@/lib/auth";
import { NotVerifiedIcons, VerifiedIcon } from "@/assets/avatarIcons";
import { H3, Large, Small } from "@/components/Typography";
import prisma from "@/lib/prisma";
import VerifyEmailButton from "./VerifyEmailButton";
import DeleteUserSection from "./DeleteUserSection";
import ChangePasswordSection from "./ChangePasswordSection";
import UpdateNameSection from "./UpdateNameSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileIcon } from "@/assets/misc";

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
			<div className="w-full grid place-items-center gap-4">
				{/* use island */}
				<Card className="w-11/12 max-w-4xl shadow-2xl">
					<CardContent className="grid place-items-center md:flex items-center gap-4">
						<div className="relative grid">
							<UserAvatar
								size={150}
								className={clsx(
									"outline-4 outline-offset-4 size-37.5 aspect-square text-3xl",
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
						<div className="grid justify-items-center md:justify-items-start">
							<H3>{dbUser?.name || user.email}</H3>
							<Small className="flex gap-1 items-center text-sm md:text-md">
								Email :
								<span className="px-0.5 text-gray-700 dark:text-gray-400">
									{user.email}
								</span>
							</Small>
							<Small className="flex gap-1 items-center text-sm md:text-md">
								Member Since :
								<span className="px-0.5 text-gray-700 dark:text-gray-400">
									{dbUser?.createdAt.toDateString()}
								</span>
							</Small>
						</div>
					</CardContent>
				</Card>
				{/* user management section */}
				{!dbUser?.isVerified && (
					<Card className="w-11/12 max-w-4xl outline-2 outline-ws-primary-500 rounded-2xl p-4 flex items-center shadow-2xl">
						<CardContent className="flex justify-between gap-2 w-full items-center">
							<Large>
								Your email is not verified. Verify it first to
								use our services.
							</Large>
							<VerifyEmailButton user={dbUser} />
						</CardContent>
					</Card>
				)}
				<main className="grid place-items-center w-full">
					{/* accout manage section */}

					<Card className="w-11/12 max-w-4xl shadow-2xl">
						<CardHeader className="flex gap-2 items-start">
							<ProfileIcon className="size-6" />
							<Large className="py-0">Manage Account</Large>
						</CardHeader>
						<CardContent className="grid gap-2 md:flex">
							{/* update user section */}
							<UpdateNameSection name={dbUser?.name} />
							{/* change password button */}
							{dbUser?.password && (
								<ChangePasswordSection />
							)}
							{/* delete user button */}
							<DeleteUserSection />
						</CardContent>
					</Card>
				</main>
			</div>
		</>
	);
}

export default page;
