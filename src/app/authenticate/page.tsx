import Topbar from "@/components/Topbar";
import FormSection from "./FormSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadata } from "../layout";

metadata.title = "Authenticate | WebStat"

async function Page() {
	const session = await getServerSession();
	if (session) {
		redirect("/dashboard");
	}
	return (
		<>
			<Topbar hide={{ links: true, loginRegister: true }} />
			<FormSection />
		</>
	);
}

export default Page;
