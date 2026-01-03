import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";

function Page() {
	return (
		<>
			<Topbar
				links={[
					{ label: "Dashboard", path: "/dashboard" },
					{ label: "Profile", path: "/profile" },
				]}
			/>
			<main></main>
			<Footer />
		</>
	);
}

export default Page;
