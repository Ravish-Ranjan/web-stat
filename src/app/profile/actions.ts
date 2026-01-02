"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import z from "zod";

type FormState = {
	message: string;
	description?: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
};

export async function deleteUser(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);
	if (!session?.user.id) return { message: "Unauthorized", success: false };

	const deleteWebsiteSchema = z.object({
		text: z.string().min(1, "Enter the text first"),
		hardDelete: z.preprocess((val) => val === "on", z.boolean()),
	});

	const validatedFields = deleteWebsiteSchema.safeParse({
		text: formData.get("text"),
		hardDelete: formData.get("hard-delete"),
	});

	if (!validatedFields.success) {
		return {
			message: "Validation failed",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { text, hardDelete } = validatedFields.data;

	try {
		const trimmedText = text.trim();
		if (!(trimmedText === "delete my account")) {
			return {
				message: "Text doesn't match",
				success: false,
			};
		}
		const dbUser = await prisma.user.findFirst({
			where: { id: session.user.id },
		});
		if (hardDelete) {
			await prisma.$transaction([
				prisma.verificationToken.deleteMany({
					where: { identifier: dbUser?.id },
				}),
				prisma.user.delete({ where: { id: session.user.id } }),
			]);
		} else {
			await prisma.user.update({
				where: { id: session.user.id },
				data: {
					deleted: true,
					deletedOn: new Date(),
					isVerified: false,
				},
			});
		}

		const cookieStore = await cookies();
		cookieStore.delete("next-auth.session-token");
		cookieStore.delete("__Secure-next-auth.session-token");

		await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Cookie: (await cookies()).toString(),
			},
		});

		return {
			message: `Account ${
				hardDelete ? "deleted" : "archived"
			} successfully`,
			success: true,
		};
	} catch {
		return {
			message: "Error deleting website",
			success: false,
		};
	}
}
