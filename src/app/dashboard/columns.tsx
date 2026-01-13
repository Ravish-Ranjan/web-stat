"use client";
import StyledUrl from "@/components/StyledUrl";
import { Muted } from "@/components/Typography";
import SortableHeader from "@/components/sortableHeaders";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "../../components/ui/badge";
import { getValueClass, responseTimeToPercentage } from "@/util/valueColour";
import { FormatedDateObj } from "../../components/BetterDates";
import { precise } from "@/util/precisionNumber";
import { ChartLineDots } from "@/components/ui/line-dot-chart";
import { ChartConfig } from "@/components/ui/chart";
import { format } from "date-fns";

export const columns: ColumnDef<StatusType>[] = [
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
		accessorKey: "currentStatus",
		header: "Currently",
		cell: ({ row }) => {
			return (
				<Badge
					variant={row.original.currentStatus ? "success" : "primary"}
					className="text-black"
				>
					{row.original.currentStatus ? "Up" : "Down"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "sparkline",
		header: "History",
		cell: ({ row }) => {
			const sparklineData = row.original.sparkline.map(
				(point: SparkPoint) => ({
					on: format(point.t,"PPpp"),
					value: point.v ? 1 : 0,
				})
			);
			return (
				<ChartLineDots
					chartConfig={
						{
							on: {
								label: "On",
								color: "var(--chart-3)",
							},
							value: {
								label: "Is Up",
								color: "var(--chart-1)",
							},
						} satisfies ChartConfig
					}
					chartData={sparklineData}
				/>
			);
		},
	},
	{
		accessorKey: "lastResponseTime",
		header: "Response Time",
		cell: ({ row }) => {
			if (row.getValue("lastResponseTime")) {
				return (
					<span
						className={getValueClass(
							responseTimeToPercentage(
								row.getValue("lastResponseTime")
							)
						)}
					>
						{row.getValue("lastResponseTime")} ms
					</span>
				);
			}
			return <Muted className="text-xs">NA</Muted>;
		},
	},
	{
		accessorKey: "lastDayUptimePercentage",
		header: "Uptime (%) 24h",
		cell: ({ row }) => {
			return (
				<span
					className={getValueClass(
						row.getValue("lastDayUptimePercentage")
					)}
				>
					{precise(row.getValue("lastDayUptimePercentage"), 2) +
						"%" || <Muted className="text-xs">NA</Muted>}
				</span>
			);
		},
	},
	{
		accessorKey: "lastCheckedAt",
		header: "Last Checked",
		cell: ({ row }) => {
			return FormatedDateObj(row.getValue("lastCheckedAt"));
		},
	},
];
