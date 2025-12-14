"use client";

import { LinkIcon } from "@/assets/misc";
import { Muted } from "@/components/Typography";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type WebsiteType = {
	name?: string;
	url: string;
	description?: string;
	createdAt: Date;
};

function GetStyledUrl({
	url,
	urlDepth = 5,
}: {
	url: string;
	urlDepth?: number;
}) {
	const removedProtocolUrl = url.split("//")[1];
	let routeSection = removedProtocolUrl.split("/").splice(1);
	if (routeSection.length > urlDepth) {
		routeSection = routeSection.splice(0, urlDepth);
		routeSection[routeSection.length - 1] += "/...";
	}
	return (
		<span className="flex items-end-safe">
			{removedProtocolUrl.split("/")[0]}
			{routeSection.length > 0 && (
				<Muted>/{routeSection.join("/")}</Muted>
			)}
			<LinkIcon className="ml-2 stroke-blue-500 dark:stroke-blue-400" />
		</span>
	);
}

export const columns: ColumnDef<WebsiteType>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			return (
				row.getValue("name") || <Muted className="text-xs">NA</Muted>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			return (
				row.getValue("description") || (
					<Muted className="text-xs">NA</Muted>
				)
			);
		},
	},
	{
		accessorKey: "url",
		header: "Url",
		cell: ({ row }) => {
			return (
				<Link href={row.getValue("url")}>
					<GetStyledUrl url={String(row.getValue("url"))} />
				</Link>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Added on",
		cell: ({ row }) => {
			return new Date(row.getValue("createdAt")).toDateString();
		},
	},
];
