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
import { useState } from "react";
import EditWebsiteModal from "./EditWebsiteModal";

function WebsiteActionCell({ websiteData }: { websiteData: WebsiteType }) {
	const [openDeleteWebsiteModal, setOpenDeleteWebsiteModal] = useState(false);
	const [openEditWebsiteModal, setOpenEditWebsiteModal] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"sm"} variant={"outline"} className="px-0.5">
						<SettingsIcon className="stroke-black dark:stroke-ws-primary-500" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="grid gap-1">
					<DropdownMenuItem asChild>
						<Button
							variant={"outline"}
							className="w-full"
							onClick={() => setOpenEditWebsiteModal(true)}
						>
							Edit
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Button
							variant={"destructive"}
							className="w-full"
							onClick={() => setOpenDeleteWebsiteModal(true)}
						>
							Delete
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteWebsiteModal
				setOpen={setOpenDeleteWebsiteModal}
				websiteId={websiteData.id}
				open={openDeleteWebsiteModal}
				url={websiteData.url}
			/>
			<EditWebsiteModal
				setOpen={setOpenEditWebsiteModal}
				open={openEditWebsiteModal}
				websiteData={websiteData}
			/>
		</>
	);
}

export default WebsiteActionCell;
