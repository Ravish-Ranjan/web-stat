"use client";
import {
	Label,
	LabelList,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface HalfRadialChartProps {
	chartConfig: ChartConfig;
	chartData: Array<Record<string, string | number>>;
	dataCount?: number;
	dataLabel?: string;
	subChild?:string[]
}

function HalfRadialChart({
	chartConfig,
	chartData,
	dataCount,
	dataLabel,
	subChild
}: HalfRadialChartProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square w-full max-w-62.5"
		>
			<RadialBarChart
				data={chartData}
				endAngle={180}
				innerRadius={90}
				outerRadius={150}
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
										{subChild?.map((val, i) => (
											<tspan
												key={i}
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 48 + i * 20}
												className="fill-foreground text-lg font-semibold"
											>
												{val}
											</tspan>
										))}
									</text>
								);
							}
						}}
					/>
				</PolarRadiusAxis>
				{Object.keys(chartConfig).map((key: string, i) => {
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
								fontSize={12}
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
