import { getServerSession } from "next-auth";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Small } from "./Typography";

async function UserButton() {
	const sesssion = await getServerSession();
	if (!sesssion) return <></>;
	return (
		<Button variant={"base"}>
			{sesssion.user.image && (
				<Image
					alt=""
					src={sesssion?.user.image}
					height={25}
					width={25}
					className="rounded-full"
				/>
			)}
			<Small>{sesssion.user.name?.split(" ")[0]}</Small>
		</Button>
	);
}

export default UserButton;
