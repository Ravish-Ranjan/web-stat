"use client";
// import { PolarRadiusAxis, RadialBarChart, Label, RadialBar } from "recharts";
import {
	Label,
	LabelList,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./chart";

interface HalfRadialChartProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
	dataCount?: number;
	dataLabel?: string;
}

function HalfRadialChart({
	chartConfig,
	chartData,
	dataCount,
	dataLabel,
}: HalfRadialChartProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square w-full max-w-62.5"
		>
			<RadialBarChart
				data={chartData}
				endAngle={180}
				innerRadius={80}
				outerRadius={130}
			>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
									>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) - 16}
											className="fill-foreground text-2xl font-bold"
										>
											{dataCount}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 4}
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
				{Object.keys(chartConfig).map((key: string, i) => {
					console.log(key);
					return (
						<RadialBar
							key={i}
							dataKey={key}
							stackId="a"
							cornerRadius={5}
							fill={chartConfig[key].color}
							className="stroke-transparent stroke-2"
						>
							<LabelList
								position="insideStart"
								className="fill-white dark:fill-black font-semibold capitalize mix-blend-luminosity"
								fontSize={11}
							>
								{key}
							</LabelList>
						</RadialBar>
					);
				})}
			</RadialBarChart>
		</ChartContainer>
	);
}

export default HalfRadialChart;
