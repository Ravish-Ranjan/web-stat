import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DB_BATCH_SIZE = 50;
const PING_CONCURRENCY = 10;
const TIMEOUT_MS = 8000;

export async function GET(request: Request) {
	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		let skip = 0;
		let totalChecksCreated = 0;
		let hasMore = true;

		while (hasMore) {
			const websites = await prisma.website.findMany({
				where: { user: { deleted: false } },
				take: DB_BATCH_SIZE,
				skip: skip,
				orderBy: { id: "asc" },
				select: { id: true, url: true },
			});

			if (websites.length === 0) {
				hasMore = false;
				break;
			}

			const batchResults: {
				websiteId: string;
				status: number;
				responseTime: number;
				isUp: boolean;
				errorMessage?: string | null;
				checkedAt: Date;
			}[] = [];

			for (let i = 0; i < websites.length; i += PING_CONCURRENCY) {
				const pingChunk = websites.slice(i, i + PING_CONCURRENCY);

				interface Website {
					id: string;
					url: string;
				}

				interface CheckResult {
					websiteId: string;
					status: number;
					responseTime: number;
					isUp: boolean;
					errorMessage?: string | null;
					checkedAt: Date;
				}

				const results: CheckResult[] = await Promise.all(
					pingChunk.map(
						async (site: Website): Promise<CheckResult> => {
							const start = performance.now();
							let status = 0;
							let isUp = false;
							let errorMessage: string | null = null;

							try {
								const controller = new AbortController();
								const timeoutId = setTimeout(
									() => controller.abort(),
									TIMEOUT_MS
								);

								const res = await fetch(site.url, {
									method: "HEAD",
									signal: controller.signal,
									cache: "no-store",
									headers: {
										"User-Agent": "WebStat-Monitor/1.0",
									},
								});

								clearTimeout(timeoutId);
								status = res.status;
								isUp = res.status >= 200 && res.status < 300;
							} catch (error) {
								errorMessage =
									error instanceof Error &&
									error.name === "AbortError"
										? "Timeout"
										: error instanceof Error
										? error.message
										: String(error);
								isUp = false;
							}

							return {
								websiteId: site.id,
								status,
								responseTime: Math.round(
									performance.now() - start
								),
								isUp,
								errorMessage,
								checkedAt: new Date(),
							};
						}
					)
				);
				batchResults.push(...results);
			}

			const created = await prisma.check.createMany({
				data: batchResults,
				skipDuplicates: true,
			});

			totalChecksCreated += created.count;
			skip += DB_BATCH_SIZE;

			if (websites.length < DB_BATCH_SIZE) {
				hasMore = false;
			}
		}

		return NextResponse.json({ success: true, totalChecksCreated });
	} catch (error) {
		console.error("Paginated monitoring failed:", error);
		return NextResponse.json({ error: "Internal Error" }, { status: 500 });
	}
}
