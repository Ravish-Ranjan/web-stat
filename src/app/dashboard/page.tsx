import { H4 } from "@/components/Typography";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import AddWebsiteSection from "./websites/AddWebsiteSection";
import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HalfRadialChart from "@/components/ui/half-radial-chart";

async function page() {
	const session = await getServerSession(authOptions);
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

	return (
		<div className="grid p-4 gap-2">
			<div className="outline-1 p-1 px-2 md:p-2 md:px-4 rounded-lg flex justify-between items-center bg-ws-accent-200 dark:bg-ws-base-600">
				<H4>Websites</H4>
				<AddWebsiteSection />
			</div>
			{/* total sites */}
			<main className="grid grid-cols-1 md:grid-cols-3">
				<Card className="">
					<CardHeader>
						<CardTitle>Websites&apos; Status</CardTitle>
					</CardHeader>
					<CardContent>
						<HalfRadialChart
							chartConfig={
								{
									up: {
										label: "Up",
										color: "var(--color-green-500)",
									},
									down: {
										label: "Down",
										color: "var(--color-ws-primary-500)",
									},
								} satisfies ChartConfig
							}
							chartData={[{ down: downCount, up: upCount }]}
							dataCount={websites.length}
							dataLabel="Total Websites"
						/>
					</CardContent>
				</Card>

				{/* no. of sites up or down */}
				{/* avg response time */}
			</main>
		</div>
	);
}

export default page;
