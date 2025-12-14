import Topbar from "@/components/Topbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadata } from "../layout";

metadata.title = "Profile | WebStat"

async function page() {
	const session = await getServerSession();
	if (!session) {
		redirect("/authenticate");
	}
	return (
		<>
			<Topbar hide={{ links: true }} />
		</>
	);
}

export default page;
