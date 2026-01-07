"use client"
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface RadialMeterChartProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
	dataCount?: number | string;
	dataLabel?: string;
}

function RadialMeterChart({
	chartConfig,
	chartData,
	dataCount,
	dataLabel,
}: RadialMeterChartProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-62.5"
		>
			<RadialBarChart
				data={chartData}
				endAngle={360*Number(chartData[0].percentage)/100}
				innerRadius={80}
				outerRadius={140}
			>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-ws-base-400 last:fill-ws-base-700"
					polarRadius={[86, 74]}
				/>
				<RadialBar dataKey="percentage" background />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
											className="fill-foreground text-4xl font-bold"
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
				</PolarRadiusAxis>
			</RadialBarChart>
		</ChartContainer>
	);
}

export default RadialMeterChart;
