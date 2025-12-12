export const runtime = "nodejs";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			isVerified: boolean;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (!user.email) return false;

			try {
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email },
				});

				if (existingUser) {
					if (existingUser.deleted) return false;

					await prisma.user.update({
						where: { email: user.email },
						data: {
							name: user.name || existingUser.name,
							avatar: user.image || existingUser.avatar,
						},
					});
					return true;
				}

				const isVerified =
					account?.provider === "google"
						? Boolean((profile as { email_verified?: boolean })?.email_verified)
						: true;

				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name ?? null,
						avatar: user.image ?? null,
						isVerified,
					},
				});

				return true;
			} catch (error) {
				console.error("SERVER : signIn error:", error);
				return false;
			}
		},

		async jwt({ token, user }) {
			if (user?.email) {
				const dbUser = await prisma.user.findUnique({
					where: { email: user.email },
				});

				if (dbUser) {
					token.id = dbUser.id;
					token.isVerified = dbUser.isVerified;
				}
			}

			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.isVerified = token.isVerified as boolean;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},

	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	secret: process.env.NEXTAUTH_SECRET,
};
