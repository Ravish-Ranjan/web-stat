"use client";

import Button from "@/components/ui/button";
import UpdateUserModal from "./UpdateUserModal";
import { useState } from "react";

function UpdateUserSection() {
	const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
	return (
		<>
			<Button onClick={() => setOpenDeleteUserModal(true)}>
				Update My Information
			</Button>
			<UpdateUserModal
				setOpen={setOpenDeleteUserModal}
				open={openDeleteUserModal}
			/>
		</>
	);
}

export default UpdateUserSection;
