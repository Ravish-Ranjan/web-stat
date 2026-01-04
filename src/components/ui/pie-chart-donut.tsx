"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

interface PieChartDonutProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
	dataCount?: number;
	dataLabel?: string;
	dataKey: string;
	nameKey: string;
}

export function PieChartDonut({
	chartConfig,
	chartData,
	dataCount,
	dataLabel,
	dataKey,
	nameKey,
}: PieChartDonutProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-62.5"
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={chartData}
					dataKey={dataKey}
					nameKey={nameKey}
					innerRadius={60}
					strokeWidth={5}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{dataCount}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											{dataLabel}
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
