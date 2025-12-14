import { H4 } from "@/components/Typography";
import { DataTable } from "@/components/ui/data-table";
import { columns, type WebsiteType } from "./columns";

const data: WebsiteType[] = [
	{
		name: "First",
		description: "first-link",
		url: "https://ravishdev.org/api/org/ip/create/new/something",
		createdAt: new Date(),
	},
	{
		description: "second-link",
		url: "https://logisick.ravishdev.org",
		createdAt: new Date(),
	},
	{
		name: "Third",
		url: "https://encode.ravishdev.org",
		createdAt: new Date(),
	},
	{
		url: "https://resource-monitor.ravishdev.org",
		createdAt: new Date(),
	},
];

function page() {
	return (
		<div className="grid p-4">
			<H4>Websites</H4>
			<DataTable columns={columns} data={data} />
			{/* add new website */}
			{/* update website */}
			{/* delete website */}
		</div>
	);
}

export default page;
