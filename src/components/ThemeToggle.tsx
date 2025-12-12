"use client";

import { Moon, Sun, System } from "@/assets/themetoggleicons";
import Button from "@/components/ui/button";
import { useModeStore } from "@/store/useModeStore";

function ThemeToggle() {
	const { mode, setMode } = useModeStore();

	const handleModeChange = () => {
		switch (mode) {
			case "light":
				setMode("dark");
				break;
			case "dark":
				setMode("system");
				break;
			case "system":
				setMode("light");
				break;
			default:
				setMode("system");
				break;
		}
	};

	return (
		<Button variant={"base"} onClick={handleModeChange}>
			{mode === "dark" && <Moon />}
			{mode === "light" && <Sun />}
			{mode === "system" && <System />}
		</Button>
	);
}

export default ThemeToggle;
