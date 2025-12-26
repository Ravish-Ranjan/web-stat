import { H4 } from "@/components/Typography";
import AddWebsiteSection from "./AddWebsiteSection";
import WebsiteTable from "./WebsiteTable";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/TableSkeleton";
import { SearchInput } from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PageProps {
	searchParams: Promise<{
		page?: string;
		q?: string;
		sortBy?: string;
		sortOrder?: string;
	}>;
}

async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const session = await getServerSession(authOptions);
	const totalItems = await prisma.website.count({
		where: { userId: session?.user.id },
	});
	const pageSize = 5
	const totalPage = Math.ceil(totalItems / pageSize);

	return (
		<div className="grid p-4 gap-2">
			<div className="outline-1 p-2 rounded-lg flex justify-between items-center">
				<H4>Websites</H4>
				<AddWebsiteSection />
			</div>
			<div className="grid gap-2">
				<SearchInput />
				<Suspense fallback={<TableSkeleton />}>
					<WebsiteTable searchParams={params} />
				</Suspense>
				<Pagination totalPage={totalPage || 1} />
			</div>
		</div>
	);
}

export default Page;
