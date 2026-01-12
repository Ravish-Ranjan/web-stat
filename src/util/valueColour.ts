export function getValueClass(value: number, type: string = "text") {
	if (type === "text") {
		if (value >= 80) return "text-green-500";
		if (value >= 50) return "text-amber-600";
		if (value >= 20) return "text-orange-500";
		if (value < 20) return "text-red-500";
	}
	if (type === "fill") {
		if (value >= 80) return "fill-green-500";
		if (value >= 50) return "fill-amber-600";
		if (value >= 20) return "fill-orange-500";
		if (value < 20) return "fill-red-500";
	}
	if (type === "stroke") {
		if (value >= 80) return "stroke-green-500";
		if (value >= 50) return "stroke-amber-600";
		if (value >= 20) return "stroke-orange-500";
		if (value < 20) return "stroke-red-500";
	}
	if (type === "bg") {
		if (value >= 80) return "bg-green-500";
		if (value >= 50) return "bg-amber-600";
		if (value >= 20) return "bg-orange-500";
		if (value < 20) return "bg-red-500";
	}
	return "text-gray-500";
}

export function getValueColour(value: number) {
	if (value >= 80) return "var(--color-green-500)";
	if (value >= 50) return "var(--color-amber-500)";
	if (value >= 20) return "var(--color-orange-500)";
	if (value < 20) return "var(--color-red-500)";
	return "var(--color-gray-500)";
}
