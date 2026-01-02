"use client";

import { Eye, EyeClosed } from "@/assets/inputicons";
import SeparatorHeading from "@/components/SeparatorHeading";
import { H4, Small } from "@/components/Typography";
import Button from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface LoginFormProps {
	setFormType: Dispatch<SetStateAction<"login" | "register">>;
}

function LoginForm({ setFormType }: LoginFormProps) {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const router = useRouter();

	const handleCredLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoggingIn(true);
		try {
			const result = await signIn("credentials", {
				email: form.email,
				password: form.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error(result.error);
				setIsLoggingIn(false);
				return;
			}

			if (result?.ok) {
				router.push("/dashboard");
				router.refresh();
			}
		} catch (error) {
			console.error("Sign in error:", error);
			toast.error("An error occurred. Please try again.");
			setIsLoggingIn(false);
		}
	};

	return (
		<Card className="w-xs md:w-md max-w-11/12 shadow-2xl grid gap-2">
			<CardHeader>
				<CardTitle>
					<H4 className="text-center ms:text-start">
						Login into your account
					</H4>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				{/* oauth section */}
				<div className="grid gap-2">
					<SeparatorHeading className="bg-ws-accent-500 dark:bg-ws-base-500">
						Login With
					</SeparatorHeading>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
							<Small>Github</Small>
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
				</div>
				{/* email password */}
				<form className="grid mt-4 gap-2" id="login-form">
					<SeparatorHeading className="bg-ws-accent-500 dark:bg-ws-base-500">
						Or Use Credentials
					</SeparatorHeading>
					<Label className="grid">
						Email *
						<Input
							type="email"
							required
							placeholder="Enter your email id"
							value={form.email}
							name="email"
							autoComplete="email"
							className="text-sm md:text-md"
							onChange={(e) =>
								setForm({ ...form, email: e.target.value })
							}
						/>
					</Label>
					<Label className="grid">
						Password *
						<div className="flex gap-1">
							<Input
								type={passwordVisible ? "text" : "password"}
								required
								placeholder="Enter your password"
								value={form.password}
								name="password"
								autoComplete="current-password"
								className="text-sm md:text-md"
								onChange={(e) =>
									setForm({
										...form,
										password: e.target.value,
									})
								}
							/>
							<Button
								variant={"outline"}
								onClick={() => setPasswordVisible((state) => !state)}
								type="button"
							>
								{passwordVisible ? <Eye /> : <EyeClosed />}
							</Button>
						</div>
					</Label>
					<Button
						onClick={handleCredLogin}
						disabled={isLoggingIn}
						type="submit"
						className="mt-4"
						form="login-form"
					>
						Login
					</Button>
				</form>
			</CardContent>
			<CardFooter>
				<Button
					variant={"link"}
					className="w-full text-center"
					onClick={() => setFormType("register")}
				>
					Don&apos;t have an account?
				</Button>
			</CardFooter>
		</Card>
	);
}

export default LoginForm;
