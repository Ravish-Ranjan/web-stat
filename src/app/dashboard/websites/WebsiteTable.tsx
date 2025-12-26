"use server";

import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { columns, WebsiteType } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function WebsiteTable({
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
	const page = Number(searchParams.page ?? 1);
	const q = searchParams.q ?? "";
	const sortBy = searchParams.sortBy ?? "createdAt";
	const sortOrder = searchParams.sortOrder ?? "desc";
	const pageSize = 5;
	const where: Prisma.WebsiteWhereInput | undefined = q
		? {
				AND: {
					userId: session?.user.id,
					OR: [
						{ url: { contains: q, mode: "insensitive" } },
						{ name: { contains: q, mode: "insensitive" } },
						{ description: { contains: q, mode: "insensitive" } },
					],
				},
		  }
		: { userId: session?.user.id };
	const orderBy: Prisma.WebsiteOrderByWithRelationInput = {
		[sortBy]: sortOrder,
	};

	const websiteData = (await prisma.website.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	})) as WebsiteType[];

	return <DataTable columns={columns} data={websiteData} />;
}

export default WebsiteTable;
