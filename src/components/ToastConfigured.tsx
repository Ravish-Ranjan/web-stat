"use client";

import { useModeStore } from "@/store/useModeStore";
import { Toaster } from "sonner";

function ToastConfigured() {
	const { mode } = useModeStore();
	return <Toaster theme={mode} />;
}

export default ToastConfigured;
