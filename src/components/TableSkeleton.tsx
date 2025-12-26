import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDownIcon } from "@/assets/misc";

export function TableSkeleton({ columns }: { columns: string[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((value, i) => {
						return (
							<TableHead key={i}>
								<span className="flex gap-2 items-center">
									{value}{" "}
									<ArrowUpDownIcon className="size-4" />
								</span>
							</TableHead>
						);
					})}
				</TableRow>
			</TableHeader>

			<TableBody>
				{Array.from({ length: 5 }).map((_, i) => (
					<TableRow key={i}>
						{columns.map((_, i) => {
							return (
								<TableCell key={i}>
									<Skeleton className="h-8" />
								</TableCell>
							);
						})}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
