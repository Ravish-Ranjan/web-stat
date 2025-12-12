"use client";

import SeparatorHeading from "@/components/SeparatorHeading";
import { H3, Small } from "@/components/Typography";
import Button from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface LoginFormProps {
	setFormType: Dispatch<SetStateAction<"login" | "register">>;
}

function LoginForm({}: LoginFormProps) {
	return (
		<Card className="w-sm md:w-md max-w-11/12 shadow-2xl">
			<CardHeader>
				<CardTitle>
					<H3>Login into your account</H3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{/* oauth section */}
				<div className="grid gap-2">
					<SeparatorHeading>Login With</SeparatorHeading>
					<Button
						size={"lg"}
						variant={"outline"}
						className="flex items-center w-full"
						onClick={() =>
							signIn("github", { callbackUrl: "/dashboard" })
						}
					>
						<Image
							alt="github-logo"
							src={"/assets/icons/github.svg"}
							width={18}
							height={18}
						/>
						<Small>GitHub</Small>
					</Button>
					<Button
						size={"lg"}
						variant={"outline"}
						className="flex items-center w-full"
						onClick={() =>
							signIn("google", { callbackUrl: "/dashboard" })
						}
					>
						<Image
							alt="google-logo"
							src={"/assets/icons/google.svg"}
							width={18}
							height={18}
						/>
						<Small>Google</Small>
					</Button>
				</div>
				{/* email password */}
				<div></div>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}

export default LoginForm;
