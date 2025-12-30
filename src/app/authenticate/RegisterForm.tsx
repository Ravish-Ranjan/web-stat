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

interface RegisterFormProps {
	setFormType: Dispatch<SetStateAction<"login" | "register">>;
}

function RegisterForm({ setFormType }: RegisterFormProps) {
	const router = useRouter();
	const [form, setForm] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
	});
	const [visi, setVisi] = useState(false);
	const [isRegistering, setisRegistering] = useState(false);

	const handleCredRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (form.password !== form.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		// Validate password length
		if (form.password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		setisRegistering(true);

		try {
			// Register user
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					password: form.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.error || "Failed to create account");
				setisRegistering(false);
				return;
			}

			// Auto sign in after successful registration
			const signInResult = await signIn("credentials", {
				email: form.email,
				password: form.password,
				redirect: false,
			});

			if (signInResult?.error) {
				toast.error("Login Error", {
					description: "Please try signing in manually.",
				});
				setisRegistering(false);
				return;
			}

			// Redirect to dashboard
			router.push("/dashboard");
			router.refresh();
		} catch (error) {
			console.error("Registration error:", error);
			toast.error("An error occurred. Please try again.");
			setisRegistering(false);
		}
	};

	return (
		<Card className="w-xs md:w-md max-w-11/12 shadow-2xl grid gap-2">
			<CardHeader>
				<CardTitle>
					<H4 className="text-center ms:text-start">
						Register a new account
					</H4>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				{/* oauth section */}
				<div className="grid gap-2">
					<SeparatorHeading className="bg-ws-accent-500 dark:bg-ws-base-500">
						Register With
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
				<form className="grid mt-4 gap-2" id="register-form">
					<SeparatorHeading className="bg-ws-accent-500 dark:bg-ws-base-500">
						Or Use Credentials
					</SeparatorHeading>
					<Label className="grid">
						Name
						<Input
							type="text"
							required
							placeholder="Enter your name"
							value={form.name}
							className="text-sm md:text-md"
							name="name"
							autoComplete="name"
							onChange={(e) =>
								setForm({ ...form, name: e.target.value })
							}
						/>
					</Label>
					<Label className="grid">
						Email *
						<Input
							type="email"
							required
							placeholder="Enter your email id"
							value={form.email}
							className="text-sm md:text-md"
							name="email"
							autoComplete="email"
							onChange={(e) =>
								setForm({ ...form, email: e.target.value })
							}
						/>
					</Label>
					<Label className="grid">
						Password *
						<div className="flex gap-1">
							<Input
								type={visi ? "text" : "password"}
								required
								placeholder="Enter your password"
								value={form.password}
								className="text-sm md:text-md"
								name="password"
								autoComplete="new-password"
								onChange={(e) =>
									setForm({
										...form,
										password: e.target.value,
									})
								}
							/>
							<Button
								variant={"outline"}
								onClick={() => setVisi((state) => !state)}
								type="button"
							>
								{visi ? <Eye /> : <EyeClosed />}
							</Button>
						</div>
					</Label>
					<Label className="grid">
						Re-enter Password *
						<Input
							type={"text"}
							required
							placeholder="Re-enter your password"
							value={form.confirmPassword}
							className="text-sm md:text-md"
							name="password"
							autoComplete="new-password"
							onChange={(e) =>
								setForm({
									...form,
									confirmPassword: e.target.value,
								})
							}
						/>
					</Label>
					<Button
						onClick={handleCredRegister}
						disabled={isRegistering}
						type="submit"
						className="mt-4"
						form="register-form"
					>
						Register
					</Button>
				</form>
			</CardContent>
			<CardFooter>
				<Button
					variant={"link"}
					className="w-full text-center"
					onClick={() => setFormType("login")}
				>
					Already have an account?
				</Button>
			</CardFooter>
		</Card>
	);
}

export default RegisterForm;
