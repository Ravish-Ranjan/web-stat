"use client";

import { ArrowUpDownIcon } from "@/assets/misc";
import { Muted } from "@/components/Typography";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import WebsiteActionCell from "./WebsiteActionCell";
// import { useRouter } from "next/router";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import StyledUrl from "@/components/StyledUrl";

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
			size={"sm"}
			className="flex items-center gap-2 px-0 w-full justify-start"
		>
			{label}
			<ArrowUpDownIcon className="size-4" />
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
				<Link href={row.getValue("url")} target="_blank" title={row.original.url}>
					<StyledUrl url={String(row.getValue("url"))} />
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
		header:"Actions",
		cell: ({ row }) => {
			return <WebsiteActionCell websiteData={row.original} />;
		},
	},
];
