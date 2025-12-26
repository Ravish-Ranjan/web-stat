"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Button from "@/components/ui/button";
import { Close, SearchIcon } from "@/assets/misc";

export function SearchInput() {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const [searchText, setSearchText] = useState(searchParams.get("q") ?? "");
	const initialRender = useRef(true);

	// Sync with URL when navigating back/forward
	useEffect(() => {
		const urlQuery = searchParams.get("q") ?? "";
		if (urlQuery !== searchText) {
			setSearchText(urlQuery);
		}
	}, [searchParams.get("q")]);

	// Debounce search text changes
	useEffect(() => {
		// Skip the initial render
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}

		const delayDebounceFn = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (searchText) {
				params.set("q", searchText);
				params.set("page", "1");
			} else {
				params.delete("q");
			}

			router.push(`?${params.toString()}`);
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchText]);

	const handleClear = () => setSearchText("");

	const handleClearFilters = () => {
		router.replace(pathName);
		handleClear();
	};
	return (
		<div className="w-full max-w-sm ml-auto flex justify-end-safe gap-2">
			<div className="relative">
				<SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search websites..."
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="pl-8 pr-8 text-sm sm:text-md"
				/>
				{searchText && (
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-0 top-1/2 h-full -translate-y-1/2 hover:bg-transparent"
						onClick={handleClear}
					>
						<Close className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Button onClick={handleClearFilters} variant={"outline"}>
				Clear
			</Button>
		</div>
	);
}
