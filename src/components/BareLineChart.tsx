"use client";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

function BareLineChart() {
	const chartData = [
		{ value: 0, on: "" },
		{ value: 1, on: "" },
		{ value: 0, on: "" },
		{ value: 1, on: "" },
		{ value: 1, on: "" },
		{ value: 1, on: "" },
	];
	return (
		<ChartContainer
			config={
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
			className="h-30 w-75 mt-12"
		>
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 4,
					top: 15,
					bottom: 4,
					right: 4,
				}}
			>
				<CartesianGrid vertical={false} />
                <XAxis
					dataKey="on"
					tickLine={true}
					axisLine={true}
					tickMargin={2}
				/>
				<Line
					dataKey="value"
					type="natural"
					stroke="var(--color-on)"
					strokeWidth={2}
					dot={{
						fill: "var(--color-value)",
					}}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ChartContainer>
	);
}

export default BareLineChart;
