"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteWebsiteModal from "./DeleteWebsiteModal";
import Button from "@/components/ui/button";
import { SettingsIcon } from "@/assets/misc";
import { ReactNode, useState } from "react";

function WebsiteActionCell({
	websiteId,
	url,
}: {
	websiteId: string;
	url: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"sm"} variant={"outline"} className="px-0.5">
						<SettingsIcon className="stroke-black dark:stroke-ws-primary-500" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem asChild>
						<Button variant={"outline"} className="w-full">
							Edit
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Button
							variant={"destructive"}
							className="w-full"
							onClick={() => setOpen(true)}
						>
							Delete
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteWebsiteModal
				setOpen={setOpen}
				websiteId={websiteId}
				open={open}
				url={url}
			/>
		</>
	);
}

export default WebsiteActionCell;
