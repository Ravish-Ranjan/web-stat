"use client";

import { Muted } from "@/components/Typography";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import WebsiteActionCell from "@/app/dashboard/websites/WebsiteActionCell";
import StyledUrl from "@/components/StyledUrl";
import SortableHeader from "@/components/sortableHeaders";

export const columns: ColumnDef<WebsiteType>[] = [
	{
		accessorKey: "name",
		header: () => <SortableHeader column="name" label="Name" />,
		cell: ({ row }) => {
			return (
				row.getValue("name") || <Muted className="text-xs">NA</Muted>
			);
		},
	},
	{
		accessorKey: "description",
		header: () => (
			<SortableHeader column="description" label="Description" />
		),
		cell: ({ row }) => {
			return (
				row.original.description || (
					<Muted className="text-xs">NA</Muted>
				)
			);
		},
	},
	{
		accessorKey: "url",
		header: () => <SortableHeader column="url" label="Url" />,
		cell: ({ row }) => {
			return (
				<Link
					href={row.getValue("url")}
					target="_blank"
					title={row.original.url}
				>
					<StyledUrl url={String(row.getValue("url"))} />
				</Link>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: () => <SortableHeader column="createdAt" label="Added On" />,
		cell: ({ row }) => {
			return new Date(row.getValue("createdAt")).toDateString();
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <WebsiteActionCell websiteData={row.original} />;
		},
	},
];
