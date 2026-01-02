"use server";

import { authOptions } from "@/lib/auth";
import Mailer from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

type FormState = {
	message: string;
	description?: string;
	success: boolean;
	errors?: Record<string, string[]> | undefined;
};

async function logout() {
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
}

export async function deleteUser(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const session = await getServerSession(authOptions);
	if (!session?.user.id) return { message: "Unauthorized", success: false };

	const deleteUserSchema = z.object({
		text: z.string().min(1, "Enter the text first"),
		hardDelete: z.preprocess((val) => val === "on", z.boolean()),
	});

	const validatedFields = deleteUserSchema.safeParse({
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
		logout();
		return {
			message: `Account ${
				hardDelete ? "deleted" : "archived"
			} successfully`,
			success: true,
		};
	} catch {
		return {
			message: "Error deleting account",
			success: false,
		};
	}
}

export async function updateName(
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

	const updateNameSchema = z.object({ name: z.string().optional() });

	const validatedFields = updateNameSchema.safeParse({
		name: formData.get("name"),
	});

	if (!validatedFields.success) {
		return {
			message: "Validation failed",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { name } = validatedFields.data;
	try {
		const trimmedName = name?.trim();
		await prisma.user.update({
			where: { id: session.user?.id },
			data: { name: trimmedName },
		});
		revalidatePath("/profile");
		return {
			message: "Name updated successfully",
			description: `Your name is changed to ${trimmedName}`,
			success: true,
		};
	} catch {
		return {
			message: "Error deleting account",
			success: false,
		};
	}
}

export async function changePassword(
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

	if (!dbUser?.password) {
		return {
			message: "You don't have any password to change",
			description:
				"you have rgsitered with Google or Github so we can't change your password",
			success: false,
		};
	}
	const changePasswordSchema = z
		.object({
			currentPassword: z
				.string()
				.trim()
				.min(1, "Current password is required"),
			newPassword: z
				.string()
				.trim()
				.min(8, "New password must be at least 8 characters long")
				.max(100, "Password is too long"),
			confirmPassword: z
				.string()
				.trim()
				.min(1, "Please confirm your new password"),
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})
		.refine((data) => data.newPassword !== data.currentPassword, {
			message: "New password cannot be the same as the current password",
			path: ["newPassword"],
		});

	const validatedFields = changePasswordSchema.safeParse({
		currentPassword: formData.get("current-password"),
		newPassword: formData.get("new-password"),
		confirmPassword: formData.get("confirm-password"),
	});

	if (!validatedFields.success) {
		return {
			message: "Validation failed",
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { confirmPassword, currentPassword } = validatedFields.data;

	try {
		const samePassword = await compare(currentPassword, dbUser.password);
		if (!samePassword)
			return {
				message: "Wrong Password",
				description: "Your have enterd wrong current password",
				success: false,
			};
		const hashedPassword = await hash(confirmPassword, 12);
		await prisma.user.update({
			where: { id: session.user.id },
			data: { password: hashedPassword },
		});
		const mailer = new Mailer();
		await mailer.passwordChanged(dbUser.email, dbUser.name || dbUser.email);
		revalidatePath("/profile");
		logout();
		return {
			message: "Password updated successfully",
			success: true,
		};
	} catch {
		return {
			message: "Error deleting account",
			success: false,
		};
	}
}
