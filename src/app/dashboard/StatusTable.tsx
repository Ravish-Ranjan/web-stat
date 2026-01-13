import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { endOfDay, subDays } from "date-fns";

async function StatusTable({
	searchParams,
}: {
	searchParams: {
		page?: string;
		q?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}) {
	const session = await getServerSession(authOptions);
	if (!session?.user.id) redirect("/authenticate");
	const page = Number(searchParams.page ?? 1);
	const q = searchParams.q ?? "";
	const sortBy = searchParams.sortBy ?? "createdAt";
	const sortOrder = searchParams.sortOrder ?? "desc";
	const pageSize = 10;

	const where: Prisma.WebsiteWhereInput = {
		userId: session.user.id,
		...(q && {
			OR: [
				{ url: { contains: q, mode: "insensitive" } },
				{ name: { contains: q, mode: "insensitive" } },
				{ description: { contains: q, mode: "insensitive" } },
			],
		}),
	};
	const orderBy: Prisma.WebsiteOrderByWithRelationInput = {
		[sortBy]: sortOrder,
	};

	const websites = await prisma.website.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: {
			checks: {
				orderBy: { checkedAt: "desc" },
				take: 1,
				select: {
					isUp: true,
					checkedAt: true,
					responseTime: true,
				},
			},
		},
	});

	const websiteIds = websites.map((site) => site.id);
	const yesterday = subDays(new Date(), 1);

	const checks24h = await prisma.check.findMany({
		where: {
			websiteId: { in: websiteIds },
			checkedAt: {
				gte: endOfDay(yesterday),
			},
		},
		orderBy: { checkedAt: "asc" },
		select: {
			websiteId: true,
			isUp: true,
			checkedAt: true,
		},
	});

	const statusData: StatusType[] = websites.map((site) => {
		const latest = site.checks[0];
		const siteChecks24 = checks24h.filter((c) => c.websiteId === site.id);
		const totalChecks = siteChecks24.length;
		const upChecks = siteChecks24.filter((c) => c.isUp).length;
		return {
			name: site.name ?? undefined,
			url: site.url,

			currentStatus: latest?.isUp ?? false,
			lastCheckedAt: latest?.checkedAt ?? new Date(0),
			lastResponseTime: latest?.responseTime ?? 0,

			lastDayUptimePercentage:
				totalChecks === 0 ? 0 : (upChecks / totalChecks) * 100,

			sparkline: siteChecks24.map((c) => ({
				t: c.checkedAt,
				v: c.isUp ? 1 : 0,
			})),
		};
	});

	return <DataTable columns={columns} data={statusData} />;
}

export default StatusTable;
