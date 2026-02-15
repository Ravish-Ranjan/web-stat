"use client";

import handleRevalidation from "@/util/revalidatePath";
import Button from "./ui/button";
import { RefreshIcon } from "@/assets/misc";
import { useState } from "react";

function RevalidateButton({path}:{path:string}) {
	const [pending,setPending] = useState(false);

	const handleClick = async () =>{
		setPending(true);
		await handleRevalidation(path);
		setPending(false);
	}
	
	return (
		<Button
			variant={"outline"}
			onClick={handleClick}
			disabled={pending}
		>
			<RefreshIcon />
		</Button>
	);
}

export default RevalidateButton;
