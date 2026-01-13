"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
	{ on: "", isUp: 0 },
	{ on: "", isUp: 0 },
	{ on: "", isUp: 0 },
	{ on: "", isUp: 0 },
	{ on: "", isUp: 0 },
	{ on: "", isUp: 0 },
];

interface ChartLineDotsProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
}

export function ChartLineDots({ chartConfig, chartData }: ChartLineDotsProps) {
	return (
		<ChartContainer config={chartConfig}>
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="on"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey="value"
					type="natural"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={{ fill: "var(--color-desktop)" }}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ChartContainer>
	);
}
