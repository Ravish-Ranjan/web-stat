"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";

type FormState = {
	message: string;
	description?: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
};

export async function addWebsite(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);

	if (!session?.user.id) return { message: "Unauthorized", success: false };
	const dbUser = await prisma.user.findFirst({
		where: { id: session.user.id },
	});
	if (!dbUser?.isVerified)
		return {
			message: "Your email is not verified.",
			description: "verifiy it first on profile page",
			success: false,
		};

	const websiteSchema = z.object({
		url: z
			.string()
			.url("Please enter a valid URL")
			.min(1, "URL is required"),
		name: z
			.string()
			.refine(
				(val) => val === "" || val.length >= 2,
				"Name must be at least 2 characters"
			)
			.refine(
				(val) => val === "" || val.length <= 100,
				"Name must be less than 100 characters"
			)
			.optional()
			.transform((val) => (val === "" ? undefined : val)),
		description: z
			.string()
			.refine(
				(val) => val === "" || val.length <= 500,
				"Description must be less than 500 characters"
			)
			.optional()
			.transform((val) => (val === "" ? undefined : val)),
	});

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

export async function deleteWebsite(
	websiteId: string,
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);
	if (!session?.user.id) return { message: "Unauthorized", success: false };
	const dbUser = await prisma.user.findFirst({
		where: { id: session.user.id },
	});
	if (!dbUser?.isVerified)
		return {
			message: "Your email is not verified.",
			description: "verifiy it first on profile page",
			success: false,
		};

	const deleteWebsiteSchema = z.object({
		text: z.string().min(1, "Enter the text first"),
		id: z.string(),
	});

	const validatedFields = deleteWebsiteSchema.safeParse({
		text: formData.get("text"),
		id: websiteId,
	});

	if (!validatedFields.success) {
		return {
			message: "Validation failed",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { text, id } = validatedFields.data;

	try {
		const trimmedText = text.trim();
		if (!(trimmedText === "delete this website")) {
			return {
				message: "Text doesn't match",
				success: false,
			};
		}

		await prisma.website.delete({
			where: { id: id, userId: session.user.id },
		});
		revalidatePath("/dashboard/websites");
		return { message: "Website deleted", success: true };
	} catch {
		return {
			message: "Error deleting website",
			success: false,
		};
	}
}

export async function editWebsite(
	websiteId: string,
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);

	if (!session?.user.id) return { message: "Unauthorized", success: false };
	const dbUser = await prisma.user.findFirst({
		where: { id: session.user.id },
	});
	if (!dbUser?.isVerified)
		return {
			message: "Your email is not verified.",
			description: "verifiy it first on profile page",
			success: false,
		};

	const editWebsiteSchema = z.object({
		name: z
			.string()
			.transform((val) => (val.trim() === "" ? undefined : val.trim()))
			.optional()
			.refine(
				(val) => val === undefined || val.length >= 2,
				"Name must be at least 2 characters"
			)
			.refine(
				(val) => val === undefined || val.length <= 100,
				"Name must be less than 100 characters"
			),
		description: z
			.string()
			.transform((val) => (val.trim() === "" ? undefined : val.trim()))
			.optional()
			.refine(
				(val) => val === undefined || val.length <= 500,
				"Description must be less than 500 characters"
			),
	});

	const validatedFields = editWebsiteSchema.safeParse({
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
	const { name, description } = validatedFields.data;

	try {
		const existingWebsite = await prisma.website.findUnique({
			where: { id: websiteId },
		});

		if (!existingWebsite || existingWebsite.userId !== session.user.id) {
			return {
				message: "You don't have any website like this",
				success: false,
				errors: { url: ["This website is not in your list"] },
			};
		}

		await prisma.website.update({
			where: { id: websiteId },
			data: {
				name: name || null,
				description: description || null,
			},
		});

		revalidatePath("/dashboard/websites");
		return {
			message: "Website edited successfully!",
			success: true,
		};
	} catch (error) {
		console.error("Error editing website:", error);
		return {
			message: "Error editing website",
			success: false,
		};
	}
}
