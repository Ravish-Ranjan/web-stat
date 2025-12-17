import { H4 } from "@/components/Typography";
import { DataTable } from "@/components/ui/data-table";
import { columns, type WebsiteType } from "./columns";
import AddWebsiteSection from "./AddWebsiteSection";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Page() {
	const session = await getServerSession(authOptions);
	const data: WebsiteType[] = (await prisma.website.findMany({
		where: {
			userId: session?.user.id,
		},
		select: {
			name: true,
			description: true,
			createdAt: true,
			url: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	})) as WebsiteType[];
	return (
		<div className="grid p-4 gap-2">
			<div className="outline-1 p-2 rounded-lg flex justify-between items-center">
				<H4>Websites</H4>
				<AddWebsiteSection />
			</div>
			<DataTable columns={columns} data={data} />
		</div>
	);
}

export default Page;
