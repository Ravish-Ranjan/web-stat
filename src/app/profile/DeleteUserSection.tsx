"use client";
import Button from "@/components/ui/button";
import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function DeleteUserSection() {
	const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
	return (
		<>
			<Button
				onClick={() => setOpenDeleteUserModal(true)}
				variant={"destructive"}
			>
				Delete My Account
			</Button>
			<DeleteUserModal
				setOpen={setOpenDeleteUserModal}
				open={openDeleteUserModal}
			/>
		</>
	);
}

export default DeleteUserSection;
