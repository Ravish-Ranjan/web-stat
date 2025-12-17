"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";

type FormState = {
	message: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
};

const websiteSchema = z.object({
	url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters")
		.optional()
		.or(z.literal("")),
	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.optional()
		.or(z.literal("")),
});

export async function addWebsite(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);

	if (!session?.user.id) return { message: "Unauthorized", success: false };

	const validatedFields = websiteSchema.safeParse({
		url: formData.get("url"),
		name: formData.get("name"),
		description: formData.get("description"),
	});
	if (!validatedFields.success) {
		return {
			message: "Validation failed",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	const { url, name, description } = validatedFields.data;

	try {
		let normalizedUrl = url.trim();
		if (
			!normalizedUrl.startsWith("http://") &&
			!normalizedUrl.startsWith("https://")
		) {
			normalizedUrl = "https://" + normalizedUrl;
		}

		const existingWebsite = await prisma.website.findFirst({
			where: { url: normalizedUrl, userId: session.user.id },
		});

		if (existingWebsite) {
			return {
				message: "You have already added this website",
				success: false,
				errors: { url: ["This website is already in your list"] },
			};
		}
		await prisma.website.create({
			data: {
				url: normalizedUrl,
				name: name && name.trim() !== "" ? name.trim() : null,
				description:
					description && description.trim() !== ""
						? description.trim()
						: null,
				userId: session.user.id,
			},
		});
		revalidatePath("/dashboard/websites");
		return { message: "Website added successfully!", success: true };
	} catch {
		return {
			message: "Error adding website",
			success: false,
		};
	}
}
