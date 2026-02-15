"use server";

import { revalidatePath } from "next/cache";

const handleRevalidation = async (path: string) => {
	try {
		if (path) {
			revalidatePath(path);
			return { success: true };
		}
	} catch {
		return { success: false };
	}
};

export default handleRevalidation;
