import { format, formatDistanceToNowStrict } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function FormatedDateObj(date: Date, formatStr: string = "PPpp") {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span
					className="cursor-default whitespace-nowrap"
					suppressHydrationWarning
				>
					{formatDistanceToNowStrict(date, { addSuffix: true })}
				</span>
			</TooltipTrigger>
			<TooltipContent suppressHydrationWarning>
				{format(date, formatStr)}
			</TooltipContent>
		</Tooltip>
	);
}
