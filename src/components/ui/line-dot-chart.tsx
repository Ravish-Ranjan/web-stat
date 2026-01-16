"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

// const chartData = [
// 	{ on: "1", isUp: 0 },
// 	{ on: "2", isUp: 1 },
// 	{ on: "3", isUp: 0 },
// 	{ on: "4", isUp: 1 },
// 	{ on: "5", isUp: 0 },
// 	{ on: "6", isUp: 1 },
// ];

interface ChartLineDotsProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
}

export function ChartLineDots({ chartConfig, chartData }: ChartLineDotsProps) {
	return (
		<ChartContainer config={chartConfig} className="h-18 w-75">
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 6,
					top: 10,
					bottom: 0,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="on"
					tickLine={false}
					axisLine={true}
					tickMargin={2}
				/>
				<YAxis
					dataKey="value"
					tickFormatter={(value) => (value === 0 ? "Down" : "Up")}
					domain={[0, 1]}
					tickCount={2}
					tickLine={false}
					axisLine={false}
					tickMargin={5}
					orientation="right"
				/>
				<ChartTooltip
					
					cursor={false}
					content={
						<ChartTooltipContent
							hideLabel
							formatter={(value) => (value === 0 ? "Down" : "Up")}
						/>
					}
				/>
				<Line
					dataKey="value"
					type="natural"
					stroke="var(--color-on)"
					strokeWidth={2}
					dot={{ fill: "var(--color-value)" }}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ChartContainer>
	);
}
