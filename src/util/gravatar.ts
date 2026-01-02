import crypto from "crypto";

export function getGravatarUrl(email: string, size: number = 100) {
	const cleanedEmail = email.trim().toLowerCase();
	const hash = crypto.createHash("md5").update(cleanedEmail).digest("hex");
	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
