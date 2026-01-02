import Mailer from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";

export async function createVerificationToken(email: string) {
	const token = randomBytes(32).toString("hex");
	const expires = new Date();
	expires.setMinutes(expires.getMinutes() + 15);
	const newObj = await prisma.$transaction([
		prisma.verificationToken.deleteMany({ where: { identifier: email } }),
		prisma.verificationToken.create({
			data: { expires, identifier: email, token },
		}),
	]);
	return newObj[1].token;
}

export async function POST(request: Request) {
	try {
		const { userId } = await request.json();
		if (!userId) {
			return NextResponse.json(
				{ error: "user identifycation is required" },
				{ status: 404 }
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!existingUser) {
			return NextResponse.json(
				{ error: "No such user found" },
				{ status: 404 }
			);
		}

		if (existingUser.isVerified) {
			return NextResponse.json(
				{ message: "Your email is already verified" },
				{ status: 200 }
			);
		}

		const token = await createVerificationToken(existingUser.email);
		const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&email=${existingUser.email}`;
		const mailer = new Mailer();
		await mailer.verifyEmail(
			existingUser.email,
			existingUser.name || existingUser.email,
			verificationUrl
		);

		return NextResponse.json(
			{
				message: "Email sent successfully.",
				description: "Verification mail sent to your email-id",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Mailing error:", error);
		return NextResponse.json(
			{ error: "Failed to send email verification mail" },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const { token, email } = await request.json();
		if (!token || !email) {
			return NextResponse.json(
				{ error: "Required fields not found for verification" },
				{ status: 404 }
			);
		}
		const verificationTokenObject =
			await prisma.verificationToken.findFirst({
				where: { identifier: email },
			});
		if (!verificationTokenObject) {
			return NextResponse.json(
				{ error: "No verification token found" },
				{ status: 404 }
			);
		}
		if (verificationTokenObject.expires < new Date()) {
			await prisma.verificationToken.delete({
				where: { identifier_token: { identifier: email, token } },
			});
			return NextResponse.json(
				{
					error: "Verification token has expired. Re-send it on profile page.",
				},
				{ status: 400 }
			);
		}
		if (verificationTokenObject.token !== token) {
			return NextResponse.json(
				{ error: "Wrong verification token" },
				{ status: 400 }
			);
		}
		await prisma.$transaction([
			prisma.user.update({
				where: { email },
				data: { isVerified: true },
			}),
			prisma.verificationToken.delete({
				where: { identifier_token: { identifier: email, token } },
			}),
		]);
		revalidatePath("/profile");
		return NextResponse.json(
			{ message: "Email verified successfuly" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email token error:", error);
		return NextResponse.json(
			{ error: "Failed to verify verification token" },
			{ status: 500 }
		);
	}
}
