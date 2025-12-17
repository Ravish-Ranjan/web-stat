"use client";

import ModalOpenerButton from "@/components/ModalOpenerButton";
import { useState } from "react";
import AddWebsiteModal from "./AddWebsiteModal";

function AddWebsiteSection() {
	const [openAddWebsiteModal, setOpenAddWebsiteModal] = useState(false);
	return (
		<>
			<ModalOpenerButton setOpen={setOpenAddWebsiteModal}>
				Add Website
			</ModalOpenerButton>
			<AddWebsiteModal
				open={openAddWebsiteModal}
				setOpen={setOpenAddWebsiteModal}
			/>
		</>
	);
}

export default AddWebsiteSection;
