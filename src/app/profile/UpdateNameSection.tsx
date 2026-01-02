"use client";

import Button from "@/components/ui/button";
import { useState } from "react";
import UpdateNameModal from "./UpdateNameModal";

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
				name={name}
			/>
		</>
	);
}

export default UpdateNameSection;
