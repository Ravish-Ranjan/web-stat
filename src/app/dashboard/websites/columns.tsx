"use client";

import { ArrowUpDownIcon, LinkIcon } from "@/assets/misc";
import { Muted } from "@/components/Typography";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import WebsiteActionCell from "./WebsiteActionCell";
// import { useRouter } from "next/router";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export type WebsiteType = {
	name?: string;
	url: string;
	description?: string;
	createdAt: Date;
	id: string;
};

function GetStyledUrl({
	url,
	urlDepth = 5,
	showIcon = true,
}: {
	url: string;
	urlDepth?: number;
	showIcon?: boolean;
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
				<span className="text-gray-500">/{routeSection.join("/")}</span>
			)}
			{showIcon && (
				<LinkIcon className="ml-2 stroke-blue-500 dark:stroke-blue-400" />
			)}
		</span>
	);
}

function SortableHeader({ column, label }: { column: string; label: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSort = () => {
		const params = new URLSearchParams(searchParams.toString());
		const currentSortBy = params.get("sortBy");
		const currentSortOrder = params.get("sortOrder");

		if (currentSortBy === column) {
			// Toggle sort order
			params.set(
				"sortOrder",
				currentSortOrder === "asc" ? "desc" : "asc"
			);
		} else {
			// New column, default to asc
			params.set("sortBy", column);
			params.set("sortOrder", "asc");
		}

		router.push(`?${params.toString()}`);
	};
	return (
		<Button
			variant="ghost"
			onClick={handleSort}
			className="flex items-center gap-2"
		>
			{label}
			<ArrowUpDownIcon className="h-4 w-4" />
		</Button>
	);
}

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
				row.getValue("description") || (
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
				<Link href={row.getValue("url")} target="_blank">
					<GetStyledUrl url={String(row.getValue("url"))} />
				</Link>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: () => <SortableHeader column="createdAt" label="Added On" />,
		cell: ({ row }) => {
			return new Date(row.getValue("createdAt")).toLocaleDateString();
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<WebsiteActionCell
					websiteId={row.original.id}
					url={
						<GetStyledUrl
							url={String(row.original.url)}
							showIcon={false}
						/>
					}
				/>
			);
		},
	},
];
