import Topbar from "@/components/Topbar";
import FormSection from "./FormSection";

function Page() {
	return (
		<>
			<Topbar hide={{ links: true, loginRegister: true }} />
			<FormSection />
		</>
	);
}

export default Page;
