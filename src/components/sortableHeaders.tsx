"use client"
import { ArrowUpDownIcon } from "@/assets/misc";
import Button from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortableHeader({ column, label }: { column: string; label: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSort = () => {
        const params = new URLSearchParams(searchParams.toString());
        const currentSortBy = params.get("sortBy");
        const currentSortOrder = params.get("sortOrder");

        if (currentSortBy === column) {
            // Toggle sort order
            params.set(
                "sortOrder",
                currentSortOrder === "asc" ? "desc" : "asc"
            );
        } else {
            // New column, default to asc
            params.set("sortBy", column);
            params.set("sortOrder", "asc");
        }

        router.push(`?${params.toString()}`);
    };
    return (
        <Button
            variant="ghost"
            onClick={handleSort}
            size={"sm"}
            className="flex items-center gap-2 px-0 w-full justify-start"
        >
            {label}
            <ArrowUpDownIcon className="size-4" />
        </Button>
    );
}