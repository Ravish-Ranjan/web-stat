"use client";
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
} from "@/assets/paginationIcons";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import Button from "@/components/ui/button";
import { ChevronRightIcon } from "@/assets/dropdownIcons";

function Pagination({ totalPage }: { totalPage: number }) {
	const params = useSearchParams();
	const router = useRouter();
	const [page, setPage] = useState(Number(params.get("page")) || 1);

	const handlePageClick = (pageNo: number) => {
		const param = new URLSearchParams(params.toString());
		param.set("page", String(pageNo));
		router.push(`?${param.toString()}`);
		setPage(pageNo);
	};

	const renderPageButtons = () => {
		const buttons: ReactNode[] = [];

		const addButton = (pageNum: number) => {
			buttons.push(
				<Button
					key={pageNum}
					variant={page === pageNum ? "default" : "outline"}
					onClick={() => handlePageClick(pageNum)}
					size={"sm"}
				>
					{pageNum}
				</Button>
			);
		};

		const addEllipsis = (key: string) => {
			buttons.push(
				<span key={key} className="mx-2">
					...
				</span>
			);
		};

		addButton(1);

		if (totalPage <= 5) {
			for (let i = 2; i <= totalPage; i++) {
				addButton(i);
			}
		} else {
			if (page <= 3) {
				addButton(2);
				addButton(3);
				addButton(4);
				addEllipsis("ellipsis-end");
				addButton(totalPage);
			} else if (page >= totalPage - 2) {
				addEllipsis("ellipsis-start");
				addButton(totalPage - 3);
				addButton(totalPage - 2);
				addButton(totalPage - 1);
				addButton(totalPage);
			} else {
				addEllipsis("ellipsis-start");
				addButton(page - 1);
				addButton(page);
				addButton(page + 1);
				addEllipsis("ellipsis-end");
				addButton(totalPage);
			}
		}

		return buttons;
	};

	return (
		<div className="flex items-center justify-center mt-4 space-x-2">
			<Button
				onClick={() => handlePageClick(1)}
				disabled={page === 1}
				variant="outline"
				size={"sm"}
			>
				<ChevronFirstIcon />
			</Button>
			<Button
				onClick={() => handlePageClick(page - 1)}
				disabled={page == 1}
				variant="outline"
				size={"sm"}
			>
				<ChevronLeftIcon />
			</Button>
			{renderPageButtons()}
			<Button
				onClick={() => handlePageClick(page + 1)}
				disabled={page === totalPage}
				variant="outline"
				size={"sm"}
			>
				<ChevronRightIcon />
			</Button>
			<Button
				onClick={() => handlePageClick(totalPage ?? 1)}
				disabled={page === totalPage}
				variant="outline"
				size={"sm"}
			>
				<ChevronLastIcon />
			</Button>
		</div>
	);
}

export default Pagination;
