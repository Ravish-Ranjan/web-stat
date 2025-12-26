import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Created</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{Array.from({ length: 10 }).map((_, i) => (
					<TableRow key={i}>
						<TableCell>
							<Skeleton className="h-4 w-[200px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-[120px]" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
