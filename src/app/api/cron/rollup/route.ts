import { NextResponse } from "next/server";
import { subDays, startOfDay, endOfDay } from "date-fns";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const CHUNK_SIZE = 100; // Process 100 websites at a time

export async function GET(request: Request) {
	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized", { status: 401 });
	}
	const yesterday = subDays(new Date(), 1);
	const cutoff = endOfDay(yesterday);
	const summaryDate = startOfDay(yesterday);

	try {
		const allStats = await prisma.check.groupBy({
			by: ["websiteId"],
			where: { checkedAt: { lte: cutoff } },
			_avg: { responseTime: true },
			_count: { id: true },
		});
		if (allStats.length === 0) {
			return NextResponse.json({ message: "No data to summarize" });
		}

		// 4. Get Uptime counts for those same sites
		const uptimeStats = await prisma.check.groupBy({
			by: ["websiteId"],
			where: {
				checkedAt: { lte: cutoff },
				isUp: true,
			},
			_count: { id: true },
		});

		const uptimeMap = new Map(
			uptimeStats.map((s) => [s.websiteId, s._count.id])
		);
		for (let i = 0; i < allStats.length; i += CHUNK_SIZE) {
			const chunk = allStats.slice(i, i + CHUNK_SIZE);

			await prisma.$transaction(
				chunk.map((stat) => {
					const total = stat._count.id;
					const up = uptimeMap.get(stat.websiteId) || 0;
					const uptimePercent = (up / total) * 100;

					return prisma.dailySummary.upsert({
						where: {
							websiteId_date: {
								websiteId: stat.websiteId,
								date: summaryDate,
							},
						},
						update: {
							avgResponse: Math.round(
								stat._avg.responseTime || 0
							),
							uptimePercent,
							totalChecks: total,
						},
						create: {
							websiteId: stat.websiteId,
							date: summaryDate,
							avgResponse: Math.round(
								stat._avg.responseTime || 0
							),
							uptimePercent,
							totalChecks: total,
						},
					});
				})
			);
		}

		// 6. Final Step: Purge the detailed check logs
		const deleted = await prisma.check.deleteMany({
			where: { checkedAt: { lte: cutoff } },
		});
		revalidatePath("/dashboard");
		return NextResponse.json({
			success: true,
			websitesSummarized: allStats.length,
			recordsDeleted: deleted.count,
			dateProcessed: summaryDate.toISOString().split("T")[0],
		});
	} catch (error) {
		console.error("Batch Rollup Error:", error);
		return NextResponse.json(
			{
				error: "Batch Rollup failed",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
