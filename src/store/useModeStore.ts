"use client";
import { create } from "zustand";

const MODE_KEY = "web-stat-theme";

type Mode = "light" | "dark" | "system";

interface ModeStore {
	mode: Mode;
	setMode: (mode: Mode) => void;
	toggleMode: () => void;
	initMode: () => void;
	getTheme: () => "light" | "dark";
}

export const useModeStore = create<ModeStore>((set, get) => ({
	mode: "system",
	setMode: (mode) => {
		localStorage.setItem(MODE_KEY, mode);
		set({ mode });
		if (mode === "dark") {
			document.documentElement.classList.add("dark");
		} else if (mode === "light") {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.remove("dark");
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			}
		}
	},
	toggleMode: () =>
		set((state) => {
			const newMode = state.mode === "dark" ? "light" : "dark";
			localStorage.setItem(MODE_KEY, newMode);
			if (newMode === "dark")
				document.documentElement.classList.add("dark");
			else document.documentElement.classList.remove("dark");
			return { mode: newMode };
		}),
	initMode: () => {
		const saved = localStorage.getItem(MODE_KEY) as Mode;
		if (saved) set({ mode: saved });
		else {
			const systemPref = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			set({ mode: systemPref });
			if (systemPref === "dark")
				document.documentElement.classList.add("dark");
		}
	},
	getTheme: () => {
		if (get().mode === "system")
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		if (get().mode === "light") return "light";
		if (get().mode === "dark") return "dark";
		return "light";
	},
}));
