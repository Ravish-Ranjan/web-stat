import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getGravatarUrl } from "@/util/gravatar";
import z from "zod";

const registerSchema = z.object({
	email: z.string().email("Invalid email address").trim().toLowerCase(),
	password: z.string().min(8, "Password must be at least 8 characters"),
	name: z.string().min(2, "Name is too short").optional().or(z.literal("")),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const validation = registerSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{
					error: `Validation failed, ${
						validation.error.flatten().fieldErrors
					}`,
				},
				{ status: 400 }
			);
		}
		const { email, password, name } = validation.data;

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name: name ?? null,
				isVerified: false,
				avatar: getGravatarUrl(email),
			},
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 }
		);
	}
}
