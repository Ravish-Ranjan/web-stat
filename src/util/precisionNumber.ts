export function precise(num: number, precisionRange: number = 1) {
	const factor = 10 ** precisionRange;
	return Math.round(num * factor) / factor;
}
