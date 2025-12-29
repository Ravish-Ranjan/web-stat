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
import { redirect } from "next/navigation";

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
	if (!session) redirect("/authenticate");
	const totalItems = await prisma.website.count({
		where: { userId: session?.user.id },
	});
	const pageSize = 10;
	const totalPage = Math.ceil(totalItems / pageSize);

	return (
		<div className="grid p-4 gap-2">
			<div className="outline-1 p-1 px-2 md:p-2 md:px-4 rounded-lg flex justify-between items-center bg-ws-accent-200 dark:bg-ws-base-600">
				<H4>Websites</H4>
				<AddWebsiteSection />
			</div>
			<div className="grid gap-2">
				<SearchInput />
				<Suspense
					fallback={
						<TableSkeleton
							columns={[
								"Name",
								"Description",
								"Url",
								"Added On",
								"Actions",
							]}
						/>
					}
				>
					<WebsiteTable searchParams={params} />
				</Suspense>
				<Pagination totalPage={totalPage || 1} />
			</div>
		</div>
	);
}

export default Page;
