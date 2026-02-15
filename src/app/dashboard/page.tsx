import { H4, Large, Small } from "@/components/Typography";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import AddWebsiteSection from "@/app/dashboard/websites/AddWebsiteSection";
import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HalfRadialChart from "@/components/ui/half-radial-chart";
import RadialMeterChart from "@/components/ui/radial-meter-chart";
import {
	getValueClass,
	getValueColour,
	responseTimeToPercentage,
} from "@/util/valueColour";
import StatusTable from "./StatusTable";
import { SearchInput } from "@/components/SearchInput";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/TableSkeleton";
import Pagination from "@/components/Pagination";
import clsx from "clsx";
import RevalidateButton from "@/components/RevalidateButton";

interface PageProps {
	searchParams: Promise<{
		page?: string;
		q?: string;
		sortBy?: string;
		sortOrder?: string;
	}>;
}

async function page({ searchParams }: PageProps) {
	const session = await getServerSession(authOptions);
	const params = await searchParams;
	const websites = await prisma.website.findMany({
		where: { userId: session?.user.id },
		select: {
			checks: {
				orderBy: { checkedAt: "desc" },
				take: 1,
				select: { isUp: true },
			},
		},
	});

	let upCount = 0,
		downCount = 0;
	for (const website of websites) {
		if (website.checks.length === 0) downCount++;
		else if (website.checks[0].isUp) upCount++;
		else downCount++;
	}

	const [summary] = await prisma.$queryRaw<
		{
			overall_uptime: number | null;
			overall_response: number | null;
			total_checks: number | null;
		}[]
	>`
    SELECT
      SUM(ds."uptimePercent" * ds."totalChecks") / NULLIF(SUM(ds."totalChecks"), 0) AS overall_uptime,
      SUM(ds."avgResponse" * ds."totalChecks") / NULLIF(SUM(ds."totalChecks"), 0) AS overall_response,
      SUM(ds."totalChecks") AS total_checks
    FROM "DailySummary" ds
    JOIN "Website" w ON w.id = ds."websiteId"
    WHERE w."userId" = ${session?.user.id}
      AND ds.date >= NOW() - INTERVAL '7 days'
  `;
	return (
		<div className="grid p-4 gap-2">
			<div className="outline-1 p-1 px-2 md:p-2 md:px-4 rounded-lg flex justify-between items-center bg-ws-accent-200 dark:bg-ws-base-600">
				<H4>Websites</H4>
				<div className="flex gap-2 items-center">
					<AddWebsiteSection />
					<RevalidateButton path="/dashboard"/>
				</div>
			</div>
			{/* total sites */}
			<main className="grid grid-cols-1 lg:grid-cols-3 gap-2">
				{/* up/down sites */}
				<Card>
					<CardHeader>
						<CardTitle>Websites&apos; Status</CardTitle>
						<Small className="text-gray-500">
							Currently Up/Down websites&apos; count
						</Small>
					</CardHeader>
					<CardContent className="flex-1 pb-0">
						<HalfRadialChart
							chartConfig={
								{
									up: {
										label: "Up",
										color: "var(--color-green-500)",
									},
									down: {
										label: "Down",
										color: "var(--chart-3)",
									},
								} satisfies ChartConfig
							}
							chartData={[{ down: downCount, up: upCount }]}
							dataCount={websites.length}
							dataLabel="Total Websites"
							subChild={[
								`Up Sites : ${upCount}`,
								`Down Sites : ${downCount}`,
							]}
						/>
					</CardContent>
				</Card>
				{/* Overall Stats */}
				<Card className="col-span-1 lg:col-span-2">
					<CardHeader>
						<CardTitle>Overall Statistics</CardTitle>
						<Small className="text-gray-500">
							Over the duration of last 7-days
						</Small>
					</CardHeader>
					<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 pb-0">
						<div>
							<RadialMeterChart
								chartConfig={
									{
										percentage: {
											label: "Percentage",
											color: getValueColour(
												Number(summary.overall_uptime)
											),
										},
									} satisfies ChartConfig
								}
								chartData={[
									{
										percentage: Number(
											summary.overall_uptime,
										),
										fill: "var(--color-percentage)",
									},
								]}
								dataCount={Number(summary.overall_uptime)}
								dataLabel="Overall Uptime"
								dataSuffix="%"
							/>
						</div>
						<div className="flex flex-col justify-center items-start">
							{/* avg response time */}
							<Large className="flex gap-1 items-center text-sm md:text-lg">
								Overall Avg. Response Time :
								<span
									className={
										(clsx("px-0.5"),
										getValueClass(
											responseTimeToPercentage(
												Number(
													summary.overall_response,
												),
											),
										))
									}
								>
									{Number(summary.overall_response)} ms
								</span>
							</Large>
							{/* total checks */}
							<Large className="flex gap-1 items-center text-sm md:text-lg">
								Total Checks :
								<span className="px-0.5 text-gray-700 dark:text-gray-400">
									{Number(summary.total_checks)} times
								</span>
							</Large>
						</div>
					</CardContent>
				</Card>
			</main>
			{/* status table */}
			<div className="grid gap-2">
				<SearchInput />
				<Suspense
					fallback={
						<TableSkeleton
							columns={[
								"Name",
								"Url",
								"Current Status",
								"Sparkline",
								"Last Checked At",
								"Response Time (ms)",
								"Uptime (%) 24h",
							]}
						/>
					}
				>
					<StatusTable searchParams={params} />
				</Suspense>
				<Pagination totalPage={1} />
			</div>
		</div>
	);
}

export default page;
