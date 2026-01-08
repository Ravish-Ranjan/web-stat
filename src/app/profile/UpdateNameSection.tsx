"use client";

import Button from "@/components/ui/button";
import { useState } from "react";
import UpdateNameModal from "@/app/profile/UpdateNameModal";

function UpdateNameSection({ name }: { name?: string | null }) {
	const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
	return (
		<>
			<Button onClick={() => setOpenDeleteUserModal(true)}>
				Update Name
			</Button>
			<UpdateNameModal
				setOpen={setOpenDeleteUserModal}
				open={openDeleteUserModal}
				oldName={name}
			/>
		</>
	);
}

export default UpdateNameSection;
