"use client";

import { Dispatch, SetStateAction } from "react";

interface RegisterFormProps {
	setFormType: Dispatch<SetStateAction<"login" | "register">>;
}

function RegisterForm({}: RegisterFormProps) {
	return <div>RegisterForm</div>;
}

export default RegisterForm;
