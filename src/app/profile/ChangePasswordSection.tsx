"use client";

import Button from "@/components/ui/button";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

function ChangePasswordSection() {
	const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
	return (
		<>
			<Button onClick={() => setOpenDeleteUserModal(true)}>
				Change Password
			</Button>
			<ChangePasswordModal
				setOpen={setOpenDeleteUserModal}
				open={openDeleteUserModal}
			/>
		</>
	);
}

export default ChangePasswordSection;
