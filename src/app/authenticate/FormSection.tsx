"use client";
import { useState } from "react";
import LoginForm from "@/app/authenticate/LoginForm";
import RegisterForm from "@/app/authenticate/RegisterForm";

function FormSection() {
	const [formType, setFormType] = useState<"login" | "register">("login");

	return (
		<main className="w-full grid place-items-center min-h-96 pb-8">
			{formType === "login" && <LoginForm setFormType={setFormType} />}
			{formType === "register" && (
				<RegisterForm setFormType={setFormType} />
			)}
		</main>
	);
}

export default FormSection;
